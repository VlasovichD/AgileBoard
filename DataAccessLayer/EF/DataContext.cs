using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.EF
{
    public class DataContext : DbContext
    {
        public DbSet<Column> Columns { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Ticket>()
            //    .HasOne(t => t.PreviousTicket).WithOne().HasForeignKey<Ticket>(t => t.PreviousTicketId);

            //modelBuilder.Entity<Ticket>()
            //    .HasOne(t => t.NextTicket).WithOne().HasForeignKey<Ticket>(t => t.NextTicketId);

            modelBuilder.Entity<Column>().HasData(
                new Column { Id = 1, Name = "TO DO" },
                new Column { Id = 2, Name = "In Progress" },
                new Column { Id = 3, Name = "Done" }
                );

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        Id = 1,
                        FirstName = "John",
                        LastName = "Smith",
                        Username = "user1",
                        PasswordSalt = hmac.Key,
                        PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("password")),
                    });
            }

            modelBuilder.Entity<Ticket>().HasData(
                new Ticket { Id = 1, Name = "Ticket 1", Description = "Description 1", ColumnId = 1, UserId = 1 },
                new Ticket { Id = 2, Name = "Ticket 2", Description = "Description 2", ColumnId = 2, UserId = 1 },
                new Ticket { Id = 3, Name = "Ticket 3", Description = "Description 3", ColumnId = 3, UserId = 1 },
                new Ticket { Id = 4, Name = "Ticket 4", Description = "Description 4", ColumnId = 1, UserId = 1 },
                new Ticket { Id = 5, Name = "Ticket 5", Description = "Description 5", ColumnId = 2, UserId = 1 },
                new Ticket { Id = 6, Name = "Ticket 6", Description = "Description 6", ColumnId = 3, UserId = 1 }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
