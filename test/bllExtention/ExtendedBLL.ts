import { BLL, BLLConstructor, Mailer } from "class-repo-mongo";
import { TestRepo } from "../dalExtension/test/TestRepo";

class ExtendedMailer extends Mailer {
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
        <div>${email} - ${token}</div>
      </div>
      `,
    });
  }
}

class ExtendedBLL extends BLL {
  static test = new TestRepo();

  constructor({ customMailer }: BLLConstructor) {
    super({ customMailer });
  }
}

export const CustomBLL = new ExtendedBLL({ customMailer: ExtendedMailer });
