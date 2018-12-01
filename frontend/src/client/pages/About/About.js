import React from 'react';
import Typography from '@material-ui/core/Typography';
import { BackButton } from '../../components';
import styled from 'styled-components';

const About = () => (
  <AboutContainer>
    <Typography variant="h3">About CalfBot</Typography>
    <Typography variant="body1" style={{ marginTop: 10 }}>
      CalfBot is a Twitch chat bot who's goal is to add some niche features
    </Typography>
    <BackButton style={{ marginTop: 10 }}>back to home</BackButton>
  </AboutContainer>
);

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
`;

export default About;
