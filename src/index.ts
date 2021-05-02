#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import ReadLine from 'readline'
import { organizationsSearchMapsMap, fullDataByOrganizationsIdMap } from './utils/create-organizations-search-maps'
import { ticketsSearchMapsMap, fullDataByTicketsIdMap } from './utils/create-tickets-search-maps'
import { usersSearchMapsMap, fullDataByUsersIdMap } from './utils/create-users-search-maps'

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})

clear()
console.log(chalk.red(figlet.textSync('Search', { horizontalLayout: 'full' })))

console.log('for starting search press 0')

const startSearchCommand = (fileName: string) => {
  console.log('Type the name of the field you wish to search on')
}

const parseOrganizationsSearchValue = ({ searchField, searchValue }) => {
  switch (searchField) {
    case '_id':
      return parseInt(searchValue)
    case 'shared_tickets':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    default:
      return searchValue
  }
}

const parseUsersSearchValue = ({ searchField, searchValue }) => {
  switch (searchField) {
    case '_id':
      return parseInt(searchValue)
    case 'organization_id':
      return parseInt(searchValue)
    case 'active':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    case 'verified':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    case 'shared':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    case 'suspended':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    default:
      return searchValue
  }
}

const parseTicketsSearchValue = ({ searchField, searchValue }) => {
  switch (searchField) {
    case 'submitter_id':
      return parseInt(searchValue)
    case 'assignee_id':
      return parseInt(searchValue)
    case 'organization_id':
        return parseInt(searchValue)
    case 'has_incidents':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    default:
      return searchValue
  }
}

const searchUsers = () => {
  rl.question('which field do you wish to search on', searchField => {
    if (usersSearchMapsMap.has(searchField)) {
      rl.question('type the value you wish to search on', searchValue => {
        const searchMap = usersSearchMapsMap.get(searchField)
        searchValue = parseUsersSearchValue({ searchField, searchValue })
        if (searchMap?.has(searchValue)) {
          const idResults = searchMap.get(searchValue)
          //print all found results
          idResults.forEach((id: number) => {
            console.log(fullDataByUsersIdMap?.get(id))
          })
        } else {
          console.log('no results found')
        }
      })
    } else {
      console.log('search fields does not exists, please try again')
      rl.close()
    }
  })
}

const searchTickets = () => {
  rl.question('which field do you wish to search on', searchField => {
    if (ticketsSearchMapsMap.has(searchField)) {
      rl.question('type the value you wish to search on', searchValue => {
        const searchMap = ticketsSearchMapsMap.get(searchField)
        searchValue = parseTicketsSearchValue({ searchField, searchValue })
        if (searchMap?.has(searchValue)) {
          const idResults = searchMap.get(searchValue)
          //print all found results
          idResults.forEach((id: string) => {
            console.log(fullDataByTicketsIdMap?.get(id))
          })
        } else {
          console.log('no results found')
        }
      })
    } else {
      console.log('search fields does not exists, please try again')
      rl.close()
    }
  })
}

const searchOrganizations = () => {
  rl.question('which field do you wish to search on', searchField => {
    if (organizationsSearchMapsMap.has(searchField)) {
      rl.question('type the value you wish to search on', searchValue => {
        const searchMap = organizationsSearchMapsMap.get(searchField)
        searchValue = parseOrganizationsSearchValue({ searchField, searchValue })
        if (searchMap?.has(searchValue)) {
          const idResults = searchMap.get(searchValue)
          //print all found results
          idResults.forEach((id: number) => {
            console.log(fullDataByOrganizationsIdMap?.get(id))
          })
        } else {
          console.log('no results found')
        }
      })
    } else {
      console.log('search fields does not exists, please try again')
      rl.close()
    }
  })
}
const processCommand = (input: string) => {
  if (input === '0') {
    rl.question('Select 1) Users 2) Tickets 3) Organizations', searchType => {
      if (searchType === '1') searchUsers()
      if (searchType === '2') searchTickets()
      if (searchType === '3') searchOrganizations()
    })
  }
}

rl.on('line', input => {
  processCommand(input)
})
