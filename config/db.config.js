module.exports = {
  HOST: "localhost",//"ns120.hostgator.mx",
  USER: "root",//"andantvc_user",
  PASSWORD: "",//"waC{NpXeLMyg", @cpK@uCX@GS4cGp
  DB: "legaldata",//andantvc_legaldata
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };