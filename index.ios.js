/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from './styles';
import MediaListView from './MediaListView'
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  NavigatorIOS,
  AlertIOS
} from 'react-native';

export default class iTunesBrowser extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.global.mainContainer}
        barTintColor='#2A3744'
        tintColor='#EFEFEF'
        titleTextColor='#EFEFEF'
        initialRoute={{
          component: MediaListView,
          title: 'iTunesBrowser',
          rightButtonTitle: 'Search',
          onRightButtonPress: () => AlertIOS.alert('Hello','This is an alert')
        }}
      />
    );
  }
}

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
