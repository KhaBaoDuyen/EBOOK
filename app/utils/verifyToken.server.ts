import jwt from "jsonwebtoken";
import { authCookie } from "~/routes/api.auth.login";

const JWT_SECRET = process.env.JWT_SECRET || "SMARTBOOK_SECRET_KEY";

/**
  * @param request  
 * @returns Thông tin người dùng  
 */
export async function decodeUser(request: Request) {
  try {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) return null;

    const token = await authCookie.parse(cookieHeader);
    if (!token) return null;

    const clean = token.replace(/^"|"$/g, "");

    const decoded = jwt.verify(clean, JWT_SECRET) as {
      id: string;
      name: string;
      email: string;
      role: string;
    };

    // console.log("decodeUser", decoded);

    return decoded;
  } catch (error: any) {
    console.error(" Lỗi decode token:", error.message);
    return null;
  }
}

export async function requireAdmin(request: Request) {
  const user = await decodeUser(request);
  if (!user || user.role !== "admin") throw new Response("Không có quyền truy cập", { status: 403 });
  return user;
}

