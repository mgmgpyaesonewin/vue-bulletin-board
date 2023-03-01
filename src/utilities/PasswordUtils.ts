/* eslint-disable require-jsdoc */
import * as bcrypt from 'bcryptjs';

export class PasswordUtils {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
