import { all, fork } from 'redux-saga/effects';
import exchangeRatesSaga from './exchangeRates';

const sagas = [ exchangeRatesSaga ];

export default function* rootSaga() {
    yield all(sagas.map(saga => fork(saga)));
};
