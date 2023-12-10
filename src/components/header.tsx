import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { paths } from '@/paths';
import HeaderAuth from './header-auth';
import SearchInput from './search-input';
import { Suspense } from 'react';

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
          <Suspense>
            {/*
            When a component uses useSearchParams, it must be wrapped in a Suspense
            to avoid warning of de-opt to client side rendering
            */}
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
