import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateCartItem, willUpdateItem } from '../actions/cart';

const CartControl = ({ product, needConfirmed, added }) => {
  const [count, setCount] = useState(product.quantity || 1);
  const dispatch = useDispatch();
  const increment = value => {
    let max = count;
    if (needConfirmed) {
      max = count + added;
    }
    if (max < product.inventory) {
      setCount(++value);
      watchCount(value);
    }
  };

  const decrement = value => {
    if (count > 1) {
      setCount(--value);
      watchCount(value);
    }
  };

  const handleChange = e => {
    let val = e.target.value;
    // Should be a positive integer
    if (/^[1-9]\d*$/.test(val) && val <= product.inventory) {
      setCount(Number(val));
      watchCount(val);
    } else {
      e.target.value = count;
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
      <TouchableHighlight onPress={() => decrement(count)}>
        <MaterialCommunityIcons name="minus-circle" size={24} />
      </TouchableHighlight>
      <TextInput
        value={String(count)}
        keyboardType="decimal-pad"
        selectTextOnFocus={true}
        style={styles.input}
        onChangeText={e => handleChange(e)}
      />
      <TouchableHighlight onPress={() => increment(count)}>
        <MaterialCommunityIcons name="plus-circle" size={24} />
      </TouchableHighlight>
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
