using DataAccessLayer.EF;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext context;
        private ColumnRepository columnsRepository;
        private TicketRepository ticketsRepository;
        private UserRepository usersRepository;

        public UnitOfWork(DataContext context)
        {
            this.context = context;
        }

        public IRepository<Column> Columns
        {
            get
            {
                if (columnsRepository == null)
                    columnsRepository = new ColumnRepository(context);
                return columnsRepository;
            }
        }

        public IRepository<Ticket> Tickets
        {
            get
            {
                if (ticketsRepository == null)
                    ticketsRepository = new TicketRepository(context);
                return ticketsRepository;
            }
        }

        public IRepository<User> Users
        {
            get
            {
                if (usersRepository == null)
                    usersRepository = new UserRepository(context);
                return usersRepository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
