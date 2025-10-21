import User from "~/models/user.server";

export async function updateLoginStreak(userId: string) {
  const user = await User.findById(userId);
  if (!user) return;

  const today = new Date();
  const diffDays = user.lastLoginAt
    ? Math.floor((today.getTime() - user.lastLoginAt.getTime()) / (1000 * 3600 * 24))
    : null;

  if (diffDays === 1) user.streakDays += 1;
  else if (diffDays > 1 || diffDays === null) user.streakDays = 1;

  user.lastLoginAt = today;

   if (user.streakDays >= 7 && !user.badges.includes("docgia_chamchi"))
    user.badges.push("docgia_chamchi");

  if (user.streakDays >= 20 && !user.badges.includes("docgia_thang"))
    user.badges.push("docgia_thang");

  await user.save();
}
