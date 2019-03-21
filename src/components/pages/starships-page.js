import React from 'react';

import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom';

import ErrorBoundry from '../error-boundry';

const StarshipPage = ({ history }) => {
  return (
    <ErrorBoundry>
      <StarshipList
        onItemSelected={id => {
          history.push(id);
        }}
      />
    </ErrorBoundry>
  );
};
export default withRouter(StarshipPage);
