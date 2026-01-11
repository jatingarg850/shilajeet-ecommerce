/**
 * Custom NextAuth Provider for Phone-based Authentication
 * This provider handles phone OTP authentication
 */

import type { Awaitable, User } from 'next-auth';
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface PhoneAuthUser extends User {
  phone?: string;
  phoneVerified?: boolean;
  authMethod?: 'phone' | 'email';
}

export const PhoneAuthProvider = (options: OAuthUserConfig<any>): OAuthConfig<any> => ({
  id: 'phone',
  name: 'Phone',
  type: 'oauth',
  authorization: { params: { prompt: 'login' } },
  profile(profile: any) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      phoneVerified: profile.phoneVerified,
      authMethod: 'phone',
    };
  },
  options,
});

/**
 * Helper function to create a phone-based session
 * Used after OTP verification
 */
export async function createPhoneSession(userId: string, phoneNumber: string) {
  return {
    user: {
      id: userId,
      phone: phoneNumber,
      authMethod: 'phone',
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  };
}
