<template>
  <div class="cardTarefa">

    <div>
      <label>Titulo </label>
      <input 
      class="input-title"
      v-model="title"
      @keyup.enter="changeTitle"
      type="text">
    </div>

    <div>
      <label>Concluida </label>
      <input 
      v-model="isCompleted"
      @click="changeCompleted"
      type="checkbox">
    </div>

    <div>
      <label>Data </label>
      <input 
      v-model="date"
      @keyup.enter="changeDate"
      type="date">
    </div>

    <div>
      <label>Prioridade </label>
      <select 
      v-model="important"
      @click="changeImportant"
      >
      <option value="Baixo">Baixo</option>
      <option value="Medio">Medio</option>
      <option value="Alto">Alto</option>
      </select>
    </div>

    <div>
      <label>Descrição </label>
      <textarea 
      v-model="description"
      @keyup.enter="changeDescription" 
      cols="30" 
      rows="3"></textarea>
    </div>

    <div>
      <button @click="deleteTask">Apagar tarefa</button>
    </div>
    
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  props:{
    tarefa:{
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const store = useStore()
    
    const id = ref(props.tarefa.id)
    const title = ref(props.tarefa.title)
    const description = ref(props.tarefa.description)
    const isCompleted = ref(props.tarefa.isCompleted)
    const important = ref(props.tarefa.important)
    const date = ref(props.tarefa.date)

    const changeTask = () =>{

      const payload = {
          id: props.tarefa.id,
          title: title.value,
          description: description.value,
          date: date.value,
          isCompleted: isCompleted.value,
          important: important.value
        
      }
      console.log(payload)
      store.commit('changeTask', payload)
    }

    const changeTitle = () => {
      if(!title.value){
        return
      }
      changeTask()
      alert('Campo alterado')
      console.log('changeTitle - ', title.value)
    }
    const changeDescription = () => {
      if(!description.value){
        return
      }
      changeTask()
      alert('Campo alterado')
      console.log('changeDescription - ', description.value)
    }
    const changeCompleted = () => {
      isCompleted.value = !isCompleted.value
      changeTask()
      alert('Campo alterado')
      console.log('changeCompleted - ', isCompleted.value)
    }
    const changeImportant = () => {
      if(!important.value){
        return
      }
      changeTask()
      console.log('changeImportant - ', important.value)
    }
    const changeDate = () => {
      if(!date.value){
        return
      }
      changeTask()
      alert('Campo alterado')
      console.log('changeDate - ', date.value)
    }


    const deleteTask = () => {
      console.log('apagou', id.value)
      store.commit('deleteTask', id.value)
    }


    return{
      store,

      title,
      description,
      isCompleted,
      important,
      date,

      changeTask,

      changeTitle,
      changeDescription,
      changeCompleted,
      changeImportant,
      changeDate,

      deleteTask
    }
  },
}
</script>


<style scoped>

.cardTarefa{
  padding: 10px 0;
  margin: 10px auto;
  background-color: #404754;
  width: 80%;
  box-shadow: 5px 5px 5px 1px black;
  border-radius: 10px;
  transition: 300ms;

}

.cardTarefa:hover{
  transform: scale(1.1);
  border: 2px solid #4bb6c2;

  transition: 500ms;
}
.cardTarefa div {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

label{
  margin-left: 10px;
  text-transform: uppercase;
  text-align: left;
  width: 20%;
}

input{
  border-radius: 5px;
  border: none;
  margin: 5px;
  transition: 300ms;
}

.input-title{
  width: 70%;
}

select{
  width: 20%;
  text-align: center;
  border-radius: 5px;
  border: none;
  margin: 5px;
  transition: 300ms;
}

textarea{
  width: 70%;
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

button {
  transition: 300ms;
  margin-left: 1em;
  border: none;
  border-radius: 3px;

}

button:hover{
  filter: brightness(.8);
  transition: 300ms;
  border: 1px solid #4bb6c2;
}

</style>