# Andes Airlines
La aerolínea Andes Airlines, está evaluando comenzar sus operaciones en países de latinoamérica. Para esto, necesita saber si es posible realizar un check-in automático de sus pasajeros.
## Solucion
Para resolver la problematica se creo una API con una sola respuesta, la cual nos trae los datos del pasajero, ademas de ser agrupados en caso de tener mas de una tarjeta de embarque.
**Como ejecutar la solucion**
Para ejecutar y obtener los datos de la API, hay que ingresar al siguiente link [Check-in](http://api-andesairline-production.up.railway.app/flights/3/passanger "Check-in"), en el cual se debera ingresar el numero de compra(id de la compra) en la url ***/flights/numero_de_compra/passenger ***
Esta devolvera los datos del vuelo tales como aeropuerto de salida y destino, los datos del pasajero como nacionalidad, edad, asiento asignado.
## Tecnologia utilizadas
Para la realizacion de la solcion se utilizo Node.js con el framework Express con una base de datos Mysql ademas para el manejo del ORM de la base de datos se utilizo Sequelize.
### Instalacion de paquetes
***Importante:*** tener instalado una version de Node.js 8 o mas.

  Instalar Express
   ` npm install express --save`
	
 Instalar Sequelize
    ` npm install sequelize --save`
	
 Instalar Mysql2
   `  npm install mysql2`
   
Instalar dotenv
 `npm install dotenv --save`
 
Instalar cors
` npm install cors --save`

