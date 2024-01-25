import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchJobs } from "../redux/jobActions";
import Job from "./Job";
import videoPath from "./video.mp4";
import videoPath2 from "./video2.mp4";
import { Link } from "react-router-dom";
import Favorites from "./favorites";
import MyNavbar from "./Navbar";

const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

const MainSearch = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);
  const reduxJobs = useSelector((state) => state.jobs);
  const [localJobs, setLocalJobs] = useState([]);

  const handleChange = (e) => {
    dispatch(searchJobs(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}&limit=20`
      );
      if (response.ok) {
        const { data } = await response.json();
        console.log(data);
        setLocalJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <MyNavbar/>
    <Container fluid style={{  backgroundColor: "#f0f0f0" }}>
    <Row>
      {/* Colonna laterale sinistra */}
      <Col  xs={12} md={2} className="d-none d-md-block" style={{ padding: "20px", paddingTop: "calc(30vh - 200px)"}}>
        <video width="100%" height="100%" controls muted autoPlay loop>
          <source src={videoPath} type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
       
      </Col>
      
      {/* Sezione centrale */}
      <Col xs={8} style={{ padding: "20px", paddingTop: "calc(15vh - 150px)"}}>
        <Container>
          <Row>
            <Col xs={10} className="mx-auto my-3">
              {/* <h1 className="display-1 agenziaLavoro" >Collocamentis</h1> */}
              
            </Col>
            <Col xs={10} className="mx-auto">
              <Form onSubmit={handleSubmit} className="position-sticky top-0 bg-white">
                <Form.Control
                  type="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="type and press Enter"
                />
              </Form>
            </Col>
            <Col xs={12} md={8} className="mx-auto mb-5" style={{ overflowY: "auto", maxHeight: "calc(100vh - 340px)" }}>
              {localJobs.map((jobData) => (
                <Job key={jobData._id} data={jobData} />
              ))}
            </Col>
          </Row>
        </Container>
      </Col>
      
      {/* Colonna laterale destra */}
      <Col  xs={12} md={2} className="d-none d-md-block" style={{ padding: "20px", paddingTop: "calc(30vh - 200px)"}}>
        <video width="100%" height="100%" controls muted autoPlay loop>
          <source src={videoPath2} type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
        
      </Col>
    </Row>
  </Container>
  </>

  );
};

export default MainSearch;
