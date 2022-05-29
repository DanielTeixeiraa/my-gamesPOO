<template>
  <v-container>
    <h1>Biblioteca de Jogos</h1>
    
      <v-row class="text-center">
        <v-col cols="15">
          <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="500"
          />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    name: "Jogos",
    data: () => ({}),
    methods: {},
  };
  
</script>
