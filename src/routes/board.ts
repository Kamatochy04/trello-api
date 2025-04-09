import express from "express";

import {
  getOne,
  getAll,
  updata,
  deleted,
  create,
} from "../services/boardService";

const router = express.Router();

router.post("/create", create);
router.delete("/delet", deleted);
router.put("/updata", updata);
router.get("/getAll", getAll);
router.get("/get/:id", getOne);

export default router;
