import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getIndividualCurrencyExchangeRateAgainstBase } from '../../actions/exchangeRates';

const ViewRate = ({
  currentRateViewed,
  isRequesting,
  requestExchangeRate,
  match
}) => {
  useEffect(() => {
    requestExchangeRate(match.params.currency);
  }, []);
  return (
  <div> Hello world <h1> {currentRateViewed !== null ? currentRateViewed.name : ''} </h1> </div>
  );
};

const mapStateToProps = state => ({
  currentRateViewed: state.exchangeRates.currentRateViewed,
  isRequesting: state.exchangeRates.isRequestingRates,
  isRatesRequestSuccess: state.exchangeRates.isRatesRequestSuccess
});

const mapDispatchToProps = dispatch => ({
  requestExchangeRate: currency =>
    dispatch(getIndividualCurrencyExchangeRateAgainstBase(currency, 'GBP'))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewRate);
