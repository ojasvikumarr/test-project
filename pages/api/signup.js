import { sql } from '@vercel/postgres';
import CryptoJS from 'crypto-js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, code, bday, phone, email, company, password, confirmpassword } = req.body;
            console.log(req.body);
            // Check for missing fields
            if (!name || !code || !bday || !phone || !email || !company || !password || !confirmpassword) {
                return res.status(400).json({ error: 'All fields are required!' });
            }
            // Check if passwords match
            if (password !== confirmpassword) {
                return res.status(400).json({ error: "Passwords don't match!" });
            }
            // Validate phone number
            if (!/^\d{10}$/.test(phone)) {
                return res.status(400).json({ error: 'Please enter a valid 10-digit phone number!' });
            }
            // Validate password (minimum length 8 characters, must contain at least one letter and one number)
            const passwordCriteria = /^(?=.*[@])(?=.*\d)[A-Za-z\d@]{6,}$/;

            if (!passwordCriteria.test(password)) {
                return res.status(400).json({
                    error: 'Password must be at least 8 characters long and include at least one letter and one number.'
                });
            }

            // Convert date to YYYY-MM-DD format
            const date = new Date(bday);
            const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

            // Create table if it does not exist
            await sql`
                CREATE TABLE IF NOT EXISTS Users (
                    Name VARCHAR(255),
                    code INT,
                    bday DATE,
                    phone VARCHAR(10),
                    email VARCHAR(255),
                    company VARCHAR(255),
                    password VARCHAR(255)
                );
            `;

            // Encrypt password
            const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();

            // Insert user into the database
            const result = await sql`
                INSERT INTO Users (Name, code, bday, phone, email, company, password)
                VALUES (${name}, ${code}, ${formattedDate}, ${phone}, ${email}, ${company}, ${encryptedPassword});
            `;
            console.log(result);
            res.status(200).json({ success: 'Signed up successfully!' });
        } catch (error) {
            console.error('Error signing up user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
