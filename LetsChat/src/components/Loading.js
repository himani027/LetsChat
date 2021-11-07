import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Color from '../utils/colors';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
