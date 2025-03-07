import { Router } from "express";
import { createUrl, deleteUrl, getAllUrl, getUrl } from "../controllers/short-url.controller";
const router = Router();

router.post("/short-url", createUrl);
router.get("/short-url", getAllUrl);
router.get("/short-url/:id", getUrl);
router.delete("/short-url/:id", deleteUrl);

export default router;