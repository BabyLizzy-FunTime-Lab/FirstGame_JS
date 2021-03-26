const express = require('express');
//var Chart = require("chart.js");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express()
const port = 4000

// enble files upload
app.use(fileUpload({
	createParentPath: true
}));

//app.use('/public', express.static(__dirname + 'public'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterlimit: 50000}));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => res.sendFile(__dirname + "/views/home.html"));




app.listen(port, () => console.log(`HTML5 & CSS3 app listening on port ${port}!`));
