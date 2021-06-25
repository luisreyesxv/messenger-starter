const { User } = require("../db/models");
const jwt = require("jsonwebtoken");

const jwtVerifyUser = async (token, next) => {
  try {
    const payload = jwt.verify(token, process.env.SESSION_SECRET);
    const user = await User.findByPk(payload.id);

    return await user;
  } catch (err) {
    next(err);
  }
};

const jwtSignUser = (user) => {
  const token = jwt.sign(
    { id: user.dataValues.id },
    process.env.SESSION_SECRET,
    { expiresIn: 86400 }
  );

  return token;
};

module.exports = { jwtVerifyUser, jwtSignUser };
