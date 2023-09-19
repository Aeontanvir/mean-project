const express = require("express");
const router = express.Router();
const ProjectRoute = require("./routes/project.route");
const CostRoute = require("./routes/cost.route");
const UserRoute = require("./routes/user.route");
const ReportRoute = require("./routes/report.route");

router.use('/projects', ProjectRoute)
router.use('/costs', CostRoute)
router.use('/users', UserRoute)
router.use('/reports', ReportRoute)

module.exports = router;