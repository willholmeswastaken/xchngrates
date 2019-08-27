import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Block } from 'baseui/block';
import { Spinner } from 'baseui/spinner';
import { getExchangeRatesRequest } from '../../actions/exchangeRates';
import RateCard from '../rateCard';

const Home = ({ rates, isRequesting, requestExchangeRates }) => {
  useEffect(() => {
    if (rates.length === 0) {
      requestExchangeRates();
    }
    console.log(rates);
  }, []);
  console.log(rates);
  return (
    <div style={{ padding: 20 }}>
      <Block display='flex' justifyContent='center'>
        <h1>Todays Rates</h1>
      </Block>
      {isRequesting && (
        <Block display='flex' justifyContent='center'>
          <Spinner />
        </Block>
      )}
      <Block
        display='grid'
        gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
        justifyItems='center'
        gridGap='scale1000'
        margin='scale1000'
      >
        {rates.length > 0 &&
          rates.map(x => (
            <Block key={x.name} display='flex' justifyContent='center'>
              <RateCard rate={x} />
            </Block>
          ))}
      </Block>
    </div>
  );
};

const mapStateToProps = state => ({
  rates: state.exchangeRates.rates,
  isRequesting: state.exchangeRates.isRequestingRates
});

const mapDispatchToProps = dispatch => ({
  requestExchangeRates: () => dispatch(getExchangeRatesRequest('GBP'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
