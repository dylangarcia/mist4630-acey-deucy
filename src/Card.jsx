import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 320px;

  flex-basis: 33%;
  justify-content: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;

  ${({ size }) => size && `
    width: ${size}px;
    height: ${size}px;
  `}
`;

class Card extends React.Component {
  render() {
    const {
      card: {
        value = '8',
        suit = 'C',
        visible,
      },
    } = this.props;
    const fileName = visible ? `${value}${suit}` : '999';
    const src = require(`./card-images/${fileName}.png`);

    return (
      <Container>
        <CardImage src={src} size={this.props.size}/>
      </Container>
    );
  }
}

export default Card;