import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';
import { TicketCard } from './TicketCard';
import { TicketForm } from './TicketForm';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ticket: [] };

        this.onAddCard = this.onAddCard.bind(this);
        this.onUpdateCard = this.onUpdateCard.bind(this);
        this.onMoveCard = this.onMoveCard.bind(this);
        this.onRemoveCard = this.onRemoveCard.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(ticketActions.getAll());
    }

    onAddCard(ticket) {
        return (e) => this.props.dispatch(ticketActions.create(ticket));
    }

    onUpdateCard(ticket) {
        return (e) => this.props.dispatch(ticketActions.update(ticket));
    }

    onMoveCard(ticket) {
        return (e) => this.props.dispatch(ticketActions.move(ticket));
    }

    onRemoveCard(id) {
        return (e) => this.props.dispatch(ticketActions.delete(id));
    }


    render() {

        const { creating, tickets } = this.props;
        const { ticket, submitted } = this.state;
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
                                {
                                    this.props.tickets.items.map(function(ticket) {
                                        
                                            return <div>
                                                <TicketCard  />
                                            </div>;
                                    })
                                }
                            </div>
                        }
                        <div>
                            <TicketForm onCardSubmit={this.onAddCard} />
                        </div>
                    </div>
                    <div class="col-4">
                        <h2 className="text-center">In Progress</h2>
                        {/*
                            this.state.ticket.map(function (ticket) {
                                if (ticket.columnId === "2")
                                    return <div className="card bg-light mb-3"
                                        style={{ maxWidth: "18rem" }}
                                        key={ticket.id}
                                        onDragStart={(e) => this.onDragStart(e, ticket.name)}
                                        draggable>
                                        <TicketCard className="" key={ticket.id} ticket={ticket} onRemove={this.onRemoveCard} onUpdate={this.onUpdateCard} onMove={this.onMoveCard} />
                                    </div>;
                            })
                        */}
                    </div>
                    <div class="col-4">
                        <h2 className="text-center">Done</h2>
                        {/*
                            this.state.ticket.map(function (ticket) {
                                if (ticket.columnId === "3")
                                    return <div className="card bg-light mb-3"
                                        style={{ maxWidth: "18rem" }}
                                        key={ticket.id}
                                        onDragStart={(e) => this.onDragStart(e, ticket.name)}
                                        draggable>
                                        <TicketCard className="" key={ticket.id} ticket={ticket} onRemove={this.onRemoveCard} onUpdate={this.onUpdateCard} onMove={this.onMoveCard} />
                                    </div>;
                            })
                        */}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { tickets } = state;
    return {
        tickets
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };