<template>
  <div>
    <h3>Seja bem vindo!</h3>
    <h3>Você tem {{$store.state.tarefas.length}} tarefas salvas</h3>
    
    <h3>Tarefas Concluídas: {{$store.getters.feito}} </h3>
    <h3>Tarefas Pendentes: {{$store.getters.fazer}} </h3>
  </div>
</template>