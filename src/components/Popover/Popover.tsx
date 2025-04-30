import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface PopoverPortalProps {
  anchorRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  children: React.ReactNode;
}

const PopoverPortal: React.FC<PopoverPortalProps> = ({ anchorRef, onClose, children }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !anchorRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, anchorRef]);

  if (!anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      className="absolute bg-white border shadow-lg rounded p-3 z-50"
      style={{
        top: rect.bottom + window.scrollY + 4, // 4px offset
        left: rect.left + window.scrollX,
        width: 200,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default PopoverPortal;
