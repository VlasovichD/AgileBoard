using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataAccessLayer.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ColumnId { get; set; }
        public Column Column { get; set; }
        //public int? PreviousTicketId { get; set; }
        //public Ticket PreviousTicket { get; set; }
        //public int? NextTicketId { get; set; }
        //public Ticket NextTicket { get; set; }
    }
}
