const { JsonWebTokenError, verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const mcid = req.cookies.mcid;
    if (!mcid) throw new JsonWebTokenError("Token is undefined!");
    const payload = verify(mcid, process.env.JWT_SECRET);
    req.uid = payload.uid;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};
