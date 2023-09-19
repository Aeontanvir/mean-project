const express = require("express");
const router = express.Router();
const ReportCtrl = require("../../controllers/report.controller")
const authTokenCheck = require("../../auth/authTokenCheck")
const jwt = require("jsonwebtoken")

router.get(`/last-project`, authTokenCheck, ReportCtrl.getLastProject);
router.get(`/last-cost`, authTokenCheck, ReportCtrl.getLastCost);
router.get(`/project-count`, authTokenCheck, ReportCtrl.getProjectCount);
router.get(`/cost-count`, authTokenCheck, ReportCtrl.getCostCount);

module.exports = router