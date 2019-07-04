<template>
  <v-app>
    <v-icon @click="add" v-if="isFormHidden" large color="green">add_circle</v-icon>
    <v-form v-else>
      <v-text-field v-model="client.first_name" :counter="20" label="First Name"></v-text-field>
      <v-text-field v-model="client.last_name" :counter="20" label="Second Name"></v-text-field>
      <v-text-field v-model="client.phone" :counter="10" label="Phone Number"></v-text-field>
      <v-btn
        @click="submit"
        type="button"
        class="white--text success"
        color="light-green accent-3"
      >Submit</v-btn>
      <v-btn class="white--text" color="red accent-2" @click="cancel">Cancel</v-btn>
    </v-form>
    <v-card>
      <v-list>
        <v-list-tile v-for="client in clients" :key="client.phone">
          <v-list-tile-content>{{client.first_name}}</v-list-tile-content>
          <v-list-tile-content>{{client.last_name}}</v-list-tile-content>
          <v-list-tile-content>{{client.phone}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000/clients";

export default {
  data() {
    return {
      isFormHidden: true,
      client: {
        first_name: "",
        last_name: "",
        phone: ""
      },
      clients: []
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    submit() {
      axios.post(baseUrl, this.client).then(() => {
        this.isFormHidden = true;
        this.fetchClients();
      });
    },
    add() {
      this.isFormHidden = false;
    },
    cancel() {
      this.isFormHidden = true;
    },
    fetchClients() {
      axios.get(baseUrl).then(res => {
        this.clients = [];
        res.data.forEach(element => {
          this.clients.push(element);
        });
      });
    }
  }
};
</script>
