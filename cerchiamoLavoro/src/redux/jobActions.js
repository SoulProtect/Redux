

export const searchJobs = (query) => {
    return {
      type: 'SEARCH_JOBS',
      payload: query,
    };
  };
  export const likeJob = (job) => ({
    type: 'LIKE_JOB',
    payload: job,
  });
  
  export const dislikeJob = (job) => ({
    type: 'DISLIKE_JOB',
    payload: job,
  });