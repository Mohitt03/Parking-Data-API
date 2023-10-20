const express = require('express')
const mongoose = require('mongoose')


const ParkingData = require('../model/Parking')
const app = express()
const masterKey = "123456789"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/Parking', async (req, res) => {
    try {

        const parkingData = await ParkingData.find({});
        res.status(200).json(parkingData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/Parking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parkingData = await ParkingData.findById(id);
        res.status(200).json(parkingData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Parking', async (req, res) => {
    try {
        const parkingData = await ParkingData.create(req.body)
        res.status(200).json(parkingData);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a product
app.put('/Parking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parkingData = await ParkingData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!parkingData) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedparkingData = await ParkingData.findById(id);
        res.status(200).json(updatedparkingData);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// delete a product

app.delete('/Parking/:id', async (req, res) => {
    const userKey = (req.query.key)
        if (userKey === masterKey) {

        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const parkingData = await ParkingData.findByIdAndDelete(id);
            if (!parkingData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(parkingData);

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res
            .status(404)
            .json({ error: "You are not authorized" })
    }

})

mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`)
        });
    }).catch((error) => {
        console.log(error)
    })