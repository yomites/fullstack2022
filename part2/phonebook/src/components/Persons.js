import Person from "./Person"

const Persons = ({ personsArray, deletePerson }) => {

    return (
      <div>
        {personsArray.map(person => 
          <Person key={person.name} person={person} deletePerson={deletePerson} />  
        )}
      </div>
    )
  }

  export default Persons