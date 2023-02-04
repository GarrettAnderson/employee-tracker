INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO job_role (title, salary, department_id)
VALUES 
       ("Sales Person", 60000, 1),
       ("Software Developer", 120000, 2),
       ("Account Manager", 12500, 3),
       ("Accountant", 75000, 3),
       ("Lawyer", 12500, 4),
       ("Lead Developer", 130000, 2);
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
       ("John", "Doe", 1, 1),
       ("Ginny", "Sue", 2, 1),
       ("Kathy", "Mally", 6, Null),
       ("Rick","Scott", 4, 1),
       ("Larz", "Schnippen", 3, Null),
       ("Sally", "Anderson", 5, Null);