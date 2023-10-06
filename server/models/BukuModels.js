import { Sequelize } from "sequelize";
import db from '../config/database.js'

const {DataTypes} = Sequelize;

const Buku = db.define('DataBuku', {
    namaBuku: DataTypes.STRING,
    kategiruBuku: DataTypes.STRING,
    penerbitBuku: DataTypes.STRING,
    coverBuku: DataTypes.STRING,
    url: DataTypes.STRING
    
},{
    freezeTableName: true
})

export default Buku;

(async()=>{
    await db.sync();
})();

