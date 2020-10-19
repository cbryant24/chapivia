const config = {
  development: {
    username: "chapivia",
    password: "root",
    database: "chapivia",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432
  },
  test: {
    username: "chapivia",
    password: "root",
    database: "chapivia",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "chapivia",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432
  }
};

console.log("IM THE CONFING");
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);
module.exports = config;