import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Block } from 'baseui/block';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Area,
  YAxis,
  AreaChart
} from 'recharts';
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
  const headerContent =
    currentRateViewed === null
      ? 'Loading...'
      : `${currentRateViewed.rate.name} against GBP: `;
  const valContent =
    currentRateViewed === null
      ? 'Loading...'
      : currentRateViewed.rate.val.toFixed(2);
  return (
    <div style={{ padding: 50 }}>
      <Block display='flex' justifyContent='center'>
        <h1 style={{ paddingRight: 10 }}>{headerContent}</h1>
        <h1>{valContent}</h1>
      </Block>
      <Block display='flex' justifyContent='center'>
        <p>Last refreshed at {new Date().toDateString()}</p>
      </Block>
      <Block display='flex' justifyContent='center'>
        {currentRateViewed !== null && (
          <div id='container'>
            <AreaChart
              width={600}
              height={400}
              data={currentRateViewed.historicalPerformance}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey='date' />
              <YAxis />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <ReferenceLine
                y={currentRateViewed.historicalPerformance.sort(
                    (a, b) => a - b
                  )[0].val}
                label='Max'
                stroke='red'
                strokeDasharray='3 3'
              />
              <Area
                type='monotone'
                dataKey='val'
                stroke='#8884d8'
                fill='#8884d8'
              />
            </AreaChart>
          </div>
        )}
      </Block>
    </div>
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
