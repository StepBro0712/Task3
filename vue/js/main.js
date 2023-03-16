let eventBus = new Vue();

Vue.component('notes', {
    props: {
        note: {
            name: {
                type: Text,
                required: true
            },
            tasks: {
                type: Array,
                required: true,
                readiness: {
                    type: Boolean,
                    required: true
                }
            },
            status: {
                type: Number,
                required: true
            },
        },
    },
    template: `
        <div class="notes">
            
            <newNotes></newNotes>
            <h2 class="error" v-for="error in errors">{{error}}</h2>
            <div class="note-wrap">
                <div class="note">
                 <h1>Запланированные задачи</h1>
                    <ul>
                        <li class="notes-li" v-for="note in column_1"><p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks" v-for="task in note.tasks" v-if="task.name !== null"">
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                <input type="checkbox" class="checkbox" @click="newStatus_1(note, task)" :disabled="task.readlines">
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="note">
                    <h1>Задачи в работе</h1>
                    <ul>
                        <li class="notes-li" v-for="note in column_2"><p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks-2" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="newStatus_2(note, task)" :disabled="task.readlines>
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>  
                <div class="note">
                <h1>Тестирование</h1>
                    <ul>
                        <li class="notes-li" v-for="note in column_2"><p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks-3" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="newStatus_3(note, task)" :disabled="task.readlines">
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>  
                <div class="note">
                    <h1>Выполненные задачи</h1>
                    <ul>
                        <li class="notes-li" v-for="note in column_3">
                            <p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks-4" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="task.readiness = true" :disabled="task.readlines">
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                </li>
                                <p class="note-data">{{ note.date }}</p>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            column_4: [],
            errors: [],
            active: 0
        }
    },
    mounted() {
        this.column_1 = JSON.parse(localStorage.getItem("column_1")) || [];
        this.column_2 = JSON.parse(localStorage.getItem("column_2")) || [];
        this.column_3 = JSON.parse(localStorage.getItem("column_3")) || [];
        this.column_4 = JSON.parse(localStorage.getItem("column_4")) || [];
        eventBus.$on('notes-submitted', note => {
            this.errors = []
            if (this.column_1.length < 3) {
                this.column_1.push(note);
                this.saveNote_1();
            } else {
                this.errors.push('Maximum number of tasks!');
            }
        })
    },
    watch: {
        column_1(newValue) {
            localStorage.setItem("column_1", JSON.stringify(newValue));
        },
        column_2(newValue) {
            localStorage.setItem("column_2", JSON.stringify(newValue));
        },
        column_3(newValue) {
            localStorage.setItem("column_3", JSON.stringify(newValue));
        },
        column_4(newValue) {
            localStorage.setItem("column_4", JSON.stringify(newValue));
        },
        methods: {
            saveNote_1() {
                localStorage.setItem('column_1', JSON.stringify(this.column_1));
            },
            saveNote_2() {
                localStorage.setItem('column_2', JSON.stringify(this.column_2));
            },
            saveNote_3() {
                localStorage.setItem('column_3', JSON.stringify(this.column_3));
            },
            saveNote_4() {
                localStorage.setItem('column_4', JSON.stringify(this.column_4));
            },
        }
    }
})


Vue.component( 'newNotes', {
    template: `
            <div class="create-window">
                <div class="modal-header">
                    <div class="create-body">
                        <div class="create_form">
                            <form class="create" @submit.prevent="onSubmit">
                                <input id="name" v-model="name" type="text" placeholder="Название задачи" required maxlength="20">
                                <input id="date" type="date">
                                <textarea placeholder="Описание"></textarea>
                                <input id="deadline" type="date">>
                                <button type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>    
            </div> 
        `,
    data() {
        return {
            name: null,
            date: null,
            deadline: null,
            errors: [],
            show: false,
        }
    },
})



let app = new Vue({
    el: '#app',
    data: {
        name: 'Notes',
    }
})