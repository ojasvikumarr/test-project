import intern from "../../models/intern";
import connectDb from "../../middleware/mongoose";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            console.log(email , password);
            // Find user by email
            const u = await intern.findOne({ email });
            console.log(u);
            // Check if user exists and verify password
            if (u) {
                const bytes = CryptoJS.AES.decrypt(u.password, process.env.AES_SECRET);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);

                if (password === originalText) {
                    // Passwords match, generate JWT token
                    const token = jwt.sign({ name: u.name, email: u.email }, process.env.JWT_SECRET, { expiresIn: "2d" });
                    console.log(token);
                    res.status(200).json({ success: true, token });
                } else {
                    // Passwords do not match
                    res.status(400).json({ error: "Invalid credentials" });
                }
            } else {
                // User not found
                res.status(400).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error in authentication:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        // Invalid request method
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
