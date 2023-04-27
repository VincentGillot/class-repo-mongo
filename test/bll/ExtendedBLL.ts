import { BLL, Mailer, MainBLLType } from "class-repo-mongo";
import { TestBLL } from "./test/TestBLL";
import mongoose from "mongoose";
import { ITestSchema } from "../dal/test/type";
import { TestModelType } from "../dal/test/type";
import { TestSchema } from "../dal/test/schema";

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

export class ExtendedBLL<BLLType = never> extends BLL {
  test: TestBLL<BLLType>;

  constructor(conn: mongoose.Connection) {
    super(conn, {
      mailer: ExtendedMailer,
    });

    const testModel = this.modelFactory<ITestSchema, TestModelType>(
      "Test",
      TestSchema
    );
    this.test = new TestBLL(testModel, this as unknown as MainBLLType<BLLType>);
  }
}
