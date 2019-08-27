import { createStore, compose, applyMiddleware } from 'redux';
import sagas from './sagas';
import reducers from './reducers';
import { sagaMiddleware } from './middleware';

export default (initialState = {}) => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const enchancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(reducers, initialState, enchancer);
  sagaMiddleware.run(sagas);

  return store;
};
