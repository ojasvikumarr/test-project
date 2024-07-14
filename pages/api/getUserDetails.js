// pages/api/getUserDetails.js
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const token = req.body.token; // assuming id is stored in the token
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const email = decoded.email;
          console.log(email);
            // Fetch user from the Users table
            const UserResult = await sql`
                SELECT * FROM Users WHERE email = ${email};
            `;
            console.log(UserResult);
            const user = UserResult.rows[0];
            console.log(user);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Problem while fetching details of user' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
}
