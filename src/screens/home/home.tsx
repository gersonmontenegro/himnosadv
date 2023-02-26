import React, {memo} from 'react';
import {Text, View} from 'react-native';

const HomeComponent = () => {
  return (
    <View>
      <Text>Home!!</Text>
    </View>
  );
};

export const Home = memo(HomeComponent);
