import React from 'react';

import ItemDetails, { Record } from '../item-details';
import errorGif from '../../assets/planet.gif';

import { withSwapiService } from '../hoc-helpers';

const PlanetDetails = props => {
  return (
    <ItemDetails {...props} imgFb={errorGif}>
      <Record field="population" label="Population" />
      <Record field="diameter" label="Diameter" />
      <Record field="rotationPeriod" label="Rotation Period" />
    </ItemDetails>
  );
};
const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPlanet,
    getImage: swapiService.getPlanetImage
  };
};
export default withSwapiService(mapMethodsToProps)(PlanetDetails);
