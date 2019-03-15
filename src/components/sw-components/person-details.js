import React from 'react';

import ItemDetails, { Record } from '../item-details';
import errorGif from '../../assets/planet.gif';

import { withSwapiService } from '../hoc-helpers';

const PersonDetails = props => {
  return (
    <ItemDetails {...props} imgFb={errorGif}>
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPerson,
    getImage: swapiService.getPersonImage
  };
};
export default withSwapiService(PersonDetails, mapMethodsToProps);
