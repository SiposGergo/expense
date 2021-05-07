import React from "react";
import styled from "styled-components";
import numeral from "numeral";
require('numeral/locales/hu');

const AmountSpan = styled.span`
color: ${props => props.colored ? (props.amount < 0 ? 'red' : 'green') : 'black'};
font-size: ${props => props.color ? '1.4em' : '1em'};
font-weight: 600;
`;

numeral.locale('hu');

export default function Amount({ amount, currency, colored }) {
  return (
    <AmountSpan amount={amount} colored={colored}>
      {numeral(Math.abs(amount)).format('0,0.00')} {currency ?? 'Ft'}
    </AmountSpan>)
}