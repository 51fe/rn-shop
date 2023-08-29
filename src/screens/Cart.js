import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { removeCartItem } from '../actions/cart';
import { getCartPriceSum } from '../utils';
import axios from '../actions/axois';

const Cart = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const goPay = () => {
    items.forEach(async item => {
      await axios.put(`products/${item._id}`, {
        ...item,
        inventory: item.inventory - item.quantity,
      });
    });
    Alert.alert('消息', '功能有待添加', [
      {
        text: '确认',
        onPress: () => {
          items.forEach(async item => {
            dispatch(removeCartItem(item._id));
          });
        },
      },
    ]);
  };
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        { ...styles.container },
      ]}>
      {items.length === 0 ? (
        <Text style={styles.title}>购物车是空的</Text>
      ) : (
        <>
          <ScrollView style={styles.cart}>
            {items.map(item => (
              <CartItem
                product={item}
                key={item._id}
                removeCartItem={() => dispatch(removeCartItem(item._id))}
              />
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.sum}>总价：¥{getCartPriceSum(items)}</Text>
            <Button color="#df3033" title="去结算" onPress={goPay} />
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#fff',
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    color: '#1c1c1e',
  },
  cart: {
    flex: 1,
    padding: 16,
  },
  footer: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sum: {
    color: '#df3033',
  },
});
