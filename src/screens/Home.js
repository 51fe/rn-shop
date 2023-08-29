import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getCartItemsCount } from '../utils';
import ProductList from '../components/ProductList';
import Cart from './Cart';

const Tab = createBottomTabNavigator();

const Home = () => {
  const items = useSelector(state => state.cart.items);
  const count = useMemo(() => getCartItemsCount(items), [items]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelPosition: 'beside-icon',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={route.name.toLocaleLowerCase()}
            size={size}
            color={color}
          />
        ),
      })}>
      <Tab.Screen
        name="Home"
        component={ProductList}
        options={{
          title: '首页',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '购物车',
          headerShown: false,
          tabBarBadge: count,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
