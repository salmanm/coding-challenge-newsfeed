import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { useAuth } from 'context/auth';

const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

type QueryData = {
  users: {
    id: number;
    name: string;
  }[];
};

export default function Home() {
  const { isLoggedIn, login } = useAuth();
  const { data } = useQuery<QueryData>(USERS_QUERY);

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>Hello there!</h1>
      <p>Your future newsfeed goes to this page. Or not, you decide 🤷</p>
      <span>Check out these pages:</span>
      <ul>
        <li>
          Project <Link href="/projects/10">Blue Onion Labs</Link>
        </li>
        <li>
          User <Link href="/users/11">Cai Burris</Link>
        </li>
      </ul>
      <div>
        <Label htmlFor="users">Login as</Label>
        <select id="users" onChange={e => login(+e.target.value)}>
          <option value="">Select a user to impersonate</option>
          {data?.users.map(u => (
            <option key={`${u.id}`} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
      <Row>{isLoggedIn && <Link href="/feeds">See feeds</Link>}</Row>
    </Layout>
  );
}

const Label = styled.label`
  margin-right: ${({ theme }) => theme.space[1]};
`;

const Row = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
`;
