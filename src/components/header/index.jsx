import * as React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList
} from 'baseui/header-navigation';
import { StyledLink as Link } from 'baseui/link';
import { StatefulSelect as Search, TYPE } from 'baseui/select';

const options = {
  options: [
    { id: 'GBP', value: 'GBP' },
    { id: 'EUR', value: 'EUR' },
    { id: 'USD', value: 'USD' }
  ],
  labelKey: 'id',
  valueKey: 'value',
  placeholder: 'Search currencies',
  maxDropdownHeight: '300px'
};
const Header = () => (
  <HeaderNavigation>
    <NavigationList $align={ALIGN.left}>
      <NavigationItem>xchngrat.es</NavigationItem>
    </NavigationList>
    <NavigationList $align={ALIGN.center} />
    <NavigationList $align={ALIGN.right}>
      <NavigationItem>
        <Link href='#search-link1'>GBP</Link>
      </NavigationItem>
      <NavigationItem>
        <Link href='#search-link1'>EUR</Link>
      </NavigationItem>
      <NavigationItem>
        <Link href='#search-link1'>USD</Link>
      </NavigationItem>
    </NavigationList>
    <NavigationList $align={ALIGN.right}>
      <NavigationItem style={{ width: '200px', paddingRight: '20px' }}>
        <Search
          {...options}
          type={TYPE.search}
          getOptionLabel={props => props.option.id || null}
          onChange={() => {}}
        />
      </NavigationItem>
    </NavigationList>
  </HeaderNavigation>
);

export default Header;
