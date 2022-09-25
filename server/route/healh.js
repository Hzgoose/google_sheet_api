const dotenv = require('dotenv');

dotenv.config({path: `${appRoot}/.env`});


const appRouter = function (app, express) {

    let authPatient = express.Router();

    authPatient.get('/', function(request, response) {
        response.json({
            name: "google api nsn",
            status: "OK"
        })
    });

    console.log('status Running..');
    app.use('/api/v1.0/', authPatient);
};

module.exports = appRouter;
