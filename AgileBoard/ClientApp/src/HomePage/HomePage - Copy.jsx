import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        /*this.state = { tickets: [] };*/
        this.state = {
            ticket: {
                name: '',
                description: ''
            },
            submitted: false
        };
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { ticket } = this.state;
        const { dispatch } = this.props;
        if (ticket.name && ticket.description) {
            dispatch(ticketActions.create(ticket));
        }
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

                                {tickets.items.map((ticket, index) =>
                                    < div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}
                                        key={ticket.id}
                                        onDragStart={(e) => this.onDragStart(e, ticket.name)}
                                        draggable
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">{ticket.name}</h5>

                                            <p className="card-text">{ticket.id + ' ' + ticket.description + ' ' + ticket.columnId +
                                                ' ' + + ' ' + ticket.previousTicketId + ' ' + ticket.nextTicketId}</p>
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
                                                            : <span> <button className="btn btn-outline-danger" onClick={this.handleDeleteTicket(ticket.id)}>Delete</button> </span>
                                                }

                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        }

                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !ticket.name ? ' has-error' : '')}>
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" value={ticket.name} onChange={this.handleChange} />
                                {submitted && !ticket.name &&
                                    <div className="help-block">Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !ticket.description ? ' has-error' : '')}>
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" name="description" value={ticket.description} onChange={this.handleChange} />
                                {submitted && !ticket.description &&
                                    <div className="help-block">Description is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Add new</button>
                                {creating &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </form>
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
        tickets, creating
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };