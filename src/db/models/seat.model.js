const { Model, DataTypes } = require('sequelize');
const { SeatType } = require('./seatType.model');
const { Airplane } = require('./airplane.model');

const SEAT_TABLE = 'seat'; 

class Seat extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: SEAT_TABLE,
            modelName: 'seat',
            timestamps: false
        }
    }
}

const SeatSchema = {
    seat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    seat_column: {
        type: DataTypes.STRING
    },
    seat_row: {
        type: DataTypes.INTEGER
    },
    seat_type_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
    },
    airplane_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}

Seat.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
Seat.belongsTo(Airplane, { foreignKey: 'airplane_id' });

module.exports = { Seat, SeatSchema };