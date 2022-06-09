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
  Button,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScannerProperties} from '@datalogic/react-native-datalogic-module';

const editScanner = async () => {
  try {
    var editReturn = await ScannerProperties.edit();
    Alert.alert(
      'Editable Properties',
      JSON.stringify(editReturn, undefined, 1),
    );
  } catch (e) {
    console.error(e);
  }
};

const storeScanner = async () => {
  try {
    var storeMap = {
      keyboardWedge: {enable: false, supported: true},
      aztec: {enable: false},
    };
    var storeReturn = await ScannerProperties.store(storeMap);
    console.log(storeReturn);
    Alert.alert('Storing Properties', JSON.stringify(storeMap, undefined, 1));
  } catch (e) {
    console.error(e);
  }
};

const App: () => Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>SetSymbologies:</Text>
              <Text style={styles.sectionDescription}>
                This app demonstrates how to configure symbologies
                <Text style={styles.highlight}>(aztec, code128, etc.)</Text>
                Datalogic devices.
              </Text>
              <Text style={styles.sectionTitle}>Edit Function</Text>
              <Text style={styles.sectionDescription}>
                This function returns an object containing all editable
                symbologies, with their current values (enable and supported).
              </Text>
              <View style={styles.app}>
                <Button
                  onPress={editScanner}
                  title="Edit"
                  color="#841584"
                  accessibilityLabel="Get Symbologies Object" />
              </View>
              <Text style={styles.sectionTitle}>Store Function</Text>
              <Text style={styles.sectionDescription}>
                This function takes the symbologies given to it (in the same
                format as the edit function) and applies them to the device.
              </Text>
              <View style={styles.buttonStyle}>
                <Button
                  onPress={storeScanner}
                  title="Store"
                  color="#841584"
                  accessibilityLabel="Set Symbologies" />
              </View>
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
