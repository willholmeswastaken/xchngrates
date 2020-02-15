import { EXCHANGE_RATE_API_URL } from './constants';

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
  }
};
