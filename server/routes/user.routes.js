const router = require("express").Router();

const { userCtrl } = require("#controllers");
const { authenticateToken, authenticateAdmin } = require("#middlewares");

router.get(
  "/users",
  authenticateToken,
  authenticateAdmin,
  userCtrl.getUsers
);
router.get("/user/:id", authenticateToken, userCtrl.getUser);
router.post("/user", authenticateToken, authenticateAdmin, userCtrl.createUser);
router.put(
  "/user/:id",
  authenticateToken,
  userCtrl.updateUser
);
router.delete(
  "/user/:id",
  authenticateToken,
  authenticateAdmin,
  userCtrl.deleteUser
);

module.exports = router;
