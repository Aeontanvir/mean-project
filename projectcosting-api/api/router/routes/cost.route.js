const express = require("express");
const router = express.Router();
const CostCtrl = require("../../controllers/cost.controller")

router.get(``, CostCtrl.getAll);
router.get(`/:id`, CostCtrl.getOne);
router.post(``, CostCtrl.create);
router.put(`/:id`, CostCtrl.update);
router.delete(`/:id`, CostCtrl.removeOne);

module.exports = router