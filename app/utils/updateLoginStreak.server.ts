import User from "~/models/user.server";

export async function updateLoginStreak(userId: string) {
  const user = await User.findById(userId);
  if (!user) return;

  const now = new Date();
  const last = user.lastLoginAt ? new Date(user.lastLoginAt) : null;

  //------[ Nếu chưa có ngày đăng nhập => streak = 1]-------
  if (!last) {
    user.streakDays = 1;
    user.lastLoginAt = now;
    await user.save();
    return;
  }

  //-----------------------[ Lấy phần ngày]-------------------------
  const todayStr = now.toISOString().split("T")[0];
  const lastStr = last.toISOString().split("T")[0];

  const today = new Date(todayStr);
  const lastDay = new Date(lastStr);

  //-----------------[ Tính khoảng cách ngày ]------------------
  const diffDays = Math.round((today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    
  } else if (diffDays === 1) {

    user.streakDays += 1;
    user.lastLoginAt = now;

  } else if (diffDays > 1) {

    user.streakDays = 1;
    user.lastLoginAt = now;
  }

  await user.save();
}
