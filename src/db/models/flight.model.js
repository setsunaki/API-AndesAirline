const { Model, DataTypes } = require('sequelize');
const { Airplane } = require('./airplane.model');

const FLIGHT_TABLE = 'flight'; 

class Flight extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: FLIGHT_TABLE,
            modelName: 'flight',
            timestamps: false
        }
    }
}

const FlightSchema = {
    flight_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    takeoff_date_time: {
        type: DataTypes.INTEGER
    },
    takeoff_airport: {
        type: DataTypes.STRING
    },
    landing_date_time: {
        type: DataTypes.INTEGER
    },
    landing_airport: {
        type: DataTypes.STRING
    },
    airplane_id: {
        type: DataTypes.INTEGER,
        refereces:{
            model: Airplane,
            key: 'airplane_id'
        }    
    }
}


module.exports = { Flight, FlightSchema };