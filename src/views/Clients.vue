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
        <v-form v-if="isEdit">
          <v-text-field :counter="20" label="New Name" v-model="client.first_name"></v-text-field>
          <v-text-field :counter="20" label="New Second Name" v-model="client.last_name"></v-text-field>
          <v-text-field :counter="10" label="New Phone Number" v-model="client.phone"></v-text-field>
          <v-btn
            @click="save"
            type="button"
            class="white--text success"
            color="light-green accent-3"
          >Save</v-btn>
          <v-btn class="white--text" color="red accent-2" @click="cancel">Cancel</v-btn>
        </v-form>
        <v-list-tile v-for="client in clients" :key="client.phone">
          <v-list-tile-content>{{client.first_name}}</v-list-tile-content>
          <v-list-tile-content>{{client.last_name}}</v-list-tile-content>
          <v-list-tile-content>{{client.phone}}</v-list-tile-content>
          <v-btn color="info" @click="edit(client)">Edit</v-btn>
        </v-list-tile>
      </v-list>
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
      },
      isEdit: false
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
      this.client = {};
    },
    cancel() {
      this.isFormHidden = true;
      this.isEdit = false;
    },
    edit(client) {
      this.isEdit = true;
      this.client = client;
    },
    save() {
      this.$store.dispatch("updateClient", this.client);

      this.isEdit = false;
    }
  }
};
</script>