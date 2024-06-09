const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");




// register user data
router.post("/create", (req, res) => {

    // console.log(req.body);
    const { name, email, age, mobile, work, add, desc } = req.body
    if (!name || !email || !age || !mobile || !work || !add) {

        res.status(422).json("please fill up all the required fields");
    };
    try {
        conn.query("SELECT * FROM users WHERE email = ? ", email,(err, result) => {
            // console.log("res" ,err,  result);
            if (result.length) {
                res.status(422).json("This data already exists")
            } else {
                conn.query("INSERT INTO users SET ? ", { name, email, age, mobile, work, add, desc }, (err,result) => {
                    if(err) {
                        console.log("err " + err)
                    } else {
                        res.status(422).json(req.body)

                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(
            error
        );
    }

});

module.exports = router;