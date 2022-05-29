<template>
  <v-data-table
    :headers="headers"
    :items="Plataformas"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Plataformas</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.nomePlat"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                </v-row>  
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
              <v-btn depressed color="primary" text @click="save"> Salvar </v-btn>  
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
  </v-data-table>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Plataformas",
    data: () => ({
      dialog: false,
      headers: [
        { text: "Id", value: "id" },
        { text: "Nome", value: "nomePlat" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      Plataformas:[{id: "", nomePlat: ""}],
      editedIndex: -1,
      editedItem: {
        id: "",
        nomePlat: "",
      },
      editedItemIndex: -1,
      defaultItem: {
        id: "",
        nomePlat: "",
      },
    }),
    methods: {
      inicializa() {
        axios("http://localhost:3000/Plataformas")
          .then((response) => {
            this.Plataformas = response.data;
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
          //UPDATE
          axios
            .put(
              "http://localhost:3000/Plataformas/" + this.editedItem.id,
              this.editedItem
            )
            .then((response) => {
              console.log(response);
              Object.assign(this.Plataformas[this.editedIndex], this.editedItem);
              this.close();
            })
            .catch((error) => console.log(error));
        } else {
          //CREATE
          axios
            .post("http://localhost:3000/Plataformas", this.editedItem)
            .then((response) => {
              console.log(response);
              this.Plataformas.push(this.editedItem);
              this.close();
            })
            .catch((error) => console.log(error));
        }
      },
      editItem(item) {
        this.editedIndex = this.Plataformas.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem(item) {
        const index = this.Plataformas.indexOf(item);
        confirm("Deseja apagar este item?") &&
          axios
            .delete("http://localhost:3000/plataformas/" + item.id)
            .then((response) => {
              console.log(response.data);
              this.Plataformas.splice(index, 1);
            })
            .catch((error) => console.log(error));
      },
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Nova plataforma" : "Editar Plataforma";
      },
    },

    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },

    created() {
      this.inicializa();
    },
  };
</script>

<style scoped>
</style>