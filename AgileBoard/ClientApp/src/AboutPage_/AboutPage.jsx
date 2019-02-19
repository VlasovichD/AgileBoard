import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AboutPage extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Designed by Dmitriy Vlasovich</h2>
                <p>
                    E-Mail: <a href="mailto:vlasovich.dmitriy@hotmail.com">vlasovich.dmitriy@hotmail.com</a>
                </p>
                <p>
                    GitHub: <a href="https://github.com/VlasovichD" target="_top">VlasovichD</a>
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

const connectedAboutPage = connect(mapStateToProps)(AboutPage);
export { connectedAboutPage as AboutPage };