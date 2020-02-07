const jwt = require("jsonwebtoken");
const secret = require("../secretConfig");


function auth(req, res, next) {
  const token = req.headers.authorization;
  // || "thesecret",

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Token invalid! Access denied!"
        })
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

function helperAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      secret,
      { audience: "staffHelper" },
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "token bad" });
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

module.exports = {
  auth,
  helperAuth
};
