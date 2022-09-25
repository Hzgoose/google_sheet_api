const google_api = require('../controller/google_api');
const dotenv = require('dotenv');

dotenv.config({path: `${appRoot}/.env`});


const appRouter = function (app, express) {

    let apiWebRoutes = express.Router();

    apiWebRoutes.post('/', function(request, response) {
        google_api.addGoogleRow(request, response);
    });

    apiWebRoutes.put('/', function(request, response) {
        google_api.updateGoogleRow(request, response);
    });

    console.log('api Running..');
    app.use('/api/v1.0/google', apiWebRoutes);
};

module.exports = appRouter;
