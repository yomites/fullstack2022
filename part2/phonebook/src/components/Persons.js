import Person from "./Person"

const Persons = ({ personsArray }) => {

    return (
      <div>
        {personsArray.map(person => 
          <Person key={person.name} person={person} />  
        )}
      </div>
    )
  }

  export default Persons