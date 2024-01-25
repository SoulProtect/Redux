import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Job from './Job';
import { dislikeJob } from '../redux/jobActions';  
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
        <MyNavbar/>
        <h2 className='favoriti'>Your Favorite Jobs</h2>
        <hr />
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
      </div>
    );
  };
  
  export default Favorites;
