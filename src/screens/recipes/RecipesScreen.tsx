import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import type { RootStackParamList } from '../../app/Root';
import RecipesList from './components/RecipesList';

interface Props extends StackScreenProps<RootStackParamList, 'Recipes'> {}

export const RecipesScreen: React.FC<Props> = (props) => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Appbar.Action
          icon="plus"
          color={tintColor}
          onPress={() => navigation.navigate('RecipeAdd')}
        />
      ),
    });
  }, []);

  return <RecipesList />;
};

export default RecipesScreen;
