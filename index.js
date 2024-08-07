const inquirer = require("inquirer");
const { Pool } = require("pg");

// Connect with database
const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  database: "employees_db",
});

pool.connect();

// Inquirer prompts
const main = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompts",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "View Total Salary Spend",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.prompts) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View Total Salary Spend":
          totalSalary();
          break;
        case "Quit":
          pool.end();
          break;
      }
    });
};

// view all departments (department names and IDs)
const viewAllDepartments = () => {
  pool.query("SELECT * FROM department;", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.table(result.rows);
    }
    main();
  });
};

// view all roles (job title, role ID, department)
const viewAllRoles = () => {
  pool.query("SELECT role.id AS role_id, role.title, role.salary, department.id AS department_id, department.department AS department_name FROM role JOIN department ON role.department_id = department.id", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.table(result.rows);
    }
    main();
  });
};

// view all employees (employee ID, first name, last name, job title, department, salary, manager)
const viewAllEmployees = () => {
  pool.query(`SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.id AS role_id, role.title AS role_title, employee.manager_id AS manager_id, department.department AS department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;`, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.table(result.rows);
    }
    main();
  });
};

// add a department (department name)
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentTitle",
        message: "Add Department Title",
      },
    ])

    .then((answers) => {
      const { departmentTitle } = answers;

      pool.query("INSERT INTO department (department) VALUES ($1)", [departmentTitle], (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Department added successfully!");
          main();
        }
      });
    })
    .catch((err) => {
      console.error("Error with prompt.", err);
    });
};

// add a role (name, salary, department)
const addRole = () => {
  pool.query("SELECT id, department FROM department;", (err, departmentResult) => {
    if (err) {
      console.error("Error fetching departments.", err);
      return;
    }

    const departments = departmentResult.rows.map((department) => ({
      name: department.department,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Add Role Title",
        },
        {
          type: "input",
          name: "salary",
          message: "Add Salary",
        },
        {
          type: "list",
          name: "department",
          message: "Select Department",
          choices: departments,
        },
      ])
      .then((answers) => {
        const { roleTitle, salary, department } = answers;

        pool.query(
          "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
          [roleTitle, salary, department],
          (err, result) => {
            if (err) {
              console.error("Error inserting role.", err);
            } else {
              console.log("Role added successfully!");
            }
            main();
          }
        );
      })
      .catch((err) => {
        console.error("Error with prompt.", err);
      });
  });
};

// add an employee (first name, last name, role, manager)
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Add First Name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Add Last Name",
      },
      {
        type: "input",
        name: "roleId",
        message: "Add Role Id",
      },
      {
        type: "input",
        name: "managerId",
        message: "Add Manager Id",
        defualt: "null",
      },
    ])

    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;

      pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, roleId, managerId], (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Employee added successfully!");
            main();
          }
        }
      );
    })
    .catch((err) => {
      console.error("Error with prompt.", err);
    });
};

// update an employe role
const updateEmployee = () => {
  pool.query("SELECT id, first_name, last_name FROM employee;", (err, employeeResult) => {
      if (err) {
        console.error("Error fetching employees.", err);
        return;
      }

      const employees = employeeResult.rows.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select Employee",
            choices: employees,
          },
        ])
        .then((answers) => {
          const { employeeId } = answers;

          pool.query("SELECT id, title FROM role;", (err, roleResult) => {
            if (err) {
              console.error("Error fetching roles.", err);
              return;
            }

            const roles = roleResult.rows.map((role) => ({
              name: role.title,
              value: role.id,
            }));

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Select New Role",
                  choices: roles,
                },
              ])
              .then((answers) => {
                const { roleId } = answers;

                pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [roleId, employeeId], (err, result) => {
                  if (err) {
                    console.error("Error updating employee role.", err);
                    return;
                  }

                  console.log("Employee role updated successfully!");
                  main();
                });
              })
              .catch((error) => {
                console.error("Error during role selection prompt.", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error during employee selection prompt.", error);
        });
    }
  );
};

// view total salary per department
const totalSalary = () => {
  pool.query("SELECT department.department, SUM(role.salary) AS total_salary FROM role INNER JOIN department ON role.department_id = department.id GROUP BY department.department;", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.table(result.rows);
    }
    main();
  });
}

// Start the application
main();