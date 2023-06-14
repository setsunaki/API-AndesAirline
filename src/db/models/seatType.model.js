const { Model, DataTypes } = require('sequelize');

const SEAT_TYPE_TABLE = 'seat_type'; 

class SeatType extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: SEAT_TYPE_TABLE,
            modelName: 'seat_type',
            timestamps: false
        }
    }
}

const SeatTypeSchema = {
    seat_type_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}

module.exports = { SeatType, SeatTypeSchema };