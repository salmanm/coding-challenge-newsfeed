import { Context } from '../../server';
import db from '../../db';

type Args = {
  type: 'user' | 'project' | 'announcement';
};

type Feed = {
  id: number;
  title: string;
};

export default async function feeds(
  parent: unknown,
  { type }: Args,
  { user }: Context
): Promise<Feed[]> {
  let query: Promise<Feed[]> = Promise.resolve([]);

  if (user.fellowship === 'founders') {
    if (type === 'user') {
      query = db.getAll(
        `
          SELECT
            id,
            name AS title
          FROM users
          WHERE id <> ?
            AND (fellowship = ? OR fellowship = ?)
        `,
        [user.id, 'founders', 'angels']
      );
    } else if (type === 'project') {
      query = db.getAll(
        `
          SELECT
            id,
            name AS title
          FROM projects
        `
      );
    } else {
      query = db.getAll(`
        SELECT
          id,
          title
        FROM announcements
      `);
    }
  }

  if (user.fellowship === 'angels') {
    if (type === 'user') {
      query = db.getAll(
        `
          SELECT
            id,
            name AS title
          FROM users
          WHERE id <> ?
            AND (fellowship = ? OR fellowship = ?)
        `,
        [user.id, 'founders', 'angels']
      );
    } else if (type === 'project') {
      query = db.getAll(
        `
          SELECT
            id,
            name AS title
          FROM projects
        `
      );
    } else {
      query = db.getAll(`
        SELECT
          id,
          title
        FROM announcements
      `);
    }
  }

  const result = await query;

  return result;
}
