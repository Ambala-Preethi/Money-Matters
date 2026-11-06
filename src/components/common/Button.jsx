import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const loadingClass = isLoading ? 'btn-loading' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="btn-icon" size={size === 'sm' ? 14 : 18} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="btn-icon" size={size === 'sm' ? 14 : 18} />}
        </>
      )}
    </button>
  );
};

