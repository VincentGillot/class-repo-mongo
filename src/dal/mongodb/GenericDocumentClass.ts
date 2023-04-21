import { QueryOptions, UpdateQuery } from "mongoose";
import { GenericDocumentType } from "./interfaces/Generics";

/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template U Schema object type
 *
 */
export class GenericDocumentClass<U> {
  protected document: GenericDocumentType<U>;

  constructor(document: GenericDocumentType<U>) {
    this.document = document;
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
