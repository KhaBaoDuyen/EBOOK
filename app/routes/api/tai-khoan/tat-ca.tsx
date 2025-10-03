import User from "~/models/user.server";

export async function loader() {
  try {
   const users = await User.find();
   return new Response(JSON.stringify(users),{
    status:200,
    headers:{"Content-Type": "application/json"}
   });
  } catch (err:any) {
     return new Response(JSON.stringify({"Loi khi lay du lieu user =>": err.message}),{
      status:500
     })
  }
}
