import * as schema from '@repo/database/schema/schema';
import { eq } from '@repo/database/db.edge';
import { orm } from '../database';
import type { ProfileResponse, UserProfile } from './profile.interface';

const ProfileService = {
  count: async (): Promise<number> => {
    return await orm.$count(schema.profiles);
  },

  create: async (
    stackId: string,
    data: UserProfile
  ): Promise<ProfileResponse> => {
    const [profile] = await orm
      .insert(schema.profiles)
      .values({
        ...data,
        userId: stackId,
      })
      .returning();
    return {
      success: true,
      result: profile,
    };
  },

  update: async (
    stackId: string,
    data: Partial<UserProfile>
  ): Promise<ProfileResponse> => {
    const user = await orm.query.profiles.findFirst({
      where: (profile, { eq }) => eq(profile.userId, stackId),
    });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    const [updated] = await orm
      .update(schema.profiles)
      .set(data)
      .where(eq(schema.profiles, stackId))
      .returning();
    return {
      success: true,
      result: updated,
    };
  },

  findOne: async (stackId: string): Promise<ProfileResponse> => {
    const user = await orm.query.profiles.findFirst({
      where: (profile, { eq }) => eq(profile.userId, stackId),
    });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return {
      success: true,
      result: user,
    };
  },

  delete: async (stackId: string): Promise<ProfileResponse> => {
    const user = await orm.query.profiles.findFirst({
      where: (profile, { eq }) => eq(profile.userId, stackId),
    });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    await orm
      .delete(schema.profiles)
      .where(eq(schema.profiles, stackId))
      .returning();
    return {
      success: true,
      result: 'User deleted successfully',
    };
  },
};

export default ProfileService;
