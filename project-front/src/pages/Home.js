import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectsPanel from '../components/ProjectsPanel';
import SearchToolbar from '../components/SearchToolbar';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token && !nextProps.token) {
      // this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="container">
        <SearchToolbar />
        <ProjectsPanel />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log({ state });
  return {
    token: state && state.token
  };
};
export default connect(mapStateToProps)(Home);
