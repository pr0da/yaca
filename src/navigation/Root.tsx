import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../context/AuthContext';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import CenterView from '../components/CenterView';

const RootStack = createStackNavigator();

export default function App() {
  const { isLoading, userToken, isSignout } = useAuthContext();

  if (isLoading) {
    return (
      <CenterView>
        <Text>Loading...</Text>
      </CenterView>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {userToken == null ? (
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          <RootStack.Screen name="Home" component={HomeScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
