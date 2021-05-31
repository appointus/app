<template>
  <div>
      <client-add/>
      <list /> 
    
   
  </div>
</template>

<script>
import List from './List'
import ClientAdd from './ClientAdd'

export default {
    components:{
        List,
        ClientAdd
    },
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