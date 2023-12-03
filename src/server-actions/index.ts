'use server';

import * as auth from '@/auth';
import { db } from '@/db';
import { OAuthProviderType } from 'next-auth/providers';

type SigInProvider = OAuthProviderType;

export async function signIn(provider: SigInProvider = 'github') {
  const user = await db.user.findFirst();
  const account = await db.account.findFirst();
  console.log(user);
  console.log(account);

  return auth.signIn(provider);
}

export async function signOut() {
  return auth.signOut();
}
