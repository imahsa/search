import { IOrganization } from '../types'
const organizations: [IOrganization] = require('../data/organizations.json')

const organizationFields = Object.keys(organizations[0])

const searchMapsMap = new Map<string, Map<string | number | boolean, any>>()

const fullDataByOrgIdMap = new Map<number, Object>()

organizationFields.forEach(key => searchMapsMap.set(key, new Map<string | number | boolean, [number]>()))

organizations.forEach(organization => {
  Object.keys(organization).forEach(key => {
    //will fill in each map
    if (key === '_id') {
      fullDataByOrgIdMap?.set(organization._id, organization)
    }
    let searchByKeyMap = searchMapsMap.get(key)
    if (searchByKeyMap?.has(organization[key])) {
      let existingValuesArray = searchByKeyMap.get(organization[key])
      searchByKeyMap.set(organization[key], [...existingValuesArray, organization._id])
    } else {
      searchByKeyMap?.set(organization[key], [organization._id])
    }
  })
})

export { searchMapsMap, fullDataByOrgIdMap }
