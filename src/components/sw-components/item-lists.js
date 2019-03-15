import React from 'react';

import ItemList from '../item-list';
import withData from '../hoc-helpers/with-data';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();

const { getAllPeople, getAllStarships, getAllPlanets } = swapiService;

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
const PersonList = withData(withChildFn(ItemList, renderName), getAllPeople);

const PlanetList = withData(withChildFn(ItemList, renderName), getAllPlanets);

const StarshipList = withData(
  withChildFn(ItemList, renderModelAndName),
  getAllStarships
);

export { PersonList, PlanetList, StarshipList };
