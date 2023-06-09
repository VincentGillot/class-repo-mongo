import mongoose, { QueryOptions, UpdateQuery } from "mongoose";
import { GenericDocumentType } from "./interfaces/Generics";
import { BLL } from "../../bll/BLL";
import { DAL } from "../DAL";
import { MainBLLType } from "../../API";

/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template U Schema object type
 *
 */
export class GenericDocumentClass<U, BLLType> {
  protected document: GenericDocumentType<U>;

  protected bll: MainBLLType<BLLType>;

  constructor(document: GenericDocumentType<U>, bll: MainBLLType<BLLType>) {
    this.document = document;
    this.bll = bll;
  }

  public toObject() {
    return this.document.toObject();
  }

  public async save() {
    return await this.document.save();
  }

  public async update(
    item: UpdateQuery<typeof this.document>,
    options?: QueryOptions
  ) {
    return await this.document.updateOne(item, { ...options });
  }

  public async deleteModel() {
    return await this.document.deleteOne();
  }
}
