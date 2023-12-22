const express = require('express');
const app = express();
require('dotenv').config();
const andarBaharRoutes = require('./routes/andarBaharRoutes');
const loginRouter = require('./routes/loginRoutes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//use routes
app.use('/andarBahar',andarBaharRoutes);

app.use('/login',loginRouter);


const server = app.listen(process.env.PORT , ()=>{
    console.log(`server listen at http://localhost:${process.env.PORT}`);
});


