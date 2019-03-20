import React, { Component } from 'react';

import { PlanetDetails, PlanetList } from '../sw-components';

import ErrorBoundry from '../error-boundry';

import Row from '../row';

export default class PeoplePage extends Component {
  state = {
    selectedItem: 2
  };

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <ErrorBoundry>
        <Row
          left={<PlanetList onItemSelected={this.onItemSelected} />}
          right={<PlanetDetails itemId={selectedItem} />}
        />
      </ErrorBoundry>
    );
  }
}
