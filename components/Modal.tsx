"use client";

export default function Modal({
  open,
  children,
  onClose,
}: any) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-8 w-[600px] relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          ✖
        </button>

        {children}

      </div>

    </div>

  );
}