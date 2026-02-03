import React from 'react';

interface SkillPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  // You can add more props for graphs/data as needed
}

export const SkillPopup: React.FC<SkillPopupProps> = ({ open, onClose, title, description, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181818] rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
};
