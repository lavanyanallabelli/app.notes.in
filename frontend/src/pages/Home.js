import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

//components
import WorkoutDetails from "../components/WorkDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

  const {workouts, dispatch } = useWorkoutContext()

    // const [ works, setWorks] = useState(null)

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('/api/')
        const json = await response.json()

        if (response.ok) {
            // setWorks(json)
          dispatch({type: 'SET_WORKOUTS', payload: json})

        }
      }
      fetchWorkouts()
    }, [dispatch])
    return (
        <div className="home"> 
          <div className="workouts">
            { workouts && workouts.map((workout) => (
              <WorkoutDetails key = {workout._id} workout = {workout}/>
              //  <p key= {work._id}> {work.title}</p>
            ) )}
          </div>
          <WorkoutForm/>
        </div>
    )
}

export default Home;


                

                                                                       