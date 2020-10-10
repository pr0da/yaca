const fetch = require('node-fetch');

const GITHUB_API_URL = 'https://github.com/login/oauth/access_token';

exports.handler = async (event, context) => {
  const {
    GITHUB_CLIENT_ID: clientId,
    GITHUB_CLIENT_SECRET: clientSecret,
  } = process.env;

  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    code: event.queryStringParameters.code,
  };

  const result = await fetch(GITHUB_API_URL, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await result.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
