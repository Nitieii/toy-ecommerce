const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { User, RefreshToken } = require("#models");
const { catchAsync } = require("#utils");

const signUp = catchAsync(async (req, res) => {
  try {
    const { fullname, email, password: plainTextPassword } = req.body;

    const password = await argon2.hash(plainTextPassword);

    const user = await User.create({ fullname, email, password });

    // Generate token
    const access_token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refresh_token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET
    );

    const refresh = new RefreshToken({ token: refresh_token });
    await refresh.save();

    return res.send({
      status: "success",
      message: `User created successfully`,
      user,
      token: {
        access_token,
        refresh_token,
        expires_in: "1d"
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.send({
        status: "error",
        message: "Email already exists"
      });
    }

    return res.send({
      status: "error",
      message: error.message
    });
  }
});

const logIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.send({
      status: "error",
      message: "Email and password are required"
    });
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.send({
      status: "error",
      message: "Email or password is incorrect"
    });
  }

  // Check if password is correct
  if (await argon2.verify(user.password, password)) {
    // Generate token
    const access_token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refresh_token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET
    );

    const refresh = new RefreshToken({ token: refresh_token });
    await refresh.save();

    return res.send({
      status: "success",
      message: "Login successful",
      user,
      token: {
        access_token,
        refresh_token,
        expires_in: "1d"
      }
    });
  }

  throw new Error("Email or password is incorrect");
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.send({ status: "error", message: "Refresh token is undefined" });
  }

  const token = await RefreshToken.findOne({ token: refreshToken });

  if (!token) {
    return res.status(403).send("Invalid refresh token");
  }

  // Verify the refresh token
  const user = jwt.verify(refreshToken, process.env.JWT_SECRET);

  // Create new access token
  const access_token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.send({ status: "success", access_token });
});

module.exports = {
  signUp,
  logIn,
  refreshToken
};
