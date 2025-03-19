import { APIError, Gateway, type Header } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import { AuthClient } from './sdk';
import { secret } from 'encore.dev/config';

const authClient = new AuthClient({
  projectId: secret('stackProjectId')(),
  secretKey: secret('stackSecretKey')(),
});

interface AuthParams {
  auth: Header<string>;
}

interface AuthData {
  userID: string;
  imageUrl: string | null;
  emailAddress: string | null;
}

export const myAuthHandler = authHandler(
  async (params: AuthParams): Promise<AuthData> => {
    const authHeader = params.auth;
    const [accessToken, refreshToken] = authHeader?.split(':') ?? [null, null];

    if (!authHeader || !accessToken || !refreshToken) {
      throw APIError.unauthenticated('no token provided');
    }

    const result = await authClient.getUser({
      accessToken,
      refreshToken,
    });

    if (!result.success || !result.data) {
      throw APIError.unauthenticated('invalid token');
    }

    return {
      userID: result.data.id,
      imageUrl: result.data.profile_image_url ?? null,
      emailAddress: result.data.primary_email ?? null,
    };
  }
);

export const mygw = new Gateway({ authHandler: myAuthHandler });
