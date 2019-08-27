import * as React from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button } from 'baseui/button';

const RateCard = ({ rate }) => (
  <Card
    overrides={{ Root: { style: { width: '328px' } } }}
    title={rate.name}
  >
    <StyledThumbnail src={'https://source.unsplash.com/user/erondu/300x300'} />
    <StyledBody>
      <h3>{rate.val}</h3>
    </StyledBody>
    <StyledAction>
      <Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
        View More
      </Button>
    </StyledAction>
  </Card>
);

export default RateCard;
