using AgileBoard.Helpers;
using AgileBoard.Models;
using AutoMapper;
using BusinessLogicLayer.DTOs;
using BusinessLogicLayer.Infrastructure;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AgileBoard.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        // POST api/users/authentication
        [AllowAnonymous]
        [HttpPost("authentication")]
        public IActionResult Authenticate([FromBody, Bind("Username, Password")] UserModel user)
        {
            try
            {
                var userDTO = _userService.Authenticate(user.Username, user.Password);

                var tokenHandler = new JwtSecurityTokenHandler();

                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, userDTO.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                var tokenString = tokenHandler.WriteToken(token);

                // return basic user info (without password) and token to store client side
                return Ok(new
                {
                    userDTO.Id,
                    userDTO.Username,
                    userDTO.FirstName,
                    userDTO.LastName,
                    Token = tokenString
                });
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST api/users/registration
        [AllowAnonymous]
        [HttpPost("registration")]
        public IActionResult Register([FromBody, Bind("FirstName, LastName, Username, Password")] UserModel user)
        {
            try
            {
                var userDTO = _mapper.Map<UserDTO>(user);
                // save 
                var newUserDTO = _userService.Create(userDTO);

                return Ok(_mapper.Map<UserModel>(newUserDTO));
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/users
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var userDtos = _userService.GetAll();

                return Ok(_mapper.Map<List<UserModel>>(userDtos));
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/users/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var userDto = _userService.GetById(id);

                return Ok(_mapper.Map<UserModel>(userDto));
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/users/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody, Bind("FirstName, LastName, Username, Password")] UserModel user)
        {
            try
            {
                // map model to dto and set id
                var userDTO = _mapper.Map<UserDTO>(user);
                userDTO.Id = int.Parse(User.Identity.Name);

                // save
                _userService.Update(userDTO);

                return Ok();
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userService.Delete(id);
                return Ok();
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}