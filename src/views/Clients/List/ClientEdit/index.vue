<template>
  <div>
    <form v-if="isEdit">
      <b-field label="New First Name">
        <b-input v-model="client.first_name"></b-input>
      </b-field>
      <b-field label="New Second Name">
        <b-input v-model="client.last_name"></b-input>
      </b-field>
      <b-field label="New Phone Number">
        <b-input v-model="client.phone"></b-input>
      </b-field>
      <div class="p-10">
        <div class="buttons">
          <b-button type="is-success" @click="save">Save</b-button>
          <b-button type="is-danger" @click="cancel">Cancel</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'isEdit',
    event: 'hide'
  },
  props: {
    client: Object,
    isEdit: Boolean
  },
  computed: {
    clients() {
      return this.$store.getters.CLIENTS
    }
  },
  created() {
    this.$store.dispatch('GET_CLIENTS')
  },
  methods: {
    save() {
      this.$store.dispatch('updateClient', this.client)
      this.$emit('hide', false)
    },
    cancel() {
      this.$emit('hide', false)
    }
  }
}
</script>

<style scoped>
.field {
  width: 30%;
  padding: 0 10px;
}
.p-10 {
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
