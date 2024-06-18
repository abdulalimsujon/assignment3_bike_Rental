import bcrypt from 'bcrypt';

export async function comparePasswords(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(plainTextPassword, hash);
    return result;
  } catch (err) {
    throw new Error('Error comparing passwords');
  }
}
