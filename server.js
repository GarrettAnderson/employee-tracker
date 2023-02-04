const inquirer = require('inquirer')
const mysql = require('mysql2')


// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'office_db'
    },
    console.log(`Connected to the movies_db database.`)
  );


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
        // console.log(data.questions)
        const question = data.questions
        // if statement to run specific function depending on question choice
        if (question === 'View All Departments' ) {
            console.log('View All Departments')
            // run SQL query 
            showAllDeptartments()
        } else if (question === 'View All Roles') {
            console.log('View All Roles')
            // run SQL query 

        } else if (question === 'View All Employees') {
            console.log('View All Employees')
            // run SQL query 

        } else if (question === 'Add A Department') {
            console.log('Add A Department')
            // run SQL query 

        } else if (question === 'Add A Role') {
            console.log('Add A Role')
            // run SQL query 

        } else if (question === 'Add AN Employee') {
            console.log('Add AN Employee')
            // run SQL query 
    
        } else  {
            console.log('Update An Employee Role')
            // run SQL query 
        
        }
    })
    .catch(err => {
        console.log('error:', err)
    })

const showAllDeptartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        console.table(results)
    })
}