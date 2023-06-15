const { models } = require('../libs/sequelize');


class BoardingService {
    
    constructor(){}

    //Busca por id
    async findOne(id){
        const res = await models.BoardingPass.findByPk(id);
        return res;
    }

}

module.exports = BoardingService;