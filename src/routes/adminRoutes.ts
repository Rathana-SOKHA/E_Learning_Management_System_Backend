import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("ADMIN"),
  (req: Request, res: Response) => {
    res.json({
      message: "Welcome Admin Page",
    });
  },
);

export default router;
