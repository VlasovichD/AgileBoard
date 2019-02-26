import { ticketConstants } from '../constants';
import { ticketService } from '../services';
import { alertActions } from '.';

export const ticketActions = {
    create,
    getAll,
    getById,
    update,
    move,
    delete: _delete
};

function create(ticket) {
    return dispatch => {
        dispatch(request(ticket));

        ticketService.create(ticket)
            .then(
                ticket => { 
                    dispatch(success(ticket));
                    dispatch(alertActions.success('Ticket successfuly added'));
                    dispatch(ticketActions.getAll());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(ticket) { return { type: ticketConstants.CREATE_REQUEST, ticket }; }
    function success(ticket) { return { type: ticketConstants.CREATE_SUCCESS, ticket }; }
    function failure(error) { return { type: ticketConstants.CREATE_FAILURE, error }; }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        ticketService.getAll()
            .then(
                tickets => dispatch(success(tickets)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: ticketConstants.GETALL_REQUEST }; }
    function success(tickets) { return { type: ticketConstants.GETALL_SUCCESS, tickets }; }
    function failure(error) { return { type: ticketConstants.GETALL_FAILURE, error }; }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        ticketService.getById(id)
            .then(
                ticket => dispatch(success(ticket)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: ticketConstants.GETBYID_REQUEST }; }
    function success(ticket) { return { type: ticketConstants.GETBYID_SUCCESS, ticket }; }
    function failure(error) { return { type: ticketConstants.GETBYID_FAILURE, error }; }
}

function update(ticket) {
    return dispatch => {
        dispatch(request(ticket));

        ticketService.update(ticket)
            .then(
                ticket => {
                    dispatch(success());
                    dispatch(alertActions.success('Ticket successfuly updated'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(ticket) { return { type: ticketConstants.UPDATE_REQUEST, ticket }; }
    function success(ticket) { return { type: ticketConstants.UPDATE_SUCCESS, ticket }; }
    function failure(error) { return { type: ticketConstants.UPDATE_FAILURE, error }; }
}

function move(ticket) {
    return dispatch => {
        dispatch(request(ticket));

        ticketService.move(ticket)
            .then(
                ticket => {
                    dispatch(success());
                    dispatch(alertActions.success('Ticket successfuly moved'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(ticket) { return { type: ticketConstants.MOVE_REQUEST, ticket }; }
    function success(ticket) { return { type: ticketConstants.MOVE_SUCCESS, ticket }; }
    function failure(error) { return { type: ticketConstants.MOVE_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        ticketService.delete(id)
            .then(
                ticket => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: ticketConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: ticketConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: ticketConstants.DELETE_FAILURE, id, error } }
}