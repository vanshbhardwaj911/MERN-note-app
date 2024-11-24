const Workout = require("../models/workout");
const mongoose = require("mongoose");

//get all workouts
const getworkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
const getsingleworkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"No Such Workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout){
        return res.status(404).json({error: "No such workout"});
    }

    res.status(200).json(workout)
}

//create a new workout
const createworkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyfields = []

    if(!title){
        emptyfields.push('title')
    }
    if(!load){
        emptyfields.push('load')
    }
    if(!reps){
        emptyfields.push('reps')
    }
    if(emptyfields.length > 0){
        return res.status(400).json({error: 'please fill in all the fields', emptyfields})
    }

    //add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a workout
const deleteworkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"No Such Workout"})
    }
    const workout = await Workout.findOneAndDelete({_id:id })

    if (!workout){
        return res.status(404).json({error: "No such workout"});
    }

    res.status(200).json(workout)
}

//update a workout
const updateworkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"No Such Workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id:id }, {
        ...req.body
    })
    if (!workout){
        return res.status(404).json({error: "No such workout"});
    }
    res.status(200).json(workout)
}


module.exports = {
    createworkout,
    getworkouts,
    getsingleworkout,
    deleteworkout,
    updateworkout,
}