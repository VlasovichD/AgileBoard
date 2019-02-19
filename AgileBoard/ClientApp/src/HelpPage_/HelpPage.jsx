import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HelpPage extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Tutorial</h2>
                <p>
                 Add and drag'n'drop tickets;)
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedHelpPage = connect(mapStateToProps)(HelpPage);
export { connectedHelpPage as HelpPage };