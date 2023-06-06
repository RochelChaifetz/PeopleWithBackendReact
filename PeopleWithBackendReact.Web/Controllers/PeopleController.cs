using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleWithBackendReact.Data;
using PeopleWithBackendReact.Web.Model;

namespace PeopleWithBackendReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("updateperson")]
        public void UpdatePerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(person);
        }

        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(person);
        }


    }
}
