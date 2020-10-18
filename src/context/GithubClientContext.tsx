import React from 'react';
import { Octokit } from '@octokit/rest';
import { createContext, useContext, useMemo } from 'react';
import { useAuthContext } from './AuthContext';

const GithubClientContext = createContext<Octokit>(new Octokit());

export function Provider(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const { userToken } = useAuthContext();
  const client = useMemo(() => {
    return new Octokit({
      auth: userToken,
    });
  }, [userToken]);

  return (
    <GithubClientContext.Provider value={client}>
      {children}
    </GithubClientContext.Provider>
  );
}

export function useGithubClient() {
  return useContext(GithubClientContext);
}
