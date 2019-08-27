import {
  GET_EXCHANGE_RATES_REQUEST,
  GET_EXCHANGE_RATES_SUCCESS,
  GET_EXCHANGE_RATES_FAILURE
} from '../actions/exchangeRates';

export default (
  state = {
    rates: [],
    isRequestingRates: false,
    isRatesRequestSuccess: null,
    error: null
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
    default:
      return state;
  }
};
