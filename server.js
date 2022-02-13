const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require('./models');
const Role = db.role;

//Update table user
//const User = db.user;
//db.sequelize.sync();
//User.sync({ alter: true });

// force: true will drop the table if it already exists

/*
 db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   initial();
 });*/



// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/document.routes')(app);
require('./routes/article.routes')(app);
require('./routes/type.routes')(app);
require('./routes/domaine.routes')(app);
require('./routes/organisme.routes')(app);
require('./routes/status.routes')(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(express.static('public'));

/*
// CREATE TABLES
function initial() {

    // CREATE ROLES
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
    
}

app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post('/upload', (req, res) => {
  console.log("entra aquí");
      if (!req.files) {
          return res.status(500).send({ msg: "file is not found" })
      }
          // accessing the file
      const myFile = req.files.file;
  
      if(myFile.mimetype == 'application/pdf'){
        console.log("es doc pdf");
            //  mv() method places the file inside public directory
      myFile.mv(`${__dirname}/public/docs/${myFile.name}`, function (err) {
        console.log(`${__dirname}/public/docs/${myFile.name}`);
          if (err) {
              console.log(err)
              return res.status(500).send({ msg: "Error occured" });
          }
          // returing the response with file path and name
          return res.send({name: myFile.name, path: `/${myFile.name}`});
      });
      }
  })

*/