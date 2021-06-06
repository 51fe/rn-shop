import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { store, persisted } from './store';
import Cart from './screens/Cart';
import Home from './screens/Home';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisted}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              labelPosition: 'beside-icon',
            }}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: '首页',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Cart"
              component={Cart}
              options={{
                title: '购物车',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="cart"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
