import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_EXCHANGE_RATES_REQUEST,
  getExchangeRatesSuccess,
  getExchangeRatesFailure
} from '../actions/exchangeRates';
import api from '../utils/api';

function* getExchangeRates({ base }) {
  try {
    const rates = yield call(api.getExchangeRates, base);
    yield put(getExchangeRatesSuccess(Object.entries(rates).map(( [k, v] ) => ({ name: k, val: v }))));
  } catch (err) {
    yield put(getExchangeRatesFailure(err));
  }
}

export default function* exchangeRatesSaga() {
  yield takeEvery(GET_EXCHANGE_RATES_REQUEST, getExchangeRates);
};  
