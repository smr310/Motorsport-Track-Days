'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://dbuser1:dbpw1@ds221609.mlab.com:21609/node_cap_db';
//exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-blog-app';
exports.PORT = process.env.PORT || 8080;


//mongodb://<dbuser>:<dbpassword>@ds99999.mlab.com:9999/node-restaurants-app