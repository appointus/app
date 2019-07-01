<template>
  <div>
    <v-tabs color="cyan" dark slider-color="white">
      <v-tab ripple>APPOINTMENTS</v-tab>
      <v-tab ripple>CLIENTS</v-tab>
      <v-tab-item>{{this.info}}</v-tab-item>
      <v-tab-item>
        <v-icon @click="add" v-if="isActive" large color="green">add_circle</v-icon>
        <v-form @submit="submit" v-else method="post">
          <v-text-field v-model="firstName" :counter="20" label="First Name"></v-text-field>
          <v-text-field v-model="secondName" :counter="20" label="Second Name"></v-text-field>
          <v-text-field v-model="phone" :counter="10" label="Phone Number"></v-text-field>
          <v-btn type="submit" class="white--text success" color="light-green accent-3">Submit</v-btn>
          <v-btn class="white--text" color="red accent-2" @click="cancel">Cancel</v-btn>
        </v-form>
        <v-card>
          <v-list>
            <v-list-tile v-for="c in clients" :key="c.id">
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
export default {
  data() {
    return {
      isActive: false,
      firstName: "",
      secondName: "",
      id: null,
      phone: "",
      info: "",
      client: {
        id: null,
        firstName: "",
        secondName: "",
        phone: ""
      },
      clients: []
    };
  },
  methods: {
    submit() {
      this.client.firstName = this.firstName;
      this.client.secondName = this.secondName;
      this.client.phone = this.phone;
      this.client.id = this.clients.length;
      this.clients.push(this.client);
      console.log(this.clients);
      this.isActive = true;
    },
    add() {
      this.isActive = false;
    },
    cancel() {
      this.isActive = true;
    }
  }
};
</script>
