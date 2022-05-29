<template>
  <v-data-table
    :headers="headers"
    :items="jogos"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Jogos no Sistema</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
              <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      v-bind="attrs"
      v-on="on"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="2" md="2">
                    <v-text-field
                      v-model="editedItem.id"
                      label="Id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.genero"
                      label="Genero"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      v-model="editedItem.plataformaId"
                      :items="plataformas"
                      label="Plataforma do Jogo"
                      item-text="nomePlat"
                      item-value="id"
                      return-value
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.Preco"
                      label="Preco"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" dark @click="inicializa"> Reset </v-btn>
    </template>
    <template v-slot:[`item.plataformaId`]="{ item }">
      {{ nomePlat(item.plataformaId) }}
    </template>
  </v-data-table>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Embarcacoes",
    data: () => ({
      dialog: false,
      headers: [
        { text: "Id", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "Genero", value: "genero" },
        { text: "Plataforma", value: "plataformaId" },
        { text: "Preco", value: "Preco" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      plataformas:[],
      jogos: [{id: "", nome: "", genero: "", Preco: 0 }],
      editedIndex: -1,
      editedItem: {
        id: "",
        nome: "",
        genero: "",
        plataformaId: "",
        Preco: "",
      },
      editedItemIndex: -1,
      defaultItem: {
        id: "",
        nome: "",
        genero: "",
        plataformaId: "",
        Preco: "",
      },
    }),
    methods: {
      //Nome das plataformas
    nomePlat(id){
      var nomePlat = this.plataformas.find((x) => x.id ===id);
      nomePlat = nomePlat ? nomePlat.nomePlat : "Plataforma nao existe";
      return nomePlat;
    },
      inicializa() {
        axios("http://localhost:3000/jogos")
          .then((response) => {
            this.jogos = response.data;
          })
          .catch((error) => console.log(error));
        axios("http://localhost:3000/plataformas")
          .then((response) => {
            this.plataformas = response.data;
          })
          .catch((error) => console.log(error));
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },
      save() {
        if (this.editedIndex > -1) {
          //Update
          axios
            .put(
              "http://localhost:3000/jogos/" + this.editedItem.id,
              this.editedItem
            )
            .then((response) => {
              console.log(response);
              Object.assign(this.jogos[this.editedIndex], this.editedItem);
              this.close();
            })
            .catch((error) => console.log(error));
        } else {
          //Create
          axios
            .post("http://localhost:3000/jogos", this.editedItem)
            .then((response) => {
              console.log(response);
              this.jogos.push(this.editedItem);
              this.close();
            })
            .catch((error) => console.log(error));
        }
      },
      //Update
      editItem(item) {
        this.editedIndex = this.jogos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      //Delete
      deleteItem(item) {
        const index = this.jogos.indexOf(item);
        confirm("Deseja apagar este item?") &&
          axios
            .delete("http://localhost:3000/jogos/" + item.id)
            .then((response) => {
              console.log(response.data);
              this.jogos.splice(index, 1);
            })
            .catch((error) => console.log(error));
      },
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Nova Jogo" : "Editar Jogo";
      },
    },
    created() {
      this.inicializa();
    },
  };
</script>

<style scoped>
</style>