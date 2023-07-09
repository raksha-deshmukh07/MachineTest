const async = require('hbs/lib/async');
const mysql = require('mysql2');
const insertProduct=async(prod)=>{
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'product',
        password: 'root'
    })
    let r = await new Promise((resolve,reject)=>{
        con.query('insert into product(productName,categoryId) values(?,?)',[prod.productName,prod.categoryID],(err,result,fields)=>{
            if(err)
                console.log(err);
            resolve(result);
        })
    })

    return r ? true : false;
}
const getAllProduct=async(page,no_of_records)=>{
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'product',
        password: 'root'
    })

    let pg=(page - 1)*no_of_records;

    let r = await new Promise((resolve,reject)=>{
        con.query(`select * from product limit ${pg}, ${no_of_records}`,[],(err,result,fields)=>{
            if(err)
                console.log(err);
            resolve(result);
        })
    })
return r;
}
module.exports={insertProduct,getAllProduct};