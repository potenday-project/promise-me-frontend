import { Component, createContext } from 'react';

const UserContext = createContext({
  userId: '',
  projectId: '',
});

class UserProvider extends Component {
  state = {
    userId: '',
    projectId: '',
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserProvider };
