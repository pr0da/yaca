import React from 'react';
import { Text, Button } from 'react-native';
import CenterView from '../components/CenterView';
import { useAuthContext } from '../context/AuthContext';

interface Props {}

export const HomeScreen: React.FC<Props> = (props) => {
  const {} = props;
  const { userToken, signOut } = useAuthContext();
  return (
    <CenterView>
      <Text>{userToken}</Text>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </CenterView>
  );
};

export default HomeScreen;
