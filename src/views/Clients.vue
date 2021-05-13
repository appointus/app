<template>
  <div>
    <div class="add-client" @click="add" v-if="isFormHidden">
      <b-icon  
                icon="account"
                size="is-large"
                type="is-success">
            </b-icon>
    </div>
    <form class="p-10" v-else>
      <b-field  label="First Name">
            <b-input class="first-name" v-model="client.first_name"></b-input>
        </b-field>
        <b-field label="Second Name">
            <b-input class="second-name" v-model="client.last_name"></b-input>
        </b-field>
        <b-field  label="Phone Number">
            <b-input class="phone-number" v-model="client.phone"></b-input>
        </b-field>
        <div class="p-10"><div class="buttons">
         <b-button type="is-success" class="submit" @click="submit">Submit</b-button>
         <b-button type="is-danger" class="cancel" @click="cancel">Cancel</b-button>
        </div></div>
    </form>
    <div>
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
            <td>
              <b-button class="edit" type="is-info" @click="edit(client)">Edit</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <form v-if="isEdit">
        <b-field  label="New First Name">
            <b-input class="first-name" v-model="client.first_name"></b-input>
        </b-field>
        <b-field label="New Second Name">
            <b-input class="second-name" v-model="client.last_name"></b-input>
        </b-field>
        <b-field label="New Phone Number">
            <b-input class="phone-number" v-model="client.phone"></b-input>
        </b-field>
        <div class="p-10"><div class="buttons">
         <b-button type="is-success" class="submit" @click="save">Save</b-button>
        <b-button type="is-danger" class="cancel" @click="cancel">Cancel</b-button>
        </div></div>
        
      </form>
    </div>
  </div>
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
      return this.$store.getters.CLIENTS;
    }
  },
  created() {
    this.$store.dispatch("GET_CLIENTS");
  },
  methods: {
    submit() {
      this.$store.dispatch("SAVE_CLIENT", this.client);
      this.$store.dispatch("GET_CLIENTS");
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

<style  scoped>
.field{
  width: 30%;
  padding: 0 10px;
}
.p-10{
  padding: 0 10px;
}
table {
  width: 100%;
}
td,
th {
  padding: 10px;
  text-align: left;
}

</style>