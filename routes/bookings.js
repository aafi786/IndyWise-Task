const express = require("express");
const router = express.Router();
const Booking = require("../models/slotBooking");


router.post('/add-booking', (req, res) => {
    console.log(req.body);
    const { id, date, time } = req.body;
    const book = new Booking({
        id,
        date,
        time
    })

    book.save(err => {
        if (err) {
            console.log(err);
            res.status(200).send({
                success: false,
                msg: "error occured",

            })
        } else {
            res.status(200).send({
                success: true,
                msg: "booking added"
            })
        }
    })
})

router.post('/get-booking', (req, res) => {
    console.log(req.body);
    const { id } = req.body;
    Booking.find({ id }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(200).send({
                success: false,
                msg: "error occured",
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                msg: "fetched",
                data
            })
        }
    })
})

module.exports = router;