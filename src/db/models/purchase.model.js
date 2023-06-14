const { Model, DataTypes } = require('sequelize');

const PURCHASE_TABLE = 'purchase'; 

class Purchase extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: PURCHASE_TABLE,
            modelName: 'purchase',
            timestamps: false
        }
    }
}

const PurchaseSchema = {
    purchase_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    purchase_date:{
        type: DataTypes.INTEGER
    }
}

module.exports = { Purchase, PurchaseSchema };