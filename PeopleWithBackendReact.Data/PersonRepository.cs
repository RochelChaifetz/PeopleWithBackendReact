namespace PeopleWithBackendReact.Data
{
    public class PersonRepository
    {
        private string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Update(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }

        public void Delete(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Remove(person);
            context.SaveChanges();
        }

        public void DeleteAll(List<int> ids)
        {
            using var context = new PeopleDbContext(_connectionString);
            foreach (int i in ids)
            {
                var person = context.People.FirstOrDefault(p => p.Id == i);
                Delete(person);
            }
        }

    }
}