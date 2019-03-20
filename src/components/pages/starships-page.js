import React, { Component } from 'react';

import { StarshipDetails, StarshipList } from '../sw-components';

import ErrorBoundry from '../error-boundry';

import Row from '../row';

export default class PeoplePage extends Component {
  state = {
    selectedItem: 9
  };

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <ErrorBoundry>
        <Row
          left={<StarshipList onItemSelected={this.onItemSelected} />}
          right={<StarshipDetails itemId={selectedItem} />}
        />
      </ErrorBoundry>
    );
  }
}
