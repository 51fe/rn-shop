import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductItem from './ProductItem';
import { getAllProducts } from '../actions/products';
import { addCartItem } from '../actions/cart';
import Loader from './Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const width = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  const loading = useSelector(state => state.status.code === -1);
  const products = useSelector(state => state.products);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            data={products}
            numColumns={Math.floor(width / 160)}
            keyExtractor={({ _id, index }) => _id}
            renderItem={({ item }) => (
              <ProductItem
                product={item}
                addCartItem={() => dispatch(addCartItem(item))}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductList;
