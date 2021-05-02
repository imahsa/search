import { IUser } from '../types'
const users: [IUser] = require('../data/users.json')

const userFields = Object.keys(users[0])

const usersSearchMapsMap = new Map<string, Map<string | number | boolean, any>>()

const fullDataByUsersIdMap = new Map<number, Object>()

userFields.forEach(key => usersSearchMapsMap.set(key, new Map<string | number | boolean, [number]>()))

users.forEach(user => {
  Object.keys(user).forEach(key => {
    //will fill in each map
    if (key === '_id') {
      fullDataByUsersIdMap?.set(user._id, user)
    }
    let searchByKeyMap = usersSearchMapsMap.get(key)
    if (searchByKeyMap?.has(user[key])) {
      let existingValuesArray = searchByKeyMap.get(user[key])
      searchByKeyMap.set(user[key], [...existingValuesArray, user._id])
    } else {
      searchByKeyMap?.set(user[key], [user._id])
    }
  })
})

export { usersSearchMapsMap, fullDataByUsersIdMap }
