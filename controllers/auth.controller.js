const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role; 
const Status = db.status;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    genre: req.body.genre,
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateNaissance: req.body.dateNaissance,
    entreprise: req.body.entreprise,
    profil: req.body.profil,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

  // Update an user by the id in the request
  exports.update = (req, res) => {
    const username = req.params.username;
  
    User.update(req.body, {
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "username was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update username with id=${id}. Maybe username was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating username with id=" + id
        });
      });
  };

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      const sta = req.query.statusId;
      user.getRoles()
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        console.log("está en el estatus");
        res.status(200).send({
          id: user.id,
          username: user.username,
          genre: user.genre,
          nom: user.nom,
          prenom: user.prenom,
          dateNaissance: user.dateNaissance,
          entreprise: user.entreprise,
          profil: user.profil,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          phone: user.phone,
          statusId: user.statusId,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
