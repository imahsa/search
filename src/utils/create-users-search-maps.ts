import { IUser } from '../types'
const users: [IUser] = require('../data/users.json')

const createUsersSearchMaps = () => {
  const userFields = Object.keys(users[0])

  const usersSearchMapsMap = new Map<string, Map<string | number | boolean, number[]>>()

  const fullDataByUsersIdMap = new Map<number, IUser>()

  const fullUsersDataByOrganizationIdMap = new Map<number, IUser[]>()

  userFields.forEach(key => usersSearchMapsMap.set(key, new Map<string | number | boolean, number[]>()))

  const createMapsWithExistingValues = ({ map, mapKey, value }) => {
    const existingValuesArray: number[] | undefined = map?.get(mapKey)
    existingValuesArray !== undefined ? map?.set(mapKey, [...existingValuesArray, value]) : map?.set(mapKey, [value])
  }

  users.forEach(user => {
    Object.keys(user).forEach(key => {
      // create user by id lookup map
      if (key === '_id') fullDataByUsersIdMap?.set(user._id, user)

      // create users by organization_id lookup map
      if (key === 'organization_id') {
        createMapsWithExistingValues({
          map: fullUsersDataByOrganizationIdMap,
          mapKey: user.organization_id,
          value: user,
        })
      }

      // create user search fields to ids lookup map
      const searchByKeyMap = usersSearchMapsMap.get(key)
      //handles flatting the fields that are of type array, i.e tags
      const mapKey = user[key]
      if (Array.isArray(mapKey)) {
        mapKey.forEach(key => {
          createMapsWithExistingValues({ map: searchByKeyMap, mapKey: key, value: user._id })
        })
      } else {
        createMapsWithExistingValues({ map: searchByKeyMap, mapKey, value: user._id })
      }
    })
  })

  return { usersSearchMapsMap, fullDataByUsersIdMap, fullUsersDataByOrganizationIdMap }
}

export { createUsersSearchMaps }
