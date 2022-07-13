import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

//setting up bodyparser we set limit because we will be sending images in our app
app.use(bodyParser.json({ limit : "30mb", extended : true }));
app.use(bodyParser.urlencoded({ limit : "30mb", extended : true }));
app.use(cors());

//all the routes in posts.js will start with -> localhost:5000/posts
app.use('/posts', postRoutes);
app.use('/user', userRoutes);


//const CONNECTION_URL = "mongodb+srv://bhanusngr362:bhanusngr362@cluster0.7ifli.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//this will connect our backend to mongodb database and run our application on PORT 
//the useNewUrlParser and useUnifiedTopology are not necessary but might throw some error in condsole if not uysed
mongoose.connect(process.env.CONNECTION_URL , { useNewUrlParser:true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, () => console.log(`server is listening to port : ${PORT}`)))
    .catch((error) => console.log("error",error.message));

//makes sure we dont get any warning in console
//mongoose.set('useFindAndModify', false);