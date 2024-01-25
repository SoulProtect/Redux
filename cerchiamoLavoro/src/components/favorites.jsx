import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap'; // Assicurati di importare Container, Row e Col da 'react-bootstrap'
import Job from './Job';
import { dislikeJob } from '../redux/jobActions';
import videoPath from "./video.mp4";
import videoPath2 from "./video2.mp4";
import MyNavbar from './Navbar';

const Favorites = () => {
  const likedJobs = useSelector((state) => state.likedJobs);
  const dispatch = useDispatch();

  const handleDislike = (job) => {
    dispatch(dislikeJob(job));
  };

  const handleLike = (job) => {
    // Aggiungi azioni necessarie per il "Like" nella pagina "Favorites"
    console.log('Liked:', job);
  };

  return (
    <div>
      <MyNavbar />
      <Container fluid>
        <Row>
          {/* Colonna laterale sinistra */}
          <Col xs={12} md={2} className="d-none d-md-block" style={{ padding: "20px", paddingTop: "calc(30vh - 200px)" }}>
            <video width="100%" height="100%" controls muted autoPlay loop>
              <source src={videoPath} type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
          </Col>
          {/* Sezione centrale */}
          <Col xs={8} style={{ padding: "20px", paddingTop: "calc(15vh - 150px)" }}>
            <Container>
              <Row>
                <Col xs={12} className="my-3">
                  <h2 className='favoriti'>Your Favorite Jobs</h2>
                </Col>
                <Col xs={12}>
                  {likedJobs.map((job) => (
                    <div key={job._id}>
                      <Job
                        data={job}
                        showLikeButton={false} // Disabilita il pulsante "Like" nella pagina "Favorites"
                        showDislikeButton
                        onLike={() => handleLike(job)}
                        onDislike={() => handleDislike(job)}
                      />
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
          {/* Colonna laterale destra */}
          <Col xs={12} md={2} className="d-none d-md-block" style={{ padding: "20px", paddingTop: "calc(30vh - 200px)" }}>
            <video width="100%" height="100%" controls muted autoPlay loop>
              <source src={videoPath2} type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Favorites;