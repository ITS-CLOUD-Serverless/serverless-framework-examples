'use strict';

module.exports.ip_lookup = async (event) => {

  const ip = "xxx.xxx.xxx.xxx";
  const userAgent = "Mozilla? Chrome? Boh!"

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Your IP is',
        ip,
        userAgent
      },
      null,
      2
    ),
  };
};
