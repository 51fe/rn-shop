import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProductById } from '../actions/product';
import { addCartItems, willUpdateItem } from '../actions/cart';
import CartControl from '../components/CartControl';
import BaseImage from '../components/BaseImage';
import Loader from '../components/Loader';
import { getAllItems } from '../reducers/cart';

const Detail = ({ route, navigation }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const items = useSelector(getAllItems);
  let added = 0;
  const found = items.find(item => item._id === product._id);
  if (found) {
    added = found.quantity;
  }
  const disabled = added >= product.inventory;
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(willUpdateItem(1));
  }, [id, dispatch]);

  const loading = useSelector(state => state.status.code === -1);
  const addCartItem = () => {
    dispatch(addCartItems(product));
    navigation.navigate('Cart');
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <>
            <View style={styles.detail}>
              <BaseImage uri={product.image} size="medium" />
              <View style={styles.info}>
                <Text style={styles.manufacturer}>
                  {product.manufacturer && product.manufacturer.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.brand}>
                  {product.name}
                </Text>
                <Text>
                  {disabled ? '缺货' : product.inventory - added + '件可售'}
                </Text>
              </View>
            </View>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={styles.description}>
              {product.description}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>¥{product.price}</Text>
              <CartControl
                product={product}
                added={added}
                needConfirmed={true}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#df3033"
                disabled={disabled}
                title="加入购物车"
                onPress={() => addCartItem()}
              />
            </View>
          </>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  info: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: '15%',
    marginBottom: '15%',
    paddingLeft: 16,
    fontSize: 18,
  },

  manufacturer: {
    fontSize: 18,
    color: 'grey',
  },

  brand: {
    fontSize: 14,
  },

  description: {
    marginTop: 8,
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 18,
  },

  button: {
    marginTop: 8,
  },
});

export default Detail;
