import React from 'react';

import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';
import errorGif from '../../assets/planet.gif';

const swapiService = new SwapiService();

const { getPerson, getPlanet, getStarship, getPersonImage, getPlanetImage, getStarshipImage } = swapiService;


const PersonDetails = ({itemId}) => {
    return(
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
};

const PlanetDetails = ({itemId}) => {
    return(
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
    )
};

const StarshipDetails = ({itemId}) => {
    return(
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
    )
};

export { PersonDetails, PlanetDetails, StarshipDetails };
