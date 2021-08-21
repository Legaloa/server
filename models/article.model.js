module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      numero: {
        type: Sequelize.INTEGER                     
      },
      intituleArticle: {
        type: Sequelize.STRING
      }
    }); 
  
    return Article;
  };