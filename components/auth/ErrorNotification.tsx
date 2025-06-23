import { useState } from "react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export const ErrorNotification = ({ message }: { message: string }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#FDECEA] text-[#9B1C1C] border border-red-300 rounded-md p-4 flex items-start justify-between space-x-4 shadow-md transition-all animate-fade-in">
      <div className="flex items-start space-x-3">
        <XCircleIcon className="w-6 h-6 text-[#9B1C1C] mt-0.5" />
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button onClick={() => setVisible(false)} aria-label="Close notification">
        <XMarkIcon className="w-5 h-5 text-[#9B1C1C] hover:text-red-700 transition" />
      </button>
    </div>
  );
};
