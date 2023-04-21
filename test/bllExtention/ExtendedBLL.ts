import { BLL } from "class-repo-mongo";
import { TestRepo } from "../dalExtension/test/TestRepo";

export class ExtendedBLL extends BLL {
  static test = new TestRepo();
}
