import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/state/store/store';
import Home from './src/screen/Home/Home';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Home />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default App;
