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
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.PreviousTicket).WithOne().HasForeignKey<Ticket>(t => t.PreviousTicketId);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.NextTicket).WithOne().HasForeignKey<Ticket>(t => t.NextTicketId);

            modelBuilder.Entity<Column>().HasData(
                new Column { Id = 1, Name = "TO DO" },
                new Column { Id = 2, Name = "In Progress" },
                new Column { Id = 3, Name = "Done" }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
