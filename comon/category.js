const mysql = require('mysql2');

const getAllCategory = async () => {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'product',
        password: 'root'
    })
    return await new Promise((resolve, reject) => {
        con.connect((err) => {
    
            con.query('select * from category', (err, result, fields) => {
                //console.log(result)
                //res.render('form', { category: result, data: data && data.length > 0 ? data[0] : {} })
               resolve(result);
            })
        })
    })

}

module.exports = { getAllCategory };