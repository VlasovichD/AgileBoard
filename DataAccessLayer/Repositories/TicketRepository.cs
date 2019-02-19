using DataAccessLayer.EF;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer.Repositories
{
    public class TicketRepository : IRepository<Ticket>
    {
        private DataContext context;

        public TicketRepository(DataContext context)
        {
            this.context = context;
        }

        public void Create(Ticket ticket)
        {
            context.Tickets.Add(ticket);
        }

        public IEnumerable<Ticket> GetAll()
        {
            return context.Tickets.Include(u=>u.User).Include(c=>c.Column).ToList();
        }

        public IEnumerable<Ticket> Find(Func<Ticket, bool> predicate)
        {
            return context.Tickets.Include(u => u.User).Include(c => c.Column).Where(predicate).ToList();
        }

        public Ticket GetById(int ticketId)
        {
            return context.Tickets.Find(ticketId);
        }

        public void Update(Ticket ticketId)
        {
            context.Entry(ticketId).State = EntityState.Modified;
        }
        public void Delete(int ticketId)
        {
            Ticket ticket = context.Tickets.Find(ticketId);
            if (ticket != null)
                context.Tickets.Remove(ticket);
        }
    }
}
