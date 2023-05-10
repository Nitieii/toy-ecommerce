const router = require("express").Router();

const { authenticationCtrl } = require("#controllers");

router.post("/login", authenticationCtrl.logIn);
router.post("/signup", authenticationCtrl.signUp);
router.post("/refresh_token", authenticationCtrl.refreshToken);

module.exports = router;
