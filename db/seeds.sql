-- Insert data into the 'department' table
INSERT INTO department (department)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Marketing');

-- Insert data into the 'role' table
INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 120000, 1), -- Engineering
        ('Account Manager', 160000, 2), -- Finance
        ('Accountant', 125000, 2), -- Finance
        ('Lawyer', 190000, 3), -- Legal
        ('Legal Team Lead', 250000, 3), -- Legal
        ('Engineering Manager', 150000, 1); -- Engineering

-- Insert data into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Gary', 'Herbert', 6, NULL), -- Engineering Manager
        ('Ryan', 'Wallace', 2, NULL), -- Account Manager
        ('Mike', 'Smith', 5, NULL), -- Legal Team Lead
        ('John', 'Doe', 3, 2), -- Accountant, reports to Ryan Wallace
        ('Ashley', 'Jones', 4, 3), -- Lawyer, reports to Mike Smith
        ('Brooke', 'Green', 1, 1); -- Software Engineer, reports to Gary Herbert