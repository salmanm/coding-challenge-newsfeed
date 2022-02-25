import jwt from 'jsonwebtoken';
import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from './resolvers';
import db, { UserRow } from './db';

export type Context = {
  user: UserRow;
};

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  enum Fellowship {
    founders
    angels
    writers
    all
  }

  type Announcement {
    id: Int!
    fellowship: Fellowship!
    title: String!
    body: String!
    created_ts: String!
    updated_ts: String!
  }

  enum FeedType {
    user
    project
    announcement
  }

  type Feed {
    id: Int!
    title: String!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    users: [User]!
    feeds(type: FeedType): [Feed]!
    announcement(id: Int!): Announcement!
  }
`;

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.substring(7);
    const decoded = jwt.verify(token, 'dummy-keyyyy'); // key from ssm or some secure store

    if (!decoded) {
      throw new Error('Unauthorized');
    }

    const user = await db.getOne('SELECT * FROM users WHERE id = ?', [
      decoded.sub,
    ]);

    return { user };
  },
});
