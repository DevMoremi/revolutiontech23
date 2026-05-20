"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastKind = "success" | "error";
type Toast = { id: number; kind: ToastKind; message: string };

type Ctx = {
  success: (msg: string) => void;
  error: (msg: string) => void;
};

const ToastContext = createContext<Ctx | null>(null);

export function useToast(): Ctx {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 5000);
  }, []);

  const ctx = useMemo<Ctx>(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto rounded-md px-4 py-3 text-sm font-medium shadow-lg ring-1 transition ${
              t.kind === "success"
                ? "bg-brand-cyan text-brand-purple-deep ring-brand-cyan/50"
                : "bg-red-500 text-white ring-red-300/50"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
