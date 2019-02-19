using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AgileBoard.Models;
using AutoMapper;
using BusinessLogicLayer.DTOs;
using BusinessLogicLayer.Infrastructure;
using BusinessLogicLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgileBoard.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;
        private readonly IMapper _mapper;

        public BoardController(
            IBoardService boardService,
            IMapper mapper)
        {
            _boardService = boardService;
            _mapper = mapper;
        }

        // POST api/board
        [HttpPost]
        public IActionResult Create([FromBody, Bind("Name, Description")] TicketModel ticket)
        {
            try
            {
                var ticketDto = _mapper.Map<TicketDTO>(ticket);

                ticketDto.UserId = int.Parse(User.Identity.Name);

                var newTicketDTO = _boardService.Create(ticketDto);

                return Ok(_mapper.Map<TicketModel>(newTicketDTO));
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/board
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var ticketDTOs = _boardService.GetAll();

                return Ok(_mapper.Map<List<TicketDTO>>(ticketDTOs));
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/board/{ticketId}
        [HttpGet("{ticketId}")]
        public IActionResult GetById(int ticketId)
        {
            try
            {
                var ticketDTO = _boardService.GetById(ticketId);

                return Ok(_mapper.Map<TicketModel>(ticketDTO));
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/board/{ticketId}/updating
        [HttpPut("{ticketId}/updating")]
        public IActionResult Update(int ticketId, [FromBody, Bind("Name, Description")] TicketModel ticket)
        {
            try
            {
                var ticketDTO = _mapper.Map<TicketDTO>(ticket);

                ticketDTO.Id = ticketId;
                ticketDTO.UserId = int.Parse(User.Identity.Name);

                _boardService.Update(ticketDTO);

                return Ok();
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/board/{ticketId}/moving
        [HttpPut("{ticketId}/moving")]
        public IActionResult Move(int ticketId, [FromBody, Bind("ColumnId, PreviousTicketId, NextTicketId")]  TicketModel ticket)
        {
            try
            {
                var ticketDTO = _mapper.Map<TicketDTO>(ticket);

                ticketDTO.Id = ticketId;
                ticketDTO.UserId = int.Parse(User.Identity.Name);

                _boardService.Move(ticketDTO);

                return Ok();
            }
            catch (ValidationException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/board/{ticketId}
        [HttpDelete("{ticketId}")]
        public IActionResult Delete(int ticketId)
        {
            try
            {
                _boardService.Delete(ticketId);

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
