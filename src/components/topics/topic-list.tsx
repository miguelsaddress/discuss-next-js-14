'use server';

import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { paths } from '@/paths';
import type { Topic } from '@prisma/client';

type Props = {
  fetchData: () => Promise<Topic[]>;
};
export default async function TopicList({ fetchData }: Props) {
  const topics = await fetchData();

  const renderedTopics = topics.map((t, i) => {
    return (
      <div key={t.id}>
        <Link href={paths.topicShow(t.slug)}>
          <Chip color="warning" variant="shadow">
            {t.slug}
          </Chip>
        </Link>
      </div>
    );
  });
  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
}
