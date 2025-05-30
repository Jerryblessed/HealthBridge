import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  isInteractive?: boolean;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  footer,
  isInteractive = false,
  onClick,
  className = '',
}) => {
  const CardComponent = isInteractive ? motion.div : 'div';
  
  const interactiveProps = isInteractive
    ? {
        whileHover: { scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        whileTap: { scale: 0.98 },
        onClick,
      }
    : {};

  return (
    <CardComponent
      className={`bg-white rounded-xl shadow-sm overflow-hidden ${
        isInteractive ? 'cursor-pointer' : ''
      } ${className}`}
      {...interactiveProps}
    >
      {(title || subtitle || icon) && (
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary-500">{icon}</div>}
            <div>
              {title && <h3 className="font-display font-semibold text-lg text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">{footer}</div>}
    </CardComponent>
  );
};

export default Card;