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
  KeyboardManager
} from '@datalogic/react-native-datalogic-module';


const getAllAvailableTriggers = async () => {
  try {
    var getTriggersReturn = await KeyboardManager.getAllAvailableTriggers();
    console.log(getTriggersReturn);
    Alert.alert("Get Triggers Return", 
      "Get Available Triggers Return: " + JSON.stringify(getTriggersReturn));
  } catch (e) {
    console.error(e);
  }
};

const setAllAvailableTriggersTrue = async () => {
  try {
    var setTriggersReturn = await KeyboardManager.setAllAvailableTriggers(
      true
    );
    console.log(setTriggersReturn);
  } catch (e) {
    console.error(e);
  }
};

const setAllAvailableTriggersFalse = async () => {
  try {
    var setTriggersReturn = await KeyboardManager.setAllAvailableTriggers(
      false
    );
    console.log(setTriggersReturn);
  } catch (e) {
    console.error(e);
  }
};

const setTriggers = async () => {
  try {
    var triggersArray = [
      { enabled: false, id: 0, name: 'Left Trigger' },
      { enabled: true, id: 1, name: 'Right Trigger' }
    ];
    var setTriggersReturn = await KeyboardManager.setTriggers(triggersArray);
    console.log(setTriggersReturn);
    Alert.alert('Triggers Set To:', JSON.stringify(triggersArray));
  } catch (e) {
    console.error(e);
  }
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
                <Text style={styles.sectionTitle}>Get All Available Triggers</Text>
                <View style={{ flexDirection:"row" }}>
                  <View style={styles.app}>
                    <Button
                      onPress={getAllAvailableTriggers}
                      title="Get Triggers"
                      color="#841584"
                      accessibilityLabel="Get All Available Triggers"
                    />
                  </View>
                </View>
                <Text style={styles.sectionTitle}>Set All Available Triggers</Text>
                <View style={{ flexDirection:"row" }}>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={setAllAvailableTriggersTrue}
                      title="True"
                      color="#841584"
                      accessibilityLabel="Set All Available Triggers True"
                    />
                  </View>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={setAllAvailableTriggersFalse}
                      title="False"
                      color="#841584"
                      accessibilityLabel="Set All Available Triggers False"
                    />
                  </View>
              </View>
              <Text style={styles.sectionTitle}>Set Individual Triggers</Text>
              <View style={{ flexDirection:"row" }}>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={setTriggers}
                      title="Set Triggers"
                      color="#841584"
                      accessibilityLabel="Set Specific Triggers"
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
