const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { BoardingPass } = require('../db/models/boardingPass.model');
const { Flight } = require('../db/models/flight.model');
const { Passenger } = require('../db/models/passenger.model');
const { Seat } = require('../db/models/seat.model');

const getById = async (req, res) =>{
    try{
        let respuesta = {};
        let passenger = [];
        const {id} = req.params;

        // Obtener datos del pasajero con el id de compra
        const boarding = await BoardingPass.findAll({ where: { purchase_id: id } });
        
        // Datos del vuelo según el id del Pase de abordaje
        const flight = await Flight.findByPk(boarding[0].flight_id);

        // Una sola tarjeta de embarque
        if (boarding.length === 1){
            const passengers = await Passenger.findByPk(boarding[0].passenger_id);
            
            passenger.push({
                passengerId: passengers.passenger_id,
                dni: passengers.dni,
                name: passengers.name,
                age: passengers.age,
                country: passengers.country,
                boardingPassId: boarding[0].boarding_pass_id,
                purchaseId: boarding[0].purchase_id,
                seatTypeId: boarding[0].seat_type_id,
                seatId: boarding[0].seat_id
            });

            
        }else{
            //Mas de una tarjeta de embarque
            for (const boardingPass of boarding){
                const passengers = await Passenger.findByPk(boardingPass.passenger_id);
                
                // Sacar el id avion 
                const airplane = await Flight.findByPk(boardingPass.flight_id);
                
                passenger.push({
                    passengerId: passengers.passenger_id,
                    dni: passengers.dni,
                    name: passengers.name,
                    age: passengers.age,
                    country: passengers.country,
                    boardingPassId: boardingPass.boarding_pass_id,
                    purchaseId: boardingPass.purchase_id,
                    seatTypeId: boardingPass.seat_type_id,
                    //seatId:  seat.seat_id 
                });
                
            }  
             
        }
        //datos devueltos
        respuesta={
            flightId: flight.flight_id,
            takeoffDateTime: flight.takeoff_date_time,
            takeoffAirport: flight.takeoff_airport,
            landingDateTime: flight.landing_date_time,
            landingAirport: flight.landing_airport,
            airplaneId: flight.airplane_id,
            passenger
        }; 
       
        res.status(200).json({
            code: "200",
            data: respuesta
        });      

    }catch(error){
        res.status(400).json({
            code: 400,
            errors: "could not connect to db"
        });
    }
}

module.exports = {
    getById
};