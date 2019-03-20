import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';


import './app.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const planet = <RandomPlanet show={this.state.showRandomPlanet} />;
    const btnText = this.state.showRandomPlanet ? 'Stop Showing' : 'Show';
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            {planet}
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}
            >
              {btnText} Random Planets
            </button>
            <PeoplePage/>
            <PlanetsPage/>
            <StarshipsPage/>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
