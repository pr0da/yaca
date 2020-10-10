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

const { githubClientId, authApiUrl } = Constants.manifest.extra ?? {};

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${githubClientId}`,
};

let config = {
  clientId: githubClientId,
  redirectUri: makeRedirectUri({
    // For usage in bare and standalone
    native: 'your.app://redirect',
  }),
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/scopes-for-oauth-apps
  scopes: ['repo', 'user'],
};

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
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
          // exchange code for access token
          const response = await fetch(
            `${authApiUrl}/access-token?code=${result.params.code}`
          );
          const { access_token: accessToken } = await response.json();
          await SecureStore.setItemAsync('userToken', accessToken);
          dispatch({ type: 'SIGN_IN', payload: accessToken });
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
