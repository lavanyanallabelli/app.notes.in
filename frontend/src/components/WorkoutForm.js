import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const WorkoutForm = () => {
    
    const { dispatch } = useWorkoutContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, SetReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //creating work or POST 
        const workoutCreate = {title, load, reps}

        const response = await fetch('/api/',{
            method: 'POST',
            body: JSON.stringify(workoutCreate),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle('')
            setLoad('')
            SetReps('')
            setError(null)
            setEmptyFields([])
            
            console.log('new workout added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (
       <form className="create" onSubmit={handleSubmit}>
        <h3> Add a New Workout</h3>

        <label> Exercize Title:</label>
        <input 
           type = "text"
           onChange={(e) => setTitle(e.target.value)}
           value={title}
           className= { emptyFields.includes('title') ? 'error': ''}
        />

        <label> Load (in kg): </label>
        <input 
           type = "number"
           onChange={(e) => setLoad(e.target.value)}
           value={load}
           className= { emptyFields.includes('load') ? 'error': ''}
        />

        <label> Reps: </label>
        <input 
           type = "number"
           onChange={(e) => SetReps(e.target.value)}
           value={reps}
           className= { emptyFields.includes('reps') ? 'error': ''}
        />

        <button> Add Workout</button>
        {error && <div className="error">{error}</div>}


       </form> 
    )
}

export default WorkoutForm;






                        