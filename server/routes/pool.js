var mysql=require('mysql');
var connect =mysql.createConnection({
    // host:'sql6.freemysqlhosting.net',
    // user:'sql6448665',
    // password:'rBnnRyQvUT',
    // database:'sql6448665',
    // connectionLimit:10

    host:'localhost',
    user:'root',
    password:'',
    database:'manageclassrooms',
    connectionLimit:10
})
module.exports=connect;
