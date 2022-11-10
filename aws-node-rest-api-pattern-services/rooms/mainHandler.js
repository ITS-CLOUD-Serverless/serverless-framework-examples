'use strict';

const { reader } = require('./workers/reader.js');
const { writer } = require('./workers/writer.js');

module.exports.main = (event, context, callback) => {

    console.log(event);
    const { 
        requestContext,
        body: bodyRequest
    } = event;
    const { http } = requestContext;
    const { method } = http;

    let code = 503;
    let body = JSON.stringify({
        message: 'Service fail'
    });
    
    let responseHttp = {
        statusCode: code,
        headers: { 
            'Content-Type': 'application/json' 
        },
        body
    };
    
    switch(method) {
        case 'POST':
        case 'PATCH':
            writer(callback, responseHttp, bodyRequest);   
            break;
        default:
            reader(callback, responseHttp);         
    }     
};
