const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.article = require("../models/article.model.js")(sequelize, Sequelize);
db.document = require("../models/document.model.js")(sequelize, Sequelize);
db.domaine = require("../models/domaine.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.organisme = require("../models/organisme.model.js")(sequelize, Sequelize);
db.status = require("../models/status.model.js")(sequelize, Sequelize);

// create roles table

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["admin", "user"];

// add foreignkey to user
db.status.hasMany(db.user, { as: "user" });
db.user.belongsTo(db.status, {
  foreignKey: "statusId",
  as: "status",
});


// add foreignkey to document
db.type.hasMany(db.document, { as: "document" });
db.document.belongsTo(db.type, {
  foreignKey: "typeId",
  as: "type",
});

db.organisme.hasMany(db.document, { as: "document" });
db.document.belongsTo(db.organisme, {
  foreignKey: "organismeId",
  as: "organisme",
});

db.domaine.hasMany(db.document, { as: "document" });
db.document.belongsTo(db.domaine, {
  foreignKey: "domaineId",
  as: "domaine",
});

// add foreignkey to article
db.document.hasMany(db.article, { as: "article" });
db.article.belongsTo(db.document, {
  foreignKey: "docId",
  as: "doc",
});


module.exports = db;