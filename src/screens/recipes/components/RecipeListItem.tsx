import React from 'react';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as recipesSlice from '../recipesSlice';
import type { RootState } from '../../../app/rootReducer';

interface Props {
  recipeId: React.ReactText;
}

const RecipeListItem: React.FC<Props> = (props) => {
  const { recipeId } = props;
  const recipe = useSelector((state: RootState) =>
    recipesSlice.selectById(state, recipeId)
  );
  return <List.Item title={recipe?.title} />;
};

RecipeListItem.displayName = 'RecipeListItem';

export default RecipeListItem;
