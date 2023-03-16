let eventBus = new Vue();

Vue.component('notes',{
    props:{
        note:{
            name:{
                type: Text,
                required: true
            },
            tasks:{
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
    template:`
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
                                <input type="checkbox" class="checkbox" @click="newStatus_1(note, task)" :disabled="task.readiness">
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
                                <input type="checkbox" class="checkbox" @click="newStatus_2(note, task)" :disabled="task.readiness">
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
                                <li class="tasks-2" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="newStatus_2(note, task)" :disabled="task.readiness">
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
                                <li class="tasks-2" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="task.readiness = true" :disabled="task.readiness">
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
    data(){
        return{
            column_1: [],
            column_2: [],
            column_3: [],
            column_4: [],
            errors: [],
            active: 0
        }
    },
    mounted(){
        this.column_1 = JSON.parse(localStorage.getItem("column_1")) || [];
        this.column_2 = JSON.parse(localStorage.getItem("column_2")) || [];
        this.column_3 = JSON.parse(localStorage.getItem("column_3")) || [];
        eventBus.$on('notes-submitted', note => {
            this.errors = []
            if (this.column_1.length < 3){
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
        }
    },
    methods: {
        saveNote_1(){
            localStorage.setItem('column_1', JSON.stringify(this.column_1));
        },
        saveNote_2(){
            localStorage.setItem('column_2', JSON.stringify(this.column_2));
        },
        saveNote_3(){
            localStorage.setItem('column_3', JSON.stringify(this.column_3));
        },
        newStatus_1(note, task) {
            task.readiness = true;
            let count = 0;
            note.status = 0;
            for (let i = 0; i < 5; ++i) {
                if (note.tasks[i].name != null) {
                    count++;
                }
            }
            for (let i = 0; i < count; ++i) {
                if (note.tasks[i].readiness === true) {
                    note.status++;
                }
            }
            if (note.status/count*100 >= 50 && this.column_2.length < 5) {
                this.column_2.push(note)
                this.column_1.splice(this.column_1.indexOf(note), 1)
            }
            else if (this.column_2.length === 5)  {
                if(this.column_1.length > 0) {
                    this.column_1.forEach(item => {
                        item.tasks.forEach(item => {
                            item.readiness = true;
                        })
                    })
                }
            }
            this.saveNote_2();
        },
        newStatus_2(note, task) {
            task.readiness = true;
            let count = 0;
            note.status = 0;
            for (let i = 0; i < 5; ++i) {
                if (note.tasks[i].name != null) {
                    count++;
                }
            }
            for (let i = 0; i < count; ++i) {
                if (note.tasks[i].readiness === true) {
                    note.status++;
                }
            }
            if (note.status/count*100 === 100) {
                this.column_3.push(note)
                this.column_2.splice(this.column_2.indexOf(note), 1)
                note.date = new Date()
            }
            if(this.column_2.length < 5) {
                if(this.column_1.length > 0) {
                    this.column_1.forEach(item => {
                        item.tasks.forEach(item => {
                            item.readiness = false;
                        })
                    })
                }
            }
            this.saveNote_3();
        },
    },
})

Vue.component( 'newNotes',{
    template:`
            <div class="create-window">
                <div class="modal-header">
                    <div class="create-body">
                        <div class="create_form">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>          
                        </div>
                    </div>
                </div>    
            </div> 
        `,
    data(){
        return{
            name: null,
            task_1: null,
            task_2: null,
            task_3: null,
            task_4: null,
            task_5: null,
            errors:[],
            show: false,
        }
    },
    methods:{
        onSubmit() {
            if (this.name && this.task_1 && this.task_2 && this.task_3){
                let note = {
                    name: this.name,
                    tasks: [
                        {name: this.task_1, readiness: false},
                        {name: this.task_2, readiness: false},
                        {name: this.task_3, readiness: false},
                        {name: this.task_4, readiness: false},
                        {name: this.task_5, readiness: false},
                    ],
                    data: null,
                    status: 0,
                }
                eventBus.$emit('notes-submitted', note);
                this.name = null;
                this.task_1 = null;
                this.task_2 = null;
                this.task_3 = null;
                this.task_4 = null;
                this.task_5 = null;
            }else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.task_1) this.errors.push("task_1 required.")
                if(!this.task_2) this.errors.push("task_2 required.")
                if(!this.task_3) this.errors.push("task_3 required.")
            }
        },

    }
})

let app = new Vue({
    el: '#app',
    data: {
        name: 'Notes',
    }
})