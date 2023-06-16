const { Op } = require('sequelize');
const { Seat } = require('../db/models/seat.model');
const { BoardingPass } = require('../db/models/boardingPass.model');

class AssignSeat {
  constructor() {}

  // Asignar asiento
  async assignSeat(passenger, seatTypeId, airplaneId) {
    let seat;

    // Si es menor de edad
    if (passenger.age < 18) {
      // Buscar acompañante mayor de edad
      const accompanyingPassenger = await BoardingPass.findOne({
        where: {
          purchase_id: passenger.purchaseId,
          age: { [Op.gte]: 18 }
        }
      });

      if (accompanyingPassenger) {
        // Buscar el asiento al lado del adulto
        seat = await Seat.findOne({
          where: {
            seat_id: accompanyingPassenger.seatId,
            seat_type_id: seatTypeId,
            airplane_id: airplaneId
          }
        });

        if (seat) {
          // fila y columna
          const { seat_row, seat_column } = seat;

          // Adjacente dentro de la fila
          const seatSameRow = await Seat.findAll({
            where: {
              seat_type_id: seatTypeId,
              airplane_id: airplaneId,
              seat_row,
              seat_column: { [Op.ne]: seat_column } // Sacamos el asiento entregado
            },
            order: [['seat_column', 'ASC']]
          });

          // Asiento en las filas superior o posterior
          const seatAdjacentRows = await Seat.findAll({
            where: {
              seat_type_id: seatTypeId,
              airplane_id: airplaneId,
              [Op.and]: [
                {
                  [Op.or]: [
                    { seat_row: seat_row - 1 },
                    { seat_row: seat_row + 1 }
                  ]
                },
                { seat_column: seat_column } // Misma columna que el asiento proporcionado
              ]
            }
          });

          // Combinar los asientos adyacentes de la misma fila y las filas adyacentes
          const adjacentSeats = [...seatSameRow, ...seatAdjacentRows];

          // Devolver el primer asiento adyacente disponible
          seat = adjacentSeats.find(adjSeat => adjSeat.passenger_id === null);
        }
      }
    } else {
      // Asiento disponible
      seat = await Seat.findOne({
        where: {
          seat_type_id: seatTypeId,
          airplane_id: airplaneId,
          passenger_id: null // Asiento no asignado a ningún pasajero
        },
        order: [['seat_id', 'ASC']]
      });
    }

    return seat;
  }
}

module.exports = AssignSeat;