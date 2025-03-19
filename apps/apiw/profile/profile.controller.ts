import { APIError, api } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import type { ProfileResponse, UserProfile } from './profile.interface';
import ProfileService from './profile.service';

export const count = api(
  { expose: true, method: 'GET', path: '/count/profiles' },
  async (): Promise<ProfileResponse> => {
    try {
      const result = await ProfileService.count();
      return { success: true, result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || 'Error counting existing users'
      );
    }
  }
);

export const create = api(
  { expose: true, method: 'POST', auth: true, path: '/profile' },
  async (data: UserProfile): Promise<ProfileResponse> => {
    try {
      if (!data.fullName) {
        throw APIError.invalidArgument('Missing fields');
      }

      const auth = getAuthData();

      if (!auth) {
        throw APIError.unauthenticated('Unauthorized');
      }

      const result = await ProfileService.create(auth?.userID, data);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || 'Error creating the user');
    }
  }
);
