import React, {memo} from 'react';
import {Text, View} from 'react-native';

const DetailsComponent = () => {
  return (
    <View>
      <Text>Details!!</Text>
    </View>
  );
};

export const Details = memo(DetailsComponent);
