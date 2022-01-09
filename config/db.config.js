module.exports = { //test
  HOST: "legaloa.com",//"localhost",//"ns120.hostgator.mx", 
  USER: "cp1648233p04_user",//"root",//"andantvc_user",
  PASSWORD: "@cpK@uCX@GS4cGp",//"waC{NpXeLMyg", @cpK@uCX@GS4cGp
  DB: "cp1648233p04_legaldata", //"legaldata",//andantvc_legaldata
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };