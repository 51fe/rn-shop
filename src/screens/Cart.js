import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import {
  getLocalData,
  saveLocalData,
  getCartItemsCount,
  getCartPriceSum,
} from '../utils';
import { addCartItem, getAllCartItems, removeCartItem } from '../actions/cart';

const Cart = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const data = await getLocalData();
    setItems(data);
  };
  useEffect(() => {
    getItems();
  }, [dispatch]);
  useFocusEffect(
    useCallback(() => {
      getItems();
    }, []),
  );
  const handleRemove = async id => {
    await dispatch(removeCartItem(id));
    getItems();
  };

  // const product = useSelector(state => state.product);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      {items.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>购物车是空的</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>您的购物车</Text>
          </View>
          <ScrollView style={styles.cart}>
            {items.map(item => (
              <CartItem
                product={item}
                key={item._id}
                removeCartItem={() => handleRemove(item._id)}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
  },
  cart: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    marginBottom: 40,
  },
});
