import {
  GET_EXCHANGE_RATES_REQUEST,
  GET_EXCHANGE_RATES_SUCCESS,
  GET_EXCHANGE_RATES_FAILURE,
  GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST,
  GET_INDIVIDUAL_EXCHANGE_RATES_SUCCESS,
  GET_INDIVIDUAL_EXCHANGE_RATES_FAILURE
} from '../actions/exchangeRates';

export default (
  state = {
    rates: [],
    isRequestingRates: false,
    isRatesRequestSuccess: null,
    error: null,
    currentRateViewed: null,
  },
  action
) => {
  switch (action.type) {
    case GET_EXCHANGE_RATES_REQUEST:
      return {
        ...state,
        isRatesRequestSuccess: null,
        isRequestingRates: true,
        rates: []
      };
    case GET_EXCHANGE_RATES_SUCCESS:
      return {
        ...state,
        isRequestingRates: false,
        isRatesRequestSuccess: true,
        rates: action.rates
      };
    case GET_EXCHANGE_RATES_FAILURE:
      return {
        ...state,
        isRequestingRates: false,
        isRatesRequestSuccess: false,
        error: action.err
      };
    case GET_INDIVIDUAL_EXCHANGE_RATES_REQUEST:
      return {
        ...state,
        isRequestingRates: true,
        isRatesRequestSuccess: null,
        error: null
      };
    case GET_INDIVIDUAL_EXCHANGE_RATES_SUCCESS:
      return {
        ...state,
        isRequestingRates: false,
        isRatesRequestSuccess: true,
        currentRateViewed: action.res
      };
    case GET_INDIVIDUAL_EXCHANGE_RATES_FAILURE:
      return {
        ...state,
        isRequestingRates: false,
        isRatesRequestSuccess: false,
        error: action.err
      };
    default:
      return state;
  }
};
