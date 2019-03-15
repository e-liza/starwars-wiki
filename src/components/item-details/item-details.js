import React, { Component } from 'react';

import './item-details.css';
import Spinner from '../spinner/';

const Record = ({ field, label, item }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class PersonDetails extends Component {
  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImage, imgFb } = this.props;

    if (!itemId) {
      return;
    }
    getData(itemId)
      .then(item => {
        this.setState({ item });
        return item;
      })
      .then(item => {
        getImage(item)
          .then(item => {
            this.setState({ image: item });
          })
          .catch(e => this.onImgError(imgFb));
      })

      .then(this.onPersonLoaded);
  }

  onPersonLoaded = () => {
    this.setState({
      loading: false
    });
  };

  onImgError = imgFb => {
    this.setState({
      image: imgFb
    });
  };

  render() {
    const { item, loading, image } = this.state;

    const data = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { item });
    });
    const spinner = loading ? <Spinner /> : null;
    const hasData = !loading;
    const content = hasData ? (
      <PersonView item={item} image={image} data={data} />
    ) : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    );
  }
}
const PersonView = ({ item, image, data }) => {
  const { name } = item;
  return (
    <React.Fragment>
      <img className="person-image" src={image} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">{data}</ul>
      </div>
    </React.Fragment>
  );
};
