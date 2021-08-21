module.exports = (sequelize, Sequelize) => {
    const Domaine = sequelize.define("domaines", {
      domaine: {
        type: Sequelize.STRING
      }
    });
  
    return Domaine;
  };