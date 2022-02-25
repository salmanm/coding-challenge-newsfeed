import db, { UserRow } from '../../db';

export default async function users(): Promise<UserRow[]> {
  const users: UserRow[] = await db.getAll('SELECT * FROM users');

  if (!users?.length) {
    throw new Error(`No users found`);
  }

  return users;
}
