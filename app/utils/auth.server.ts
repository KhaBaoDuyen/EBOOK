import jwt from "jsonwebtoken";
import { authCookie } from "~/routes/api.auth.login";

const JWT_SECRET = process.env.JWT_SECRET || "SMARTBOOK_SECRET_KEY";

export async function getUserFromToken(request: Request) {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const token = await authCookie.parse(cookieHeader);  

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    return decoded;
  } catch (error) {
    console.error("Lỗi khi parse token:", error);
    return null;
  }
}
