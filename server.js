const { Server } = require('http');
const inquirer = require('inquirer')
const mysql = require('mysql2');
const { listenerCount, execArgv } = require('process');


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
    console.log(`Connected to the office_db database.`)
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
                'Update An Employee Role',
                'No Action'
            ]
        }
]

// initiate what to do question

// create conditional to run an appropriate function with SQL query depending on choices in whatToDo prompt
const askUserPrompt = () => {
    inquirer.prompt(whatToDoQuestion)
    .then(data => {
        // console.log(data.questions)
        const question = data.questions
        // if statement to run specific function depending on question choice
        if (question === 'View All Departments' ) {
            console.log('View All Departments')
            showAllDeptartments()
        } else if (question === 'View All Roles') {
            console.log('View All Roles')
            showAllRoles()
        } else if (question === 'View All Employees') {
            console.log('View All Employees')
            showAllEployees()
        } else if (question === 'Add A Department') {
            console.log('Add A Department')
            // run SQL query 
            addADepartment()
        } else if (question === 'Add A Role') {
            console.log('Add A Role')
            // run SQL query 
            addARole()
        } else if (question === 'Add An Employee') {
            console.log('Add An Employee')
            // run SQL query 
            addAnEmployee()
        } else if (question === 'Update An Employee Role') {
            console.log('Update An Employee Role')
            // run SQL query
            updateAnEmployeeRole()
        } else if (question === 'No Action') {
            db.close()
        }
    })
    .catch(err => {
        console.log('error:', err)
    })
}

const showAllDeptartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        console.table(results)
        // askUserPrompt()
        db.close()
    })
}

const showAllRoles = () => {
    db.query('SELECT * FROM job_role', (err, results) => {
        console.table(results)
        db.close()
    })
}

const showAllEployees = () => {
    db.query(`SELECT first_name,
                     last_name,
                     employee.id AS employee_id,
                     job_role.title,
                     job_role.salary AS salary,
                     department.dept_name AS department
                FROM employee
                    JOIN job_role ON employee.role_id = job_role.id 
                    LEFT JOIN department ON job_role.department_id = department.id
        `, (err, results) => {
        console.table(results)
    })
    db.close()
}

const addADepartment = () => {
    // prompt user to ask what department they want to add
    inquirer.prompt({

        type: 'input',
        message: 'What is the name of the department you want to add?',
        name: 'department'

    })
        .then((ans) => {
            console.log(ans)
            // ans is department name

            // take the answer from prompt and write a prepared statment to query the database and add department name from prompt
            db.query('INSERT INTO department (dept_name) VALUES (?)', ans.department, (err, result) => {
                if (err) {
                    throw `error: ${err.message}`
                }
                console.log(`Added ${ans.department} to departments.`)
                showAllDeptartments()
            })
        })
}

const addARole = () => {
    // ask questions to add a role = role name and salary

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role you want to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'salary'
        }
    ])
    .then(data => {
        console.log(data)
        const queryParams = [data.role, data.salary]

        // make a query to db to view all departments and get id
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
                throw `error: ${err}`
            }
            console.log(results)
            const depts = results.map(({dept_name, id}) => ({name: dept_name, value: id}))
            console.log(depts)


            inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the department of this role?',
                    name: 'department',
                    choices: depts
                }
            ])
            .then(deptChoice => {
                console.log(deptChoice)
                queryParams.push(deptChoice.department)

                db.query('INSERT INTO job_role (title, salary, department_id) VALUES (?, ?, ?)', queryParams, (err, results) => {
                    if (err) {
                        throw err
                    }
                    console.log(`Added a role: ${data.role}`)
                    showAllRoles()
                })
            })
        })
    })
}


const addAnEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employee\'s role id?'
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'What is the employee\'s manager id?',
            choices: ['1', 'Null']
        }
    ])
    .then(answer => {
        // console.log(answer)
        const queryParams = [answer.firstName, answer.lastName, answer.roleId, answer.managerId]

        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', queryParams, (err, results) => {
            // console.log(results)
            if (err) {
                throw `error: ${err}`
            }
        })
        db.query('SELECT * FROM employee', (err, employees) => {
            if (err) {
                throw  `error: ${err}`
            }
            console.table(employees)
        })

        // do a query that joins the job_role table and employee table on role_id = job_role.id
        // console.log to 
        db.query(`SELECT 
                    first_name, 
                    last_name, 
                    job_role.title, 
                    job_role.salary, 
                    department.dept_name 
                  FROM employee 
                    JOIN job_role ON employee.role_id = job_role.id 
                    LEFT JOIN department ON job_role.department_id = department.id`, (err,employeesExp) => {
            console.table(employeesExp)
            db.close()
        })
    })
}

const updateAnEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            throw err
        }
        console.table(result)
        const employees = result.map(({first_name, last_name, id}) => (`${first_name} ${last_name}`))
        
        inquirer.prompt([
            {
                type: 'list',
                message: 'What is the name of the employee you want to update?',
                name: 'employeeName',
                choices: employees
            }
        ]).then(data => {
            console.log(data)
        })
    })
}


// Initiate the first prompt
askUserPrompt()