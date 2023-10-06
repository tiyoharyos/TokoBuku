import {Sequelize} from "sequelize";

const db = new Sequelize('storebook','root','',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;