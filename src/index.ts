#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import ReadLine from 'readline'
import { searchMapsMap, fullDataByOrgIdMap } from './utils/create-organization-search-dictionaries'

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

const parseOrganizationSearchValue = ({ searchField, searchValue }) => {
  switch (searchField) {
    case '_id':
      return parseInt(searchValue)
    case 'shared_tickets':
      return searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
    default:
      return searchValue
  }
}

const searchUsers = () => console.log('tbi')

const searchTickets = () => console.log('tbi')

const searchOrganizations = () => {
  rl.question('which field do you wish to search on', searchField => {
    if (searchMapsMap.has(searchField)) {
      rl.question('type the value you wish to search on', searchValue => {
        const searchMap = searchMapsMap.get(searchField)
        searchValue = parseOrganizationSearchValue({ searchField, searchValue })
        if (searchMap?.has(searchValue)) {
          const idResults = searchMap.get(searchValue)
          //print all found results
          idResults.forEach((id: number) => {
            console.log(fullDataByOrgIdMap?.get(id))
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
