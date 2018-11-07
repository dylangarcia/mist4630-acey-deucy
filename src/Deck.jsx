import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardSpacer = styled.div`
  display: flex;
  flex-basis: 50%;

  > div:not(:last-child) {
    margin-right: 64px;
  }
`;

class Deck extends React.Component {
  state = {
    leftCard: { value: 4, suit: 'H' },
    middleCard: { value: 99, suit: 9 },
    rightCard: { value: 1, suit: 'S' },
  }

  generateCard = (visible = true) => {
    const suits = ['S', 'C', 'D', 'H'];
    const value = Math.floor(Math.random() * 13) + 1;
    const suit = suits[Math.floor(Math.random() * suits.length)];

    return {
      value,
      suit,
      visible,
    };
  }

  componentDidMount() {
    this.setState({
      leftCard: this.generateCard(),
      middleCard: this.generateCard(false),
      rightCard: this.generateCard(),
    });
  }

  render() {
    const { leftCard, rightCard, middleCard } = this.state;
  
    return (
      <CardWrapper>
        <CardSpacer>
          <Card card={leftCard} />
          <Card card={middleCard} />
          <Card card={rightCard} />
        </CardSpacer>
      </CardWrapper>
    );
  }
}

export default Deck;