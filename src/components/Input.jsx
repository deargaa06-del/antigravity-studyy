import React from 'react';
import './components.css';

export function Input({ label, id, className = '', ...props }) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input 
        id={id}
        className="input-field" 
        {...props} 
      />
    </div>
  );
}

export function TextArea({ label, id, className = '', ...props }) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <textarea 
        id={id}
        className="input-field" 
        style={{ resize: 'vertical', minHeight: '100px' }}
        {...props} 
      />
    </div>
  );
}
