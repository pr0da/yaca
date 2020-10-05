import React from 'react';
import { Button } from 'react-native';
import CenterView from '../components/CenterView';
import { useAuthContext } from '../context/AuthContext';

interface Props {}

export const SignInScreen: React.FC<Props> = (props) => {
  const {} = props;
  const { signIn } = useAuthContext();
  return (
    <CenterView>
      <Button
        title="Login"
        onPress={() => {
          signIn();
        }}
      />
    </CenterView>
  );
};

export default SignInScreen;
