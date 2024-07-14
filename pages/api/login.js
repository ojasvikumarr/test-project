import { sql } from '@vercel/postgres';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            console.log(email, password);

            // Fetch user by email
            const result = await sql`SELECT * FROM Users WHERE email = ${email}`;
            const user = result.rows[0];
            console.log(user);
            if (!user) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // Decrypt stored password
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            // Check if passwords match
            if (password === originalPassword) {
                // Passwords match, generate JWT token
                const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
                console.log(token);
                return res.status(200).json({ success: true, token });
            } else {
                return res.status(400).json({ error: "Invalid credentials" });
            }

        } catch (error) {
            console.error("Error in authentication:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};

export default handler;
