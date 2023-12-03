'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  const user = session.data?.user;
  return <div>{JSON.stringify(user)}</div>;
}
