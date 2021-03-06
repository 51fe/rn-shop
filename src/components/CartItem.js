import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseImage from '../components/BaseImage';
import CartControl from '../components/CartControl';
import { useIsFocused, useNavigation } from '@react-navigation/core';

const CartItem = ({ product, removeCartItem }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  return (
    isFocused && (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetail', { id: product._id })
          }>
          <BaseImage uri={product.image} size="mini" />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text>{product.name}</Text>
          <Text>¥{product.price}</Text>
          <View style={styles.control}>
            <CartControl product={product} />
            <Text style={styles.price}>
              ¥{product.price * product.quantity}
            </Text>
            <TouchableOpacity onPress={removeCartItem}>
              <MaterialCommunityIcons name="trash-can" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  added: PropTypes.number,
  removeCartItem: PropTypes.func.isRequired,
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  info: {
    flex: 1,
    marginLeft: 32,
  },
  control: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
