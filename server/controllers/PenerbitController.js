import dataPenerbit from "../models/PenerbitModels.js"

export const getPenerbit = async (req, res) => {
    try {
      const response = await dataPenerbit.findAll();
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  export const getPenerbitID = async (req, res) => {
    try {
      const response = await dataPenerbit.findOne({ 
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  export const createPenerbit = async (req, res) => {
    try {
      const newBuku = await dataPenerbit.create(req.body); 
      res.status(201).json({ msg: "Data Buku Telah Dibuat"}); 
    } catch (error) {
      console.log(error.message);
    }
  }
  
  export const updatePenerbit = async (req, res) => {
      try {
          await dataPenerbit.update(req.body, {
              where: {
                id: req.params.id
              }
            }); 
            res.status(200).json({ msg: "Data Buku Telah Diupdate" });
          } catch (error) {
            console.log(error.message);
          }
        }
    
    export const detelePenerbit = async (req, res) => {
      try {
        await dataPenerbit.destroy({
          where:{
              id: req.params.id
          }
        });
        res.status(200).json({ msg: "Data Buku Telah Dihapus"}); 
      } catch (error) {
        console.log(error.message);
      }
    }
    