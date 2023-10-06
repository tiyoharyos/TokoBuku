import Buku from "../models/BukuModels.js";
import path from "path";
import fs from "fs";


export const getBuku = async(req, res) =>{
    try{
        const respone = await Buku.findAll();
        res.json(respone);
    }catch (error){
        console.log(error.massage);
    }
}
export const getBukuByid = async(req, res)=>{
    try {
        const response = await Buku.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const saveBuku = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const namaBuku = req.body.namaBuku;
    const kategiruBuku = req.body.kategiruBuku;
    const penerbitBuku = req.body.penerbitBuku;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Buku.create({ namaBuku: namaBuku, kategiruBuku: kategiruBuku, penerbitBuku: penerbitBuku, coverBuku: fileName, url: url });
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateBuku = async (req, res) => {
    try {
        const buku = await Buku.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!buku) {
            return res.status(404).json({ msg: "No Data Found" });
        }

        let fileName = "";

        if (!req.files || Object.keys(req.files).length === 0) {
            // Jika tidak ada file yang diunggah, gunakan file yang sudah ada
            fileName = buku.coverBuku;
        } else {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Invalid Images" });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ msg: "Image must be less than 5 MB" });
            }

            const filepath = `./public/images/${buku.coverBuku}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        const { namaBuku, kategiruBuku, penerbitBuku } = req.body;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        await Buku.update({
            namaBuku: namaBuku,
            kategiruBuku: kategiruBuku,
            penerbitBuku: penerbitBuku,
            coverBuku: fileName,
            url: url
        }, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ msg: "Data telah diupdate" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const deleteBuku = async (req, res) => {
    try {
        const buku = await Buku.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!buku) {
            return res.status(404).json({ msg: "No Data Found" });
        }

        // Pastikan buku.image tidak undefined dan bukan null
        if (buku.image) {
            const filepath = `./public/images/${buku.image}`;

            // Pastikan file yang akan dihapus ada
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            } else {
                console.log(`File not found: ${filepath}`);
            }
        }

        await Buku.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ msg: "Buku Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
