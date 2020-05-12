import React from "react";
import _ from "lodash";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import { connect } from "react-redux";

//props is passed by the syntax ..../:id from App.js
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  //initialValues is a specific redux form property name
  //we specifically use title/description bc it is the name of the
  //field we specified in StreamForm
  //this.props.stream is already an object with the values we want

  //lodash pick function will return chosen object keys

  render() {
    if (!this.props.stream) {
      return <div className="ui active centered inline loader"></div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
