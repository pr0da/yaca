import React, { useMemo } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipesScreen from '../screens/recipes/RecipesScreen';
import RecipeAdd from '../screens/recipeAdd/RecipeAdd';
import { useTheme } from '@shopify/restyle';
import { Theme } from './theme';

export type RootStackParamList = {
  Recipes: undefined;
  RecipeAdd: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const useNavigationTheme = (): NavigationTheme => {
  const theme = useTheme<Theme>();

  return useMemo(
    () => ({
      dark: theme.dark,
      colors: {
        text: theme.colors.text,
        background: theme.colors.background,
        notification: theme.colors.notification,
        card: theme.colors.surface,
        primary: theme.colors.primary,
        border: theme.colors.accent,
      },
    }),
    [theme]
  );
};

export default function App() {
  const theme = useNavigationTheme();
  return (
    <NavigationContainer {...{ theme }}>
      <RootStack.Navigator>
        <RootStack.Screen name="Recipes" component={RecipesScreen} />
        <RootStack.Screen name="RecipeAdd" component={RecipeAdd} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
