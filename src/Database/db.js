import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";
let employees;

async function ConnectDb() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Employees');
        employees = db.collection('EmployeesList');
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

async function UploadData(data) {
    try {
        if (!employees) await ConnectDb(); 
        const result = await employees.insertOne(data);
        return result;
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error;
    }
}

export { UploadData, employees, ConnectDb };
