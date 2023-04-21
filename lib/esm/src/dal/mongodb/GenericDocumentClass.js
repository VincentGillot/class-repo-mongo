/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template U Schema object type
 *
 */
export class GenericDocumentClass {
    document;
    constructor(document) {
        this.document = document;
    }
    toObject() {
        return this.document.toObject();
    }
    async save() {
        return await this.document.save();
    }
    async update(item, options) {
        return await this.document.updateOne(item, { ...options });
    }
    async deleteModel() {
        return await this.document.deleteOne();
    }
}
