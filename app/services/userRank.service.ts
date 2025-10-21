import User from "~/models/user.server";
import { decodeUser } from "~/utils/verifyToken.server";


export async function updateUserRankById(userId: string) {
  const user = await User.findById(userId);
  if (!user) return;

  const n = user.completedBooks || 0;
  let rank = "đồng";

  if (n >= 50) rank = "ngọc trai";
  else if (n >= 40) rank = "thạch anh tím";
  else if (n >= 30) rank = "hồng ngọc";
  else if (n >= 20) rank = "thiên thanh";
  else if (n >= 15) rank = "lục bảo";
  else if (n >= 10) rank = "vàng";
  else if (n >= 5) rank = "bạc";
  else if (n >= 3) rank = "đồng";

  console.log("dulieu tu updateUserRankById =>", user);

  user.rank = rank;
  await user.save();
}

export async function updateUserRank(request: Request) {
  const decoded = await decodeUser(request);
  if (!decoded?._id) return;

  await updateUserRankById(decoded._id);
}


export async function increaseCompletedBook(userId: string) {
  const user = await User.findById(userId);
  if (!user) return;

  user.completedBooks = (user.completedBooks || 0) + 1;
  await user.save();

  await updateUserRankById(userId);
}
