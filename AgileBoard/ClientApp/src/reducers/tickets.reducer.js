import { ticketConstants } from '../constants';

export function tickets(state = {}, action) {
    switch (action.type) {

        case ticketConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case ticketConstants.GETALL_SUCCESS:
            return {
                items: action.tickets
            };
        case ticketConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case ticketConstants.UPDATE_REQUEST:
            return {
                ...state,
                items: state.items.map(ticket =>
                    ticket.id === action.id
                        ? { ...ticket, updating: true }
                        : ticket
                )
            };
        case ticketConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: state.items.map(ticket =>
                    ticket.id === action.id ? action.id : ticket
                )
            };
        case ticketConstants.UPDATE_FAILURE:
            return {
                ...state,
                items: state.items.map(ticket => {
                    if (ticket.id === action.id) {
                        // make copy of ticket without 'updating:true' property
                        const { updating, ...ticketCopy } = ticket;
                        // return copy of ticket with 'updateError:[error]' property
                        return { ...ticketCopy, updateError: action.error };
                    }

                    return ticket;
                })
            };
        case ticketConstants.MOVE_REQUEST:
            return {
                moving: true
            };
        case ticketConstants.MOVE_SUCCESS:
            return {
                ticket: action.ticket
            };
        case ticketConstants.MOVE_FAILURE:
            return {
                error: action.error
            };
        case ticketConstants.DELETE_REQUEST:
            // add 'deleting:true' property to ticket being deleted
            return {
                ...state,
                items: state.items.map(ticket =>
                    ticket.id === action.id
                        ? { ...ticket, deleting: true }
                        : ticket
                )
            };
        case ticketConstants.DELETE_SUCCESS:
            // remove deleted ticket from state
            return {
                items: state.items.filter(ticket => ticket.id !== action.id)
            };
        case ticketConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to ticket 
            return {
                ...state,
                items: state.items.map(ticket => {
                    if (ticket.id === action.id) {
                        // make copy of ticket without 'deleting:true' property
                        const { deleting, ...ticketCopy } = ticket;
                        // return copy of ticket with 'deleteError:[error]' property
                        return { ...ticketCopy, deleteError: action.error };
                    }

                    return ticket;
                })
            };
        default:
            return state;
    }
}

export function create(state = {}, action) {
    switch (action.type) {
        case ticketConstants.CREATE_REQUEST:
            return {
                creating: true
            };
        case ticketConstants.CREATE_SUCCESS:
            return {
                ticket: action.ticket
            };
        case ticketConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}