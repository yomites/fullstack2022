const Total = ({ parts }) => {
    console.log(parts)
    const total = (parts.map(p => p.exercises)).reduce((s, p) => s + p)
    return (
     <div>
          <b>
            total of {total} exercises
          </b>
      </div>
    )
  }

  export default Total