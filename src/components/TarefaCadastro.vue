<template>
  <div class="cadastro-form">
    <h3>Cadastrar tarefa</h3>
    <form @submit.prevent="createTask">
      <div>
        <label>Titulo </label>
        <input 
        class="input-title"
        placeholder="Adicione uma nova tarefa..."
        v-model="state.title"
        type="text">
        <p v-for="erro in v$.title.$errors" :key="erro.$uid" style="color:red;"> {{erro.$message}}</p>
      </div>

      <div style="display: none;">
        <label>Concluida </label>
        <input 
        v-model="isCompleted"
        @click="changeCompleted"
        type="checkbox">
      </div>

      <div>
        <label>Data </label>
        <input 
        v-model="state.date"
        @keyup.enter="changeDate"
        type="date">
        <p v-for="erro in v$.date.$errors" :key="erro.$uid" style="color:red;"> {{erro.$message}}</p>
      </div>

      <div>
        <label>Prioridade </label>
        <select 
        v-model="state.important"
        @click="changeImportant"
        >
        <option value="Baixo">Baixo</option>
        <option value="Medio">Medio</option>
        <option value="Alto">Alto</option>
        </select>
        <span v-for="erro in v$.important.$errors" :key="erro.$uid" style="color:red;"> {{erro.$message}}</span>
      </div>

      <div>
        <label>Descrição </label>
        <textarea 
        placeholder="Adicione uma descrição da tarefa..."
        v-model="state.description"
        @keyup.enter="changeDescription" 
        cols="30" 
        rows="5"></textarea>
        <span v-for="erro in v$.description.$errors" :key="erro.$uid" style="color:red;"> {{erro.$message}}</span>
      </div>

      <div class="btn">
        <button type="submit">Criar tarefa</button>
      </div>

      <div>
        <h3 v-show="successCreate" class="alert-success">Criado com sucesso</h3>
      </div>


    </form>

    
  </div>
</template>

<script>
import {  ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { computed } from '@vue/runtime-core'

export default {
  setup() {
    const store = useStore()
    let successCreate = ref(false)
    
    const state = ref({
      title:'',
      description:'',
      important: '',
      date: ''
    })

    const rules = computed(() =>{
      return{
        title: {required, minLength: minLength(3)},
        description: {required},
        important:  {required},
        date:  {required}
      }
    })


    const v$ = useVuelidate(rules, state)

    const idCalcular = () =>{
      const id = store.getters.idCalc 

      return id
    }

    const completed = () => {
        const dataAtual = new Date()
        const dia = dataAtual.getDate()
        const mes = dataAtual.getMonth()+ 1
        const ano = dataAtual.getFullYear()
        const dataComparar = `${ano}-${mes}-${dia}`

        if (new Date(dataAtual) > new Date(state.value.date)) {
          console.log('data atual é maior')
          return true
        }

        console.log(dataComparar, ' - ', state.value.date)
      
      return false
    }

    const createTask = async () => {
      const result = await v$.value.$validate()
      if (result) {
        store.dispatch('addTask', {
          id: idCalcular(),
          title: state.value.title,
          description: state.value.description,
          date: state.value.date,
          isCompleted: completed(),
          important: state.value.important,
        }).finally(()=>{
          successCreate.value = true

          state.value.title = ''
          state.value.description = ''
          state.value.date = ''
          state.value.important = ''
          
        })
        
      } else {
        successCreate.value = false
        console.log('ERROR')
      }

    }

    return{
      store,
      successCreate,
      state, 
      v$,

      createTask
    }
    
  }
}
</script>

<style scoped>

.cadastro-form{
  background-color: #404754;
  padding: 20px 0;
  border-radius: 10px;

  transition: 300ms;
}

.cadastro-form:hover{
  filter: brightness(1.1);
}

.cadastro-form h3 {
  margin: 1em auto;
  text-transform: uppercase;
  font-size: 1.6em;
}

.cadastro-form label {
  text-transform: uppercase;
  font-size: 1em;
  text-align: left;
  width: 10%;
  margin-left: 1em;

}

form div{
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 1em;
}

input{
  border-radius: 5px;
  border: none;
  margin: 5px;
  transition: 300ms;
}

.input-title{
  width: 80%;
}

select{
  width: 15%;
  text-align: center;
  border-radius: 5px;
  border: none;
  margin: 5px;
  transition: 300ms;
}

textarea{
  width: 80%;
  border-radius: 5px;
  border: none;
  margin: 3px;
  transition: 300ms;
}


textarea:hover,
select:hover,
input:hover{
  border: 2px solid #4bb6c2;
  filter: brightness(.8);
  transition: 300ms;
}

.btn{
  justify-content: center;
  margin: 3em auto;
}
.btn button{
  width: 60%;
  height: 2em;
  font-size: 1.6em;
  text-transform: uppercase;
  border-radius: 10px;


  border: none;
  transition: 300ms;

}

.btn button:hover{
  border: 5px solid #4bb6c2;
  background: #464e5c;
  color: #4bb6c2;
  transform: 500ms;
}

.btn button:active{
  filter: brightness(1.9);
  transform: translateY(8px);
  transform: 500ms;
}

.alert-success{
  color: green;
}


</style>