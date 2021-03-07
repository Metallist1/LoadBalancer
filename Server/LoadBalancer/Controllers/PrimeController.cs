using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoadBalancer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrimeController : ControllerBase
    {
        private readonly IPrime _primeService;

        public PrimeController(IPrime primeService)
        {
            _primeService = primeService;
        }
        // GET: api/<PrimeController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PrimeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PrimeController>
        [HttpPost]
        // POST: api/Login
        public IActionResult Post([FromBody] JObject data)
        {
            try
            {
                if (data["isPrime"].HasValues)
                {

                    var isPrimeResponse = _primeService.isPrime(data["isPrime"].ToString());

                    return Ok(new{
                    response = isPrimeResponse
                    });
                }
                else
                {
                    var countResponse = _primeService.countPrime(data["from"].ToString(), data["to"].ToString());

                    return Ok(new
                    {
                        response = countResponse
                    });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<PrimeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PrimeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
