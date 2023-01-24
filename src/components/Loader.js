import React from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="#0fb560" style={styles.loader} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loader: {
    marginTop: '60%',
  },
});
