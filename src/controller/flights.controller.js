const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { BoardingPass } = require('../db/models/boardingPass.model');
const { Flight } = require('../db/models/flight.model');
const { Passenger } = require('../db/models/passenger.model');
const { Seat } = require('../db/models/seat.model');

let asignedSeat = [];

const asingSeat = async (airplaneId, boardingPass) =>{
    //Asientos con el seat_type_id y airplane_id 
    // Preguntar si asignedSeat tiene registro y si tiene buscar seats pero excluir los que estan en asignedSeat
    // Obtener los IDs de los asientos asignados
    console.log("ASIENTOS YA OCUPADOS: ", asignedSeat);
    let assignedSeatIds = [];
    if (asignedSeat.length > 0) {
        assignedSeatIds = asignedSeat.map(seat => seat.seat_id);
    }
    const seats = await Seat.findAll({
        where:{
            seat_type_id: boardingPass.seat_type_id,
            airplane_id: airplaneId,
            seat_id: { [Op.notIn]: assignedSeatIds }
        },
        order: [['seat_row', 'ASC']]
    });

    // fila y columna
    seats.map(seat => seat.seat_row);
    const seatRow = seats[0].seat_row;

    seats.map(seat => seat.seat_column);
    const seatColumn = seats[0].seat_column;

    // Adjacente dentro de la fila
    const seatSameRow = await Seat.findAll({
        where: {
          seat_type_id: boardingPass.seat_type_id,
          airplane_id: airplaneId,
          seat_row : seatRow
        },
        order: [['seat_column', 'ASC']]
    });

    // Asiento en las filas superior o posterior
    const seatAdjacentRows = await Seat.findAll({
        where: {
        seat_type_id: boardingPass.seat_type_id,
        airplane_id: airplaneId,
        [Op.and]: [
            {
            [Op.or]: [
                { seat_row: seatRow - 1 },
                { seat_row: seatRow + 1 }
            ]
            },
            { seat_column: seatColumn } 
        ]
        }
    });
    
    // Combinar los asientos adyacentes de la misma fila y las filas adyacentes
    const adjacentSeats = [...seatSameRow, ...seatAdjacentRows];

    // Devolver el primer asiento adyacente disponible
    let seat = adjacentSeats.find(adjSeat => adjSeat.passenger_id === undefined);

    //Preguntar si seat esta dentro del asignedSeat
    if(asignedSeat.some(assignedSeat => assignedSeat.seat_id === seat.seat_id)){
        //si esta el seat entonces quitarlo del adjacentSeats y devolver el siguiente asiento que encuentre
        // Obtener los asientos de asignedSeat que están en adjacentSeats
        const adjacentSeatsToRemove = adjacentSeats.filter(
            adjSeat => asignedSeat.some(assignedSeat => assignedSeat.seat_id === adjSeat.seat_id)
        );
        // Eliminar los asientos de adjacentSeats que están en asignedSeat
        adjacentSeatsToRemove.forEach(adjSeat => {
            const index = adjacentSeats.findIndex(seat => seat.seat_id === adjSeat.seat_id);
            if (index !== -1) {
            adjacentSeats.splice(index, 1);
            }
        });
        //Saca el siguiente asiento disponible
        seat = adjacentSeats.find(adjSeat => adjSeat.passenger_id === undefined);

        asignedSeat.push(seat);

    }else{
        //Si no esta el asiento entonces devolver el seat y agregarlo al asignedSeat
        asignedSeat.push(seat);
    }
    //devolver el asiento disponible
    return seat;
}

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

            try{
                let seat =await asingSeat(flight.airplane_id, boarding);
            
                passenger.push({
                    passengerId: passengers.passenger_id,
                    dni: passengers.dni,
                    name: passengers.name,
                    age: passengers.age,
                    country: passengers.country,
                    boardingPassId: boarding[0].boarding_pass_id,
                    purchaseId: boarding[0].purchase_id,
                    seatTypeId: boarding[0].seat_type_id,
                    seatId: seat.seat_id
                });
            }catch(error){
                passenger.push({
                    passengerId: passengers.passenger_id,
                    dni: passengers.dni,
                    name: passengers.name,
                    age: passengers.age,
                    country: passengers.country,
                    boardingPassId: boarding[0].boarding_pass_id,
                    purchaseId: boarding[0].purchase_id,
                    seatTypeId: boarding[0].seat_type_id,
                    seatId: null
                });
            }

            
        }else{
            //Mas de una tarjeta de embarque
            for (const boardingPass of boarding){
                const passengers = await Passenger.findByPk(boardingPass.passenger_id);
                
                // Sacar el id avion 
                const airplane = await Flight.findByPk(boardingPass.flight_id);

                //Llamar funcion asignSeat y pasar el passengers.passenger_id y el airplane.airplane_id
                try{
                    let seat =await asingSeat(airplane.airplane_id, boardingPass);
                    
                    passenger.push({
                        passengerId: passengers.passenger_id,
                        dni: passengers.dni,
                        name: passengers.name,
                        age: passengers.age,
                        country: passengers.country,
                        boardingPassId: boardingPass.boarding_pass_id,
                        purchaseId: boardingPass.purchase_id,
                        seatTypeId: boardingPass.seat_type_id,
                        seatId:  seat.seat_id 
                    });

                }catch(error){
                
                    passenger.push({
                        passengerId: passengers.passenger_id,
                        dni: passengers.dni,
                        name: passengers.name,
                        age: passengers.age,
                        country: passengers.country,
                        boardingPassId: boardingPass.boarding_pass_id,
                        purchaseId: boardingPass.purchase_id,
                        seatTypeId: boardingPass.seat_type_id,
                        seatId:  null 
                    });
                }
                
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