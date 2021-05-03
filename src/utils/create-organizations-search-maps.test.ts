import { createOrganizationSearchMaps } from './create-organizations-search-maps'

jest.mock('../data/organizations.json', () => require('../mocks/organizations.json'))

describe('#createOrganizationSearchMaps', () => {
  it('should correctly create maps', () => {
    //build expects search maps
    const idMap = new Map([
      [101, [101]],
      [106, [106]],
    ])
    const urlMap = new Map([
      ['http://initech.zendesk.com/api/v2/organizations/101.json', [101]],
      ['http://initech.zendesk.com/api/v2/organizations/106.json', [106]],
    ])
    const sharedTicketsMap = new Map([[false, [101, 106]]])
    const tagsMap = new Map([
      ['Fulton', [101]],
      ['West', [101]],
      ['Nolan', [106]],
      ['Rivas', [106]],
    ])
    const expectedOrganizationsSearchMapsMap: Map<string, Map<string | number | boolean, number[]>> = new Map([
      ['_id', idMap],
    ])
    expectedOrganizationsSearchMapsMap.set('url', urlMap)
    expectedOrganizationsSearchMapsMap.set('shared_tickets', sharedTicketsMap)
    expectedOrganizationsSearchMapsMap.set('tags', tagsMap)

    //build expected full data by org_id map
    const expectedFullDataByOrganizationsIdMap = new Map([
      [
        101,
        {
          '_id': 101,
          'url': 'http://initech.zendesk.com/api/v2/organizations/101.json',
          'shared_tickets': false,
          'tags': ['Fulton', 'West'],
        },
      ],
      [
        106,
        {
          '_id': 106,
          'url': 'http://initech.zendesk.com/api/v2/organizations/106.json',
          'shared_tickets': false,
          'tags': ['Nolan', 'Rivas'],
        },
      ],
    ])

    const { organizationsSearchMapsMap, fullDataByOrganizationsIdMap } = createOrganizationSearchMaps()
    expect(organizationsSearchMapsMap).toEqual(expectedOrganizationsSearchMapsMap)
    expect(fullDataByOrganizationsIdMap).toEqual(expectedFullDataByOrganizationsIdMap)
  })
})
