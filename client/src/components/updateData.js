import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const EditBuku = () => {
  const [namaBuku, setNamaBuku] = useState("");
  const [kategiruBuku, setKategiruBuku] = useState("");
  const [penerbitBuku, setPenerbitBuku] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/buku/${id}`);
    setNamaBuku(response.data.namaBuku);
    setKategiruBuku(response.data.kategiruBuku);
    setPenerbitBuku(response.data.penerbitBuku);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("namaBuku", namaBuku);
    formData.append('kategoriBuku', kategiruBuku);
    formData.append("penerbitBuku",penerbitBuku);
    try {
      await axios.patch(`http://localhost:5000/buku/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label"> Name Buku</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={namaBuku}
                onChange={(e) => setNamaBuku(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label"> Kategori</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kategiruBuku}
                onChange={(e) => setKategiruBuku(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label"> Penerbit</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={penerbitBuku}
                onChange={(e) => setPenerbitBuku(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBuku;
