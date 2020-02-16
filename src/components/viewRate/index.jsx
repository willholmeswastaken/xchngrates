import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Block } from 'baseui/block';
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, } from 'recharts';
import { getIndividualCurrencyExchangeRateAgainstBase } from '../../actions/exchangeRates';

const data = [
  { name: 'Page A', uv: 300, pv: 2600, amt: 3400 },
  { name: 'Page B', uv: 400, pv: 4367, amt: 6400 },
  { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
  { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
  { name: 'Page G', uv: 189, pv: 4800, amt: 2400 },
];

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
      : `${currentRateViewed.name} against GBP: `;
  const valContent =
    currentRateViewed === null
      ? 'Loading...'
      : currentRateViewed.val.toFixed(2);
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
        <LineChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey='name' />
          <Tooltip />
          <CartesianGrid stroke='#f5f5f5' />
          <Line type='monotone' dataKey='uv' stroke='#ff7300' yAxisId={0} />
          <Line type='monotone' dataKey='pv' stroke='#387908' yAxisId={1} />
        </LineChart>
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
