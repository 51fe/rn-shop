import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../components/ProductList';
import Detail from './Detail';

const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ title: '热卖中...' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={Detail}
        options={{ title: '查看详情' }}
      />
    </Stack.Navigator>
  );
};

export default Home;
