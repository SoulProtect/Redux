

// Job.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeJob } from '../redux/jobActions';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dislikeJob } from '../redux/jobActions';

const Job = ({ data, showLikeButton = true, showDislikeButton, onLike, onDislike }) => {
  const dispatch = useDispatch();
  const likedJobs = useSelector((state) => state.likedJobs);
  const isLiked = likedJobs.some((job) => job._id === data._id);

  const handleLike = () => {
    dispatch(likeJob(data));
    if (onLike) {
      onLike(data);
    }
  };

  const handleDislike = () => {
    dispatch(dislikeJob(data));
    if (onDislike) {
      onDislike(data);
    }
  };

  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: '1px solid #00000033', borderRadius: 4 }}
    >
      <Col xs={2}>
        {showLikeButton && (
          <span
            role="img"
            aria-label="like"
            onClick={handleLike}
            style={{ color: isLiked ? 'green' : 'black', cursor: 'pointer' }}
          >
            {isLiked ? '👍' : '🤍'}
          </span>
        )}
        {showDislikeButton && (
          <span
            role="img"
            aria-label="dislike"
            onClick={handleDislike}
            style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
          >
            ❌ 
          </span>
        )}
      </Col>
      <Col xs={3}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={7}>
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.title}
        </a>
      </Col>
    </Row>
  );
};

export default Job;