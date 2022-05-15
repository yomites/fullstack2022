import Person from "./Person"

const Persons = ({ personsArray }) => {

    return (
      <div>
        <h2>Numbers</h2>
        {personsArray.map(person => 
          <Person key={person.name} person={person} />  
        )}
      </div>
    )
  }

  export default Persons