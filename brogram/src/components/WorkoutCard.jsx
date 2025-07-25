import React, { useState } from "react"
import Modal from "./Modal"
import {exerciseDescriptions} from '../utils/index.js'

export default function WorkoutCard(props){
    const {trainingPlan, workoutIndex, type, dayNum, savedWeights, icon,handleSave, handleComplete} = props
    const {warmup = [], workout = []} = trainingPlan || {}
    const [showExerciseDescription, setShowExerciseDescription] = useState(null)
    const [weights, setWeights] = useState(savedWeights || {})
    function handleAddWeight(title, weight){
        const newObj = {
            ...weights,
            [title]:  weight
        }
        setWeights(newObj)
    }
    
    return(
        <div className="workout-container">
            {
                showExerciseDescription &&
                <Modal showExerciseDescription={showExerciseDescription} handleCloseModal={()=> setShowExerciseDescription(null)} />
            }
            <div className="workout-card card">
                <div className="plan-card-header">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h2><b>{type} Workout</b></h2>
                </div>
            </div>
            <div className="workout-grid">
                <div className='exercise-name'>
                    <h4>Warmup</h4>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max Weight</h6>
               { warmup.map((exercise, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="exercise-name">
                                <p>{index + 1}. {exercise.name}</p>
                                <button className="help-icon"
                                onClick={()=>{
                                    setShowExerciseDescription({
                                        name: exercise.name,
                                        description: exerciseDescriptions[exercise.name]
                                    })
                                }}
                                >
                                    <i className="fa-regular fa-circle-question"/>
                                </button>
                            </div>
                            <p className="exercise-info">{exercise.sets}</p>
                            <p className="exercise-info">{exercise.reps}</p>
                            <input className="weight-input" placeholder="N/A" disabled/>
                        </React.Fragment>
                    )
               })}
            </div>
            <div className="workout-grid">
                <div className='exercise-name'>
                    <h4>Workout</h4>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max Weight</h6>
               { workout.map((exercise, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="exercise-name">
                                <p>{index + 1}. {exercise.name}</p>
                                <button className="help-icon"
                                    onClick={()=>{
                                        setShowExerciseDescription({
                                        name: exercise.name,
                                        description: exerciseDescriptions[exercise.name]
                                    })
                                    }}
                                >
                                    <i className="fa-regular fa-circle-question"/>
                                </button>
                            </div>
                            <p className="exercise-info">{exercise.sets}</p>
                            <p className="exercise-info">{exercise.reps}</p>
                            <input value={weights[exercise.name] || ''} 
                            onChange={(e)=> {
                                handleAddWeight(exercise.name, e.target.value)
                            }} className="weight-input" placeholder="14"/> 
                        </React.Fragment>
                    )
               })}
            </div> 
             
            <div className="workout-buttons">
                <button onClick={()=> {
                    handleSave(workoutIndex, {weights})
                }}
                >Save & Exit</button>
                <button onClick={()=>{
                    handleComplete(workoutIndex, {weights})
                }}
                disabled={Object.keys(weights).length !== workout.length}>Complete</button>
            </div>
        </div>
    )
}