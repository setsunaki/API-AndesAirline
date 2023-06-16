const { models } = require('../libs/sequelize');
const { BoardingPass } = require('../db/models/boardingPass.model');
const { Flight } = require('../db/models/flight.model');
const { Passenger } = require('../db/models/passenger.model');

const AssignSeat = require('./asignSeat.service');
const asing = new AssignSeat(); 

class BoardingService {
    
    constructor(){}

    async findOne(id) {
        let res = {};
        let passenger = [];

        // Obtener datos del pasajero con el id de compra
        const boarding = await BoardingPass.findAll({ where: { purchase_id: id } });

        // Datos del vuelo según el id del Pase de abordaje
        const flight = await Flight.findByPk(boarding[0].flight_id);

        // Una sola tarjeta de embarque
        if (boarding.length === 1){
            const passengers = await Passenger.findByPk(boarding[0].passenger_id);
            //const seat = await asing.assignSeat(passengers, boarding[0].seat_type_id, flight.airplane_id);
            
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

            //console.log("ASIENTO DISPONIBLE: ",seat.seat_id);

        }else{
            //Mas de una tarjeta de embarque
            for (const boardingPass of boarding){
                const passengers = await Passenger.findByPk(boardingPass.passenger_id);
                //const seat = await asing.assignSeat(passengers, boardingPass.seat_type_id, flight.airplane_id);

                passenger.push({
                    passengerId: passengers.passenger_id,
                    dni: passengers.dni,
                    name: passengers.name,
                    age: passengers.age,
                    country: passengers.country,
                    boardingPassId: boardingPass.boarding_pass_id,
                    purchaseId: boardingPass.purchase_id,
                    seatTypeId: boardingPass.seat_type_id,
                    seatId: boarding[0].seat_id
                });

                //console.log("ASIENTO DISPONIBLE: ",seat);
            }   
        }
                
        //datos devueltos
        res={
            flightId: flight.flight_id,
            takeoffDateTime: flight.takeoff_date_time,
            takeoffAirport: flight.takeoff_airport,
            landingDateTime: flight.landing_date_time,
            landingAirport: flight.landing_airport,
            airplaneId: flight.airplane_id,
            passenger
        };   

        return res;
    }

}

module.exports = BoardingService;