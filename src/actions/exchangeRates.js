export const GET_EXCHANGE_RATES_REQUEST = 'GET_EXCHANGE_RATES_REQUEST';
export const GET_EXCHANGE_RATES_SUCCESS = 'GET_EXCHANGE_RATES_SUCCESS';
export const GET_EXCHANGE_RATES_FAILURE = 'GET_EXCHANGE_RATES_FAILURE';

export const GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST =
  'GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST';
export const GET_INDIVIDUAL_EXCHANGE_RATES_SUCCESS =
  'GET_INDIVIDUAL_EXCHANGE_RATES_SUCCESS';
export const GET_INDIVIDUAL_EXCHANGE_RATES_FAILURE =
  'GET_INDIVIDUAL_EXCHANGE_RATES_FAILURE';

export const getExchangeRatesRequest = base => ({
  type: GET_EXCHANGE_RATES_REQUEST,
  base
});

export const getExchangeRatesSuccess = rates => ({
  type: GET_EXCHANGE_RATES_SUCCESS,
  rates
});

export const getExchangeRatesFailure = err => ({
  type: GET_EXCHANGE_RATES_FAILURE,
  err
});

export const getIndividualCurrencyExchangeRateAgainstBase = (
  currency,
  base
) => ({
  type: GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST,
  currency,
  base
});

export const getIndividualCurrencyExchangeRateAgainstBaseSuccess = res => ({
  type: GET_INDIVIDUAL_EXCHANGE_RATES_SUCCESS,
  res
});

export const getIndividualCurrencyExchangeRateAgainstBaseFailure = err => ({
  type: GET_INDIVIDUAL_EXCHANGE_RATES_FAILURE,
  err
});
