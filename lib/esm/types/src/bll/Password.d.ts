export declare abstract class Password {
    static hashPlainPassword(plainPassword: string): Promise<string>;
    static isSamePassword(receivedPassword: string, userPassword: string): Promise<boolean>;
    static isValidPassword(plainPassword: string): boolean;
}
//# sourceMappingURL=Password.d.ts.map