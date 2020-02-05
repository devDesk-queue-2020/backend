const db = require('../../dbConfig')
const Users = require('../user-models')

beforeEach(async () => {
  await db('users').truncate()
})

describe('Users model', () => {
  describe('getAllUsers()', () => {
    it('returns all users', async () => {

      const returnData = await Users.getAllUsers()
      expect(returnData).length > 1
    })

    it('inserts the Users correctly', async () => {
      const returnData = await Users.addUser({ first_name: "Nicki", last_name: "Becki", username: "Nicki", email: "email@email.com", role: "Student", password: "xee" })
      expect(returnData).toMatchObject({ first_name: "Nicki", last_name: "Becki", username: "Nicki", email: "email@email.com", role: "Student" })
    })
  })
})
