import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const BaseImage = ({ uri, size = 'small' }) => {
  const sizes = {
    mini: { width: 80, height: 80 },
    small: { width: 160, height: 160 },
    medium: { width: 220, height: 220 },
  };
  return (
    <Image source={{ uri }} resizeMode="contain" style={{ ...sizes[size] }} />
  );
};
BaseImage.propTypes = {
  uri: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'small', 'medium']),
};
export default BaseImage;
