import {IOrganization} from '../types'
const organizations: [IOrganization] = require('../data/organizations.json');


const organizationFields = Object.keys(organizations[0])

const searchMapsMap = new Map<string, Map<string | number | boolean, any>>()

organizationFields.forEach(key => {
    if (key === '_id') {
         searchMapsMap.set('_id', new Map<number, Object>())
    } else {
        searchMapsMap.set(key, new Map<string | number | boolean, [number]>())
    }
});

organizations.forEach(organization => {
    Object.keys(organization).forEach(key => {
        //will fill in each map
        if (key === '_id') {
            searchMapsMap?.get('_id')?.set(organization._id, organization)
        } else {
            let searchByKeyMap = searchMapsMap.get(key)
            if(searchByKeyMap?.has(organization[key])) {
                let existingValuesArray = searchByKeyMap.get(organization[key])
                searchByKeyMap.set(organization[key], [...existingValuesArray, organization._id])
            } else {
                searchByKeyMap?.set(organization[key], [organization._id])
            }
        }
    })
})

export {searchMapsMap};
