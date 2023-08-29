import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { getAddedQuantity } from '../utils';
import BaseImage from './BaseImage';

const ProductItem = ({ product, addCartItem }) => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart.items);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', { id: product._id })
        }>
        <BaseImage uri={product.image} />
        <View style={styles.description}>
          <View style={styles.info}>
            <Text style={styles.manufacturer}>{product.manufacturer.name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {product.name}
            </Text>
          </View>
          <Text style={styles.price}>¥{product.price}</Text>
        </View>
      </TouchableOpacity>
      <Button
        title="加入购物车"
        color="#df3033"
        disabled={getAddedQuantity(items, product._id) >= product.inventory}
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
    paddingHorizontal: 8,
    paddingVertical: 16,
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
