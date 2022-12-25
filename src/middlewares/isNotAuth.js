const { JsonWebTokenError, verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const mcid = req.cookies.mcid;
    if (!mcid) throw new JsonWebTokenError("Token is undefined!");
    verify(mcid, process.env.JWT_SECRET);
    return res.redirect("/home");
  } catch (error) {
    next();
  }
};
