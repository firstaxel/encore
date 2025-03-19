import type { AuthConfig, AuthResponse, StackUser, TokenStore } from './types';

export class AuthClient {
  private baseUrl = 'https://api.stack-auth.com/api/v1';
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  private getHeaders(token: string) {
    return {
      'x-stack-access-type': 'server',
      'x-stack-project-id': this.config.projectId,
      'x-stack-secret-server-key': this.config.secretKey,
      'x-stack-access-token': token,
    };
  }

  async getUser(tokens: TokenStore): Promise<AuthResponse<StackUser>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.getHeaders(tokens.accessToken),
      });

      if (response.status === 200) {
        const data = (await response.json()) as StackUser;
        return { success: true, data };
      }

      return {
        success: false,
        error: `Authentication failed: ${response.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
