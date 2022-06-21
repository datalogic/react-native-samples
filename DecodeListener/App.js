/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeEventEmitter,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {BarcodeManager} from '@datalogic/react-native-datalogic-module';

const App: () => Node = () => {

  React.useEffect(() => {
    let nativeListenerReturn = null;
    try {
      const eventEmitter = new NativeEventEmitter(BarcodeManager);
      nativeListenerReturn = eventEmitter.addListener(
        'successCallback',
        map => {
          Alert.alert(
            'Barcode Result',
            map.barcodeData + '\n' + map.barcodeType,
          );
        },
      );
      BarcodeManager.addReadListener();
    } catch (e) {
      console.error(e);
    }

    return () => {
      nativeListenerReturn.remove();
      BarcodeManager.release();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>DecodeListener:</Text>
              <Text style={styles.sectionDescription}>
                Scan a <Text style={styles.highlight}>barcode</Text> to display
                an Alert box with the barcode data.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
