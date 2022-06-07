import {useState,useEffect} from "react"
const Home = () => {
  const [displayAnimals, setDisplayAnimals] = useState([])
  const [addAnimal,setAddAnimal] = useState({
    name:"",
    animal:""
  })

  const handleChangeName  = (e) =>{
    setAddAnimal({...addAnimal,name:e.target.value})
  }
  const handleChangeAnimal = (e) =>{
    setAddAnimal({...addAnimal,animal:e.target.value})
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    fetch("/api/animals",{
      method:"POST",
      headers:{"Content-type":"Application/JSON"},
      body: JSON.stringify(addAnimal)
    }).then(res => res.json())
    .then(
      (result) => {
        setDisplayAnimals(result)
      },
    )

  }
  useEffect(() => {
    fetch("/api/animals")
      .then(res => res.json())
      .then(
        (result) => {
          setDisplayAnimals(result)
        },
      )
  }, [])
  
  return (
    <div>
      <h1 className="text-l font-bold">
        Flame Factory
        {
          displayAnimals.map((animal,index) =>{
           return(
             <div key={index}>
               <h3>{animal.name}</h3>
               <span>{animal.animal}</span>
             </div>
           )
          })
        }
      </h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChangeName}/>
        <input type="text" name="animal" onChange={handleChangeAnimal}/>
        <button type="submit">Add animal</button>
      </form>
    </div>
  )
};

export default Home;
