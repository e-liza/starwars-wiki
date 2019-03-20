import React from 'react';

import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFn = fn => Comp => {
  return props => {
    return <Comp {...props}>{fn}</Comp>;
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => (
  <span>
    {name} ({model})
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

const PersonList = withSwapiService(mapPersonMethodsToProps)(
  withData(withChildFn(renderName)(ItemList))
);

const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
  withData(withChildFn(renderName)(ItemList))
);

const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
  withData(withChildFn(renderModelAndName)(ItemList))
);

export { PersonList, PlanetList, StarshipList };
