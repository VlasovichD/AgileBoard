using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataAccessLayer.Entities
{
    public class Column
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
}
