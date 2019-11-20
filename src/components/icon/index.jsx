import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../../public/images/icons/icons.svg';

const Icon = ({ name, size, classnames }) => (
  <svg className={classnames} width={size} height={size} name={name} id={name} key={name}>
    <use xlinkHref={`${icons}#icon-${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  classnames: PropTypes.string.isRequired
};

export default Icon;
