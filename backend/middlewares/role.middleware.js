import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const checkRole = (roles) => {
    return asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            throw new ApiError(403, "You do not have permission to perform this action");
        }
        next();
    });
};