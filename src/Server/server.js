import express from 'express';
import { UploadData, employees, ConnectDb } from '../Database/db.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


(async () => {
    await ConnectDb();
})();

app.post('/register', async (req, res) => {
    try {
        const result = await UploadData(req.body);
        res.status(201).send({ message: "Registration successful", id: result.insertedId });
        console.log('Data uploaded');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({ message: "Error during registration", error });
    }
});

app.post("/login", async (req, res) => {
   
        const { email, password } = req.body;
        const user = await employees.findOne({ email});
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password === password) {
        
            res.status(200).json({ message: 'Login successful'}); 
        } else {
            res.status(401).json({ message: 'The password is incorrect' });
        }
  
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});
