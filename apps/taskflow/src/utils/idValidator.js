import { isValidObjectId } from "mongoose";
import AppError from "./AppError.js";

export const validateIds = (idsMap) => {
  for (const [name, id] of Object.entries(idsMap)) {
    if (!isValidObjectId(id)) {
      throw new AppError(`Invalid ${name} ID format`, 400);
    }
  }
};
