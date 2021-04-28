#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import ReadLine from 'readline'

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

clear()
console.log(chalk.red(figlet.textSync('Search', { horizontalLayout: 'full' })))


const processCommand = (input: string) => {
console.log(input)
}

rl.on('line', input => {
  processCommand(input)
})
