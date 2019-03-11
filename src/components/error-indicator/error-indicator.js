import React from 'react';

import './error-indicator.css';
import errorGif from  './droid1.gif';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
    <img src={errorGif} alt= "there has been an error"/>
      <span className="boom">Boom!</span>
      <span>something has gone terribly wrong</span>
      <span>(we already sent droids to fix it)</span>
    </div>
  );
};

export default ErrorIndicator;
