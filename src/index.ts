#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import ReadLine from 'readline' 
import { searchMapsMap } from './utils/create-organization-search-dictionaries'

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})

clear()
console.log(chalk.red(figlet.textSync('Search', { horizontalLayout: 'full' })))

console.log('for starting search press 0')

const file_map = {
  1: 'organization',
  2: 'users',
  3: 'tickets',
}

const startSearchCommand = (fileName: string) => {
  console.log('Type the name of the field you wish to search on')
}

const searchUsers = () => console.log('tbi')

const searchTickets = () => console.log('tbi')

const searchOrganizations = () => {
  rl.question('which field do you wish to search on', searchField => {
    if(searchMapsMap.has(searchField)) {
      rl.question('type the value you wish to search on', searchValue => {
        let searchMap = searchMapsMap.get(searchField)
        if (searchField === '_id') {
          const intValue = parseInt(searchValue)
          if(searchMap?.has(intValue)){
            console.log(searchMap.get(intValue))
          } else {
            console.log('no results found')
          }
        } else {
          let parsedSearchValue: string | boolean =  searchValue
          if(searchField === 'shared_tickets') {
            parsedSearchValue = searchValue === 'true' ? true : searchValue === 'false' ? false : searchValue
          }
          if(searchMap?.has(parsedSearchValue)){
            const orgIdSearchMap = searchMapsMap.get('_id')
            const res = searchMap.get(parsedSearchValue)
              //print all found results
              res.forEach((result: number) => {
                console.log(orgIdSearchMap?.get(result))
              })
          } else {
            console.log('no results found')
          }
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
