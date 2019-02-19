using BusinessLogicLayer.DTOs;
using System.Collections.Generic;

namespace BusinessLogicLayer.Services
{
    public interface IBoardService
    {
        TicketDTO Create(TicketDTO ticketDTO);
        IEnumerable<TicketDTO> GetAll();
        TicketDTO GetById(int ticketId);
        void Update(TicketDTO ticketDTO);
        void Move(TicketDTO ticketDTO);
        void Delete(int ticketId);
        void Dispose();
    }
}
