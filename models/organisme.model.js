module.exports = (sequelize, Sequelize) => {
  
    const Organisme = sequelize.define("organismes", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Organisme;
  };



