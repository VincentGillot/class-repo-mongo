import * as bcrypt from "bcrypt";

export abstract class Password {
  static async hashPlainPassword(plainPassword: string) {
    return bcrypt.hash(plainPassword, 10);
  }

  static async isSamePassword(receivedPassword: string, userPassword: string) {
    return bcrypt.compare(receivedPassword, userPassword);
  }

  static isValidPassword(plainPassword: string) {
    return plainPassword.length > 8;
  }
}
