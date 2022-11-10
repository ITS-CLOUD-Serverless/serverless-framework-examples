'use strict';

const { reader } = require('./workers/reader.js');
const writer = require('./workers/writer.js');

const main = async (event, context, callback) => {

    const { requestContext } = event;
    const { method } = requestContext;

    let code = 503;
    let body = {
        message: 'Service fail'
    };

    let responseHttp = {
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        switch(method) {
            case 'POST':
            case 'PATCH':
                const writeResult = writer();
                code = writeResult.code;
                body = writeResult.body;
                break;
            default:
                const readResult = await reader();
                code = readResult.code;
                body = readResult.body;              
        }

        body = JSON.stringify(body);    
        responseHttp = {
            ...responseHttp,
            statusCode: code,
            body
        }

    
    } catch (e) {
        console.error(e);
        callback(null, e);
    }   
};

module.exports.main = main;