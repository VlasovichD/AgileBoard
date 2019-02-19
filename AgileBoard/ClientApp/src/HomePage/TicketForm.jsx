import React from 'react';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';


class TicketForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                name: '',
                description: ''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { ticket } = this.state;
        if (ticket.name && ticket.description) {
            this.props.onCardSubmit({ name: ticket.name, description: ticket.description });
            this.setState({ ticket: { name: '', description: '' } })
        }
    }

    render() {

        const { creating } = this.props;
        const { ticket, submitted } = this.state;
        return (
            <form name="form" onSubmit={this.onSubmit}>
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
                    <button className="btn btn-primary">Add</button>
                    {creating &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const { creating } = state;
    return {
        creating
    };
}

const connectedTicketForm = connect(mapStateToProps)(TicketForm);
export { connectedTicketForm as TicketForm };