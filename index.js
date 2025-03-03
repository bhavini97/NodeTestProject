const express = require('express')
const app = express();
const bodyParser = require('body-parser'); // ;
const cors = require('cors'); 
const connection = require('./models/db')
const { data, getTables, getColumns, insertRecord, getRecords, deleteRecord } = require('./controller/userCtrl');

app.use(bodyParser.urlencoded({extended:false}))

app.use(cors()); // Allow all origins
app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/form.html')
})
app.post('/createTable', data);

app.get('/getTables',getTables)

app.get('/getColumns/:tableName', getColumns);
app.post('/insertRecord', insertRecord);
app.get('/getRecords/:tableName', getRecords);
app.delete('/deleteRecord/:tableName/:id', deleteRecord);
app.listen(3000)