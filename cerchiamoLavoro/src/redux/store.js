

import { createStore } from 'redux';
import jobReducer from './jobReducer';

const store = createStore(jobReducer);

export default store;
