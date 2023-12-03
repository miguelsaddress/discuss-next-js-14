import { signIn, signOut } from '@/server-actions';
import { Button } from '@nextui-org/react';

export default function Home() {
  const signInAction = signIn.bind(null, 'github');
  return (
    <div>
      <form action={signInAction}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
