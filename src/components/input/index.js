import React from 'react';

import './index.css';

const Input = ({ name, value, placeholder, className, onChange, ...restProps }) => (
    <input
        type='text'
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={event => onChange(event.target.value)}
        {...restProps}
    />
);

export default Input;
