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
      <table>
        <thead>
          <tr>
            <th class="text-xs-left">First Name</th>
            <th class="text-xs-left">Last Name</th>
            <th class="text-xs-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client._id">
            <td>{{client.first_name}}</td>
            <td>{{client.last_name}}</td>
            <td>{{client.phone}}</td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </v-app>
</template>

<script>
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
    clients() {
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
      this.isFormHidden = true;
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

<style  scoped>
table {
  width: 100%;
}
td,
th {
  padding: 10px;
  text-align: left;
}
</style>