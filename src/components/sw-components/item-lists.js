import React from 'react';

import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFn = (Comp, fn) => {
  return props => {
    return <Comp {...props}>{fn}</Comp>;
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => (
  <span>
    {name} ({model}){' '}
  </span>
);

const mapPersonMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPeople
  };
};
const mapPlanetMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllStarships
  };
};

const PersonList = withSwapiService(
  withData(withChildFn(ItemList, renderName)),
  mapPersonMethodsToProps
);

const PlanetList = withSwapiService(
  withData(withChildFn(ItemList, renderName)),
  mapPlanetMethodsToProps
);

const StarshipList = withSwapiService(
  withData(withChildFn(ItemList, renderModelAndName)),
  mapStarshipMethodsToProps
);

export { PersonList, PlanetList, StarshipList };
