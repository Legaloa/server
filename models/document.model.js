module.exports = (sequelize, Sequelize) => {
  
  const Doc = sequelize.define("docs", {
    numero: {
      type: Sequelize.INTEGER                     
    },
    dateAdoption: {
      type: Sequelize.DATE
    },
    dateVigueur: {
      type: Sequelize.DATEONLY
    },
    dateEnregistrement: {
      type: Sequelize.DATE
    },
    intituleDoc: {
      type: Sequelize.STRING
    },
    route: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Doc;
};



