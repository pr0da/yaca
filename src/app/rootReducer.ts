import { combineReducers } from '@reduxjs/toolkit';
import recipesSlice from '../screens/recipes/recipesSlice';

const rootReducer = combineReducers({
  recipes: recipesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
