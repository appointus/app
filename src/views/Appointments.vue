<template>
  <v-app>
    <v-form>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-menu :close-on-content-click="true" full-width min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="appoint.date"
                  label="Select data"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker @change="fetchAppoints" v-model="appoint.date"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4>
            <v-text-field v-model="appoint.time" label="Input time"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-form>
              <v-select
                v-model="select"
                :items="clients"
                :item-text="clientInfoString"
                label="Select"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-form>
          </v-flex>
          <v-flex xs4>
            <v-btn
              type="button"
              @click="add"
              class="white--text success"
              color="light-green accent-3"
            >Add</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-list>
      <v-list-tile v-for="appoint in appoints" :key="appoint._id">
        <v-list-tile-content>{{appoint.time}}</v-list-tile-content>
        <v-list-tile-content>{{appoint.client.first_name}}</v-list-tile-content>
        <v-list-tile-content>{{appoint.client.last_name}}</v-list-tile-content>
        <v-list-tile-content>{{appoint.client.phone}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-app>
</template>

<script>
import axios from "axios";
const clientsUrl = "http://localhost:3000/clients";
const appointmentsUrl = "http://localhost:3000/appointments";

export default {
  data() {
    return {
      clients: [],
      appoints: [],
      select: {
        first_name: "",
        last_name: "",
        phone: "",
        _id: ""
      },
      appoint: {
        date: new Date().toISOString().substr(0, 10),
        time: "",
        client: ""
      }
    };
  },
  created() {
    this.fetchClients();
    this.fetchAppoints();
  },

  methods: {
    clientInfoString: client =>
      `${client.first_name} ${client.last_name} - ${client.phone}`,
    add() {
      this.appoint.client = this.select._id;
      axios.post(appointmentsUrl, this.appoint).then(() => {
        this.fetchClients();
        this.fetchAppoints();
      });
    },
    fetchClients() {
      axios.get(clientsUrl).then(res => {
        this.clients = [];
        res.data.forEach(element => {
          this.clients.push(element);
        });
      });
    },
    fetchAppoints() {
      axios
        .get(`${appointmentsUrl}/${this.appoint.date.toString()}`)
        .then(res => {
          this.appoints = res.data;
        });
    }
  }
};
</script>