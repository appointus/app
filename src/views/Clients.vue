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
        <v-list-tile v-for="c in allClients" :key="c.phone">
          <v-list-tile-content>{{c.first_name}}</v-list-tile-content>
          <v-list-tile-content>{{c.last_name}}</v-list-tile-content>
          <v-list-tile-content>{{c.phone}}</v-list-tile-content>
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
      }
    };
  },
  computed: {
    allClients() {
      return this.$store.getters.allClients;
    }
  },
  created() {
    this.$store.dispatch("fetchClients");
  },
  methods: {
    submit() {
      this.$store.dispatch("addClient", this.client);
      this.$store.dispatch("fetchClients");
    },
    add() {
      this.isFormHidden = false;
    },
    cancel() {
      this.isFormHidden = true;
    }
  }
};
</script>