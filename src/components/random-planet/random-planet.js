import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';
import errorGif from  './planet.gif';

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  constructor(props) {
    super(props);
    this.updatePlanet();
  }

  onImgUpdate(url){
    this.swapiService
      .getImg(url)
      .then((value) => {
        this.setState({
          planet: {
            ...this.state.planet,
            imgUrl: value,
          }
        });
      })
      .catch(this.onImgError)
  }

  onPlanetLoaded = planet => {
    this.setState({
      planet,
      loading: false
    });
    this.onImgUpdate(planet.imgUrl);
  };
  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };
  onImgError = err => {
    this.setState({
      planet: {
        ...this.state.planet,
        imgUrl: errorGif,
      }
    });
  };
 
  updatePlanet() {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError); 
  }


  render() {
    const { planet, loading, error } = this.state;

    console.log(planet);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error);
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { imgUrl, name, population, rotationPeriod, diameter} = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={imgUrl}
      />
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
