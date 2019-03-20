import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';
import SwapiService from '../../services/swapi-service';

import errorGif from '../../assets/planet.gif';

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    imgUrl: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    const { show, updateInterval } = this.props;
    this.updatePlanet();
    this.toggleSlider(updateInterval)(show);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  toggleSlider = updateInterval => show => {
    show
      ? (this.interval = setInterval(this.updatePlanet, updateInterval))
      : clearInterval(this.interval);
  };
  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this.toggleSlider(show);
    }
  }

  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };

  onImgError = () => {
    this.setState({
      imgUrl: errorGif
    });
  };

  onPlanetLoaded = planet => {
    this.swapiService
      .getPlanetImage(planet)
      .then(url => {
        this.setState({
          planet,
          imgUrl: url,
          loading: false,
          error: false
        });
      })
      .catch(e =>
        this.setState({
          imgUrl: errorGif
        })
      );
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(planet => {
        this.onPlanetLoaded(planet);
      })
      .catch(this.onError);
  };

  render() {
    const { planet, imgUrl, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error);
    const content = hasData ? (
      <PlanetView planet={planet} imgUrl={imgUrl} />
    ) : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

RandomPlanet.defaultProps = {
  updateInterval: 10000
};

RandomPlanet.propTypes = {
  updateInterval: PropTypes.number
};

const PlanetView = ({ planet, imgUrl }) => {
  const { name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image" src={imgUrl} alt="" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
