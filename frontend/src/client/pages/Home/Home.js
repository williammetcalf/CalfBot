import React from "react";
import LoadingContainer from "../../components/LoadingContainer/LoadingContainer";

class Home extends React.Component {
  state = { loadedUserData: false };
  componentDidMount() {
    // TODO: fetch data
    setTimeout(() => {
      this.setState({ loadedUserData: true });
    }, 1500);
  }

  render() {
    return (
      <LoadingContainer
        loading={!this.state.loadedUserData}
        render={() => {
          return <div>test</div>;
        }}
      />
    );
  }
}

export default Home;
