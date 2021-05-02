import { ITickets } from '../types'
const tickets: [ITickets] = require('../data/tickets.json')

const ticketFields = Object.keys(tickets[0])

const ticketsSearchMapsMap = new Map<string, Map<string | number | boolean, any>>()

const fullDataByTicketsIdMap = new Map<string, Object>()

ticketFields.forEach(key => ticketsSearchMapsMap.set(key, new Map<string | number | boolean, [number]>()))

tickets.forEach(ticket => {
  Object.keys(ticket).forEach(key => {
    //will fill in each map
    if (key === '_id') {
      fullDataByTicketsIdMap?.set(ticket._id, ticket)
    }
    let searchByKeyMap = ticketsSearchMapsMap.get(key)
    if (searchByKeyMap?.has(ticket[key])) {
      let existingValuesArray = searchByKeyMap.get(ticket[key])
      searchByKeyMap.set(ticket[key], [...existingValuesArray, ticket._id])
    } else {
      searchByKeyMap?.set(ticket[key], [ticket._id])
    }
  })
})

export { ticketsSearchMapsMap, fullDataByTicketsIdMap }
