import React, { useEffect, useState } from "react";

export default function NotificationOverlay({ message, type = "success", onClose, duration = 3000, style }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 즉시 표시
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    if (isAnimating) return; // 애니메이션 중복 방지
    
    setIsAnimating(true);
    setIsVisible(false);
    
    // 애니메이션 완료 후 컴포넌트 제거
    setTimeout(() => {
      onClose();
    }, 300); // transition 지속시간과 동일
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={style}
    >
      <div className={`${getBgColor()} text-white rounded-xl shadow-2xl p-4 max-w-sm`}>
        <div className="flex items-center gap-3">
          <span className="text-xl">{getIcon()}</span>
          <div className="flex-1">
            <p className="font-semibold text-sm">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-lg font-bold transition-colors"
            disabled={isAnimating}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
} 