const express = require("express");
const mysql = require('mysql');
const formidable = require('formidable');

// const bodyparser = require('body-parser');
//const serverless=require('serverless-http');
const app = express();
const crypto = require("crypto"); 
const {validationResult} = require('express-validator')
// app.use(bodyparser.json());
var cors = require('cors')


app.use(express.json());       
app.use(express.urlencoded());


const port = 3080;

app.use(cors());

app.listen(port, () => {
	console.log(`Your server ⚡ is running 🏃‍♂️ on http://localhost:${port}`);
  });
  
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//sql connection 
var sqlconnect= mysql.createConnection({
  host : 'localhost',
  user:'root',
  password : 'mysqlpython3.764',
  database : 'nitcsell',
  multipleStatements : true
});

sqlconnect.connect((err)=> {
  if(!err)
  console.log('Connection Established Successfully');
  else
  console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


  //ADD A NEW PRODUCT
app.post('/sell', (req, res) => {
	const form = formidable({ multiples: true });
	form.parse(req, (err, fields, files) => {
		console.log(fields);
		let id = crypto.randomBytes(6).toString("hex");
		let reg = fields.REG_ID;
		let name = fields.NAME;
		let cost = fields.COST;
		let images = fields.IMAGES;
		let brand = fields.BRAND;
		let dop = fields.DATE_OF_PURCHASE;
		let descp = fields.DESCP;
		let def = fields.DEFECTS;
		var sql = "INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?,?)";
		sqlconnect.query(sql, [id, reg, name, cost, images, brand, dop, descp, def], (err, rows, fields) => {
		if (!err)
		res.send('1');
		else
		res.send('0');
		});
	});
  });
  //GET PRODUCT INFO
app.get('/sell' , (req, res) => {
	sqlconnect.query('SELECT * FROM products', (err, rows, fields) => {
	  if (!err)
		  res.send(rows);
	  else
		  console.log(err);
  })
});

app.get('/sell/:id' , (req, res) => {
	sqlconnect.query('SELECT * FROM products where products.ID = ?', [req.params.id], (err, rows, fields) => {
	  if (!err)
		  res.send(rows);
	  else
		  console.log(err);
  })
});

app.delete('/sell/:id', (req, res) => {
	sqlconnect.query('DELETE FROM products WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Data deleted successfully.');
	else
		console.log(err);
	})
});

app.put('/sell/:id', (req, res) => {
	const form = formidable({ multiples: true });
	form.parse(req, (err, fields, files) => {
		console.log(fields);
		let cost = fields.COST;
		let images = fields.IMAGES;
		let brand = fields.BRAND;
		let dop = fields.DATE_OF_PURCHASE;
		let descp = fields.DESCP;
		let def = fields.DEFECTS;
		// console.log("buha",cost==null,images,specs,req.params.id);
		if(cost != null)
			var sql = "UPDATE products SET cost=? WHERE ID=?";
			sqlconnect.query(sql, [cost, req.params.id], (err, rows, fields) => {
			// if (!err)
			// 	res.send('COST Updated Successfully');
			// else
			if(err)
				console.log(err);
			})
		if(images != null){
			var sql = "UPDATE products SET images=? WHERE ID=?";
			sqlconnect.query(sql, [images, req.params.id], (err, rows, fields) => {
			// if (!err)
			// 	res.send('IMAGES Updated Successfully');
			// else
			if(err)
				console.log(err);
			})
		}
		if(brand != null){
			var sql = "UPDATE products SET brand=? WHERE ID=?";
			sqlconnect.query(sql, [brand, req.params.id], (err, rows, fields) => {
			// if (!err)
			// 	res.send('BRAND Updated Successfully');
			// else
			if(err)
				console.log(err);
			})
		}
		if(dop != null){
			var sql = "UPDATE products SET date_of_purchase=? WHERE ID=?";
			sqlconnect.query(sql, [dop, req.params.id], (err, rows, fields) => {
			// if (!err)
			// 	res.send('BRAND Updated Successfully');
			// else
			if(err)
				console.log(err);
			})
		}
		if(descp != null){
			var sql = "UPDATE products SET descp=? WHERE ID=?";
			sqlconnect.query(sql, [descp, req.params.id], (err, rows, fields) => {
			// if (!err)
			// 	res.send('BRAND Updated Successfully');
			// else
			if(err)
				console.log(err);
			})
		}
		if(def != null){
			var sql = "UPDATE products SET defects=? WHERE ID=?";
			sqlconnect.query(sql, [def, req.params.id], (err, rows, fields) => {
			// if (!err)
			// 	res.send('BRAND Updated Successfully');
			// else
			if(err)
				console.log(err);
			})
		}
	});

});

app.post('/user', (req, res) => {
	const form = formidable({ multiples: true });
	form.parse(req, (err, fields, files) => {
		console.log(fields);
		let reg = fields.REG_ID;
		let name = fields.USERNAME;
		let email = fields.EMAIL_ID;
		let contact  = fields.CONTACTNO;
		let pwd = fields.PASSWORD;
		var sql = "INSERT INTO user VALUES(?,?,?,?,?)";
		sqlconnect.query(sql, [reg, name, email, contact, pwd], (err, rows, fields) => {
		if (!err)
		res.send('USER DETAILS ADDED');
		else
		console.log(err);
		});
	});
});

app.post('/login', (req, res) => {
	const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        
        console.log(fields);
		let name = fields.USERNAME;
		let pwd = fields.PASSWORD;
		console.log(name, pwd);
		var sql = "SELECT * FROM user WHERE PASSWORD = ? AND USERNAME = ?";
		sqlconnect.query(sql, [pwd, name], (err, rows, fields) => {
			console.log(rows.length)
		if (rows.length==1)
		res.send('1');
		else
		res.send('0')
		});
    });
});

app.get('/user/:id' , (req, res) => {
	sqlconnect.query('SELECT * FROM user where user.REG_ID = ?', [req.params.id], (err, rows, fields) => {
	  if (!err)
		  res.send(rows);
	  else
		  console.log(err);
  })
});
app.delete('/user/:id', (req, res) => {
	sqlconnect.query('DELETE FROM user WHERE ID = ?', [req.params.id], (err, rows, fields) => {
	if (!err)
		res.send('Data deleted successfully.');
	else
		console.log(err);
	})
});

app.put('/user/:id', (req, res) => {
	const form = formidable({ multiples: true });
	form.parse(req, (err, fields, files) =>{
		console.log(fields);
		let uname = fields.USERNAME;
		let pwd = fields.PASSWORD;
		if(uname != null)
			var sql = "UPDATE user SET username=? WHERE REG_ID=?";
			sqlconnect.query(sql, [uname, req.params.id], (err, rows, fields) => {
			if(err)
				console.log(err);
			})
		if(pwd != null){
			var sql = "UPDATE user SET password=? WHERE REG_ID=?";
			sqlconnect.query(sql, [pwd, req.params.id], (err, rows, fields) => {
			if(err)
				console.log(err);
			})
		}
	})

});