import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';

import { TicketForm } from './TicketForm';
import { TicketCard } from './TicketCard';
import { history } from '../_helpers';
import { tickets } from '../_reducers/tickets.reducer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: props.tickets,
            isOpen: false };

        this.openTicketAdder = this.openTicketAdder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(ticketActions.getAll());
    }

    handleDeleteTicket(id) {
        return (e) => this.props.dispatch(ticketActions.delete(id));
    }

    handleCreateTicket() {
        return (e) => this.props.dispatch(ticketActions.create());
    }

    handleUpdateTicket(ticket) {
        return (e) => this.props.dispatch(ticketActions.update(ticket));
    }

    handleMoveTicket(ticket) {
        return (e) => this.props.dispatch(ticketActions.move(ticket));
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { ticket } = this.state;
        this.setState({
            ticket: {
                ...ticket,
                [name]: value
            }
        });
    }

    handleSubmit(ticket) {
     
        const { dispatch } = this.props;
        if (ticket.name && ticket.description) {
            dispatch(ticketActions.create(ticket));
            this.setState({ isOpen: false });
        }
    }

    openTicketAdder = () => {
        this.setState({ isOpen: true });
    };

    render() {

        const { tickets, creating } = this.props;
        const { isOpen, submitted } = this.state;
        return (
            <div className="container-drag">
                <div class="row">
                    <div class="col-4">
                        <h2 className="text-center">TO DO</h2>
                        {tickets.loading && <em>Loading tickets...</em>}
                        {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>}
                        {
                            tickets.items &&
                            <div>

                                {tickets.items.map((ticket, index) => 
                                    < div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}
                                        key={ticket.id}
                                        onDragStart={(e) => this.onDragStart(e, ticket.name)}
                                        draggable
                                        onRemove={this.handleDeleteTicket(ticket.id)}
                                    
                                    >
                                        <TicketCard ticket={ticket}/>
                                    </div>
                                
                                )}
                            </div>
                        }
                        <div>
                            {isOpen ?
                                <TicketForm onCardSubmit={this.handleSubmit} /> :
                                <button className="btn btn-primary" onClick={this.openTicketAdder}>Add new</button>}
                            
                        </div>
                    </div>
                    <div class="col-4">
                        <h2 className="text-center">In Progress</h2>
                    </div>
                    <div class="col-4">
                        <h2 className="text-center">Done</h2>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { tickets, creating } = state;
    return {
        tickets,creating
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };