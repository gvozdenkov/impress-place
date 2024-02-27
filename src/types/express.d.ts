import { UserId } from "./types";

declare global {
  namespace Express {
    interface Request {
      userId: UserId;
    }
  }
}
