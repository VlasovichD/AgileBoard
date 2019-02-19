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
    public class ColumnRepository : IRepository<Column>
    {
        private DataContext context;

        public ColumnRepository(DataContext context)
        {
            this.context = context;
        }

        public void Create(Column column)
        {
            context.Columns.Add(column);
        }

        public IEnumerable<Column> GetAll()
        {
            return context.Columns.ToList();
        }

        public IEnumerable<Column> Find(Func<Column, bool> predicate)
        {
            return context.Columns.Where(predicate).ToList();
        }

        public Column GetById(int columnId)
        {
            return context.Columns.Find(columnId);
        }

        public void Update(Column column)
        {
            context.Entry(column).State = EntityState.Modified;
        }
        public void Delete(int columnId)
        {
            Column column = context.Columns.Find(columnId);
            if (column != null)
                context.Columns.Remove(column);
        }
    }
}
