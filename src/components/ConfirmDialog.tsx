import React from 'react';
import Button from './Button';

// Enhanced confirmation dialog with theme support and animations
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
  icon?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  open, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  type = 'info',
  icon
}) => {
  if (!open) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-500/20',
          iconColor: 'text-red-500',
          defaultIcon: '⚠️',
          borderColor: 'border-red-500/30'
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-500/20',
          iconColor: 'text-amber-500',
          defaultIcon: '⚡',
          borderColor: 'border-amber-500/30'
        };
      default:
        return {
          iconBg: 'bg-blue-500/20',
          iconColor: 'text-blue-500',
          defaultIcon: '💬',
          borderColor: 'border-blue-500/30'
        };
    }
  };

  const styles = getTypeStyles();
  const displayIcon = icon || styles.defaultIcon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onCancel}
    >
      <div
        className={`backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl max-w-md w-full border-2 space-y-6 animate-scaleIn ${styles.borderColor}`}
        style={{ backgroundColor: 'var(--card-bg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div 
            className={`w-20 h-20 rounded-full ${styles.iconBg} flex items-center justify-center text-4xl shadow-lg border-2 ${styles.borderColor}`}
          >
            {displayIcon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black text-center leading-tight">
          {title}
        </h3>

        {/* Message */}
        <p className="text-center opacity-80 leading-relaxed text-base">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={onCancel} 
            className="flex-1 hover:scale-105 transition-transform"
          >
            ❌ Avbryt
          </Button>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => { onConfirm(); onCancel(); }} 
            className="flex-1 hover:scale-105 transition-transform"
          >
            ✅ Bekräfta
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default ConfirmDialog;
