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
        Object.entries(rates).map(([k, v]) => ({ name: k, val: parseFloat(v).toFixed(2) }))
      )
    );
  } catch (err) {
    yield put(getExchangeRatesFailure(err));
  }
}

function* getIndividualExchangeRateAgainstBase({ currency, base }) {
  try {
    const today = new Date();
    const historicalComparisonDate = new Date(today);
    historicalComparisonDate.setDate(historicalComparisonDate.getDate() - 7);
    const rate = yield call(
      api.getIndividualExchangeRateAgainstBase,
      currency,
      base
    );
    const rateHistory = yield call(
      api.getIndividualExchangeRateAgainstBaseHistory,
      currency,
      base,
      historicalComparisonDate,
      today
    );
    const rateViewModel = {
      rate: Object.entries(rate).map(([k, v]) => ({ name: k, val: v }))[0],
      historicalPerformance: Object.entries(rateHistory).map(([k, v]) =>  {
        const val = v[Object.keys(v)[0]];
        return { date: k, val: parseFloat(val).toFixed(2)}
      }).sort((a, b) => new Date(a.date) - new Date(b.date)),
      isPerformant: null
    };
    rateViewModel.isPerformant = rateViewModel.rate.val > rateViewModel.historicalPerformance[rateViewModel.historicalPerformance.length - 2].val;
    yield put(
      getIndividualCurrencyExchangeRateAgainstBaseSuccess(
        rateViewModel
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
