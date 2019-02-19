using BusinessLogicLayer.DTOs;
using System.Collections.Generic;

namespace BusinessLogicLayer.Interfaces
{
    public interface IUserService
    {
        UserDTO Authenticate(string username, string password);
        UserDTO Create(UserDTO userDTO);
        IEnumerable<UserDTO> GetAll();
        UserDTO GetById(int userId);
        void Update(UserDTO userDTO);
        void Delete(int userId);
    }
}
