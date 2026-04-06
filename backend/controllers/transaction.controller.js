import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";
import { createLog } from "./audit.controller.js";
import mongoose from "mongoose";

const createTransaction = asyncHandler(async (req, res) => {
    const { description, amount, type, category, date } = req.body;

    if ([description, type, category].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const transaction = await Transaction.create({
        description,
        amount,
        type,
        category,
        date: date || Date.now(),
        owner: req.user._id
    });

    await createLog(
        req.user._id,
        "TRANSACTION_CREATE",
        `Created ${type}: ${description} - ${amount}`,
        req.ip
    );

    return res.status(201).json(new ApiResponse(201, transaction, "Transaction recorded"));
});

const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ owner: req.user._id }).sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, transactions, "Transactions retrieved"));
});

const getTransactionSummary = asyncHandler(async (req, res) => {
    const stats = await Transaction.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(req.user._id) } },
        {
            $group: {
                _id: null,
                totalIncome: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
                totalExpense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                balance: { $subtract: ["$totalIncome", "$totalExpense"] },
                count: 1
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, stats[0] || { totalIncome: 0, totalExpense: 0, balance: 0, count: 0 }, "Summary retrieved"));
});

const deleteTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({ 
        _id: id, 
        owner: req.user._id 
    });

    if (!transaction) {
        throw new ApiError(404, "Transaction not found or unauthorized");
    }

    await createLog(
        req.user._id,
        "TRANSACTION_DELETE",
        `Deleted transaction: ${transaction.description} (${transaction.amount})`,
        req.ip
    );

    return res.status(200).json(new ApiResponse(200, {}, "Transaction deleted"));
});

export { 
    createTransaction, 
    getAllTransactions, 
    getTransactionSummary, 
    deleteTransaction 
};