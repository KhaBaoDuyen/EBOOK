export default interface IUser {
    _id: string;
    name?: string;
    email: string;
    avatar?: string;
    gender?: "Nam" | "Nữ" | "Khác";
    birthDate?: string;
    address?: string;
    description?: string;
    otpCode?: string | null;
    otpExpires?: Date | null;
    isVerified: boolean;
    role: "user" | "admin";
    status: number;
    createdAt: string;
}

