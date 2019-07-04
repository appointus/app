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
    <v-list>
      <v-list-tile v-for="appoint in appointusList" :key="appoint._id">
        <v-list-tile-content>{{appoint.time}}</v-list-tile-content>
        <v-list-tile-content>{{appoint.client.first_name}}</v-list-tile-content>
        <v-list-tile-content>{{appoint.client.last_name}}</v-list-tile-content>
        <v-list-tile-content>{{appoint.client.phone}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-app>
</template>

<script>
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
    clientInfoString: client =>
      `${client.first_name} ${client.last_name} - ${client.phone}`,
    dataChanget() {
      this.$store.dispatch("GET_APPOINTS", this.date);
    },
    add() {
      this.$store.dispatch("SAVE_APPOINT", {
        date: this.date,
        time: this.time,
        client: this.client._id
      });
    }
  }
};
</script>