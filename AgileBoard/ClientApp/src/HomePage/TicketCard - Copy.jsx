import React from 'react';
import { connect } from 'react-redux';

class TicketCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: props.ticket,
            isUpdated: false,
           /* updateName: props.ticket.name,
            updateDescription: props.ticket.description*/
        };

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCardMove = this.onCardMove.bind(this);
    }

    onClickDelete(e) {
        this.props.onRemove(this.state.ticket);
    }
    onClickUpdate(e) {
        this.setState({ isUpdated: true });
    }
    onClickSave(e) {
        this.setState({ isUpdated: false });
        this.props.onUpdate(this.state.ticket.id, this.state.updateName, this.state.updateDescription, this);
    }
    onNameChange(e) {
        this.setState({ updateName: e.target.value });
    }
    onDescriptionChange(e) {
        this.setState({ updateDescription: e.target.value });
    }
    onCardMove(e) {
        this.props.onMove(this.state.ticket, this);
    }

    render() {

        if (this.state.isUpdated) {
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
        }
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
        return <div className={this.state.ticket.columnId + " "} onDragStart={this.onCardMove}>
            <div className="card-body">
                <h5 className="card-title">{this.state.ticket.name}</h5>
                <p className="card-text">{this.state.ticket.id + ' ' + this.state.ticket.description + ' ' + this.state.ticket.columnId +
                    ' ' + this.state.ticket.previousTicketId + ' ' + this.state.ticket.nextTicketId}</p>
                <p class="card-text"><small class="text-muted">Last modified by: {this.state.ticket.userId}</small></p>
                <div className="btn-group-justified" role="group">
                    <span> <button className="btn btn-outline-dark" onClick={this.onClickUpdate}>Update</button> </span>
                    <span> <button className="btn btn-outline-danger" onClick={this.onClickDelete}>Delete</button> </span>
                </div>
            </div>
        </div>;
    }
}

function mapStateToProps(state) {
    const { ticket } = state;
    return {
        ticket
    };
}

const connectedTicketCard = connect(mapStateToProps)(TicketCard);
export { connectedTicketCard as TicketCard };