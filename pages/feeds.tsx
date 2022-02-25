import { useQuery, gql } from '@apollo/client';
import Layout from 'components/Layout';
import FeedCard from 'components/FeedCard';
import styled from 'styled-components';
import { useState } from 'react';

const FEED_QUERY = gql`
  query feeds($type: FeedType) {
    feeds(type: $type) {
      id
      title
    }
  }
`;

type Feed = {
  id: number;
  title: string;
};

type QueryData = {
  feeds: Feed[];
};

enum FeedType {
  user = 'user',
  project = 'project',
  announcement = 'announcement',
}

type QueryVars = {
  type: FeedType;
};

const tabs: { id: FeedType; title: string }[] = [
  { id: FeedType.user, title: 'User' },
  { id: FeedType.project, title: 'Project' },
  { id: FeedType.announcement, title: 'Announcement' },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<FeedType>(tabs[0].id);

  const { data } = useQuery<QueryData, QueryVars>(FEED_QUERY, {
    variables: { type: activeTab },
    fetchPolicy: 'no-cache',
  });

  return (
    <Layout>
      <Tabs>
        {tabs.map(t => (
          <Tab key={t.id} onClick={() => setActiveTab(t.id)}>
            {t.title}
          </Tab>
        ))}
      </Tabs>

      <FeedContainer>
        {data?.feeds?.map(f => (
          <FeedCard key={`${activeTab}-${f.id}`} feed={f} type={activeTab} />
        ))}
      </FeedContainer>
    </Layout>
  );
}

const Tabs = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const Tab = styled.button`
  display: flex;
  margin-right: ${({ theme }) => theme.space[1]};
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
