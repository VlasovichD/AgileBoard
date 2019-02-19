using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Interfaces
{
    public interface IRepository<T> where T : class
    {
        void Create(T item);
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Func<T, bool> predicate);
        T GetById(int id);
        void Update(T item);
        void Delete(int id);
    }
}
