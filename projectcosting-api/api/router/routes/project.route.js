const express = require("express");
const router = express.Router();
const ProjectCtrl = require("../../controllers/project.controller")
const authTokenCheck = require("../../auth/authTokenCheck")
const jwt = require("jsonwebtoken")

router.get(``, authTokenCheck, ProjectCtrl.getAll);
router.get(`/:id`, authTokenCheck, ProjectCtrl.getOne);
router.post(``, authTokenCheck, ProjectCtrl.create);
router.put(`/:id`, authTokenCheck, ProjectCtrl.update);
router.delete(`/:id`, authTokenCheck, ProjectCtrl.removeOne);

module.exports = router