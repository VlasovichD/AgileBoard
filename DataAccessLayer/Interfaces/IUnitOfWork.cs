using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Column> Columns { get; }
        IRepository<Ticket> Tickets { get; }
        IRepository<User> Users { get; }
        void Save();
    }
}
