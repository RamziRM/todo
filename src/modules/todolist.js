import createProject from './Project'
import createTodo from './Todo'

import { compareAsc, toDate } from 'date-fns'

function createTodoList() {
    let projects = [];
    projects.push(createProject('Inbox'));
    projects.push(createProject('Today'));
    projects.push(createProject('7 Days'));

    let currentProject = projects[0];




}