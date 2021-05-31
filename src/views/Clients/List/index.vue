<template>
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
          <td>{{ client.first_name }}</td>
          <td>{{ client.last_name }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <b-button type="is-info" @click="edit(client)">Edit</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <client-edit v-model="isEdit" :client="client" />
  </div>
</template>
<script>
import ClientEdit from './ClientEdit'

export default {
  components: {
    ClientEdit
  },
  data() {
    return {
      isFormHidden: true,
      client: {
        first_name: '',
        last_name: '',
        phone: ''
      },
      isEdit: false
    }
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
    submit() {
      this.$store.dispatch('SAVE_CLIENT', this.client)
      this.$store.dispatch('GET_CLIENTS')
      this.isFormHidden = true
    },
    add() {
      this.isFormHidden = false
      this.client = {}
    },
    cancel() {
      this.isFormHidden = true
      this.isEdit = false
    },
    edit(client) {
      this.client = client
      this.isEdit = true
    },
    save() {
      this.$store.dispatch('updateClient', this.client)

      this.isEdit = false
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
