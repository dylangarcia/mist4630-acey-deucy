import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Banner from './Banner';
import Game from './Game';
import Card from './Card';

const Container = styled(Paper).attrs({
  elevation: 4,
})`
  display: flex;
  flex-direction: column;
  height: calc(100% - 90px);
  margin: 20px;
  padding: 20px;
`;

const StyledButton = styled(Button).attrs({
  variant: 'raised',
  color: 'primary',
})`
  width: 80px;
  max-width: 80px;

  & :hover {
    transform: translateY(-1px);
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;

  ${({ col }) => col && `
    flex-direction: column;
  `}
`;

class App extends Component {
  state = {
    showGame: false,
  }

  onClick = () => {
    this.setState({
      showGame: true,
    });
  }

  renderSplash() {
    return (
      <Flex>
        <Card size={150} card={{ value: 8, suit: 'D', visible: true }} />
        <Flex col>
          Do you want to play Acey Deucey? It's a simple, 3-card game where you
          bet on whether the middle card is between the two outer cards.
          <StyledButton onClick={this.onClick}>Play!</StyledButton>
        </Flex>
        <Card size={150} card={{ value: 8, suit: 'D', visible: true }} />
      </Flex>
    )
  }

  render() {
    const { showGame } = this.state;

    return (
      <React.Fragment>
        <Banner />
        <Container>
          {
            showGame
              ? <Game />
              : this.renderSplash()
          }
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
