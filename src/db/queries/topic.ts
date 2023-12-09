import { db } from '@/db';
import type { Topic } from '@prisma/client';

export async function fetchAllTopics(): Promise<Topic[]> {
  return db.topic.findMany();
}
