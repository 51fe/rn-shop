import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateCartItem, willUpdateItem } from '../actions/cart';

const CartControl = ({ product, needConfirmed, added }) => {
  const initValue = needConfirmed ? 1 : product.quantity;
  const [count, setCount] = useState(initValue);

  const dispatch = useDispatch();
  const increment = () => {
    let max = count;
    if (needConfirmed) {
      max = count + added;
    }
    if (max < product.inventory) {
      setCount(count + 1);
      watchCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      watchCount(count - 1);
    }
  };

  const handleChange = value => {
    let val = Number(value);
    // Should be a positive integer
    if (/^[1-9]\d*$/.test(value) && val <= product.inventory) {
      setCount(val);
      watchCount(val);
    } else {
      setCount(initValue);
    }
  };

  const watchCount = value => {
    if (needConfirmed) {
      dispatch(willUpdateItem(value));
    } else {
      dispatch(
        updateCartItem({
          id: product._id,
          count: value,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement}>
        <MaterialCommunityIcons name="minus-circle" size={24} />
      </TouchableOpacity>
      <TextInput
        value={String(count)}
        style={styles.input}
        onChangeText={handleChange}
      />
      <TouchableOpacity onPress={increment}>
        <MaterialCommunityIcons name="plus-circle" size={24} />
      </TouchableOpacity>
    </View>
  );
};

CartControl.propTypes = {
  product: PropTypes.object.isRequired,
  added: PropTypes.number, // 已添加
  needConfirmed: PropTypes.bool,
};

export default CartControl;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: '#ddd',
    textAlign: 'center',
  },
});
