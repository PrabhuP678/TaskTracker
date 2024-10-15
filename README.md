# TaskTracker

**Project URL:** https://roadmap.sh/projects/task-tracker



TaskTracker is a simple Command Line Interface (CLI) application for managing tasks. It allows you to track, update, and manage your tasks in a JSON file. You can add tasks, update their status, delete tasks, and view lists of completed, pending, and in-progress tasks directly from the terminal.


Features
Add Tasks: Add new tasks with a title.
Update Tasks: Edit the title of existing tasks.
Delete Tasks: Remove tasks by their ID.
Mark Task Status: Set a task's status to todo, in progress, or done.
List Tasks: View all tasks, or filter tasks based on their status (todo, in progress, or done).

Usage
TaskTracker accepts commands in the following format:

node index.js <command> [arguments]
Available Commands
Add a new task:

node index.js add "Task title"
Example:

node index.js add "Buy groceries"
Update an existing task:

node index.js update <task_id> "New title"
Example:

node index.js update 1 "Buy groceries and cook dinner"
Delete a task:

node index.js delete <task_id>
Example:

node index.js delete 1
Mark a task's status:

node index.js mark <task_id> <status>
Valid statuses are:

todo: The task is yet to be done.
in progress: The task is currently being worked on.
done: The task has been completed.
Example:

node index.js mark 2 done
List tasks:

List all tasks:

node index.js list
List tasks filtered by status (todo, in progress, or done):

node index.js list todo
Example:

node index.js list done
Task Structure
Tasks are stored in a JSON file (tasks.json) and follow this structure:

json
{
"id": 1,
"title": "Buy groceries",
"status": "todo"
}
id: A unique identifier for the task.
title: The task description.
status: The current state of the task (todo, in progress, or done).
Example Workflow
Add a new task:

node index.js add "Finish homework"
Update the task:

node index.js update 1 "Finish math homework"
Mark the task as in progress:

node index.js mark 1 "in progress"
List all tasks:

node index.js list
Mark the task as done:

node index.js mark 1 "done"
Delete the task:

node index.js delete 1
Error Handling
The application handles cases where an invalid task ID is provided.
It ensures that commands are complete and valid (e.g., requiring a valid task ID for updates and deletions).
Contributing
If you want to contribute, feel free to submit a pull request or raise an issue in the repository.
