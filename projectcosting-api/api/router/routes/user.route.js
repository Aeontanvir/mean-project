const express = require("express");
const router = express.Router();
const UserCtrl = require("../../controllers/user.controller")

router.get(``, UserCtrl.getAll);
router.get(`/:id`, UserCtrl.getOne);
router.post(``, UserCtrl.create);
router.put(`/:id`, UserCtrl.update);
router.delete(`/:id`, UserCtrl.removeOne);
router.post(`/login`, UserCtrl.login);

module.exports = router