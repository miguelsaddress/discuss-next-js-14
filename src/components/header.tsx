import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { auth } from '@/auth';
import { paths } from '@/paths';
import { signIn, signOut } from '@/server-actions';

export default async function Header() {
  const session = await auth();

  const user = session?.user;
  const isUserSignedIn = !!user;
  const imageSrc = user?.image || undefined;

  const signInAction = signIn.bind(null, 'github');

  const authContent = isUserSignedIn ? (
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
  ) : (
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

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.home()} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          {/* Todo when we have posts to search... */}
          <Input />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}