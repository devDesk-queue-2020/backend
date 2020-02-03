const router = require("express").Router();
const User = require("../database/models/user-models");

function makeToken(user) {
  
    const payload = {
      sub: user.id,
      username: user.username,
      department: user.derpartment
    }

    const options = {
      expiresIn: '1d',
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'thesecret',
      options,
    )
    return token
}

module.exports = router;
