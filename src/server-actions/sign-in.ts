'use server';

import * as auth from '@/auth';
import { OAuthProviderType } from 'next-auth/providers';

type SigInProvider = OAuthProviderType;

export async function signIn(provider: SigInProvider = 'github') {
  return auth.signIn(provider);
}
