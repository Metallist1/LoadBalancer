using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoadBalancer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrimesController : ControllerBase
    {
        private readonly IPrime _primeService;

        public PrimesController(IPrime primeService)
        {
            _primeService = primeService;
        }

        // GET api/<PrimesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var isPrimeResponse = _primeService.isPrime(id);
            return Ok(new
            {
                response = isPrimeResponse
            });
        }

        // POST api/<PrimesController>
        [HttpPost]
        public IActionResult Post([FromBody] FromBody newObject)
        {
            try
            {
                    var countResponse = _primeService.countPrime(newObject.from, newObject.to);

                    return Ok(new
                    {
                        response = countResponse
                    });
             
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

     
    }
}
