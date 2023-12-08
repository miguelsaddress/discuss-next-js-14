import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input } from '@nextui-org/react';
import { paths } from '@/paths';
import HeaderAuth from './header-auth';

export default async function Header() {
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
          <Input id="search" name="search" type="search" placeholder="Search..." />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
