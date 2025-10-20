import { createContext, useContext, useState, useEffect } from "react";
import { getAuthByEmail } from "~/services/user.service";

const UserContext = createContext<any>(null);

export function UserProvider({ children, initialUser }: any) {
  const [userData, setUserData] = useState(initialUser);

   const reloadUser = async () => {
    if (!userData?.email) return;
    try {
      const res = await getAuthByEmail(userData.email);
      setUserData(res.data);
    } catch (err) {
      console.error("Lỗi reloadUser:", err);
    }
  };

   useEffect(() => {
    if (initialUser?.email) {
      (async () => {
        try {
          const res = await getAuthByEmail(initialUser.email);
          setUserData(res.data);
        } catch (err) {
          console.error("Lỗi tải lại thông tin người dùng:", err);
        }
      })();
    }
  }, [initialUser?.email]);

  return (
    <UserContext.Provider value={{ userData, setUserData, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser phải được sử dụng bên trong <UserProvider>");
  }
  return context;
}
