

let eventBus = new Vue();

Vue.component('board', {
    template:`
        <div class="tabs">
            <newBoard></newBoard>
            <div class="tabs-wrap">
                <table_1 :column_1="column_1"></table_1>
                <table_2 :column_2="column_2"></table_2>
                <table_3 :column_3="column_3"></table_3>
                <table_4 :column_4="column_4"></table_4>
            </div>   
        </div>
    `,
    data(){
        return{
            column_1:[],
            column_2:[],
            column_3:[],
            column_4:[],
        }
    },
    mounted(){
        this.column_1 = JSON.parse(localStorage.getItem("column_1")) || [];
        this.column_2 = JSON.parse(localStorage.getItem("column_2")) || [];
        this.column_3 = JSON.parse(localStorage.getItem("column_3")) || [];
        this.column_4 = JSON.parse(localStorage.getItem("column_4")) || [];
        eventBus.$on('addColumn_1', tab => {
            this.column_1.push(tab);
            this.saveTab_1();
        });
        eventBus.$on('addColumn_2', tab => {
            this.column_2.push(tab);
            this.saveTab_2();
        });
        eventBus.$on('addColumn_3', tab => {
            this.column_3.push(tab);
            this.saveTab_3();
        });
        eventBus.$on('addColumn_4', tab => {
            this.column_4.push(tab);
            if (tab.date > tab.deadline){
                tab.term = false;
            }
            this.saveTab_4();
        });
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
        }
    },
    methods:{
        saveTab_1(){
            localStorage.setItem('column_1', JSON.stringify(this.column_1));
        },
        saveTab_2(){
            localStorage.setItem('column_2', JSON.stringify(this.column_2));
        },
        saveTab_3(){
            localStorage.setItem('column_3', JSON.stringify(this.column_3));
        },
        saveTab_4(){
            localStorage.setItem('column_4', JSON.stringify(this.column_4));
        },
    }
})

Vue.component('table_1',{
    props: {
        column_1: {
            type: Array,
        },
        tab: {
            type: Object
        },
    },
    template:`
        <div class="tab">
            <h2>Запланированные задачи</h2>
            <ul class="tab-li">
                <li v-for="tab in column_1" v-if="tab.priori == 1">
                    <div class="separator"></div>
                    <a @click="deleteTab(tab)">Удалить</a> &emsp; <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                    </ul>
                    <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
                <li v-for="tab in column_1" v-if="tab.priori == 2">
                    <div class="separator"></div>
                    <a @click="deleteTab(tab)">Удалить</a> &emsp; <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                    </ul>
                    <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
                <li v-for="tab in column_1" v-if="tab.priori == 3">
                    <div class="separator"></div>
                    <a @click="deleteTab(tab)">Удалить</a> &emsp; <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                    </ul>
                    <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
            </ul>
        </div>
    `,
    methods: {
        nextTab(tab){
            this.column_1.splice(this.column_1.indexOf(tab), 1);
            eventBus.$emit('addColumn_2', tab);
        },
        deleteTab(tab){
            this.column_1.splice(this.column_1.indexOf(tab), 1);
        },
        updateTab(tab){
            tab.editButton = false;
            this.column_1.push(tab);
            this.column_1.splice(this.column_1.indexOf(tab), 1);
            tab.edit = new Date().toLocaleString();
        }
    }
})

Vue.component('table_2',{
    props: {
        column_2: {
            type: Array,
        },
        tab: {
            type: Object
        },
    },
    template:`
        <div class="tab">
            <h2>Задачи в работе</h2>
            <ul class="tab-li">
                <li v-for="tab in column_2" v-if="tab.priori == 1">
                    <div class="separator"></div>
                    <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.reason != null" v-for="res in tab.reason">Проблема: {{res}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                    </ul>
                    <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
                <li v-for="tab in column_2" v-if="tab.priori == 2">
                    <div class="separator"></div>
                    <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.reason != null" v-for="res in tab.reason">Проблема: {{res}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                    </ul>
                    <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
                <li v-for="tab in column_2" v-if="tab.priori == 3">
                    <div class="separator"></div>
                    <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.reason != null" v-for="res in tab.reason">Проблема: {{res}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                    </ul>
                    <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
            </ul>
        </div>
    `,
    methods:{
        nextTab(tab){
            this.column_2.splice(this.column_2.indexOf(tab), 1);
            eventBus.$emit('addColumn_3', tab);
        },
        updateTab(tab){
            tab.editButton = false;
            this.column_2.push(tab);
            this.column_2.splice(this.column_2.indexOf(tab), 1);
            tab.edit = new Date().toLocaleString();
        }
    }
})

Vue.component('table_3',{
    props: {
        column_3: {
            type: Array
        },
        tab: {
            type: Object
        },
    },
    template:`
        <div class="tab">
            <h2>Тестирование</h2>
            <ul class="tab-li">
                <li v-for="tab in column_3" v-if="tab.priori == 1">
                    <div class="separator"></div>
                    <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.reason != null" v-for="res in tab.reason">Проблема: {{res}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                        <li v-if="tab.refund">
                            <form @submit.prevent="refundTab(tab)">
                                <label for="reason">Причина: &emsp;</label> 
                                <textarea id="reason" v-model="reason"></textarea>
                                <input type="submit" value="Отправить">
                            </form>
                        </li>
                    </ul>
                    <a @click="tab.refund = true">Вернуть</a> &emsp; <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
                <li v-for="tab in column_3" v-if="tab.priori == 2">
                    <div class="separator"></div>
                    <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.reason != null" v-for="res in tab.reason">Проблема: {{res}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                        <li v-if="tab.refund">
                            <form @submit.prevent="refundTab(tab)">
                                <label for="reason">Причина: &emsp;</label> 
                                <textarea id="reason" v-model="reason"></textarea>
                                <input type="submit" value="Отправить">
                            </form>
                        </li>
                    </ul>
                    <a @click="tab.refund = true">Вернуть</a> &emsp; <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
                <li v-for="tab in column_3" v-if="tab.priori == 3">
                    <div class="separator"></div>
                    <a @click="tab.editButton = true">Редактировать</a><br>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.reason != null" v-for="res in tab.reason">Проблема: {{res}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.editButton === true">
                            <form @submit.prevent="updateTab(tab)">
                                <label for="title">Новый заголовок</label>
                                <input id="title" type="text" v-model="tab.title" maxlength="30" placeholder="Заголовок">
                                <label for="description">Новое описание:</label> 
                                <textarea id="description" v-model="tab.description" cols="20" rows="5"></textarea>
                                <input type="submit" value="Редактировать">
                            </form>                      
                        </li>
                        <li v-if="tab.refund">
                            <form @submit.prevent="refundTab(tab)">
                                <label for="reason">Причина: &emsp;</label> 
                                <textarea id="reason" v-model="reason"></textarea>
                                <input type="submit" value="Отправить">
                            </form>
                        </li>
                    </ul>
                    <a @click="tab.refund = true">Вернуть</a> &emsp; <a @click="nextTab(tab)">Следующая колонка</a>
                </li>
            </ul>
        </div>
    `,
    data(){
        return{
            reason:[],
        }
    },
    methods: {
        nextTab(tab){
            this.column_3.splice(this.column_3.indexOf(tab), 1);
            eventBus.$emit('addColumn_4', tab);
        },
        refundTab(tab){
            tab.reason.push(this.reason)
            tab.refund = false
            this.column_3.splice(this.column_3.indexOf(tab), 1);
            eventBus.$emit('addColumn_2', tab);
            this.reason = '';
        },
        updateTab(tab){
            tab.editButton = false;
            this.column_3.push(tab);
            this.column_3.splice(this.column_3.indexOf(tab), 1);
            tab.edit = new Date().toLocaleString();
        },
    }
})

Vue.component('table_4',{
    props: {
        column_4: {
            type: Array,
        },
        tab: {
            type: Object
        },
    },
    template:`
        <div class="tab">
            <h2>Выполненные задачи</h2>
            <ul class="tab-li">
                <li v-for="tab in column_4" v-if="tab.priori == 1">
                    <div class="separator"></div>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.term">Завершено в срок</li>
                        <li v-else>В срок не завершено</li>
                    </ul>
                </li>
                <li v-for="tab in column_4" v-if="tab.priori == 2">
                    <div class="separator"></div>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.term">Завершено в срок</li>
                        <li v-else>В срок не завершено</li>
                    </ul>
                </li>
                <li v-for="tab in column_4" v-if="tab.priori == 3">
                    <div class="separator"></div>
                    <p class="tab-title">{{tab.title}}</p>
                    <ul class="tab-task">
                        <li>Описание: {{tab.description}}</li>
                        <li>Дата создания: {{tab.date}}</li>
                        <li>Дедлайн: {{tab.deadline}}</li>
                        <li v-if="tab.edit != null">Последние изменение: {{tab.edit}}</li>
                        <li v-if="tab.term">Завершено в срок</li>
                        <li v-else>В срок не завершено</li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
})

Vue.component('newBoard', {
    template:`
        <section  class="section-modal">
            <slot name="body">
                <div class="create_form">
                    <form class="create" @submit.prevent="onSubmit">
                        <label for="title">Задача</label>
                        <input id="title" v-model="title" type="text" placeholder="Заголовок" required maxlength="30">   
                        <label for="description">Описание</label>
                        <textarea id="description" v-model="description" required></textarea>
                        <label for="deadline">Deadline</label>
                        <input id="deadline" type="date" v-model="deadline" placeholder="дд.мм.гггг" required>        
                        <label for="priority">Приоретет:</label>
                        <select id="priority" v-model.number="priori">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <button type="submit">Создать</button>
                    </form>
                </div>
            </slot>  
        </section>
    `,
    data(){
        return{
            title: null,
            description: null,
            date:null,
            deadline: null,
            show: false,
            reason: [],
            priori:null,
        }
    },
    methods:{
        onSubmit(){
            let tab = {
                title: this.title,
                description: this.description,
                date: new Date().toLocaleDateString().split('.').reverse().join('-'),
                deadline: this.deadline,
                edit: null,
                editButton: false,
                refund: false,
                term: true,
                reason: [],
                priori: this.priori
            }
            eventBus.$emit('addColumn_1', tab);
            this.title = null;
            this.description = null;
            this.date = null;
            this.deadline = null;
            this.show = false;
            this.priori = null;
        },
        close(){
            this.show = false;
        }
    }
})


let app = new Vue({
    el: '#app',
    data:{
        name: 'Kanban доска'
    }
})
