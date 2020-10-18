import { StackScreenProps } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import type { RootStackParamList } from '../../app/Root';
import RecipeInfoForm from './components/RecipeInfoForm';
import * as recipesSlice from '../recipes/recipesSlice';
import { Button } from 'react-native-paper';

interface Props extends StackScreenProps<RootStackParamList, 'RecipeAdd'> {}

export type RecipeAddParamList = {
  Info: undefined;
  Ingredients: undefined;
  Steps: undefined;
};

const Tab = createMaterialTopTabNavigator<RecipeAddParamList>();

export interface RecipeFormValues {
  title: string;
}

export const RecipeAdd: React.FC<Props> = (props) => {
  const { navigation } = props;
  const form = useForm<RecipeFormValues>({
    defaultValues: {
      title: '',
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (values: RecipeFormValues) => {
    dispatch(
      recipesSlice.recipeAdded({
        id: uuid(),
        ...values,
      })
    );
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Button color={tintColor} onPress={form.handleSubmit(onSubmit)}>
          Save
        </Button>
      ),
    });
  }, []);

  return (
    <FormProvider {...form}>
      <Tab.Navigator initialRouteName="Info">
        <Tab.Screen
          name="Info"
          component={RecipeInfoForm}
          options={{ tabBarLabel: 'Info' }}
        />
        <Tab.Screen
          name="Ingredients"
          component={View}
          options={{ tabBarLabel: 'Ingredients' }}
        />
        <Tab.Screen
          name="Steps"
          component={View}
          options={{ tabBarLabel: 'Steps' }}
        />
      </Tab.Navigator>
    </FormProvider>
  );
};

export default RecipeAdd;
