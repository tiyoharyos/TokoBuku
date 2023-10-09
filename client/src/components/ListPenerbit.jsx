import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ListBuku = () => {
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [Penerbit, setListPenerbit] = useState([]);
  const [PenerbitBuku, setNamaPenerbit] = useState("");
  const [AlamatPenerbit, setAlamatPenerbit] = useState("");
  const [KotaPenerbit, setKotaPenerbit] = useState("");
  const [Telepon, setTelepon] = useState("");

  const [editFormData, setEditFormData] = useState({
    PenerbitBuku: "",
    AlamatPenerbit: "",
    KotaPenerbit: "",
    Telepon: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getPenerbit();
  }, []);

  const getPenerbit = async () => {
    try {
      const response = await axios.get('http://localhost:5000/penerbit/');
      setListPenerbit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePenerbit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/penerbit/${id}`);
      getPenerbit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseDeleteSuccessModal = () => setShowDeleteSuccessModal(false);

  const tambahDataPenerbit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("PenerbitBuku", PenerbitBuku);
      formData.append("AlamatPenerbit", AlamatPenerbit);
      formData.append("KotaPenerbit", KotaPenerbit);
      formData.append("Telepon", Telepon);

      await axios.post("http://localhost:5000/penerbit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Data telah berhasil dimasukkan.");
      setShowSuccessModal(true);
      handleClose();
      getPenerbit();
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteConfirmation = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const hapusData = async () => {
    try {
      await axios.delete(`http://localhost:5000/penerbit/${selectedId}`);
      getPenerbit();
      setDeleteSuccessMessage("Data Berhasil di Hapus!");
      setShowDeleteSuccessModal(true);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowEditModal = (id) => {
    const selectedPenerbit = Penerbit.find((penerbit) => penerbit.id === id);

    setEditFormData({
      PenerbitBuku: selectedPenerbit.PenerbitBuku,
      AlamatPenerbit: selectedPenerbit.AlamatPenerbit,
      KotaPenerbit: selectedPenerbit.KotaPenerbit,
      Telepon: selectedPenerbit.Telepon,
    });

    setSelectedId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const updatePenerbit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/penerbit/${selectedId}`, editFormData);
      getPenerbit();
      setSuccessMessage("Data telah berhasil diupdate.");
      setShowSuccessModal(true);
      handleCloseEditModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Tambah Data
      </Button>
    {/*Modal Tambah Data*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Buku</Modal.Title>
        </Modal.Header>
        <Form onSubmit={tambahDataPenerbit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formGroupKategori">
              <Form.Label>Nama Penerbit</Form.Label>
              <Form.Control
                aria-label="Default select example"
                value={PenerbitBuku}
                onChange={(e) => setNamaPenerbit(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNama">
              <Form.Label>Alamat Penerbit</Form.Label>
              <Form.Control
                value={AlamatPenerbit}
                onChange={(e) => setAlamatPenerbit(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupHarga">
              <Form.Label>Kota Pnerbit</Form.Label>
              <Form.Control
                value={KotaPenerbit}
                onChange={(e) => setKotaPenerbit(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupStok">
              <Form.Label>Telepon Penerbit</Form.Label>
              <Form.Control
                value={Telepon}
                onChange={(e) => setTelepon(e.target.value)}
                type="number"
              />
            </Form.Group>
        
           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
            <Button type="submit" variant="success">
              Simpan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Penerbit</th>
            <th>Alamat Penerbit</th>
            <th>Kota Penerbit</th>
            <th>Telepon Penerbit</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Penerbit.map((datPenerbit, index) => (
            <tr key={datPenerbit.id}>
              <td>{index + 1}</td>
              <td>{datPenerbit.PenerbitBuku}</td>
              <td>{datPenerbit.AlamatPenerbit}</td>
              <td>{datPenerbit.KotaPenerbit}</td>
              <td>{datPenerbit.Telepon}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button onClick={() => handleShowEditModal(datPenerbit.id)}>Edit Data</Button>
                  <Button onClick={() => showDeleteConfirmation(datPenerbit.id)} variant='danger'>Hapus</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
            {/* Modal for Editing Data */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Buku</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updatePenerbit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formGroupEditNama">
              <Form.Label>Nama Penerbit</Form.Label>
              <Form.Control
                value={editFormData.PenerbitBuku}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    PenerbitBuku: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEditAlamat">
              <Form.Label>Alamat Penerbit Buku</Form.Label>
              <Form.Control
                value={editFormData.AlamatPenerbit}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    AlamatPenerbit: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEditKota">
              <Form.Label>Kota Penerbit</Form.Label>
              <Form.Control
                value={editFormData.KotaPenerbit}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    KotaPenerbit: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEditTelepon">
              <Form.Label>Telepon</Form.Label>
              <Form.Control
                value={editFormData.Telepon}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    Telepon: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Tutup
            </Button>
            <Button type="submit" variant="success">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
{/*Modal Alert Tambah Data*/}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Berhasil !</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
  {/*Modal Hapus Data*/}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus data ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={hapusData}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
{/*Modal Alert hapus Data*/}
      <Modal show={showDeleteSuccessModal} onHide={handleCloseDeleteSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Data Berhasil di Hapus!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{deleteSuccessMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteSuccessModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListBuku;
