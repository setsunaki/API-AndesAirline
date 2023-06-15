const FlightService = require('../service/flights.service');
const service = new FlightService();

const getById = async (req, res) =>{
    try{
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getById
};