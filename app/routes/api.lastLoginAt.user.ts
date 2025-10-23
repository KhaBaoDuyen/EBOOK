import User from "~/models/user.server";

export async function loader() {
  try {
   const users = await User.find({ lastLoginAt: { $gte: Date.now() - 7*24*60*60*1000 } })
   return new Response(JSON.stringify(users),{
    status:200,
    headers:{"Content-Type": "application/json"}
   });
  } catch (err:any) {
     return new Response(JSON.stringify({"Loi khi lay du lieu user gan 7 ngay =>": err.message}),{
      status:500
     })
  }
}
