export default function createTodo(name, dueDate = 'No date', description = '') {
    return {
        name,
        dueDate,
        description,
        complete,
        setName(name) {
            this.name = name;
        },
        setDueDate(dueDate) {
            this.dueDate = dueDate;
        },
        setDescription(description) {
            this.description = description;
        },
        getDueDate() {
            return this.dueDate;
        },
        getName() {
            return this.name;
        },
        getDescription() {
            return this.description;
        },
        getDateFormat() {
            return this.dueDate.split('-').reverse().join('-');
        }
    }
}