import User from "~/models/user.server";
import Book from "~/models/book.server";
import Library from "~/models/library.server";

export async function loader() {
    try {
        //--------------------[ USER ]------------------------
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({
            lastLoginAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 1000) }
        });
        const verifiedRates = await User.countDocuments({ isVerified: true }) / totalUsers;
        const rankDistribution = await User.aggregate([
            { $group: { _id: "$rank", count: { $sum: 1 } } }
        ]);
        const topReaders = await User.find().sort({ completedBooks: -1 }).limit(10);

        //-------------------[ BOOK ]-------------------------------

        const totalBooks = await Book.countDocuments();
        const totalLikes = await Library.aggregate([
            { $match: { isFavorite: true } },
            { $group: { _id: "$bookId" } },
            { $count: "total" }
        ]);
        const totalLikesCount = totalLikes[0]?.total || 0;
        
        const totalUniqueBooksSaved = await Library.aggregate([
            { $match: { isSaved: true } },
            { $group: { _id: "$bookId" } },
            { $count: "total" }
        ]);
        const totalSavedBooks = totalUniqueBooksSaved[0]?.total || 0;

        return {
            totalUsers,
            activeUsers,
            verifiedRates,
            rankDistribution,
            topReaders,
            totalBooks,
            totalLikesCount,
            totalSavedBooks
        };
    } catch (err: any) {
        return new Response(
            JSON.stringify({
                error: "Lỗi khi đếm user",
                message: err.message,
            }),
            { status: 500 }
        );
    }
}
