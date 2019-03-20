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

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImage !== prevProps.getImage
    ) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImage, imgFb } = this.props;

    getData(itemId)
    .then(item => {
      this.onItemLoaded(item, getImage, imgFb);
    })
    
  }

  onItemLoaded = (item, getImage, imgFb) => {
    getImage(item)
      .then(url => {
        this.setState({
          item,
          image: url
        });
      })
      .catch(e => this.onImgError(imgFb))
      .then(() => {
        this.setState({
          loading:false
        })
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
      <ItemView item={item} image={image} data={data} />
    ) : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    );
  }
}
const ItemView = ({ item, image, data }) => {
  const { name } = item;
  return (
    <React.Fragment>
      <img className="person-image" src={image} alt='' />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">{data}</ul>
      </div>
    </React.Fragment>
  );
};
