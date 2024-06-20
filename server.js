import express from 'express';
import mySqlConnection from "./connection/Connection.js";

const app = express();

app.use(express.json());

// GET endpoint to fetch all employees
app.get('/employees', (req, res) => {
    const id = req.params.id;
    mySqlConnection.query('SELECT * FROM employees', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(rows);
        }
    });
});
app.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    mySqlConnection.query('SELECT * FROM employees WHERE id=?', [id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(rows);
        }
    });
});



app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;

    mySqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(`Employee with id ${id} deleted successfully`);
        }
    });
});


app.patch('/employees/:id', (req, res) => {
    const { name, salary } = req.body; // Get the new values from the request body
    
    
    const id = req.params.id; // Get the employee id from the URL parameters

    // Update the employee record with the new name and salary
    mySqlConnection.query(
        'UPDATE employees SET name = ?, salary = ? WHERE id = ?',
        [name, salary, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                // Check if any rows were affected (meaning the employee existed)
                if (result.affectedRows > 0) {
                    res.status(200).send(`Employee with id ${id} updated successfully`);
                } else {
                    res.status(404).send('Employee not found');
                }
            }
        }
    );
});


// POST endpoint to add a new employee
app.post('/employees', (req, res) => {
    const { name, salary } = req.body; // Destructure name and salary from req.body
    const values = [name, salary]; // Array of values to insert into the query

    mySqlConnection.query('INSERT INTO employees (name, salary) VALUES (?, ?)', values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Employee added successfully');
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
