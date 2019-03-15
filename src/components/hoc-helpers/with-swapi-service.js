import React from 'react';

import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = Comp => {
  return props => {
    return (
      <SwapiServiceConsumer>
        {swapiService => {
          return <Comp {...props} swapiService={swapiService} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};
export default withSwapiService;
