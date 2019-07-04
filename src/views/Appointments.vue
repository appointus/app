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
                :hint="`${select.first_name}  ${select.last_name} - ${select.phone}`"
                :items="clients"
                :item-text="selectItemText"
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
      <v-list-tile v-for="a in appoints" :key="a._id">
        <v-list-tile-content>{{a.time}}</v-list-tile-content>
        <v-list-tile-content>{{`${a.client.first_name} ${a.client.last_name} - ${a.client.phone}`}}</v-list-tile-content>
        <v-list-tile-content>{{a.date}}</v-list-tile-content>
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
  mounted() {
    this.fetchClients();
    this.fetchAppoints();
  },

  methods: {
    selectItemText: item =>
      item.first_name + " " + item.last_name + " - " + item.phone,
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
        .get(appointmentsUrl + "/" + this.appoint.date.toString())
        .then(res => {
          this.appoints = [];
          res.data.forEach(element => {
            this.appoints.push(element);
          });
        });
    }
  }
};
</script>