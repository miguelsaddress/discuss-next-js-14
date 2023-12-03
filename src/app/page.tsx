import { auth } from '@/auth';
import Profile from '@/components/profile';
import { signIn, signOut } from '@/server-actions';
import { Button } from '@nextui-org/react';

export default async function Home() {
  const signInAction = signIn.bind(null, 'github');
  const session = await auth();

  console.log({ session, user: session?.user });
  const loggedIn = session?.user;

  return (
    <div>
      <Profile />
      {loggedIn ? (
        <form action={signOut}>
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <form action={signInAction}>
          <Button type="submit">Sign In</Button>
        </form>
      )}
    </div>
  );
}
