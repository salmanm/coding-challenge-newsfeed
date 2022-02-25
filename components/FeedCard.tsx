import Link from 'next/link';
import Card from './Card';

const map: Record<FeedType, string> = {
  user: '/users',
  project: '/projects',
  announcement: '/announcements',
};

enum FeedType {
  user = 'user',
  project = 'project',
  announcement = 'announcement',
}

type Props = {
  type: FeedType;
  feed: Feed;
};

type Feed = {
  id: number;
  title: string;
};

export default function FeedCard({ feed, type }: Props) {
  return (
    <Card>
      <Link href={`${map[type]}/${feed.id}`}>{feed.title}</Link>
    </Card>
  );
}
