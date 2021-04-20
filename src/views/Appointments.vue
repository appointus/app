<template>
  <v-app>
    <v-form>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-menu :close-on-content-click="true" full-width min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Select data"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker @change="dataChanget" v-model="date"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4>
            <v-text-field v-model="time" label="Input time"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-form>
              <v-select
                v-model="client"
                :items="clientsList"
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
    <table>
      <thead>
        <tr>
          <th class="text-xs-left">Time</th>
          <th class="text-xs-left">First Name</th>
          <th class="text-xs-left">Last Name</th>
          <th class="text-xs-left">Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appoint in appointusList" :key="appoint._id">
          <td>{{appoint.time}}</td>
          <td>{{appoint.client.first_name}}</td>
          <td>{{appoint.client.last_name}}</td>
          <td>{{appoint.client.phone}}</td>
        </tr>
      </tbody>
    </table>
  </v-app>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      client: {
        first_name: "",
        last_name: "",
        phone: "",
        _id: ""
      },
      date: new Date().toISOString().substr(0, 10),
      time: ""
    };
  },
  computed: {
    clientsList() {
      return this.$store.getters.CLIENTS;
    },
    appointusList() {
      return this.$store.getters.APPOINTS;
    }
  },

  mounted() {
    this.$store.dispatch("GET_CLIENTS");
    this.$store.dispatch("GET_APPOINTS", this.date);
  },

  methods: {
    isValidDate() {
      const now = moment();
      const selectedDate = moment(
        this.date + " " + this.time,
        "YYYY-MM-DD HH:mm"
      );

      return selectedDate.isAfter(now) || selectedDate.isSame(now, "minute");
    },
    clientInfoString: client =>
      `${client.first_name} ${client.last_name} - ${client.phone}`,
    dataChanget() {
      if (!this.isValidDate()) {
        alert("It is not possible to add an appointment in the past");
        this.date = moment().format("YYYY-MM-DD");
        this.time = moment().format("HH:mm");
        return;
      }

      this.$store.dispatch("GET_APPOINTS", this.date);
    },
    add() {
      if (!this.isValidDate()) {
        alert("It is not possible to add an appointment in the past");
        return;
      }

      this.$store.dispatch("SAVE_APPOINT", {
        date: this.date,
        time: this.time,
        client: this.client._id
      });
    }
  }
};
</script>

<style  scoped>
table {
  width: 100%;
}
td,
th {
  padding: 10px;
  text-align: left;
}
</style>
