<template>
  <div>
    <v-icon @click="add" v-if="isFormHidden" large color="green">add_circle</v-icon>
    <v-form @submit="submit" v-else method="post">
      <v-text-field v-model="client.firstName" :counter="20" label="First Name"></v-text-field>
      <v-text-field v-model="client.secondName" :counter="20" label="Second Name"></v-text-field>
      <v-text-field v-model="client.phone" :counter="10" label="Phone Number"></v-text-field>
      <v-btn
        @click="fetchClients"
        type="submit"
        class="white--text success"
        color="light-green accent-3"
      >Submit</v-btn>
      <v-btn class="white--text" color="red accent-2" @click="cancel">Cancel</v-btn>
    </v-form>
    <v-card>
      <v-list>
        <v-list-tile v-for="c in clients" :key="c.phone">
          <v-list-tile-content>{{c.firstName}}</v-list-tile-content>
          <v-list-tile-content>{{c.secondName}}</v-list-tile-content>
          <v-list-tile-content>{{c.phone}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000/clients";

export default {
  data() {
    return {
      isFormHidden: true,
      client: {
        firstName: "",
        secondName: "",
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
      if (!this.firstName || !this.secondName || !this.phone) {
        return;
      }
      axios.post(baseUrl, { body: this.client }).then(() => {
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
          this.clients.push(element.body);
        });
      });
    }
  }
};
</script>
