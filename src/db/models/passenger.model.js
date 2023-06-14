const { Model, DataTypes } = require('sequelize');

const PASSENGER_TABLE = 'passenger'; 

class Passenger extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: PASSENGER_TABLE,
            modelName: 'passenger',
            timestamps: false
        }
    }
}

const PassengerSchema = {
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    dni: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING
    }
}

module.exports = { Passenger, PassengerSchema };