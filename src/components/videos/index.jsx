import React from 'react';
import './Videos.scss';
import PropTypes from 'prop-types';

const VideosComp = props => {
  const { data, playVideo, videoId, gridLayout } = props;

  const sliceText = (text, value) => {
    if (!gridLayout) {
      return text;
    }
    if (text.length <= value) {
      return text;
    }
    return `${text.slice(0, value)}...`;
  };
  const conversionViews = value => {
    if (value >= 1000 && value < 1000000) {
      return `${(value / 1000).toFixed(1)} тыс. просмотров`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} млн просмотров`;
    }
    return `${value} просмотров`;
  };

  const renderItems = (ytdata, num) => {
    let videos;
    if (ytdata.items) {
      videos = ytdata.items.map((item, key) => {
        return (
          <div key={item.id.videoId} className="video-wrapper">
            {key !== Number(num) ? (
              <div id={key} className="video" onClick={playVideo}>
                <img className="video__media" src={item.snippet.thumbnails.medium.url} />
                <div className="video__button">
                  <svg width="68" height="48" viewBox="0 0 68 48">
                    <path
                      className="video__button-shape"
                      d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                    />
                    <path className="video__button-icon" d="M 45,24 27,14 27,34" />
                  </svg>
                </div>
              </div>
            ) : (
              <iframe
                title={item.snippet.title}
                width={gridLayout ? '245' : '157'}
                height={gridLayout ? '136' : '88'}
                src={`https://www.youtube.com/embed/${item.id.videoId}?rel=0&showinfo=0&autoplay=1`}
                frameBorder="0"
                allowFullScreen
              />
            )}
            <a
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="video-info">
                <p className="video-info__title">{sliceText(item.snippet.title, 56)}</p>
                <p className="video-info__description">{sliceText(item.snippet.description, 27)}</p>
                <p className="video-info__views">{conversionViews(item.statistic.viewCount)}</p>
              </div>
            </a>
          </div>
        );
      });
    }

    return videos;
  };

  const videos = renderItems(data, videoId);
  return data.items ? videos : <div />;
};
export default VideosComp;

VideosComp.propTypes = {
  data: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired,
  videoId: PropTypes.number,
  gridLayout: PropTypes.bool.isRequired
};
VideosComp.defaultProps = {
  videoId: undefined
};
