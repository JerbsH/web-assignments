'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req,res) => {
	const name = "name";
	const age = "age";
	const weight = "weight";
	const content = {name, age, weight};
	res.render('index', content);
})

app.get("/catinfo", (req, res) => {
	const cat = {
	  name: "Frank",
	  birthdate: "2010-12-25",
	  weight: 5,
	};
	res.json(cat);
  });
 