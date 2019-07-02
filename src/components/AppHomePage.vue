<template>
  <div>
    <v-tabs color="cyan" dark slider-color="white">
      <v-tab ripple>APPOINTMENTS</v-tab>
      <v-tab ripple @click="listClients">CLIENTS</v-tab>
      <v-tab-item></v-tab-item>
      <v-tab-item>
        <v-icon @click="add" v-if="isActive" large color="green">add_circle</v-icon>
        <v-form @submit="submit" v-else method="post">
          <v-text-field v-model="client.firstName" :counter="20" label="First Name"></v-text-field>
          <v-text-field v-model="client.secondName" :counter="20" label="Second Name"></v-text-field>
          <v-text-field v-model="client.phone" :counter="10" label="Phone Number"></v-text-field>
          <v-btn
            @click="listClients"
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
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000/clients";

export default {
  data() {
    return {
      isActive: false,
      client: {
        firstName: "",
        secondName: "",
        phone: ""
      },
      clients: []
    };
  },
  methods: {
    submit() {
      axios.post(baseUrl, { body: this.client }).then(() => {});

      this.isActive = true;
    },
    add() {
      this.isActive = false;
    },
    cancel() {
      this.isActive = true;
    },
    listClients() {
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
