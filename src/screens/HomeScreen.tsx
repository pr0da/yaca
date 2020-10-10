import React from 'react';
import { Text, Button, ScrollView } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import CenterView from '../components/CenterView';
import { useAuthContext } from '../context/AuthContext';

interface Props {}

const GET_VIEWER = gql`
  query {
    viewer {
      id
      name
      avatarUrl
      repositories(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

export const HomeScreen: React.FC<Props> = (props) => {
  const {} = props;
  const { userToken, signOut } = useAuthContext();
  const { loading, error, data, networkStatus } = useQuery(GET_VIEWER);
  return (
    <ScrollView style={{ flex: 1 }}>
      <CenterView>
        <Text>
          {loading && 'Fetching viewer...'}
          {error && `Error! ${JSON.stringify(error, null, 2)}`}
          {JSON.stringify(data, null, 2)}
        </Text>
        <Button
          title="Logout"
          onPress={() => {
            signOut();
          }}
        />
      </CenterView>
    </ScrollView>
  );
};

export default HomeScreen;
