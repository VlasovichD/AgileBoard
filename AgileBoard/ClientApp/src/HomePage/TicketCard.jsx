import React from 'react';
import { connect } from 'react-redux';

import { ticketActions } from '../_actions';

export class TicketCard extends React.Component {
    constructor(props) {
        super(props);

        /*this.state = { tickets: [] };*/
        this.state = {
            ticket: props.ticket,
            submitted: false
        };
        this.onClickDelete = this.onClickDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onClickDelete(e) {
        this.props.onRemove(this.state.ticket);
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { ticket } = this.state;
        const { dispatch } = this.props;
        if (ticket.name && ticket.description) {
            dispatch(ticketActions.create(ticket));
        }
        this.props.onCardSubmit({ isOpen: false });
    }

    render() {
        const { creating, tickets } = this.props;
        const { ticket, submitted } = this.state;
        /*if (this.state.isUpdated) {
            return <div className={this.state.ticket.columnId + " "} onDragStart={this.onCardMove}>
                <div className="card-body">
                    <input className="input-group-text bg-secondary text-white" type="text"
                        value={this.state.updateName}
                        onChange={this.onNameChange} />
                    <input className="input-group-text bg-secondary text-white" type="text"
                        value={this.state.updateDescription}
                        onChange={this.onDescriptionChange} />
                    <p class="card-text"><small class="text-muted">Last modified by: {this.state.ticket.userId}</small></p>
                    <div className="btn-group-justified" role="group">
                        <span> <button className="btn btn-outline-dark" onClick={this.onClickSave}>Save</button> </span>
                        <span> <button className="btn btn-outline-danger" onClick={this.onClickDelete}>Delete</button> </span>
                    </div>
                </div>
            </div>;
        }*/
        /*if (this.state.ticket.columnId === "3") {
            return <div className={this.state.ticket.state.name + " "} onDragStart={this.onCardMove}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.ticket.name}</h5>
                    <p className="card-text">{this.state.ticket.id + ' ' + this.state.ticket.description + ' ' + this.state.ticket.columnId +
                        ' ' + this.state.ticket.previousTicketId + ' ' + this.state.ticket.nextTicketId}</p>
                    <p class="card-text"><small class="text-muted">Last modified by: {this.state.ticket.userId}</small></p>
                    <div className="btn-group-justified" role="group">
                        <span> <button className="btn btn-outline-danger" onClick={this.onClickDelete}>Delete</button> </span>
                    </div>
                </div>
            </div>;
        }*/
        return (
            <div>
                <div className="card-body">
                    <h5 className="card-title">{ticket.name}</h5>

                    <p className="card-text">{ticket.id + ' ' + ticket.description + ' ' + ticket.columnId +
                        ' ' + ticket.previousTicketId + ' ' + ticket.nextTicketId}</p>
                    <p class="card-text"><small class="text-muted">Last modified by: {ticket.userId}</small></p>
                    <div className="btn-group-justified" role="group">
                        {
                            ticket.updating ? <em> - Updating...</em>
                                : ticket.updateError ? <span className="text-danger"> - ERROR: {ticket.updateError}</span>
                                    : <span> <button className="btn btn-outline-dark" onClick={this.handleUpdateTicket(ticket)}>Update</button> </span>
                        }
                        {
                            ticket.deleting ? <em> - Deleting...</em>
                                : ticket.deleteError ? <span className="text-danger"> - ERROR: {ticket.deleteError}</span>
                                    : <span> <button className="btn btn-outline-danger" onClick={this.onClickDelete}>Delete</button> </span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}