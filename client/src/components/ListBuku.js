import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Container, Form, ButtonGroup, Card, Col, Row, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function ListBuku() {
  const [buku, setBuku] = useState([]);
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showKonfirmasiModal, setShowKonfirmasiModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [deleteBukuId, setDeleteBukuId] = useState(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [deletedBukuId, setDeletedBukuId] = useState(null);
  const [namaBuku, setNamaBuku] = useState("");
  const [kategiruBuku, setKategiruBuku] = useState("");
  const [penerbitBuku, setPenerbitBuku] = useState("");
  const [updateBukuData, setUpdateBukuData] = useState({
    id: null,
    namaBuku: "",
    kategiruBuku: "",
    penerbitBuku: "",
  });
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShowTambahModal(false);
  const handleShow = () => setShowTambahModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseKonfirmasiModal = () => setShowKonfirmasiModal(false);
  const handleShowKonfirmasiModal = () => setShowKonfirmasiModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleShowDeleteSuccessModal = () => setShowDeleteSuccessModal(true);
  const handleCloseDeleteSuccessModal = () => setShowDeleteSuccessModal(false);


  const handleReloadPage = () => {
    setReloadPage(true);
  };

  useEffect(() => {
    getBuku();
    setReloadPage(false);
  }, [reloadPage]);

  const getBuku = async () => {
    const response = await axios.get("http://localhost:5000/buku");
    setBuku(response.data);
    setReloadPage(false);
  };

  const prepareDeleteBuku = (bukuId) => {
    setDeleteBukuId(bukuId);
    handleShowKonfirmasiModal();
  };

  const prepareUpdateBuku = (bukuId) => {
    const bukuToUpdate = buku.find((dataBuku) => dataBuku.id === bukuId);
    setUpdateBukuData({
      id: bukuId,
      namaBuku: bukuToUpdate.namaBuku,
      kategiruBuku: bukuToUpdate.kategiruBuku,
      penerbitBuku: bukuToUpdate.penerbitBuku,
    });
    handleShowUpdateModal();
  };

  const deleteBuku = async () => {
    try {
      await axios.delete(`http://localhost:5000/buku/${deleteBukuId}`);
      setShowKonfirmasiModal(false);
      handleShowDeleteSuccessModal();
      setDeletedBukuId(deleteBukuId); // Simpan id buku yang dihapus
      handleReloadPage();
    } catch (error) {
      console.log(error);
    }
  };
  

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveBuku = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("namaBuku", namaBuku);
    formData.append("kategiruBuku", kategiruBuku);
    formData.append("penerbitBuku", penerbitBuku);
  
    try {
      await axios.post("http://localhost:5000/buku", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
  
      handleClose();
      setShowSuccessModal(true);
      setReloadPage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBuku = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("namaBuku", updateBukuData.namaBuku);
    formData.append("kategiruBuku", updateBukuData.kategiruBuku);
    formData.append("penerbitBuku", updateBukuData.penerbitBuku);
    try {
      await axios.patch(
        `http://localhost:5000/buku/${updateBukuData.id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setShowUpdateModal(false);
      setShowSuccessModal(true);
      handleReloadPage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Tambah Data
      </Button>
      <Row>
        {buku.map((dataBuku) => {
          return(
            <Col md={4} >
              <Card>
                <Image src={dataBuku.url} alt="image"/>
                  <div>
                    <Card.Title className="text-center">{dataBuku.namaBuku}</Card.Title>
                      <Card.Text className="text-left">
                        {dataBuku.kategiruBuku}
                      </Card.Text>
                      <Card.Text className="text-left">
                        {dataBuku.penerbitBuku}
                      </Card.Text>
                  </div>
                  <Card.Footer className="text-muted">
                    <ButtonGroup size="sm">
                      <Button onClick={() => prepareUpdateBuku(dataBuku.id)}>
                          Edit Data
                      </Button>
                      <Button onClick={() => prepareDeleteBuku(dataBuku.id)} variant="danger" >
                          Hapus
                      </Button>
                    </ButtonGroup>
                  </Card.Footer>
              </Card>
            </Col>
        )
        })}
      </Row>
      {/* Modal Tambah Data */}
      <Modal show={showTambahModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveBuku}>
            <div className="field">
              <label className="label">Nama Buku</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={namaBuku}
                  onChange={(e) => setNamaBuku(e.target.value)}
                  placeholder="Nama Buku"
                />
              </div>
            </div>
            <Form.Group className="mb-3" controlId="formGroupKategori">
              <Form.Label>Kategori Buku</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={kategiruBuku}
                onChange={(e) => setKategiruBuku(e.target.value)}
              ><option>Pilig Satu Jenis Kategori Buku</option>
                <option value="Keilmuan">Keilmuan</option>
                <option value="Bisnis">Bisnis</option>
                <option value="Novel">Novel</option>
              </Form.Select>
            </Form.Group>
            <div className="field">
              <label className="label">Penerbit Buku</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={penerbitBuku}
                  onChange={(e) => setPenerbitBuku(e.target.value)}
                  placeholder="Penerbit Buku"
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
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal Sukses */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data telah dimasukkan!</Modal.Body>
        <Modal.Footer>
          <button
            className="button is-success"
            onClick={handleCloseSuccessModal}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showKonfirmasiModal} onHide={handleCloseKonfirmasiModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseKonfirmasiModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={deleteBuku}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Pesan Jika Hapus Data Berhasil*/}
      <Modal show={showDeleteSuccessModal} onHide={handleCloseDeleteSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data Berhasil di Hapus</Modal.Body>
        <Modal.Footer>
          <button
            className="button is-success"
            onClick={handleCloseDeleteSuccessModal}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>


      {/* Modal Edit Data */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateBuku}>
            <div className="field">
              <label className="label">Nama Buku</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={updateBukuData.namaBuku}
                  onChange={(e) =>
                    setUpdateBukuData({
                      ...updateBukuData,
                      namaBuku: e.target.value,
                    })
                  }
                  placeholder="Nama Buku"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Kategori Buku</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={updateBukuData.kategiruBuku}
                  onChange={(e) =>
                    setUpdateBukuData({
                      ...updateBukuData,
                      kategiruBuku: e.target.value,
                    })
                  }
                  placeholder="Kategori Buku"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Penerbit Buku</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={updateBukuData.penerbitBuku}
                  onChange={(e) =>
                    setUpdateBukuData({
                      ...updateBukuData,
                      penerbitBuku: e.target.value,
                    })
                  }
                  placeholder="Penerbit Buku"
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
        </Modal.Body>
      </Modal>
      
    </Container>
  );
}

export default ListBuku;


