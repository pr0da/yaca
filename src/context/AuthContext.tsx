import React from 'react';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

type Action<T extends string, P = undefined> = P extends undefined
  ? {
      type: T;
    }
  : {
      type: T;
      payload: P;
    };

type AuthAction =
  | Action<'RESTORE_TOKEN', string | null>
  | Action<'SIGN_IN', string>
  | Action<'SIGN_OUT'>;

type AuthContext = AuthState & {
  signIn: () => void;
  signOut: () => void;
};

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const AuthContext = React.createContext<AuthContext>({
  ...initialState,
  signIn: () => null,
  signOut: () => null,
});

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.payload,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    default:
      return prevState;
  }
};

const { githubClientId } = Constants.manifest.extra ?? {};

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${githubClientId}`,
};

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: githubClientId,
      // https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
      scopes: ['repo'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: 'your.app://redirect',
      }),
    },
    discovery
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      console.log(userToken);
      dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      ...state,
      signIn: async () => {
        const result = await promptAsync();
        if (result.type === 'success') {
          await SecureStore.setItemAsync('userToken', result.params.code);
          dispatch({ type: 'SIGN_IN', payload: result.params.code });
        }
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
        SecureStore.deleteItemAsync('userToken');
      },
    }),
    [state, promptAsync, dispatch]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
