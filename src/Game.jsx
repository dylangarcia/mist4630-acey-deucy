import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from './Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;

  > div, button {
    margin-bottom: 8px;
  }

  > button {
    width: 120px;
    max-width: 120px;
  }
`;

const StyledButton = styled(Button).attrs({
  variant: 'raised',
  color: 'primary',
})`
  & :hover {
    transform: translateY(-1px);
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const CardSpacer = styled.div`
  display: flex;
  flex-basis: 50%;

  > div:not(:last-child) {
    margin-right: 64px;
  }
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bank = (props) => {
  const { bank } = props;

  return (
    <div>
      <div>Starting Bank: ${bank.starting}</div>
      <div>Current Bank: ${bank.current}</div>
    </div>
  );
}

class Game extends Component {
  getInitialState = () => ({
    message: '',
    currentBet: 0,
    bank: {
      starting: 100,
      current: 100,
    },
    deck: {
      leftCard: { value: 4, suit: 'H', visible: true },
      middleCard: { value: 99, suit: 9, visible: false },
      rightCard: { value: 1, suit: 'S', visible: true },
    },
  })

  state = this.getInitialState()

  componentDidMount() {
    this.dealCards();
  }

  dealCards = () => {
    const firstCard = this.generateCard();
    const secondCard = this.generateCard();

    this.setState({
      deck: {
        leftCard: firstCard.value < secondCard.value ? firstCard : secondCard,
        middleCard: this.generateCard(false),
        rightCard: firstCard.value < secondCard.value ? secondCard : firstCard,
      },
      message: '',
      currentBet: 0,
    });
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

  handlePlay = () => {
    const { deck: { leftCard, rightCard, middleCard } } = this.state;
    const { currentBet } = this.state;
    const newState = { ...this.state };
    let message = '';

    if (leftCard.value === rightCard.value) {
      if (leftCard.value === middleCard.value) {
        message = `You bet double and won $${currentBet * 2}.`;
        newState.bank.current += parseInt(currentBet) * 2;
      } else {
        message = `You bet double and lost $${currentBet * 2}.`;
        newState.bank.current -= parseInt(currentBet) * 2;
      }
    } else if (middleCard.value === leftCard.value || middleCard.value === rightCard.value) {
      message = `There was a draw!`;
    } else if (middleCard.value > leftCard.value && middleCard.value < rightCard.value) {
      message = `Congratulations! You have won $${currentBet}.`;
      newState.bank.current += parseInt(currentBet);
    } else {
      message = `Whoops, you lost. You have lost $${currentBet}.`;
      newState.bank.current -= parseInt(currentBet);
    }
    
    if (newState.bank.current <= 0) {
      message += ` Game over! You are out of money.`;
    }

    newState.message = message;
    newState.currentBet = 0;
    newState.deck.middleCard.visible = true;

    this.setState(newState);
  }

  onChange = (e) => {
    this.setState({
      currentBet: e.target.value,
    });
  }

  resetGame = () => {
    this.setState(this.getInitialState());
  }

  render() {
    const { deck: { leftCard, rightCard, middleCard } } = this.state;
    const { bank, currentBet, message } = this.state;
    const action = message ? 'Play again!' : 'Pass';

    return (
      <React.Fragment>
        <Container>
          <Centered>
            { message }
            <Bank bank={bank} />
          </Centered>
          <CardWrapper>
            <CardSpacer>
              <Card card={leftCard} />
              <Card card={middleCard} />
              <Card card={rightCard} />
            </CardSpacer>
          </CardWrapper>
          <ButtonWrapper>
            <TextField
              variant="outlined"
              color="primary"
              label="Current Bet"
              value={currentBet}
              onChange={this.onChange}
            />
            <StyledButton
              onClick={this.handlePlay}
              disabled={!currentBet || message || bank.current <= 0}
            >
              Play!
            </StyledButton>
            <StyledButton
              onClick={this.dealCards}
              disabled={bank.current <= 0}
            >
              { action }
            </StyledButton>
            <StyledButton
              onClick={this.resetGame}
            >
              Quit
            </StyledButton>
          </ButtonWrapper>
        </Container>
      </React.Fragment>
    );
  }
}

export default Game;
