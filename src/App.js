import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Detail from './screens/Detail';

import { store, persisted } from './store';

const Stack = createNativeStackNavigator();
const App = () => {
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Cart') {
      return '您的购物车';
    }
    return '热卖中...';
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisted}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Profile"
              component={Home}
              options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
              })}
            />
            <Stack.Screen
              name="ProductDetail"
              component={Detail}
              options={{ title: '查看详情' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
