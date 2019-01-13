//onclick functions
window.onload = function() {
    $("#start-button").on("click", stopwatch.start);
    $(".choice").on("click", stopwatch.correctCount);
    $("#done-button").on("click", stopwatch.stop);
    $("#reset-button").on("click", stopwatch.reset);
};

//global variables
var intervalId;
var clockRunning = false;
var correctAnswers = 0;

// stopwatch object which contains clock functions
var stopwatch = {

    // setting inital time to 60 seconds
    time: 60,

    // function that checks for correct answers and updates score
    correctCount: function() {
        
        //checks selection that is clicked on for value "correct"
        if (clockRunning) {
            var selection = $(this).val();
            if (selection === "correct" && correctAnswers < 7) {
                correctAnswers++
            }

            //if player gets all 7 questions correct, game ends
            else if (correctAnswers > 7) {
                stopwatch.stop();
            }
        }

        //prevent a selection from being made if the game hasn't started
        else if (!clockRunning) {
            event.preventDefault();
        }
    },

    //function that runs if the "reset" button is clicked
    reset: function() {

        //the time and score reset, clock stops, and choices are deselected
        stopwatch.stop();
        stopwatch.time = 60;
        correctAnswers = 0;
        $("#time-remaining").text("1:00");
        $("input[type='radio']").prop('checked', false);
    },

    //function that starts countdown clock
    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },

    //function that stops countdown clock and ends game
    stop: function() {
        clearInterval(intervalId);
        clockRunning = false;

        //instead of the remaining time, score is displayed in header
        $("#time-remaining").html("Score: " + correctAnswers + " out of 7");
    },

    //function initialized in start function, counts down in intervals of 1000 ms
    count: function() {

        //as long as there is still time left on clock, keep counting down
        if (stopwatch.time > 0) {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);

            //time remaining displays in header
            $("#time-remaining").text(converted);
        }

        //when clock reaches 0, stop counting
        else {
            stopwatch.stop();
        }
    },

    //function converts time to minutes & seconds
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "0";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
        }
};                