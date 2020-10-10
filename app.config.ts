import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  extra: {
    githubClientId: process.env.REACT_NATIVE_GITHUB_CLIENT_ID,
    authApiUrl: process.env.REACT_NATIVE_AUTH_API_URL,
  },
});
