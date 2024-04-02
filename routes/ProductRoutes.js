import express from "express";
import {
  addPprFittings,
  addPprPipes,
  getAllPprFittings,
  getAllPprPipes,
  getPprFittings,
  getPprPipes,
  removePprFittings,
  removePprPipes,
} from "../controllers/PPRController.js";
import {
  addPexAdapters,
  addPexPipes,
  getAllPexAdapters,
  getAllPexPipes,
  getPexAdapters,
  getPexPipes,
  removePexAdapters,
  removePexPipes,
} from "../controllers/PEXController.js";

const router = express.Router();

// PPR
// PPR PIPES
router.get("/all-ppr-pipes", getAllPprPipes);
router.get("/ppr-pipes", getPprPipes);
router.post("/ppr-pipes", addPprPipes);
router.post("/remove-ppr-pipes", removePprPipes);

// PPR FITTINGS
router.get("/all-ppr-fittings", getAllPprFittings);
router.get("/ppr-fittings", getPprFittings);
router.post("/ppr-fittings", addPprFittings);
router.post("/remove-ppr-fittings", removePprFittings);

// PEX
// PEX PIPES
router.get("/all-pex-pipes", getAllPexPipes);
router.get("/pex-pipes", getPexPipes);
router.post("/pex-pipes", addPexPipes);
router.post("/remove-pex-pipes", removePexPipes);

// PPR FITTINGS
router.get("/all-pex-adapters", getAllPexAdapters);
router.get("/pex-adapters", getPexAdapters);
router.post("/pex-adapters", addPexAdapters);
router.post("/remove-pex-adapters", removePexAdapters);

export default router;
