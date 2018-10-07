import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Wrapper = styled(AppBar).attrs({
  position: 'static',
  color: 'default',
})`
  && {
    background-color: #BA0C2F;
    height: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 24px;
  }
`;

class Banner extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <Toolbar>
            Acey Deucey!
          </Toolbar>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Banner;