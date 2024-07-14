

import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        const {name ,roll , year,phone,email , department} = req.body ;

        const sql = "INSERT INTO user VALUES ('"+name+"', '"+roll+"' , '"+year+"' ,'"+phone+"' )"
    
        res.status(200).json({ success: "Hello there you r successfull" })

    } else {
        res.status(400).json({ error: "This method is not allowed" })
        
    }
}
export default connectDb(handler);



