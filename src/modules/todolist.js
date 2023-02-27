import createProject from './Project'
import createTodo from './Todo'

import { compareAsc, toDate } from 'date-fns'

function createTodoList() {
    let projects = [];
    projects.push(createProject('Inbox'));
    projects.push(createProject('Today'));
    projects.push(createProject('7 Days'));

    let currentProject = projects[0];

    // Projects methods
    function setProjects(newProjects) {
        projects = newProjects;
    }

    function getProjects() {
        return projects;
    }

    // Project methods
    function addProject(newProject) {
        if (projects.find((project) => project.name === newProject.name)) return
        projects.push(newProject)
    }

    function removeProject(projectName) {
        const theChosenP = projects.findIndex((project) => project.getName() === projectName)
        if (index !== -1) {
          projects.splice(theChosenP, 1)
        }
    }

    function getProject(projectName) {
        return projects.find((project) => project.getName() === projectName)
    }

    // Update Today and 7 Days projects
    function updateProjects() {
        const today = new Date();
        const sevenDays = new Date();
        sevenDays.setDate(sevenDays.getDate() + 7);
      
        const todayProject = getProject('Today').tasks;
        const sevenDaysProject = getProject('7 Days').tasks;
      
        // Clear each project
        todayProject.tasks = [];
        sevenDaysProject.tasks = [];

        // Add tasks to Today and 7 Days projects
        projects.forEach((project) => {
            if (project === todayProject || project === sevenDaysProject) return;
            project.tasks.forEach((task) => {
                const dueDate = toDate(task.getDueDate());
                if (compareAsc(dueDate, today) === 0) {
                    todayProject.addTask(task);
                } else if (compareAsc(dueDate, sevenDays) <= 0) {
                sevenDaysProject.addTask(task);
                }
            });
        });
    }

return {
    setProjects,
    getProjects,
    addProject,
    removeProject,
    getProject,
    updateProjects
    }
}

export default createTodoList;