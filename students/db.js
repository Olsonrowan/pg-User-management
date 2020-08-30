const {Pool} = require('pg');
const {PASSWORD} =process.env;
const {HOST} = process.env;
const {DB_PORT} = process.env;
const pool = new Pool({
    user: 'postgres',
    host: HOST,
    database: 'postgres',
    password: PASSWORD, //my pw
    port: DB_PORT,
  })
pool.connect();

const query = (text, params, callback) => {
    return pool.query(text, params, (err, res) =>{
        console.log('simple query');
        // console.log(res.rows);
        callback(err, res)
    }) 
}
module.exports = {
    query,
  }