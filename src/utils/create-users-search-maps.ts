import { IUser } from '../types'
const users: [IUser] = require('../data/users.json')

const createUsersSearchMaps = () => {
  const userFields = Object.keys(users[0])

  const usersSearchMapsMap = new Map<string, Map<string | number | boolean, number[]>>()

  const fullDataByUsersIdMap = new Map<number, IUser>()

  const fullUsersDataByOrganizationIdMap = new Map<number, IUser[]>()

  userFields.forEach(key => usersSearchMapsMap.set(key, new Map<string | number | boolean, number[]>()))

  users.forEach(user => {
    Object.keys(user).forEach(key => {
      // create user by id lookup map
      if (key === '_id') fullDataByUsersIdMap?.set(user._id, user)

      // create users by organization_id lookup map
      if (key === 'organization_id') {
        const existingUsersArray: IUser[] | undefined = fullUsersDataByOrganizationIdMap.get(user.organization_id)
        existingUsersArray !== undefined
          ? fullUsersDataByOrganizationIdMap.set(user.organization_id, [...existingUsersArray, user])
          : fullUsersDataByOrganizationIdMap?.set(user.organization_id, [user])
      }

      // create user search fields to ids lookup map
      const searchByKeyMap = usersSearchMapsMap.get(key)
      const existingValuesArray: number[] | undefined = searchByKeyMap?.get(user[key])
      existingValuesArray !== undefined
        ? searchByKeyMap?.set(user[key], [...existingValuesArray, user._id])
        : searchByKeyMap?.set(user[key], [user._id])
    })
  })

  return { usersSearchMapsMap, fullDataByUsersIdMap, fullUsersDataByOrganizationIdMap }
}

export { createUsersSearchMaps }
