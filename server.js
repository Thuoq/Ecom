require('dotenv').config();
const app = require('./src/app');
const port = Number(process.env.PORT) || 3032;
const server = app.listen(port, () => {
    console.log('ECOM: Listenning on port', port);
});

// process.on('SIGINT', () => {
//     server.close(() =>  {
//         console.log("ECOM: EXITS")
//     })
// })
