import { useState } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export const SuccessNotification = ({ message }: { message: string }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 shadow-sm w-full text-sm flex justify-between items-start space-x-3">
      <div className="flex gap-2 items-start">
        <CheckCircleIcon className="w-5 h-5 mt-0.5 text-green-600" />
        <div>
          <p className="font-semibold">Success</p>
          <p>{message}</p>
        </div>
      </div>
      <button onClick={() => setVisible(false)} aria-label="Close">
        <XMarkIcon className="w-4 h-4 mt-0.5 text-green-500 hover:text-green-700" />
      </button>
    </div>
  );
};
