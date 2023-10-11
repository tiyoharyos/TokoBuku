import {Sequelize} from "sequelize";

const db = new Sequelize('bukutoko','root','',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;