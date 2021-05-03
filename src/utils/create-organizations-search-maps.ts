import { type } from 'os'
import { IOrganization } from '../types'
const organizations: [IOrganization] = require('../data/organizations.json')

const createOrganizationSearchMaps = () => {
  const organizationFields = Object.keys(organizations[0])

  const organizationsSearchMapsMap = new Map<string, Map<string | number | boolean, number[]>>()

  const fullDataByOrganizationsIdMap = new Map<number, IOrganization>()

  organizationFields.forEach(key => organizationsSearchMapsMap.set(key, new Map<string | number | boolean, number[]>()))

  const createMapsWithExistingValues = ({ map, mapKey, value }) => {
    const existingValuesArray: number[] | undefined = map?.get(mapKey)
    existingValuesArray !== undefined ? map?.set(mapKey, [...existingValuesArray, value]) : map?.set(mapKey, [value])
  }

  organizations.forEach(organization => {
    Object.keys(organization).forEach(key => {
      // create organization by id lookup map
      if (key === '_id') fullDataByOrganizationsIdMap?.set(organization._id, organization)

      // create organization search fields to ids lookup map
      const searchByKeyMap = organizationsSearchMapsMap.get(key)
      //handles flatting the fields that are of type array, i.e tags
      const mapKey = organization[key]
      if (Array.isArray(mapKey)) {
        mapKey.forEach(key => {
          createMapsWithExistingValues({ map: searchByKeyMap, mapKey: key, value: organization._id })
        })
      } else {
        createMapsWithExistingValues({ map: searchByKeyMap, mapKey, value: organization._id })
      }
    })
  })

  return { organizationsSearchMapsMap, fullDataByOrganizationsIdMap }
}

export { createOrganizationSearchMaps }
