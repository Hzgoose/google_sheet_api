const responseUtil = require("../util/response");
const validator = require('../validate/schema');
const res = require('../util/response');
const common_util = require('../util/common_util');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const dotenv = require('dotenv');
const creds = require("../../config/nsn.json");
dotenv.config({path: `${appRoot}/.env`});

async function createIfNotExists(doc, titleSheet) {
    if (doc.sheetsByTitle[titleSheet] === undefined) {
        const template = doc.sheetsByTitle[process.env.GOOGLE_SHEET_TEMPLATE];
        await template.duplicate({title: titleSheet, index: 0, id: Math.floor(+new Date() / 1000)})
    }
}

exports.addGoogleRow = async function(request, response){
    if (!validator.validateCreateRow(request.body)){
        response.status(responseUtil.BAD_CODE).send(res.error(res.BAD_CODE, "invalid input"));
        return
    }

    let data = [
        request.body.orderID,
        request.body.district,
        request.body.phone,
        request.body.customer,
        request.body.address,
        request.body.note_to_shop || '',
        request.body.note_to_customer || '',
        request.body.isConfirmByCall || true,
        request.body.kgRequest,
        request.body.kgActually,
        request.body.price,
        request.body.totalPrice,
        request.body.shipFee,
        request.body.total,
        request.body.discount,
    ]

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_FILE);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    let titleSheet = common_util.today();
    await createIfNotExists(doc, titleSheet)
    const sheet = await doc.sheetsByTitle[titleSheet]

    let rows = await sheet.getRows();
    for (let i = 0; i < rows.length; i ++) {
        if (rows[i]._rawData[0] === request.body.orderID){
            response.status(responseUtil.BAD_CODE).send(res.error(res.BAD_CODE, "exists orderID"));
            return
        }
    }

    await sheet.addRow(data)
    response.status(200).send(res.response());
    return
};

exports.updateGoogleRow = async function(request, response){
    if (!validator.validateCreateRow(request.body)){
        response.status(responseUtil.BAD_CODE).send(res.error(res.BAD_CODE, "invalid input"));
        return
    }

    let data = [
        request.body.orderID,
        request.body.district,
        request.body.phone,
        request.body.customer,
        request.body.address,
        request.body.note_to_shop || '',
        request.body.note_to_customer || '',
        request.body.isConfirmByCall || true,
        request.body.kgRequest,
        request.body.kgActually,
        request.body.price,
        request.body.totalPrice,
        request.body.shipFee,
        request.body.total,
        request.body.discount,
    ]

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_FILE);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    let titleSheet = common_util.today();
    await createIfNotExists(doc, titleSheet)
    const sheet = await doc.sheetsByTitle[titleSheet]

    let rows = await sheet.getRows();
    for (let i = 0; i < rows.length; i ++) {
        if (rows[i]._rawData[0] === request.body.orderID) {
            await sheet.clearRows({start: rows[i]._rowNumber, end: rows[i]._rowNumber})
            break
        }
    }

    await sheet.addRow(data)
    response.status(200).send(res.response());
    return
};
