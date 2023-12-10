import { Skeleton } from '@nextui-org/react';
import type { Post } from '@prisma/client';
import { notFound } from 'next/navigation';

type Props = {};

export default async function PostShowSkeleton({}: Props) {
  return (
    <div className="m-4">
      <h1 className="my-2">
        <Skeleton className="h-8 w-80" />
      </h1>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  );
}
