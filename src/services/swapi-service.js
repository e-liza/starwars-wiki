export default class SwapiService {
  _apiBase = 'https://swapi.co/api';
  _imgApiBase = 'https://starwars-visualguide.com/assets/img';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  }

  async getImg(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`received ${res.status}`);
    }
    return await res.url;
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }
  async getPerson(id) {
    const res = await this.getResource(`/people/${id}`);
    return this._transformPerson(res);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }
  async getPlanet(id) {
    const res = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(res);
  }

  async getAllShips() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  async getShip(id) {
    const res = await this.getResource(`/starships/${id}`);
    return this._transformStarship(res);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = planet => {
    return {
      id: this._extractId(planet),
      imgApiBase: this._imgApiBase,
      get imgUrl() {
        return `${this.imgApiBase}/planets/${this.id}.jpg`;
      },
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };
  _transformStarship = starship => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  };

  _transformPerson = person => {
    return {
      id: this._extractId(person),
      imgUrl: id => {
        return `${this._imgApiBase}/characters/${id}.jpg`;
      },
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };
}
