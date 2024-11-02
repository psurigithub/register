import express from 'express';
import { UploadData, employees, ConnectDb } from '../Database/db.js';
import cors from 'cors';  



const app = express();
const port = 3002;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());


(async () => {
    await ConnectDb();
})();


app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await UploadData({ email, password }); 
        res.status(201).json({ message: "Registration successful", id: result.insertedId });
        console.log('Data uploaded');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error during registration", error });
    }
});


app.post('/login', async (req,res ) => {  
    try { 
   
        const { email, password } = req.body; 
        
        const user = await employees.findOne({ 'email':email });   
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid =(password===user.password);
  
        if (isPasswordValid) {
            res.status(200).json({ message: 'Login successful' }); 
            console.log('success')
        } else {
            res.status(401).json({ message: 'The password is incorrect' });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Error during login', error });
    }  
        
});


app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});
