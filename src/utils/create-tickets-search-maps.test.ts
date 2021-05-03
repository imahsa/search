import { createTicketsSearchMaps } from './create-tickets-search-maps'

jest.mock('../data/tickets.json', () => require('../mocks/tickets.json'))

describe('#createTicketsSearchMaps', () => {
  it('should correctly create maps', () => {
    //build expects search maps
    const idMap = new Map([
      ['436bf9b0-1147-4c0a-8439-6f79833bff5b', ['436bf9b0-1147-4c0a-8439-6f79833bff5b']],
      ['b2035bdc-2ff4-4d23-9752-c5b67541193e', ['b2035bdc-2ff4-4d23-9752-c5b67541193e']],
    ])
    const orgIdMap = new Map([
      [116, ['436bf9b0-1147-4c0a-8439-6f79833bff5b']],
      [106, ['b2035bdc-2ff4-4d23-9752-c5b67541193e']],
    ])
    const hasIncidentsMap = new Map([
      [false, ['436bf9b0-1147-4c0a-8439-6f79833bff5b']],
      [true, ['b2035bdc-2ff4-4d23-9752-c5b67541193e']],
    ])
    const tagsMap = new Map([
      ['Ohio', ['436bf9b0-1147-4c0a-8439-6f79833bff5b']],
      ['Pennsylvania', ['436bf9b0-1147-4c0a-8439-6f79833bff5b']],
      ['Connecticut', ['b2035bdc-2ff4-4d23-9752-c5b67541193e']],
      ['Arkansas', ['b2035bdc-2ff4-4d23-9752-c5b67541193e']],
    ])
    const expectedTicketsSearchMapsMap: Map<string, Map<string | number | boolean, string[]>> = new Map([
      ['_id', idMap],
    ])
    expectedTicketsSearchMapsMap.set('organization_id', orgIdMap)
    expectedTicketsSearchMapsMap.set('has_incidents', hasIncidentsMap)
    expectedTicketsSearchMapsMap.set('tags', tagsMap)

    //build expected full data by org_id map
    const expectedFullDataByTicketsIdMap = new Map([
      [
        '436bf9b0-1147-4c0a-8439-6f79833bff5b',
        {
          '_id': '436bf9b0-1147-4c0a-8439-6f79833bff5b',
          'organization_id': 116,
          'has_incidents': false,
          'tags': ['Ohio', 'Pennsylvania'],
        },
      ],
      [
        'b2035bdc-2ff4-4d23-9752-c5b67541193e',
        {
          '_id': 'b2035bdc-2ff4-4d23-9752-c5b67541193e',
          'organization_id': 106,
          'has_incidents': true,
          'tags': ['Connecticut', 'Arkansas'],
        },
      ],
    ])

    const { ticketsSearchMapsMap, fullDataByTicketsIdMap } = createTicketsSearchMaps()
    expect(ticketsSearchMapsMap).toEqual(expectedTicketsSearchMapsMap)
    expect(fullDataByTicketsIdMap).toEqual(expectedFullDataByTicketsIdMap)
  })
})
