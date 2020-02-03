const router = require("express").Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const UserDB = require("../database/models/user-models");
const { auth } = require("../middleware/authentication-middleware")

function makeToken(user) {
  
    const payload = {
      user_id: user.id,
      username: user.username,
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

router.post('/register', (req, res) => {
  const { first_name, last_name, username, email, password, roles } = req.body;

  const bcryptHash = bcrypt.hashSync(password, 10);

  const user = {
    first_name,
    last_name,
    username,
    email,
    password: bcryptHash,
    roles
  };

  UserDB.addUser(user)
    .then(saved => {
      res.status(201).json({
          success: "Successfully created new User",
          userData: {...user, password: "ENCRYPTED"}
      });
    })
    .catch(error => {
      res.status(500).json({
        error: "Server Error"
    });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  UserDB.findUserBy({ username })
    .first()
    .then(user => {    
      if (user && bcrypt.compareSync(password, user.password)) {

          const token = makeToken(user)

        res.status(200).json({ message: `Welcome ${user.username}!`, token: token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json({
          error: "Server Error"
      });
    });
});

router.get('/', auth, (req, res) => {
    UserDB.getAllUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error"
            })
        })
})

router.get('/:id', auth, (req, res) => {
    const { id } = req.params

    UserDB.findUserById(id)
        .then(user => {
            res.status(200).json({
                userData: user
            })
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error"
            })
        })
})

router.delete('/:id', auth, (req, res) => {
  const { id } = req.params

  UserDB.deleteUser(id)
      .then(user => {
          res.status(200).json({
              success: "User deleted"
          })
      })
      .catch(error => {
          res.status(500).json({
              error: "Server error"
          })
      })
})

router.put('/:id', auth, (req, res) => {
  const { id } = req.params
  const changes  = req.body

  UserDB.updateUser(id, changes)
      .then(user => {
          res.status(200).json({
              success: "User updated",
              newUserData: user
          })
      })
      .catch(error => {
          res.status(500).json({
              error: "Server error"
          })
      })
})

module.exports = router;

