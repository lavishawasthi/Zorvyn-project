import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AuditLog } from "../models/auditLog.model.js";

const createLog = async (userId, action, details, ip) => {
    try {
        await AuditLog.create({
            user: userId,
            action,
            details,
            ipAddress: ip || "N/A"
        });
    } catch (error) {
        console.error("Audit Log Error:", error);
    }
};

const getAuditLogs = asyncHandler(async (req, res) => {
    const logs = await AuditLog.find()
        .populate("user", "fullName email role")
        .sort({ createdAt: -1 })
        .limit(100);

    return res.status(200).json(
        new ApiResponse(200, logs, "Audit logs retrieved successfully")
    );
});

export { createLog, getAuditLogs };