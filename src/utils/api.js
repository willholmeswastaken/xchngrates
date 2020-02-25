import {
  EXCHANGE_RATE_API_URL,
  EXCHANGE_RATE_HISTORY_API_URL
} from './constants';

export default {
  getExchangeRates: async base => {
    try {
      const response = await fetch(`${EXCHANGE_RATE_API_URL}?base=${base}`);

      if (response.status === 200) {
        return (await response.json()).rates;
      }
      throw response.statusText;
    } catch (err) {
      throw new Error(err);
    }
  },
  getIndividualExchangeRateAgainstBase: async (currency, base) => {
    try {
      const res = await fetch(
        `${EXCHANGE_RATE_API_URL}?base=${base}&symbols=${currency}`
      );
      if (res.status === 200) {
        return (await res.json()).rates;
      }
      throw res.statusText;
    } catch (err) {
      throw new Error(err);
    }
  },
  getIndividualExchangeRateAgainstBaseHistory: async (
    currency,
    base, 
    fromDate,
    toDate
  ) => {
    try {
      const res = await fetch(
        `${EXCHANGE_RATE_HISTORY_API_URL}?start_at=${
          new Date(fromDate).toISOString().split('T')[0]
        }&end_at=${
          new Date(toDate).toISOString().split('T')[0]
        }&base=${base}&symbols=${currency}`
      );
      if (res.status === 200) {
        return (await res.json()).rates;
      }
      throw res.statusText;
    } catch (err) {
      throw new Error(err);
    }
  }
};
