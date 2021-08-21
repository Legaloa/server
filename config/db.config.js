module.exports = {
  HOST: "ns120.hostgator.mx",//"ns120.hostgator.mx",
  USER: "andantvc_user",//"andantvc_user",
  PASSWORD: "waC{NpXeLMyg",//"waC{NpXeLMyg",
  DB: "andantvc_legaldata",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };