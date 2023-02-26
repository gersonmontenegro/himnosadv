import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useSettings} from './hooks/use-settings';

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
  },
  button: {
    height: 30,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: scale(300),
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

const SettingsComponent = () => {
  const {onPressImport, onPressRemove} = useSettings();

  return (
    <View>
      <Text>Settings</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={onPressImport}>
          <Text style={styles.buttonText}>Import file</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onPressRemove}>
          <Text style={styles.buttonText}>Remove data</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Show data</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const Settings = memo(SettingsComponent);
