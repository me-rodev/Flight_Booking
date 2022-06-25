const fs = require('fs')
const flight = require('./../models/Flights.json')
const path = require('path')

/**
 *  1. Add/Book Flight
    2. Get all Flight
    3. Get a single Flight
    4. Update/Edit Flight
    5. Delete Flight
 */

//Home page to display the correct URL to all routes
exports.homePage = (req, res) => {
    const objects = {
        'MESSAGE': 'Test with the following url',
        'Add flight': 'localhost:3000/bookflight',
        'Get all flight': 'localhost:3000/getAllFlights',
        'get a single flight': 'localhost:3000/getSingleFlight/yourid',
        'Update flight': 'localhost:3000/updateFlight/yourid',
        'Delete flight': 'localhost:3000/deleteFlight/yourid'
    }
    return res.status(200).json(objects)
}
/** Add/Book Flight */
exports.bookFlight = async (req, res) => {
    try {
        const existingFlight = await flight
        //Save new flight to existing flight Database
        existingFlight.push(req.body)
        saveFlight(existingFlight)
        return res.status(201).json({ message: 'New flight booked' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

//Getting all booked flight
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await flight
        res.json(flights)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get a single flight
exports.getSingleFlight = async (req, res) => {
    try {
        //Fetch flight id
        let id = req.params.id
        //Find flight by id
        let foundFlight = flight.find(theFlight => {
            return String(theFlight.id) === id
        })
        if (foundFlight)
            return res.status(200).json({ flight: foundFlight })
        else
            return res.status(400).json({ message: 'Flight not found' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}
/** Update/Edit a flight */
exports.updateFlight = async (req, res) => {
    try {
        const allFlight = loadFlight()
        const id = req.params.id
        const deleteOldFlight = allFlight.filter((flight) => String(flight.id) !== id)
        if (flight.length === deleteOldFlight.length) {
            return res.status(400).json({ message: `Flight with id: ${id} not found` })
        } else {
            deleteOldFlight.push(req.body)
            saveFlight(deleteOldFlight)
            return res.status(201).json({ message: `Flight with id: ${id} updated` })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

//Delete flight
exports.deleteFlight = async (req, res) => {
    try {
        //Fetch id of flight to delete
        const allFlight = loadFlight()
        const id = req.params.id
        const flightToKeep = allFlight.filter((flight) => String(flight.id) !== id)

        if (flight.length === flightToKeep.length) {
            return res.status(400).json({ message: 'Flight not found' })
        } else {
            saveFlight(flightToKeep)
            return res.status(200).json({ message: `Flight with id ${id} deleted` })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
//Function to load flights, because many route needs this
const loadFlight = () => {
    try {
        const filePath = path.join(__dirname, '../models/Flights.json')
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        console.log(err)
    }
}
//Function to save flights, because many route needs this
const saveFlight = (data) => {
    // stringify converts the data to a string
    let stringData = JSON.stringify(data, null, 2)
    //save updated data to flight.json
    const filePath = path.join(__dirname, '../models/Flights.json')
    fs.writeFileSync(filePath, stringData)
}
