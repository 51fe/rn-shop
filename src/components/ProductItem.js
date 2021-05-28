import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BaseImage from './BaseImage';
import { getAddedQuantity } from '../utils';

const ProductItem = ({ product, addCartItem }) => {
  return (
    <View style={styles.container}>
      <BaseImage uri={product.image} />
      <View style={styles.description}>
        <View style={styles.info}>
          <Text style={styles.manufacturer}>{product.manufacturer.name}</Text>
          <Text>{product.name}</Text>
        </View>
        <Text style={styles.price}>¥{product.price}</Text>
      </View>
      <Button
        title="加入购物车"
        color="#df3033"
        disabled={getAddedQuantity(product._id) >= product.inventory}
        onPress={addCartItem}
      />
    </View>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  addCartItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },

  description: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },

  info: {
    flexDirection: 'column',
  },

  manufacturer: {
    fontSize: 12,
    color: 'grey',
  },

  price: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#51d2b7',
  },
});

export default ProductItem;
