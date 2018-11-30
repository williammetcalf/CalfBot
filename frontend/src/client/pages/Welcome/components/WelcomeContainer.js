import styled from "styled-components";

const WelcomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-name: fadein;
  animation-duration: 3s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opactity: 1;
    }
  }
`;

export default WelcomeContainer;
