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
        primaryKey: true
    },
    passenger_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    seat_type_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    seat_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    flight_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}

BoardingPass.belongsTo(Purchase, { foreignKey: 'purchase_id' });
BoardingPass.belongsTo(Passenger, { foreignKey: 'passenger_id' });
BoardingPass.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
BoardingPass.belongsTo(Seat, { foreignKey: 'seat_id' });
BoardingPass.belongsTo(Airplane, { foreignKey: 'airplane_id' });

module.exports = { BoardingPass, BoardingPassSchema };