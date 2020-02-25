import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Block } from 'baseui/block';
import { Breadcrumbs } from 'baseui/breadcrumbs';
import { StyledLink } from 'baseui/link';
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
  const isRatePresent = currentRateViewed !== null;
  const headerContent = isRatePresent
    ? `${currentRateViewed.rate.name} against GBP: `
    : 'Loading...';
  const valContent = isRatePresent ? currentRateViewed.rate.val.toFixed(2) : '';
  const performantContent = isRatePresent ? (
    currentRateViewed.isPerformant ? (
      <p style={{ color: 'green', margin: 0 }}>▲</p>
    ) : (
      <p style={{ color: 'red', margin: 0 }}>▼</p>
    )
  ) : (
    ''
  );
  return (
    <div style={{ padding: 50 }}>
      <Block display='flex' justifyContent='left'>
        <Breadcrumbs>
          <StyledLink href='/'>Home</StyledLink>
          <span>{match.params.currency}</span>
        </Breadcrumbs>
      </Block>
      <Block display='flex' justifyContent='center'>
        <h1 style={{ paddingRight: 10 }}>{headerContent}</h1>
        <h1>{valContent}</h1>
        <h1>{performantContent}</h1>
      </Block>
      <Block display='flex' justifyContent='center'>
        <p>Last refreshed at {new Date().toDateString()}</p>
      </Block>
      <Block display='flex' justifyContent='center'>
        {currentRateViewed !== null && (
          <div id='container'>
            <AreaChart
              width={800}
              height={400}
              data={currentRateViewed.historicalPerformance}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey='date' />
              <YAxis />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <ReferenceLine
                y={
                  currentRateViewed.historicalPerformance.sort(
                    (a, b) => a - b
                  )[0].val
                }
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
