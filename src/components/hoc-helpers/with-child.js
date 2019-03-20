import React from 'react';

const withChildFn = fn => Comp => {
  return props => {
    return <Comp {...props}>{fn}</Comp>;
  };
};

export default withChildFn;
