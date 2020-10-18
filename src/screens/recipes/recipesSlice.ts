import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/rootReducer';

interface Recipe {
  id: string;
  title: string;
}

const recipesAdapter = createEntityAdapter<Recipe>({
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesAdapter.getInitialState(),
  reducers: {
    recipeAdded: recipesAdapter.addOne,
  },
});

export const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = recipesAdapter.getSelectors<RootState>((state) => state.recipes);

export const { recipeAdded } = recipesSlice.actions;

export default recipesSlice.reducer;
