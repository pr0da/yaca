import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {}

export const CenterView: React.FC<Props> = (props) => {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CenterView;
