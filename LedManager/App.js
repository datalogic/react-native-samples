/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  NativeEventEmitter,
  Button
} from 'react-native';

import {
  Header,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  BarcodeManager,
  LedManager
} from '@datalogic/react-native-datalogic-module';


const GrLedTrue = async () => {
  var ledMap = { led: 'LED_GOOD_READ', enable: true };
  await LedManager.setLed(ledMap);
};
const GrLedFalse = async () => {
  var ledMap = { led: 'LED_GOOD_READ', enable: false };
  await LedManager.setLed(ledMap);
};
const GsLedTrue = async () => {
  var ledMap = { led: 'LED_GREEN_SPOT', enable: true };
  await LedManager.setLed(ledMap);
};
const GsLedFalse = async () => {
  var ledMap = { led: 'LED_GREEN_SPOT', enable: false };
  await LedManager.setLed(ledMap);
};
const GenNoteTrue = async () => {
  var ledMap = { led: 'LED_NOTIFICATION', enable: true };
  await LedManager.setLed(ledMap);
};
const GenNoteFalse = async () => {
  var ledMap = { led: 'LED_NOTIFICATION', enable: false };
  await LedManager.setLed(ledMap);
};

class App extends React.Component {
  async componentDidMount() {
    try {
      const eventEmitter = new NativeEventEmitter(BarcodeManager);
      eventEmitter.addListener('successCallback', (map) => {
        Alert.alert('Barcode Result', map.barcodeData + '\n' + map.barcodeType);
      });
      await BarcodeManager.addReadListener();
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>LedManager:</Text>
                <Text style={styles.sectionDescription}>
                  This app demonstrates how to configure LED's <Text style={styles.highlight}>(Good Read LED, Green Spot LED, General Notification LED)
                  </Text> on Datalogic devices.
                </Text>
                <Text style={styles.sectionTitle}>Good Read LED</Text>
                <View style={{ flexDirection:"row" }}>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={GrLedTrue}
                      title="True"
                      color="#841584"
                      accessibilityLabel="Good Read LED True"
                    />
                  </View>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={GrLedFalse}
                      title="False"
                      color="#841584"
                      accessibilityLabel="Good Read LED False"
                    />
                  </View>
                </View>
                <Text style={styles.sectionTitle}>Green Spot LED</Text>
                <View style={{ flexDirection:"row" }}>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={GsLedTrue}
                      title="True"
                      color="#841584"
                      accessibilityLabel="Green Spot LED True"
                    />
                  </View>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={GsLedFalse}
                      title="False"
                      color="#841584"
                      accessibilityLabel="Green Spot LED False"
                    />
                  </View>
              </View>
              <Text style={styles.sectionTitle}>General Notification LED</Text>
              <View style={{ flexDirection:"row" }}>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={GenNoteTrue}
                      title="True"
                      color="#841584"
                      accessibilityLabel="General Notification LED True"
                    />
                  </View>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={GenNoteFalse}
                      title="False"
                      color="#841584"
                      accessibilityLabel="General Notification LED False"
                    />
                  </View>
              </View>
          </View>
        </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

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
