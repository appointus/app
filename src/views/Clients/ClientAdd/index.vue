<template>
  <div>
    <div @click="add" v-if="isFormHidden">
      <b-icon  
                icon="account"
                size="is-large"
                type="is-success">
            </b-icon>
    </div>
    <form class="p-10" v-else>
      <b-field  label="First Name">
            <b-input v-model="client.first_name"></b-input>
        </b-field>
        <b-field label="Second Name">
            <b-input v-model="client.last_name"></b-input>
        </b-field>
        <b-field label="Phone Number">
            <b-input v-model="client.phone"></b-input>
        </b-field>
        <div class="p-10"><div class="buttons">
         <b-button type="is-success" @click="submit">Submit</b-button>
         <b-button type="is-danger" @click="cancel">Cancel</b-button>
        </div></div>
    </form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormHidden: true,
      
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