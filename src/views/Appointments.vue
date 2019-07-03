<template>
  <div>
    <v-form>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-menu :close-on-content-click="true" full-width min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="appoint.data"
                  label="Select data"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="appoint.data"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4>
            <v-text-field @change="loadClientsToSelect" v-model="appoint.time" label="Input time"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-form>
              <v-select
                v-model="select"
                :hint="`${select.firstName}  ${select.secondName} - ${select.phone}`"
                :items="clientsSelect"
                item-text="selected"
                item-value="phone"
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
      <v-list-tile v-for="a in appoints" :key="a.client">
        <v-list-tile-content>{{a.time}}</v-list-tile-content>
        <v-list-tile-content>{{`${a.client.firstName} ${a.client.secondName} - ${a.client.phone}`}}</v-list-tile-content>
        <v-list-tile-content>{{a.data}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
const clientsUrl = "http://localhost:3000/clients";
const appointmentstsUrl = "http://localhost:3000/appointments";

export default {
  data() {
    return {
      isFormHiden: true,
      clientsSelect: [],
      clients: [],
      appoints: [],
      select: {
        firstName: "",
        secondName: "",
        phone: "",
        selected: ""
      },
      appoint: {
        data: "",
        time: "",
        client: {
          firstName: "",
          secondName: "",
          phone: ""
        }
      }
    };
  },
  mounted() {
    this.fetchClients();
    this.fetchAppoints();
  },

  methods: {
    add() {
      this.appoint.client.firstName = this.select.firstName;
      this.appoint.client.secondName = this.select.secondName;
      this.appoint.client.phone = this.select.phone;
      axios.post(appointmentstsUrl, { body: this.appoint }).then(() => {
        this.isFormHidden = true;
        this.fetchClients();
      });
      //   let newAppoint = { ...this.appoint };
      //   newAppoint.client = { ...newAppoint.client };
      //   this.appoints.push(newAppoint);
      //   this.isFormHiden = true;
    },
    loadClientsToSelect() {
      this.clients.forEach(e => {
        this.clientsSelect.push({
          firstName: e.firstName,
          secondName: e.secondName,
          phone: e.phone,
          selected: `${e.firstName} ${e.secondName} - ${e.phone}`
        });
      });
      this.isFormHiden = false;
    },
    fetchClients() {
      axios.get(clientsUrl).then(res => {
        this.clients = [];
        res.data.forEach(element => {
          this.clients.push(element.body);
        });
      });
    },
    fetchAppoints() {
      axios.get(appointmentstsUrl).then(res => {
        this.appoints = [];
        res.data.forEach(element => {
          this.appoints.push(element.body);
        });
      });
      console.log(this.appoints);
    }
  }
};
</script>