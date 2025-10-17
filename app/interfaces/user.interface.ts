export default interface IUser {
    _id: string;
    name?: string;
    email: string;
    otpCode?: string | null;
    otpExpires?: Date | null;
    isVerified: boolean;
    role: "user" | "admin";
    status: number;
    createdAt: string;
};
