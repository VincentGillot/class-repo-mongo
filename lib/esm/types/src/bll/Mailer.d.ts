export declare class Mailer {
    private transport;
    private sender;
    constructor();
    sendMail({ email, subject, html, }: {
        email: string;
        subject: string;
        html: any;
    }): Promise<void>;
    forgotPassword({ email, token, }: {
        email: string;
        token: string;
    }): Promise<void>;
    emailValidation({ email, token, }: {
        email: string;
        token: string;
    }): Promise<void>;
    send2FACode({ email, code }: {
        email: string;
        code: number;
    }): Promise<void>;
}
//# sourceMappingURL=Mailer.d.ts.map