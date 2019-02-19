import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ticketActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(ticketActions.getAll());
    }

    handleDeleteTicket(id) {
        return (e) => this.props.dispatch(ticketActions.delete(id));
    }

    render() {
        const { ticket, tickets } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{ticket.name}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered tickets:</h3>
                {tickets.loading && <em>Loading tickets...</em>}
                {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>}
                {tickets.items &&
                    <ul>
                        {tickets.items.map((ticket, index) =>
                            <li key={ticket.id}>
                                {ticket.name + ' ' + ticket.description}
                                {
                                    ticket.deleting ? <em> - Deleting...</em>
                                    : ticket.deleteError ? <span className="text-danger"> - ERROR: {ticket.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteTicket(ticket.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

//function mapStateToProps(state) {
//    const { tickets, authentication } = state;
//    const { ticket } = authentication;
//    return {
//        ticket,
//        tickets
//    };
//}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedBoardPage = connect(mapStateToProps)(HomePage);
export { connectedBoardPage as BoardPage };



//const connectedHomePage = connect(mapStateToProps)(HomePage);
//export { connectedHomePage as HomePage };