//probably can reuse this module
//only google auth component knows if user is signed in or not
//better to use redux store
import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
class GoogleAuth extends React.Component {
  /*When the components mounts, it initializes the authentication api
  then after init function, will get the object of the users login instance
  */
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "577994153002-83aie4t1le6lchbjeksulvoke747q8gn.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //helper function to update state of sign in button
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //arrow functions because these are callbacks
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div className="ui active inline loader"></div>;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

//mapStateToProps will take elements from the store and pass to component
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

//connect will pass props from the redux store to GoogleAuth component
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
