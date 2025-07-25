import { useState, useEffect } from 'react'
import {workoutProgram as training_plan, workoutProgram} from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx' 

export default function Grid(){
    const [savedWorkouts, setSavedWorkouts] = useState(null)

    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val)=>{
        const entry = savedWorkouts[val]
        return entry.isComplete
    })
    function handleSave(index, data){
        // save to local storage and modify the saved workouts state
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
            }
        }
        setSavedWorkouts(newObj)
        localStorage.setItem('brogram', JSON.stringify(newObj))
        setSelectedWorkout(null)
    }
    function  handleComplete(index, data){
        // complete a workout (we modify the completed status)
        const  newObj = {...data}
        newObj.isComplete = true
        handleSave(index, newObj)
    }

    useEffect(()=> {
        if (!localStorage) {return}
        let savedData = {}
        if (localStorage.getItem('brogram')) {
            savedData = JSON.parse(localStorage.getItem('brogram'))
        }
        setSavedWorkouts(savedData)
    }, [])

    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                const isLocked = (workoutIndex === 0) ? 
                    false :
                    !completedWorkouts.includes(`${workoutIndex - 1}`) 

                console.log(workoutIndex, isLocked)

                const type = workoutIndex % 3 === 0 ? 'Push' : workoutIndex % 3 === 1 ? 'Pull' : 'Legs'
                const trainingPlan = training_plan[workoutIndex]
                const dayNum = (workoutIndex / 8) <= 1 ? '0' + (workoutIndex + 1) : workoutIndex + 1
                const icon_string = isLocked ? 'fa-solid fa-lock' : type === 'Push' ? 'fa-solid fa-dumbbell' : type === 'Pull' ? 'fa-solid fa-weight-hanging' : 'fa-solid fa-bolt'
                if (workoutIndex === selectedWorkout) {
                    return (
                        <WorkoutCard 
                        savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                        key={workoutIndex} trainingPlan={trainingPlan} type={type} workoutIndex={workoutIndex}
                        icon = {<i className={icon_string}></i>} dayNum = {dayNum} 
                        handleComplete={handleComplete} handleSave={handleSave}
                        />
                    )
                }
                
                return (
                    <button className={'card plan-card  ' + (isLocked ? 'inactive' : '')} key={workoutIndex}
                        onClick={()=>{
                            setSelectedWorkout(workoutIndex)
                        }}
                        disabled={isLocked}
                    >
                        <div className='plan-card-header'>
                            <p>Day {dayNum}</p>
                        </div>
                        <i className={icon_string}></i>
                        <div className='plan-card-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}