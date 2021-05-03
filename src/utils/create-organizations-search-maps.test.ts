import { createOrganizationSearchMaps } from './create-organizations-search-maps'

jest.mock('../data/organizations.json', ()=>require('../mocks/organizations.json'))

describe('#createOrganizationSearchMaps', () => {
  it('should correctly create maps', () => {
    const idMap = new Map([[101, [101]], [101, [101]]]);
    const urlMap = new Map([['http://initech.zendesk.com/api/v2/organizations/101.json', [101]], ['http://initech.zendesk.com/api/v2/organizations/106.json', [106]]])
    const sharedTicketsMap = new Map([[false, [101, 106]]])
    const expectedOrganizationsSearchMapsMap: Map<string, Map<string | number | boolean, number[]>> = new Map([
        ['_id', new Map([[101, [101]], [106, [106]]])]
      ])
      expectedOrganizationsSearchMapsMap.set('url', urlMap)
      expectedOrganizationsSearchMapsMap.set('shared_tickets', sharedTicketsMap)


    const { organizationsSearchMapsMap, fullDataByOrganizationsIdMap } = createOrganizationSearchMaps()
    expect(organizationsSearchMapsMap).toEqual(expectedOrganizationsSearchMapsMap)
  })
})
