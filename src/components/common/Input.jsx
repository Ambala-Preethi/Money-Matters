import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      id,
      name,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      helperText,
      required = false,
      disabled = false,
      icon: Icon,
      prefix,
      suffix,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label} {required && <span className="required-star">*</span>}
          </label>
        )}
        <div className="input-wrapper">
          {Icon && (
            <span className="input-icon-left">
              <Icon size={18} />
            </span>
          )}
          {prefix && <span className="input-prefix">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`form-input ${Icon ? 'with-left-icon' : ''} ${prefix ? 'with-prefix' : ''} ${suffix ? 'with-suffix' : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {suffix && <span className="input-suffix">{suffix}</span>}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && <p className="form-helper">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

