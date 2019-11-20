import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FavoritesComp = ({ requests, execRequest, editRequest, deleteRequest }) => {
  const renderItems = () => {
    const items = requests.map((item, i) => {
      return (
        <div className="request" key={item.id + item.searchQuery}>
          <p className="request__query">{item.searchQuery}</p>
          <div className="request__buttons">
            <Link to="/">
              <button
                type="button"
                name={i}
                onClick={execRequest}
                className="request-button execute-button"
              >
                Выполнить
              </button>
            </Link>
            <button
              type="button"
              name={i}
              onClick={editRequest}
              className="request-button edit-button"
            >
              Редактировать
            </button>
            <button
              type="button"
              name={i}
              className="request-button delete-button"
              onClick={deleteRequest}
            >
              Удалить
            </button>
          </div>
        </div>
      );
    });
    return items;
  };
  return (
    <div className="favorites">
      <div className="container">
        <h2 className="favorites__title">Избранное</h2>
        <div className="favorites__requests"> {renderItems()}</div>
      </div>
    </div>
  );
};

export default connect(({ favorites }) => ({ requests: favorites.requests }))(FavoritesComp);

FavoritesComp.propTypes = {
  requests: PropTypes.array.isRequired,
  execRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
};
