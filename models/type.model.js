module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("types", {
      type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Type;
  };