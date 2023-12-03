import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing Github OAuth credentials');
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // called whenever we verify who our user is in the app
    // mey be unnecessary, depending on a bug resolution in nextAuth
    // In the bug, the user does not properly get the id assigned to it
    async session({ session, user }) {
      if (session && user) {
        if (!session.user) {
          session.user = { id: '' };
        }
        session.user.id = user.id;
      }

      return session;
    },
  },
});

// See how to integrate office auth with JWT
// https://medium.com/simform-engineering/office-365-login-in-next-js-using-nextauth-js-beb1f18e05d8
