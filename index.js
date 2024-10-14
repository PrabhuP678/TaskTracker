const fs = require('fs');
const path = require('path');

const TaskFile = path.join(__dirname, 'tasks.json');

function initialize() {
    if (!fs.existsSync(TaskFile)) {
        fs.writeFileSync(TaskFile, '[]', 'utf-8');
    }
}

function loadTasks() {
    const tasks = fs.readFileSync(TaskFile);
    const tasksJson = tasks.toString();
    return JSON.parse(tasksJson);
}

function saveTasks(tasks) {
    fs.writeFileSync(TaskFile, JSON.stringify(tasks, null, 2), 'utf-8');
}

function generateId(tasks) {
    return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

function addTask(title) {
    const tasks = loadTasks();
    const newTask = {
        id: generateId(tasks),
        title,
        status: 'todo',
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log("Task Added:", newTask);
}

function updateTask(id, title) {
    const tasks = loadTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
        console.log("Task not found");
        return;
    }
    task.title = title;
    saveTasks(tasks);
    console.log("Task Updated:", task);
}

function deleteTask(id) {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));
    if (updatedTasks.length === tasks.length) {
        console.log("Task not found");
        return;
    }
    saveTasks(updatedTasks);
    console.log("Task Deleted");
}

function markTask(id, status) {
    const tasks = loadTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
        console.log("Task not found");
        return;
    }
    task.status = status;
    saveTasks(tasks);
    console.log(`Task marked as ${status}:`, task);
}

function listTasks(status = null) {
    const tasks = loadTasks();
    const filteredTasks = status
        ? tasks.filter((task) => task.status === status)
        : tasks;

    console.log('Tasks:', filteredTasks);
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

initialize();

switch (command) {
    case 'add':
        if (!arg1) {
            console.log('Please provide a task title.');
        } else {
            addTask(arg1);
        }
        break;

    case 'update':
        if (!arg1 || !arg2) {
            console.log('Please provide a task ID and a new title.');
        } else {
            updateTask(arg1, arg2);
        }
        break;

    case 'delete':
        if (!arg1) {
            console.log('Please provide a task ID.');
        } else {
            deleteTask(arg1);
        }
        break;

    case 'mark':
        if (!arg1 || !arg2 || !['todo', 'in progress', 'done'].includes(arg2)) {
            console.log('Please provide a task ID and a valid status (todo, in progress, done).');
        } else {
            markTask(arg1, arg2);
        }
        break;

    case 'list':
        if (arg1 && !['todo', 'in progress', 'done'].includes(arg1)) {
            console.log('Please provide a valid status (todo, in progress, done) or leave it blank to list all tasks.');
        } else {
            listTasks(arg1);
        }
        break;

    default:
        console.log('Invalid command. Use "add", "update", "delete", "mark", or "list".');
}
