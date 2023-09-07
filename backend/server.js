require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/', workoutRoutes)

// //routes
// app.get('/', (req, res) => {
//     res.json({ message: 'welcome to the app'});
// });

//connected to db
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    //listens to port
   app.listen(process.env.PORT, () => {
     console.log(' connected to db and listened to port', process.env.PORT);
})
console.log('connected to db');

  })
  .catch((error) => {
    console.log(error)
  });

//listens to port
// app.listen(process.env.PORT, () => {
//     console.log('listened to port', process.env.PORT);
// })

           

//npm run dev  