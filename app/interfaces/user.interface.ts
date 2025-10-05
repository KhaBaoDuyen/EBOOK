export default interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    status: number;
    createdAt: string;
};
