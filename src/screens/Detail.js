import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProductById } from '../actions/product';
import { addCartItems } from '../actions/cart';
import { getAddedQuantity } from '../utils';
import CartControl from '../components/CartControl';
import BaseImage from '../components/BaseImage';

const Detail = ({ route, navigation }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.status.code === -1);
  const product = useSelector(state => state.product);
  const [added, setAdded] = useState(0);
  const disabled = added >= product.inventory;
  const getAdded = async () => {
    const num = await getAddedQuantity(product._id);
    setAdded(num);
  };
  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);
  useEffect(() => {
    getAdded();
  }, [dispatch]);

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
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={styles.detail}>
              <BaseImage uri={product.image} size="medium" />
              <View style={styles.info}>
                <Text style={styles.manufacturer}>
                  {product.manufacturer && product.manufacturer.name}
                </Text>
                <Text>{product.name}</Text>
                <Text>
                  {disabled ? '缺货' : product.inventory - added + '件可售'}
                </Text>
              </View>
            </View>
            <Text style={styles.description}>{product.description}</Text>
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
        )}
      </ScrollView>
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
    fontSize: 12,
    color: 'grey',
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
