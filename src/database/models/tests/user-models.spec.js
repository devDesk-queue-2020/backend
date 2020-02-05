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

    it('returns a specific users correctly', async () => {
      await Users.addUser({ first_name: "Niklas", last_name: "Becker", username: "Niklas", email: "email@email.com", role: "Student", password: "xee" })
      const returnData = await Users.findUserById(1)
      expect(returnData).toMatchObject({ first_name: "Niklas", last_name: "Becker", username: "Niklas", email: "email@email.com", role: "Student"})
    })

    it('inserts the Users correctly', async () => {
      const returnData = await Users.addUser({ first_name: "Niklas", last_name: "Becker", username: "Niklas", email: "email@email.com", role: "Student", password: "xee" })
      expect(returnData).toEqual([1])
    })

    it('deletes the Users correctly', async () => {
      await Users.addUser({ first_name: "Niklas", last_name: "Becker", username: "Niklas", email: "email@email.com", role: "Student", password: "xee" })
      const returnData = await Users.deleteUser(1)
      expect(returnData).toEqual(1)
    })

    it('updates the Users correctly', async () => {
      await Users.addUser({ first_name: "Niklas", last_name: "Becker", username: "Niklas", email: "email@email.com", role: "Student", password: "xee" })
      await Users.updateUser(1, { first_name: "Jake", last_name: "Becker", username: "Niklas", email: "email@email.com", role: "Student", password: "xee" })
      const data = await Users.findUserById(1) 
      expect(data.first_name).toEqual('Jake')
      expect(data.last_name).toEqual('Becker')
    })
  })
})
