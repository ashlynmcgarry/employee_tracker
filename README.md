# SQL Employee Tracker

## Description

This Employee Tracker allows user to view and manage departments, roles, salaries and employees within a company. This command-line application allows users to view and update employees, roles and departments within a company. User are also able to see the total salary spend per department. This generator uses SQL, Node.js and inquirer to prompt the user and allow them to navigate through their options within the terminal. This project has allowed me to utilise SQL as well as Node.js and the inqurier prompts to access a database and pull and display information from it. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Contributing](#contributing)
- [Test](#test)
- [Features](#features)
- [Future Development](#future-development)

## Installation

To ustilise the Employee Tracker you first need to clone the repository and open it in VS code. Open the file and terminal within VS code and follow the following steps. 
- Install the required dependancies using 'npm i'
- Start SQL shell using 'psql -U postgres'
- Run '\i schema.sql' to initialise the database
- Run '\i seeds.sql' to seed the placeholder data
- Run '\q' to exit the shell
- Run 'node index.js' to start the application

## Usage

This generator can be used by entering 'node index.js' with VS Code's terminal and follow the prompts. For more usage and functionality details, see the demo video below.

[Video Demo](https://drive.google.com/file/d/168_mdImODtvLUJ9u0J-Lo-e9DcPXrW6k/view?usp=sharing)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under [MIT License](https://opensource.org/licenses/MIT).

## Credits

Assistance for this project was provided by the AI Xpert Learning Assistant within Bootcamp Spot. This assistance included answering questions, explaining concepts, debugging code and providing code examples. Assisstance was also provided via the class instructor in office hours, who helped in providing direction and explaining steps to tackle aspects of the challenge. 

## Contributing

If you would like to contribute to the project and make it better, please feel free. 

## Features

- View and add an employee
- View and add a department
- View and add a role
- See salary totals per department

## Future Development

Future development opportunities for this application including allowing a user to view employees by thier manager, update the manager and view employees by their department. 
