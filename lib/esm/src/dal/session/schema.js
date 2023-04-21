import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
export const SessionSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    remoteAddress: {
        type: String,
        default: null,
    },
    ip: {
        type: String,
        default: null,
    },
    userAgent: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
});
