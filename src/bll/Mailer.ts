import * as nodemailer from "nodemailer";

export class Mailer {
  private transport;
  private sender;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: { user: process.env.MAILER_USER, pass: process.env.MAILER_PASS },
    });
    this.sender = '"Some Name" <noreply@email.es>"';
  }

  public async sendMail({
    email,
    subject,
    html,
  }: {
    email: string;
    subject: string;
    html: any;
  }) {
    this.transport.sendMail({
      from: this.sender,
      to: email,
      subject,
      html,
    });
  }

  public async forgotPassword({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) {
    await this.sendMail({
      email: email,
      subject: "Reset password",
      html: `
      <div>
        <div>Use this token and email to validate the user on the API. You can use a link to your endpoint or resolver.</div>
        <div>The token must come back to the API along with the email of the user that is resetting the password and the new password</div>
        <div>Once validated you can safely reset the password</div>
        <div>${email} - ${token}</div>
      </div>
      `,
    });
  }

  public async emailValidation({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) {
    await this.sendMail({
      email: email,
      subject: "Validate your account",
      html: `
      <div>
        <div>Use this token and email to validate the user on the API. You can use a link to your endpoint or resolver.</div>
        <div>The token must come back to the API along with the email of the user that is validating.</div>
        <div>${email} - ${token}</div>
      </div>
      `,
    });
  }

  public async send2FACode({ email, code }: { email: string; code: number }) {
    await this.sendMail({
      email: email,
      subject: "Two Factor Authentication Code",
      html: `
      <div>
        <div>This code must come back to the API along with the generated token.</div>
        <div>Usually the login redirects to another page wih the token set in state.</div>
        <div>Then the user receives the email and inputs the code there.</div>
        <div>The code and token are then sent to the API and validated.</div>
        <div>If the user reloads the page the token is lost and the login process restarts.</div>
        <div>${code}</div>
      </div>
      `,
    });
  }
}
