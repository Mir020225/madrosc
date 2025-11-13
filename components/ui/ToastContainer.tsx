// ToastContext.tsx
import React, { createContext, useCallback, useContext, useState } from "react";
import ToastContainer from "./components/ui/ToastContainer"; // <-- corrected path

type Toast = {
  id: string;
  message: string;
  // add other fields if you need (type, duration, etc.)
};

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts((t) => [...t, { id, message }]);

    // Auto-remove after 4s
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render the ToastContainer from components/ui */}
      <ToastContainer />
      {/* If you prefer the ToastContainer to receive toasts:
          change ToastContainer signature and pass {toasts} as prop:
          <ToastContainer toasts={toasts} />
      */}
    </ToastContext.Provider>
  );
};

export default ToastContext;
