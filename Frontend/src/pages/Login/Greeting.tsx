import React from 'react';
import './Greeting.css';

const Greeting: React.FC = () => {
  return (
    <div className="greeting-container">
      <h1 className="greeting-message">Hello, World!</h1>
    </div>
  );
};

export default Greeting;