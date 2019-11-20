import React from 'react';
import { Input } from 'antd';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import spinner from '../../../public/images/Spinner.svg';
import { Videos, Icon } from '..';
import './Search.scss';

const SearchComp = ({
  onSearch,
  searchQuery,
  loading,
  data,
  playVideo,
  videoId,
  gridLayout,
  changeLayout,
  handleOpenModal,
  isModalOpen,
  requestWasSaved,
  displayPopup,
  closePopup,
  error
}) => {
  const { Search } = Input;
  return (
    <div className={cn('search', { hidden: isModalOpen })}>
      <div className="container">
        <div className={cn('search-input', { 'search-active': searchQuery })}>
          <h1 className="search-input__title">Поиск Видео</h1>
          <div className="search-input__body">
            <Search
              placeholder="Что хотите посмотреть?"
              enterButton="Найти"
              size="large"
              onSearch={onSearch}
            />
            <button
              type="button"
              name="modal-button"
              className={cn('search-input__button', {
                'disable-events': !searchQuery || requestWasSaved,
                hidden: !searchQuery
              })}
              onClick={handleOpenModal}
            >
              <Icon
                name="heart"
                size={24}
                classnames={`input-icon ${requestWasSaved ? 'saved-request' : ''}`}
              />
              <div className="wrapper-shadow">
                <div className={cn('popup', { hidden: !displayPopup })}>
                  <p className="popup__text">Поиск сохранён в разделе «Избранное» </p>
                  <Link to="./favorites">
                    <p onClick={closePopup} className="popup__link" id="popup-link">
                      Перейти в избранное
                    </p>
                  </Link>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className={cn('search-result', { hidden: !searchQuery })}>
          <div className="filter-panel">
            Видео по запросу <span className="filter-panel__request">«{searchQuery}»</span>
            <span className="filter-panel__video-count">
              {data.pageInfo ? data.pageInfo.totalResults : ''}
            </span>
            <button
              type="button"
              className={cn('filter-panel__list', { 'disable-events': !gridLayout })}
              onClick={changeLayout}
            >
              <Icon
                name="list"
                size={24}
                classnames={`panel-icon ${gridLayout ? 'icon--active' : ''}`}
              />
            </button>
            <button
              type="button"
              className={cn('filter-panel__grid', { 'disable-events': gridLayout })}
              onClick={changeLayout}
            >
              <Icon
                name="grid"
                size={24}
                classnames={`panel-icon ${!gridLayout ? 'icon--active' : ''}`}
              />
            </button>
          </div>
          <div className={cn('search-items', { 'block-layout': !gridLayout })}>
            {loading ? (
              <img src={spinner} />
            ) : (
              <Videos data={data} playVideo={playVideo} videoId={videoId} gridLayout={gridLayout} />
            )}
            {error ? (
              <p className="search-items__error">
                Для этого ключа апи превышена квота трафика, смените ключ или повторите запрос
                позднее
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchComp;

SearchComp.propTypes = {
  data: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired,
  videoId: PropTypes.number,
  gridLayout: PropTypes.bool.isRequired,
  changeLayout: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  requestWasSaved: PropTypes.bool.isRequired,
  displayPopup: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
};
SearchComp.defaultProps = {
  videoId: undefined
};
