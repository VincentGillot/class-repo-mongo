import { ITestSchema } from "./type";
import { GenericDocumentClass } from "class-repo-mongo";

export class Test extends GenericDocumentClass<ITestSchema> {
  get _id() {
    return this.document._id.toString();
  }
  get key() {
    return this.document.key;
  }

  public async delete() {
    await this.deleteModel();
  }
}
