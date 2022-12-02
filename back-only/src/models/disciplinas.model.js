module.exports = (sequelizeObj, Sequelize) => {
  //tabela e campos no banco MYSQL
  const Disciplinas = sequelizeObj.define("disciplinas", {
    
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Disciplinas;
};
