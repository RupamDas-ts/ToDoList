(function(){
    let tasks = [];
    var taskList = document.getElementById('list');
    var taskCounter = document.getElementById('tasks-counter');
    var incompleted_task_counter = document.getElementById('incomplete_tasks');

    // This function takes a task as an argument and add that task to the document
    function addTaskToDom(task){
        const li = document.createElement('li');

        li.innerHTML = `
            <li>
                <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
                <img src="bin.svg" class="delete" data-id="${task.id}" />
            </li>
        `;

        taskList.append(li);
    }

    // This function is used to show the list in the web-page
    function renderTaskList(){
        taskList.innerHTML = '';
        let incomplete_tasks = 0;
        for(let i = 0; i < tasks.length; i++){
            addTaskToDom(tasks[i]);
            if(tasks[i].completed === false){
                incomplete_tasks++;
            }
        }
        incompleted_task_counter.innerHTML = incomplete_tasks;
        taskCounter.innerHTML = tasks.length;
    }


// This function marks all the tasks as complete
function complete_all_tasks(){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completed === false){
            tasks[i].completed = !tasks[i].completed;
        }
        renderTaskList();
    }
}

// This function remove all the completed tasks
function remove_complete(){
    const newTasks = tasks.filter(function(task){
        return task.completed != true;
    });
    tasks = newTasks;
    renderTaskList();
}

// This function render the tasks that are incomplete
function renderIncompleteTaskList(){
    taskList.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completed === false){
            addTaskToDom(tasks[i]);
        }
    }
}

// This function render the tasks that are complete
function renderCompletedTaskList(){
    taskList.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completed === true){
            addTaskToDom(tasks[i]);
        }
    }
}

// This function marks a task as complete by taking that specific task-id as input
    function markTaskAsComplete(taskId){
        const task = tasks.filter(function(task){
            return task.id == taskId;
        })

        if(task.length > 0){
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderTaskList();
            showNotification('Task Toggle Successful');
            return;
        }
        showNotification('Couldnt toggle the task');
    }

    // This function delete a task from the tasks array by taking that specific task-id as input
    function deleteTask(taskId){
        const newTasks = tasks.filter(function(task){
            return task.id != taskId;
        });
        tasks = newTasks;
        renderTaskList();
        showNotification('Task Deleted Successfully');

    }

    // This function takes a task as an argument and add that task to tasks array
    function addTask(task){
        if(task){
            // console.log(task);
            tasks.push(task);
            renderTaskList();
            showNotification('Task Added Successfully');
            return;
        }
        showNotification('Task Could not be Added');
    }

    // To show any kind of alerts
    function showNotification(text){
        alert(text);
    }

    // This handles all the clicks on the dom
    function handleClickListners(e){
        const target = e.target;
        if(target.id === 'add-button'){
            // console.log(target.id);
            const text_container = document.getElementById('input');
            const text = text_container.value;
            if(!text){
                showNotification('Invalid Input');
                return;
            }

            const task = {
                title: text,
                id: Date.now().toString(),
                completed: false
            }

            text_container.value = '';
            addTask(task);
        }else if(target.className === 'custom-checkbox'){
            const taskID = target.id;
            markTaskAsComplete(taskID);
            return;
        }else if(target.className === 'delete'){
            const taskID = target.dataset.id;
            deleteTask(taskID);
            return;
        }else if(target.id === 'complete_all'){
            complete_all_tasks();
        }else if(target.id === 'remove_complete'){
            remove_complete();
        }else if(target.id === 'show_all'){
            renderTaskList();
        }else if(target.id === 'show_incomplete'){
            renderIncompleteTaskList();
        }else if(target.id === 'show_complete'){
            renderCompletedTaskList();
        }
    }

    const input = document.getElementById("input");
    const addButton = document.getElementById("add-button");


    function initializeDoc(){
        // newTaskId.addEventListener('keyup',handleKeyPressEvent);
        document.addEventListener('click',handleClickListners);
        

    }

    initializeDoc();
})();
