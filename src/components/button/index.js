import React from 'react';

import './index.css';

// type = add | edit | default
const Button = ({ onClick, type, children, ...restProps }) => (
    <button onClick={onClick} className={`button ${type}`} {...restProps}>
        { children }
    </button>
);

export default Button;
