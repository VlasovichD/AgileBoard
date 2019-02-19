using AutoMapper;
using BusinessLogicLayer.DTOs;
using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<Column, ColumnDTO>();
            CreateMap<ColumnDTO, Column>();
            CreateMap<Ticket, TicketDTO>();
            CreateMap<TicketDTO, Ticket>();
        }
    }
}
