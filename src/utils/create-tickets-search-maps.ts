import { ITickets } from '../types'
const tickets: [ITickets] = require('../data/tickets.json')

const createTicketsSearchMaps = () => {
  const ticketFields = Object.keys(tickets[0])

  const ticketsSearchMapsMap = new Map<string, Map<string | number | boolean, string[]>>()

  const fullDataByTicketsIdMap = new Map<string, ITickets>()

  const fullTicketsDataByOrganizationIdMap = new Map<number, ITickets[]>()

  ticketFields.forEach(key => ticketsSearchMapsMap.set(key, new Map<string | number | boolean, string[]>()))

  tickets.forEach(ticket => {
    Object.keys(ticket).forEach(key => {
      // create ticket by id lookup map
      if (key === '_id') fullDataByTicketsIdMap?.set(ticket._id, ticket)

      // create tickets by organization_id lookup map
      if (key === 'organization_id') {
        const existingTicketsArray: ITickets[] | undefined = fullTicketsDataByOrganizationIdMap.get(
          ticket.organization_id
        )
        existingTicketsArray !== undefined
          ? fullTicketsDataByOrganizationIdMap.set(ticket.organization_id, [...existingTicketsArray, ticket])
          : fullTicketsDataByOrganizationIdMap?.set(ticket.organization_id, [ticket])
      }

      // create ticket search fields to ids lookup map
      const searchByKeyMap = ticketsSearchMapsMap.get(key)
      const existingValuesArray: string[] | undefined = searchByKeyMap?.get(ticket[key])
      existingValuesArray !== undefined
        ? searchByKeyMap?.set(ticket[key], [...existingValuesArray, ticket._id])
        : searchByKeyMap?.set(ticket[key], [ticket._id])
    })
  })

  return { ticketsSearchMapsMap, fullDataByTicketsIdMap, fullTicketsDataByOrganizationIdMap }
}

export { createTicketsSearchMaps }
