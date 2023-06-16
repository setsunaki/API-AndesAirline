const FlightService = require('../service/flights.service');
const service = new FlightService();

const getById = async (req, res) =>{
    try{
        const { id } = req.params;
        const response = await service.findOne(id);

        if(Object.keys(response).length === 0){
            res.status(404).json({
                code: 404,
                data: response
            });
        }else{
            res.status(200).json({
                code: "200",
                data: response
            });
        }
        

    }catch(error){
        res.status(400).json({
            code: 400,
            errors: "could not connect to db"
        });
    }
}

module.exports = {
    getById
};