import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0, "Amount cannot be negative"]
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
            lowercase: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true 
        },
        date: {
            type: Date,
            default: Date.now
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);