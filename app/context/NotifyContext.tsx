import React, { createContext, useState, useContext, useEffect } from "react";
import NotificationCard from "~/components/NotificationCard";

interface Notify {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

interface NotifyContextValue {
  notify: Notify;
  setNotify: React.Dispatch<React.SetStateAction<Notify>>;
}

const NotifyContext = createContext<NotifyContextValue | null>(null);

export function NotifyProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState<Notify>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
 
   useEffect(() => {
    if (notify.open) {
      const timer = setTimeout(() => {
        setNotify((prev) => ({ ...prev, open: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notify.open]);

  return (
    <NotifyContext.Provider value={{ notify, setNotify }}>
      {children}

      {notify.open && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-sm animate-fadeIn">
          <NotificationCard
            type={notify.type}
            title={notify.title}
            message={notify.message}
          />
        </div>
      )}
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used within NotifyProvider");
  return ctx;
}
