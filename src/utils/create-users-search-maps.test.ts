import { createUsersSearchMaps } from './create-users-search-maps'

jest.mock('../data/users.json', () => require('../mocks/users.json'))

describe('#createUsersSearchMaps', () => {
  it('should correctly create maps', () => {
    //build expects search maps
    const idMap = new Map([
      [1, [1]],
      [2, [2]],
    ])
    const nameMap = new Map([
      ['Francisca Rasmussen', [1]],
      ['Cross Barlow', [2]],
    ])
    const orgIdMap = new Map([
      [119, [1]],
      [106, [2]],
    ])
    const activeMap = new Map([[true, [1, 2]]])
    const tagsMap = new Map([
      ['Springville', [1]],
      ['Sutton', [1]],
      ['Foxworth', [2]],
      ['Woodlands', [2]],
    ])
    const expectedUsersSearchMapsMap: Map<string, Map<string | number | boolean, number[]>> = new Map([['_id', idMap]])
    expectedUsersSearchMapsMap.set('name', nameMap)
    expectedUsersSearchMapsMap.set('organization_id', orgIdMap)
    expectedUsersSearchMapsMap.set('active', activeMap)
    expectedUsersSearchMapsMap.set('tags', tagsMap)

    //build expected full data by org_id map
    const expectedFullDataByUsersIdMap = new Map([
      [
        1,
        {
          '_id': 1,
          'name': 'Francisca Rasmussen',
          'organization_id': 119,
          'active': true,
          'tags': ['Springville', 'Sutton'],
        },
      ],
      [
        2,
        {
          '_id': 2,
          'name': 'Cross Barlow',
          'organization_id': 106,
          'active': true,
          'tags': ['Foxworth', 'Woodlands'],
        },
      ],
    ])

    const { usersSearchMapsMap, fullDataByUsersIdMap } = createUsersSearchMaps()
    expect(usersSearchMapsMap).toEqual(expectedUsersSearchMapsMap)
    expect(fullDataByUsersIdMap).toEqual(expectedFullDataByUsersIdMap)
  })
})
