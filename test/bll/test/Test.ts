import { ITestSchema } from "../../dal/test/type";
import { GenericDocumentClass } from "class-repo-mongo";

export class Test<BLLType> extends GenericDocumentClass<ITestSchema, BLLType> {
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
