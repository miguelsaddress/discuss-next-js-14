'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { paths } from '@/paths';
import { searchPosts } from '@/server-actions';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('term') || '');

  const updateTermQueryParam = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setTerm(value);
    router.push(paths.postSearch(value));
  };

  return (
    <form action={searchPosts}>
      <Input
        id="search"
        name="search"
        type="search"
        placeholder="Search..."
        value={term}
        onChange={updateTermQueryParam}
      />
    </form>
  );
}
