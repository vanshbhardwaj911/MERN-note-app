const express = require("express");
const {
    createworkout,
    getworkouts,
    getsingleworkout,
    deleteworkout,
    updateworkout,
} = require("../controllers/workoutcontroller")
const Workout = require("../models/workout")
const router = express.Router();

//Get all workouts
router.get("/", getworkouts)

//get a single workout
router.get("/:id", getsingleworkout)

//post a new workout
router.post("/", createworkout)

//delete a workout
router.delete("/:id", deleteworkout)

//update a workout
router.patch("/:id", updateworkout)

module.exports = router