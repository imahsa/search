import { IOrganization } from '../types'
const organizations: [IOrganization] = require('../data/organizations.json')

const createOrganizationSearchMaps = () => {
  const organizationFields = Object.keys(organizations[0])

  const organizationsSearchMapsMap = new Map<string, Map<string | number | boolean, number[]>>()

  const fullDataByOrganizationsIdMap = new Map<number, IOrganization>()

  organizationFields.forEach(key => organizationsSearchMapsMap.set(key, new Map<string | number | boolean, number[]>()))

  organizations.forEach(organization => {
    Object.keys(organization).forEach(key => {
      // create organization by id lookup map
      if (key === '_id') fullDataByOrganizationsIdMap?.set(organization._id, organization)

      // create organization search fields to ids lookup map
      const searchByKeyMap = organizationsSearchMapsMap.get(key)
      const existingValuesArray: number[] | undefined = searchByKeyMap?.get(organization[key])
      existingValuesArray !== undefined
        ? searchByKeyMap?.set(organization[key], [...existingValuesArray, organization._id])
        : searchByKeyMap?.set(organization[key], [organization._id])
    })
  })

  return { organizationsSearchMapsMap, fullDataByOrganizationsIdMap }
}

export { createOrganizationSearchMaps }
