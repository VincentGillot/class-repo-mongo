import * as bcrypt from "bcrypt";
export class Password {
    static async hashPlainPassword(plainPassword) {
        return bcrypt.hash(plainPassword, 10);
    }
    static async isSamePassword(receivedPassword, userPassword) {
        return bcrypt.compare(receivedPassword, userPassword);
    }
    static isValidPassword(plainPassword) {
        return plainPassword.length > 8;
    }
}
