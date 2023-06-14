const { SeatType, SeatTypeSchema } = require('./seatType.model');
const { Passenger, PassengerSchema } = require('./passenger.model');
const { Airplane, AirplaneSchema } = require('./airplane.model.js');
const { Flight, FlightSchema } = require('./flight.model');
const { Purchase, PurchaseSchema } = require('./purchase.model');
const { BoardingPass, BoardingPassSchema } = require('./boardingPass.model');


function setupModels(sequelize){
    SeatType.init(SeatTypeSchema, SeatType.config(sequelize));
    Passenger.init(PassengerSchema, Passenger.config(sequelize));
    Airplane.init(AirplaneSchema, Airplane.config(sequelize));
    Flight.init(FlightSchema, Flight.config(sequelize));
    Purchase.init(PurchaseSchema, Purchase.config(sequelize));
    BoardingPass.init(BoardingPassSchema, Boarding.config(sequelize));
}

module.exports = setupModels;