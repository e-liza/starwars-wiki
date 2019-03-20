import React from 'react';

import ItemDetails, { Record } from '../item-details';
import errorGif from '../../assets/planet.gif';

import { withSwapiService } from '../hoc-helpers';

const StarshipDetails = props => {
  return (
    <ItemDetails {...props} imgFb={errorGif}>
      <Record field="model" label="Model" />
      <Record field="length" label="Length" />
      <Record field="costInCredits" label="Cost in credits" />
    </ItemDetails>
  );
};
const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getStarship,
    getImage: swapiService.getStarshipImage
  };
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);
