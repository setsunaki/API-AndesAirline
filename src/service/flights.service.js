const { models } = require('../libs/sequelize');
const { BoardingPass } = require('../db/models/boardingPass.model');

class BoardingService {
    
    constructor(){}

    //Busca por id
    async findOne(id){
        
        const res = await BoardingPass.findOne({where:{
            boarding_pass_id: id
        }});
        console.log(res.passenger_id);
        return res;
    }

}

module.exports = BoardingService;