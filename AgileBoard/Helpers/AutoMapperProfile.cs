using AgileBoard.Models;
using AutoMapper;
using BusinessLogicLayer.DTOs;

namespace AgileBoard.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserModel, UserDTO>();
            CreateMap<UserDTO, UserModel>();
            CreateMap<ColumnModel, ColumnDTO>();
            CreateMap<ColumnDTO, ColumnModel>();
            CreateMap<TicketModel, TicketDTO>();
            CreateMap<TicketDTO, TicketModel>();
        }
    }
}
