import React from 'react';
import { connect } from 'react-redux';

import { ticketActions } from '../actions';

class TicketCard extends React.Component {
    constructor(props) {
        super(props);

        /*this.state = { tickets: [] };*/
        this.state = {
            ticket: props.ticket,
            isUpdated: false,
        };

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteTicket = this.handleDeleteTicket.bind(this);
    }

    handleMoveTicket(ticket) {
        return (e) => this.props.dispatch(ticketActions.move(ticket));
    }

    onClickUpdate(e) {
        this.setState({ isUpdated: true });

    }

    onClickCancel(event) {
        event.preventDefault();
        this.setState({
            ticket: this.props.ticket,
            isUpdated: false
        });
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

    handleUpdate(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { ticket } = this.state;
        ticket.user.username = this.props.user.username;
        const { dispatch } = this.props;
        if (ticket.name && ticket.description) {
            dispatch(ticketActions.update(ticket));
            this.setState({ isUpdated: false });
        }
    }

    handleDeleteTicket(id) {
        return (e) => this.props.dispatch(ticketActions.delete(id));
    }

    render() {
        const { creating } = this.props;
        const { ticket, submitted } = this.state;
        if (this.state.isUpdated) {
            return <div className={this.state.ticket.columnId + " "} onDragStart={this.onCardMove}>
                <div className="card-body">
                    <div className={'form-group' + (submitted && !ticket.name ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="name" value={ticket.name} onChange={this.handleChange} />
                        {submitted && !ticket.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !ticket.description ? ' has-error' : '')}>
                        <textarea type="text" rows="3" className="form-control  form-control-sm" name="description" value={ticket.description} onChange={this.handleChange} />
                        {submitted && !ticket.description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <p className="card-text"><small class="text-muted">Last modified by: {ticket.user.username}</small></p>
                    <div className="btn-group-justified text-center" role="group">
                        <span> <button className="btn btn-outline-primary" onClick={this.handleUpdate}>Save</button> </span>
                        {creating &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <span> <button className="btn btn-outline-dark" onClick={this.onClickCancel}>Cancel</button> </span>
                        {
                            ticket.deleting ? <em> - Deleting...</em>
                                : ticket.deleteError ? <span className="text-danger"> - ERROR: {ticket.deleteError}</span>
                                    : <span> <button className="btn btn-outline-danger" onClick={this.handleDeleteTicket(ticket.id)}>Delete</button> </span>
                        }
                    </div>
                </div>
            </div>;
        }
        return (
            <div>
                <div className="card-body">
                    <h5 className="card-title">{ticket.name}</h5>

                    <p className="card-text">{ticket.description}</p>
                    <p className="card-text"><small class="text-muted">Last modified by: {ticket.user.username}</small></p>
                    <div className="btn-group-justified text-center" role="group">
                        <span> <button className="btn btn-outline-dark" onClick={this.onClickUpdate}>Update</button> </span>
                        {
                            ticket.deleting ? <em> - Deleting...</em>
                                : ticket.deleteError ? <span className="text-danger"> - ERROR: {ticket.deleteError}</span>
                                    : <span> <button className="btn btn-outline-danger" onClick={this.handleDeleteTicket(ticket.id)}>Delete</button> </span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { updating, authentication } = state;
    const { user } = authentication;
    return {
        updating, user
    };
}

const connectedTicketCard = connect(mapStateToProps)(TicketCard);
export { connectedTicketCard as TicketCard };