const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => <h2>{course}</h2>

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

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <div>
    {parts.map(part => 
          <Part key={part.id} part={part} />
    )}
  </div>

const App = () => {
  const header = "Web development curriculum"
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>{header} </h1>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App
