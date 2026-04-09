import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

interface LegalModalProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalModal({ title, children }: LegalModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const close = useCallback(() => {
    void navigate({ to: "/" });
  }, [navigate]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {return;}

    if (!dialog.open) {
      dialog.showModal();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [close]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement>,
  ) => {
    if (e.target === dialogRef.current) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 m-auto h-[85vh] w-[min(90vw,48rem)] rounded-2xl border border-white/10 bg-surface p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
        <h2 className="font-heading text-lg font-semibold text-content">
          {title}
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="grid size-9 place-items-center rounded-lg text-content-muted transition-colors hover:bg-white/10 hover:text-content"
        >
          ✕
        </button>
      </header>

      <div className="legal-content flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
        {children}
      </div>
    </dialog>
  );
}