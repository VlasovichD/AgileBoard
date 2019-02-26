namespace BusinessLogicLayer.DTOs
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
        public int ColumnId { get; set; }
        //public int? PreviousTicketId { get; set; }
        //public int? NextTicketId { get; set; }
    }
}
