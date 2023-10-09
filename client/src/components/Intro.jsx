import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Intro = () =>{
  const Title = {
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1',
    textShadow: '2px 2px black',
    color: "Black",
  };
    return(
        <div style={Title}>
        <Container className='text-center d-flex justify-content-center
        align-item-center '>
          <Row>
            <Col>
            <h1  style={Title}>Selamat Datang</h1>
            <h1  style={Title}>Nyolo Buku</h1>
            <h1 className='introButtom mt-3 text-center' >
            <Button as={Link} to = "/LisBuku" variant='dark'>Lihat Semua List Buku</Button>
            </h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Intro