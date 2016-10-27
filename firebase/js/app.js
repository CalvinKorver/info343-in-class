//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAZsVdizbcHhUZtq9omvB3455hFgojk6w0",
    authDomain: "tasks-demo-c32c6.firebaseapp.com",
    databaseURL: "https://tasks-demo-c32c6.firebaseio.com",
    storageBucket: "tasks-demo-c32c6.appspot.com",
    messagingSenderId: "901394194168"
};


firebase.initializeApp(config);
var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;     
    } else {
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");
var purgeButton = document.querySelector(".btn-purge");

var tasksRef = firebase.database().ref("tasks");

// Stop the browser from doing default action
taskForm.addEventListener("submit", function(evt) { 
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    tasksRef.push(task);
    
    taskTitleInput.value = "";
    
    return false;
});
function renderTask(snapshot) {
    var task = snapshot.val();
    var li = document.createElement("li");
    
    var spanTitle = document.createElement("span"); 

    /* Handles text creationg */
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);
    
    /* Handles time created */
    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow()
    + " by " + (task.createdBy.displayName || task.createdBy.email); // Handles who did it
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    if (task.done) {
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
    }
    
    /* Handles marking done tasks */
    li.addEventListener("click", function() {
        snapshot.ref.update({
            done: !task.done
        });
    });

    taskList.appendChild(li);
}

function render(snapshot) {
    // database snapshot has some handy methods
    taskList.innerHTML = "";
    purgeButton.classList.add("hidden"); // Initializing as hidden
    snapshot.forEach(renderTask);
}

tasksRef.on("value", render);
// .on is the same as addEventListener

purgeButton.addEventListener("click", function() {
    //console.log("purge button clicked");
    tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if (taskSnapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        });
    });
});

