using AutoMapper;
using BusinessLogicLayer.DTOs;
using BusinessLogicLayer.Infrastructure;
using BusinessLogicLayer.Services;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogicLayer.Services
{
    public class BoardService : IBoardService
    {
        private readonly IUnitOfWork _database;
        private readonly IMapper _mapper;

        public BoardService(IUnitOfWork uow, IMapper mapper)
        {
            _database = uow;
            _mapper = mapper;
        }

        public TicketDTO Create(TicketDTO newTicketDTO)
        {
            if (string.IsNullOrWhiteSpace(newTicketDTO.Name))
                throw new ValidationException("Ticket name is empty");

            var newTicket = _mapper.Map<Ticket>(newTicketDTO);

            //var previousTicket = _database.Tickets.Find(t => t.ColumnId == newTicket.ColumnId && t.NextTicketId == null).SingleOrDefault();

            //newTicket.PreviousTicketId = previousTicket?.Id;

            //newTicket.NextTicketId = null;

            _database.Tickets.Create(newTicket);

            //if (previousTicket != null)
            //    previousTicket.NextTicketId = newTicket.Id;

            _database.Save();

            return _mapper.Map<TicketDTO>(newTicket);
        }

        public IEnumerable<TicketDTO> GetAll()
        {
            var tickets = _database.Tickets.GetAll().ToList();

            if (tickets == null)
                throw new ValidationException("Board is empty");

            return _mapper.Map<List<TicketDTO>>(tickets);
        }

        public TicketDTO GetById(int ticketId)
        {
            var ticket = _database.Tickets.GetById(ticketId);

            if (ticket == null)
                throw new ValidationException("Ticket not found");

            return _mapper.Map<TicketDTO>(ticket);
        }

        public void Update(TicketDTO ticketDTO)
        {
            if (string.IsNullOrWhiteSpace(ticketDTO.Name))
                throw new ValidationException("Ticket name is empty");

            var currentTicket = _database.Tickets.GetById(ticketDTO.Id);

            if (currentTicket == null)
                throw new ValidationException("Ticket not found");

            // update ticket properties
            currentTicket.Name = ticketDTO.Name;
            currentTicket.Description = ticketDTO.Description;
            currentTicket.UserId = ticketDTO.UserId;

            _database.Save();
        }

        public void Move(TicketDTO newTicketDTO)
        {
            var currentTicket = _database.Tickets.GetById(newTicketDTO.Id);

            if (currentTicket == null)
                throw new ValidationException("Ticket not found");

            var newTicket = _mapper.Map<Ticket>(newTicketDTO);

            //if (newTicket.PreviousTicketId != null)
            //{
            //    var previousNewTicket = _database.Tickets.GetById(newTicket.PreviousTicketId.Value);
            //    previousNewTicket.NextTicketId = newTicket.Id;
            //}

            //if (newTicket.NextTicketId != null)
            //{
            //    var nextNewTicket = _database.Tickets.GetById(newTicket.NextTicketId.Value);
            //    nextNewTicket.PreviousTicketId = newTicket.Id;
            //}

            //if (currentTicket.PreviousTicketId != null)
            //{
            //    var previousCurrentTicket = _database.Tickets.GetById(currentTicket.PreviousTicketId.Value);
            //    previousCurrentTicket.NextTicketId = currentTicket.NextTicketId;
            //}

            //if (currentTicket.NextTicketId != null)
            //{
            //    var nextCurrentTicket = _database.Tickets.GetById(currentTicket.NextTicketId.Value);
            //    nextCurrentTicket.PreviousTicketId = currentTicket.PreviousTicketId;
            //}

            currentTicket.UserId = newTicket.UserId;
            currentTicket.ColumnId = newTicket.ColumnId;

            //currentTicket.PreviousTicketId = newTicket.PreviousTicketId;
            //currentTicket.NextTicketId = newTicket.NextTicketId;

            _database.Save();
        }

        public void Delete(int ticketId)
        {
            var ticket = _database.Tickets.GetById(ticketId);

            if (ticket == null)
            {
                throw new ValidationException("Ticket not found");
            }

            //if (ticket.PreviousTicketId != null)
            //{
            //    var previousTicket = _database.Tickets.GetById(ticket.PreviousTicketId.Value);
            //    previousTicket.NextTicketId = ticket.NextTicketId;
            //}

            //if (ticket.NextTicketId != null)
            //{
            //    var nextTicket = _database.Tickets.GetById(ticket.NextTicketId.Value);
            //    nextTicket.PreviousTicketId = ticket.PreviousTicketId;
            //}

            //_database.Save();

            _database.Tickets.Delete(ticketId);
            _database.Save();
        }

        public void Dispose()
        {
            _database.Dispose();
        }
    }
}
