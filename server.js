const inquirer = require('inquirer')
const mysql = require('mysql2')

const whatToDoQuestion = [

        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'questions',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role'
            ]
        }
]

// initiate what to do question

// create conditional to run an appropriate function with SQL query depending on choices in whatToDo prompt
inquirer.prompt(whatToDoQuestion)
    .then(data => {
        console.log(data)

        // if statement to run specific function depending on question choice
        
        // run SQL query 
    })
    .catch(err => {
        console.log('error:', err)
    })