import mongoose, { Schema } from "mongoose";

const auditLogSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        action: {
            type: String,
            required: true // if user role get updated then delete transection section
        },
        details: {
            type: String,
            required: true
        },
        ipAddress: {
            type: String
        }
    },
    { timestamps: true }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);