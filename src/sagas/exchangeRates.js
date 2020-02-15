import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_EXCHANGE_RATES_REQUEST,
  GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST,
  getExchangeRatesSuccess,
  getExchangeRatesFailure,
  getIndividualCurrencyExchangeRateAgainstBaseSuccess,
  getIndividualCurrencyExchangeRateAgainstBaseFailure
} from '../actions/exchangeRates';
import api from '../utils/api';

function* getExchangeRates({ base }) {
  try {
    const rates = yield call(api.getExchangeRates, base);
    yield put(
      getExchangeRatesSuccess(
        Object.entries(rates).map(([k, v]) => ({ name: k, val: v }))
      )
    );
  } catch (err) {
    yield put(getExchangeRatesFailure(err));
  }
}

function* getIndividualExchangeRateAgainstBase({ currency, base }) {
  try {
    const rates = yield call(
      api.getIndividualExchangeRateAgainstBase,
      currency,
      base
    );
    yield put(
      getIndividualCurrencyExchangeRateAgainstBaseSuccess(
        Object.entries(rates).map(([k, v]) => ({ name: k, val: v }))[0]
      )
    );
  } catch (err) {
    yield put(getIndividualCurrencyExchangeRateAgainstBaseFailure(err));
  }
}

export default function* exchangeRatesSaga() {
  yield takeEvery(GET_EXCHANGE_RATES_REQUEST, getExchangeRates);
  yield takeEvery(
    GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST,
    getIndividualExchangeRateAgainstBase
  );
}
