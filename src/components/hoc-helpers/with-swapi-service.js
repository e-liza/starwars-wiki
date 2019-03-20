import React from 'react';

import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = mapMethodsToProps => Comp => {
  return props => {
    return (
      <SwapiServiceConsumer>
        {swapiService => {
          const serviceProps = mapMethodsToProps(swapiService);
          return <Comp {...props} {...serviceProps} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};
export default withSwapiService;
