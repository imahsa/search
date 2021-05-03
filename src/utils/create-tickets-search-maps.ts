import { ITickets } from '../types'
const tickets: [ITickets] = require('../data/tickets.json')

const createTicketsSearchMaps = () => {
  const ticketFields = Object.keys(tickets[0])

  const ticketsSearchMapsMap = new Map<string, Map<string | number | boolean, string[]>>()

  const fullDataByTicketsIdMap = new Map<string, ITickets>()

  const fullTicketsDataByOrganizationIdMap = new Map<number, ITickets[]>()

  ticketFields.forEach(key => ticketsSearchMapsMap.set(key, new Map<string | number | boolean, string[]>()))

  const createMapsWithExistingValues = ({ map, mapKey, value }) => {
    const existingValuesArray: number[] | undefined = map?.get(mapKey)
    existingValuesArray !== undefined ? map?.set(mapKey, [...existingValuesArray, value]) : map?.set(mapKey, [value])
  }

  tickets.forEach(ticket => {
    Object.keys(ticket).forEach(key => {
      // create ticket by id lookup map
      if (key === '_id') fullDataByTicketsIdMap?.set(ticket._id, ticket)

      // create tickets by organization_id lookup map
      if (key === 'organization_id') {
        createMapsWithExistingValues({
          map: fullTicketsDataByOrganizationIdMap,
          mapKey: ticket.organization_id,
          value: ticket,
        })
      }

      // create ticket search fields to ids lookup map
      const searchByKeyMap = ticketsSearchMapsMap.get(key)
      //handles flatting the fields that are of type array, i.e tags
      const mapKey = ticket[key]
      if (Array.isArray(mapKey)) {
        mapKey.forEach(key => {
          createMapsWithExistingValues({ map: searchByKeyMap, mapKey: key, value: ticket._id })
        })
      } else {
        createMapsWithExistingValues({ map: searchByKeyMap, mapKey, value: ticket._id })
      }
    })
  })

  return { ticketsSearchMapsMap, fullDataByTicketsIdMap, fullTicketsDataByOrganizationIdMap }
}

export { createTicketsSearchMaps }
