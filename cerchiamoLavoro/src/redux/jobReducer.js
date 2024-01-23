

const initialState = {
    query: '',
    jobs: [],
    likedJobs: [], // Nuovo campo per i lavori preferiti
  };
  
  const jobReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_JOBS':
        return {
          ...state,
          query: action.payload,
        };
      case 'SET_JOBS':
        return {
          ...state,
          jobs: action.payload,
        };
      case 'LIKE_JOB':
        return {
          ...state,
          likedJobs: [...state.likedJobs, action.payload],
        };
        case 'DISLIKE_JOB':
          return {
            ...state,
            likedJobs: state.likedJobs.filter(job => job.company_name !== action.payload.company_name),
          };
        
      default:
        return state;
    }
  };
  
  export default jobReducer;
  
  