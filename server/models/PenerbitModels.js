import { Sequelize } from "sequelize";
import database from "../config/database.js"

const{DataTypes}= Sequelize;

const dataPenerbit = database.define('Penerbit', {
    PenerbitBuku: {
        type: DataTypes.STRING
    },
    AlamatPenerbit: {
        type: DataTypes.STRING, 
    },
    KotaPenerbit: {
        type: DataTypes.STRING, 
    },
    Telepon: {
        type: DataTypes.STRING, 
    },
}, {
    freezeTableName: true
});

export default dataPenerbit;

(async()=>{
  await database.sync();
})();