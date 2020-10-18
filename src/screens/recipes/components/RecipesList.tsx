import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as recipesSlice from '../recipesSlice';
import { FlatList } from 'react-native';
import RecipeListItem from './RecipeListItem';

interface Props {}

export const RecipesList: React.FC<Props> = (props) => {
  const recipes = useSelector(recipesSlice.selectIds);

  return (
    <FlatList<React.ReactText>
      data={recipes}
      renderItem={({ item }) => <RecipeListItem recipeId={item} />}
      keyExtractor={(item) => String(item)}
    />
  );
};

export default RecipesList;
