import { sendResponse } from "../utils/sendResponse.js";

export const getUserInfo = (req, res) => {
  return sendResponse(res, 200, req.user);
};
