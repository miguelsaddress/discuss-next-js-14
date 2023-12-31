'use client';

import { NavbarItem, Button, Avatar, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { signIn, signOut } from '@/server-actions';
import { useSession } from 'next-auth/react';

export default function HeaderAuth() {
  const session = useSession();

  const user = session?.data?.user;
  const imageSrc = user?.image || undefined;

  const signInAction = signIn.bind(null, 'github');
  const isUserAuthenticated = session.status === 'authenticated';
  const isSessionLoading = session.status === 'loading';

  if (isSessionLoading) {
    return null;
  }
  if (isUserAuthenticated) {
    return (
      <NavbarItem>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={imageSrc} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <form action={signOut}>
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </NavbarItem>
    );
  }

  return (
    <>
      <NavbarItem>
        <form action={signInAction}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={signInAction}>
          <Button type="submit" color="primary" variant="flat">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  );
}
