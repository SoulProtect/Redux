import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Favorites from './favorites';
import { Link } from "react-router-dom";
import MainSearch from './MainSearch';

function MyNavbar() {
  return (
    <Navbar className="myNav text-light">
      <Container>
        <Navbar.Brand href="#home" className='text-light'><h1 className="display-1 agenziaLavoro" >Collocamentis</h1></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='Mappa justify-content-space-between'>
          <Link to="/" className='text-light'style={{marginRight: "15px"}}> Home</Link>
          <Link to="/favorites"className='text-light' >View Favorites</Link> 
          
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;