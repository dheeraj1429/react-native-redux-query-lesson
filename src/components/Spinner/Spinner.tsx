import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

export interface SpinnerINterface {
  space?: 'full';
}

const Spinner = ({ space }: SpinnerINterface) => {
  return (
    <View style={space ? styles.fullSpace : styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  fullSpace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
  },
});

export default Spinner;
