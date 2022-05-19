const Person = ({ person, deletePerson }) => {
    const label = 'delete'
    return (
        <div>{person.name} {person.number} 
            <button onClick={() => deletePerson(person.id)}>{label}</button></div>
    )
}

export default Person