import React from 'react';
import { useTypedController } from '@hookform/strictly-typed';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import type { RecipeFormValues } from '../RecipeAdd';
import Box from 'components/Box';

interface Props {
  defaultValue: string;
  loading?: boolean;
}

export const RecipeInfoForm: React.FC<Props> = (props) => {
  const Controller = useTypedController<RecipeFormValues>({});

  return (
    <Box p="m">
      <Controller
        name="title"
        render={({ onBlur, value, onChange }) => (
          <TextInput
            label="Title"
            multiline
            value={value}
            onChangeText={onChange}
            {...{ onBlur }}
          />
        )}
      />
    </Box>
  );
};

export default RecipeInfoForm;
