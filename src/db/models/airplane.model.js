const { Model, DataTypes } = require('sequelize');

const AIRPLANE_TABLE = 'airplane'; 

class Airplane extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: AIRPLANE_TABLE,
            modelName: 'airplane',
            timestamps: false
        }
    }
}

const AirplaneSchema = {
    airplane_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}

module.exports = { Airplane, AirplaneSchema };