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
    public class UserRepository : IRepository<User>
    {
        private DataContext context;

        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return context.Users.ToList();
        }

        public IEnumerable<User> Find(Func<User, bool> predicate)
        {
            return context.Users.Where(predicate).ToList();
        }

        public User GetById(int userId)
        {
            return context.Users.Find(userId);
        }

        public void Create(User user)
        {
            context.Users.Add(user);
        }

        public void Update(User user)
        {
            context.Entry(user).State = EntityState.Modified;
        }

        public void Delete(int userId)
        {
            User user = context.Users.Find(userId);
            if (user != null)
                context.Users.Remove(user);
        }
    }
}
