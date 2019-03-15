import React from 'react';

import ItemDetails, { Record } from '../item-details';
import errorGif from '../../assets/planet.gif';

import { SwapiServiceConsumer } from '../swapi-service-context';

const PersonDetails = ({ itemId }) => {
  return (
    <SwapiServiceConsumer>
      {({ getPerson, getPersonImage }) => {
        return (
          <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImage={getPersonImage}
            imgFb={errorGif}
          >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
          </ItemDetails>
        );
      }}
    </SwapiServiceConsumer>
  );
};

const PlanetDetails = ({ itemId }) => {
  return (
    <SwapiServiceConsumer>
      {({ getPlanet, getPlanetImage }) => {
        return (
          <ItemDetails
            itemId={itemId}
            getData={getPlanet}
            getImage={getPlanetImage}
            imgFb={errorGif}
          >
            <Record field="population" label="Population" />
            <Record field="diameter" label="Diameter" />
            <Record field="rotationPeriod" label="Rotation Period" />
          </ItemDetails>
        );
      }}
    </SwapiServiceConsumer>
  );
};

const StarshipDetails = ({ itemId }) => {
  return (
    <SwapiServiceConsumer>
      {({ getStarship, getStarshipImage }) => {
        return (
          <ItemDetails
            itemId={itemId}
            getData={getStarship}
            getImage={getStarshipImage}
            imgFb={errorGif}
          >
            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost in credits" />
          </ItemDetails>
        );
      }}
    </SwapiServiceConsumer>
  );
};

export { PersonDetails, PlanetDetails, StarshipDetails };
