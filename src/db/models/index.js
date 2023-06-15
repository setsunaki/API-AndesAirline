const { SeatType, SeatTypeSchema } = require('./seatType.model');
const { Passenger, PassengerSchema } = require('./passenger.model');
const { Airplane, AirplaneSchema } = require('./airplane.model');
const { Purchase, PurchaseSchema } = require('./purchase.model');
const { Flight, FlightSchema } = require('./flight.model');
const { BoardingPass, BoardingPassSchema } = require('./boardingPass.model');
const { Seat, SeatSchema } = require('./seat.model');

function setupModels(sequelize){
    SeatType.init(SeatTypeSchema, SeatType.config(sequelize));
    Passenger.init(PassengerSchema, Passenger.config(sequelize));
    Airplane.init(AirplaneSchema, Airplane.config(sequelize));
    Purchase.init(PurchaseSchema, Purchase.config(sequelize));
    Flight.init(FlightSchema, Flight.config(sequelize));
    Seat.init(SeatSchema, Seat.config(sequelize));
    BoardingPass.init(BoardingPassSchema, BoardingPass.config(sequelize));
}

module.exports = setupModels;