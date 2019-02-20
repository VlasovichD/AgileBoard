import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';

import { TicketForm } from './TicketForm';
import { TicketCard } from './TicketCard';
import { history } from '../_helpers';
import { tickets, create } from '../_reducers/tickets.reducer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: []
        };
    }

    componentDidMount() {
        this.props.dispatch(ticketActions.getAll());
    }

    handleMoveTicket(ticket) {
        return (e) => this.props.dispatch(ticketActions.move(ticket));
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");

        let tickets = this.state.tickets.filter((ticket) => {
            if (ticket.id === id) {
                ticket.columnId = cat;
            }
            return ticket;
        });

        this.setState({
            ...this.state,
            tickets
        });
    }

    render() {
        const { tickets } = this.props;
        return (
            <div className="container-drag">
                <div class="row">
                    <div class="col-4"
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => { this.onDrop(e, 1) }}>
                        <h2 className="text-center">TO DO</h2>
                        {tickets.loading && <em>Loading tickets...</em>}
                        {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>}
                        {
                            tickets.items &&
                            <div>

                                {tickets.items.map((ticket, index) => {

                                    if (ticket.columnId === 1) {
                                        return < div className="card bg-light mb-3 draggable" style={{ maxWidth: "18rem" }}
                                            key={ticket.id}
                                            onDragStart={(e) => this.onDragStart(e, ticket.name)}
                                            draggable
                                        >
                                            <TicketCard ticket={ticket} />
                                        </div>
                                    }
                                    return (null);
                                }

                                )}
                            </div>
                        }
                        <div>
                            <TicketForm />
                        </div>
                    </div>
                    <div class="col-4"
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, 2)}>
                        <h2 className="text-center">In Progress</h2>
                        {tickets.loading && <em>Loading tickets...</em>}
                        {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>}
                        {
                            tickets.items &&
                            <div>

                                {tickets.items.map((ticket, index) => {
                                    if (ticket.columnId === 2) {
                                        return < div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}
                                            key={ticket.id}
                                            onDragStart={(e) => this.onDragStart(e, ticket.id)}
                                            draggable
                                        >
                                            <TicketCard ticket={ticket} />
                                        </div>
                                    }
                                    return (null);
                                }

                                )}
                            </div>
                        }
                    </div>
                    <div class="col-4"
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, 3)}>
                        <h2 className="text-center">Done</h2>
                        {tickets.loading && <em>Loading tickets...</em>}
                        {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>}
                        {
                            tickets.items &&
                            <div>

                                {tickets.items.map((ticket, index) => {
                                    if (ticket.columnId === 3) {
                                        return < div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}
                                            key={ticket.id}
                                            onDragStart={(e) => this.onDragStart(e, ticket.name)}
                                            draggable
                                        >
                                            <TicketCard ticket={ticket} />
                                        </div>
                                    }
                                    return (null);
                                }

                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { tickets, create } = state;
    const { ticket } = create;

    return {
        tickets, ticket
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };