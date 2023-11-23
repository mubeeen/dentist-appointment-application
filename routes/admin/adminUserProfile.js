const express = require("express");
const router = express.Router();

// import controllers
const {
	getAdminUsersByDept,
	getQuestionsByUser,
} = require("../../controllers/admin/adminUserProfile");

// import middlewares
const { verifyToken, isAdmin } = require("../../middlewares/auth");

// api routes
router.get("/admin/users", getAdminUsersByDept);
router.get("/admin/user-question", getQuestionsByUser);

module.exports = router;