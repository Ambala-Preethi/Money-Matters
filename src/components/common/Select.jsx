import React, { forwardRef } from 'react';

export const Select = forwardRef(
  (
    {
      label,
      id,
      name,
      value,
      onChange,
      options = [],
      placeholder = 'Select an option',
      error,
      helperText,
      required = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const selectId = id || name;

    return (
      <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label} {required && <span className="required-star">*</span>}
          </label>
        )}
        <div className="select-wrapper">
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="form-select"
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const optValue = typeof opt === 'object' ? opt.value : opt;
              const optLabel = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={optValue} value={optValue}>
                  {optLabel}
                </option>
              );
            })}
          </select>
          <span className="select-arrow" aria-hidden="true">
            ▾
          </span>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && <p className="form-helper">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

