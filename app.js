const app = require("express")
const ex = app();
const bodyparser = require('body-parser')
var urlencoded = bodyparser.urlencoded({ extended: false })
const mysql = require('mysql2');
const async = require("hbs/lib/async");
const cat=require('./comon/category')
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'product',
    password: 'root'
})
con.connect((err) => {
    console.log('error', err)
    console.log('connected')
})
ex.set('view engine', 'hbs')
ex.get('', async (req, res) => {
    let data;
    if (req.query.id) {

        if (req.query.dl == "1") {
            await new Promise((resolve, reject) => {
                con.query('delete from category where categoryId=?',
                    [parseInt(req.query.id)], (err, result, field) => {
                        if (!err) {
                            console.log("deleted")
                            resolve(result)
                        }
                        else {
                            reject(err)
                        }
                    })
            })
        } else {
            data = await new Promise((resolve, reject) => {
                con.query('select * from category where categoryId=?', [parseInt(req.query.id)],
                    (err, result, fields) => {
                        if (!err) {
                            resolve(result)
                        }
                        else {
                            reject(err)
                        }
                    })
            })
        }
    }
    //console.log(data)
    con.query('select * from category', (err, result, fields) => {
        //console.log(result)
        res.render('form', { category: result, data: data && data.length > 0 ? data[0] : {} })

    })
})
ex.post('', urlencoded, (req, res) => {
    // console.log(req.body)
    // console.log('form submitted')
    if (req.body.id === "") {
        con.query(`insert into category(categoryName) values('${req.body.category}')`, [], (err, result, fields) => {
            if (!err)
                console.log('Inserted...');
            else
                console.log(err);
            res.redirect('/')
        })
    }
    else {
        con.query('update category set categoryName=? where categoryID=?', [req.body.category, parseInt(req.body.id)], (err, result, fields) => {
            if (!err)
                console.log('Inserted...');
            else
                console.log(err);
            res.redirect('/')
        })
    }
})
ex.get('/product', async(req,res)=>{
    let category=await cat.getAllCategory();
    let products=await prod.getAllProduct(1,10);
    console.log(products)
    res.render('product.hbs', {category, products});
})

const prod = require('./comon/product')

ex.post('/product',urlencoded,async(req,res)=>{
    await prod.insertProduct({productName: req.body.productName,categoryID: parseInt(req.body.categoryID)});
    res.redirect('/product');
})
ex.listen(3000)
