const { Model, DataTypes } = require('sequelize');

const { Purchase } = require('./purchase.model');
const { Passenger } = require('./passenger.model');
const { SeatType } = require('./seatType.model');
const { Seat } = require('./seat.model');
const { Flight } = require('./flight.model');

const BOARDING_PASS_TABLE = 'boarding_pass'; 

class BoardingPass extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: BOARDING_PASS_TABLE,
            modelName: 'boarding_pass',
            timestamps: false
        }
    }
}

const BoardingPassSchema = {
    boarding_pass_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    purchase_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Purchase,
            key: 'purchase_id'
        }
    },
    passenger_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Passenger,
            key:'passenger_id'
        }
    },
    seat_type_id:{
        type: DataTypes.INTEGER,
        references: {
            model: SeatType,
            key: 'seat_type_id'
        }
    },
    seat_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Seat,
            key: 'seat_id'
        }
    },
    flight_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Flight,
            key: 'flight_id'
        }
    }
}

module.exports = { BoardingPass, BoardingPassSchema };