import React from 'react';
import { connect } from 'react-redux';
import { ticketActions } from '../actions';


class TicketForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                name: '',
                description: '',
                columnId: props.columnId
            },
            submitted: false,
            isOpen: false
        };

        this.openTicketAdder = this.openTicketAdder.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openTicketAdder = () => {
        this.setState({
            ticket: {
                name: "",
                description: "",
                columnId: this.props.columnId
            },
            isOpen: true,
            submitted: false
        });
    };

    onClickCancel = () => {
        this.setState({ isOpen: false });
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
            this.setState({ isOpen: false });
        }
    }

    render() {
        const { creating } = this.props;
        const { ticket, submitted } = this.state;
        if (this.state.isOpen) {
            return (
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !ticket.name ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="name" placeholder="Name" value={ticket.name} onChange={this.handleChange} />
                        {submitted && !ticket.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !ticket.description ? ' has-error' : '')}>
                        <textarea type="text" rows="3" className="form-control" name="description" placeholder="Description" value={ticket.description} onChange={this.handleChange} />
                        {submitted && !ticket.description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className="btn-group-justified text-center" role="group">
                        <span> <button className="btn btn-primary">Add</button>  </span>
                        {creating &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <span> <button className="btn btn-outline-dark" onClick={this.onClickCancel}>Cancel</button> </span>
                    </div>
                </form>
            );
        }
        return (
            <div className="text-center">
                <button className="btn btn-primary" onClick={this.openTicketAdder}>Add new</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { creating } = state.create;
    return {
        creating
    };
}

const connectedTicketForm = connect(mapStateToProps)(TicketForm);
export { connectedTicketForm as TicketForm };