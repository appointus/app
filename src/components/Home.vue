<template>
  <div>
    <div>
      <v-toolbar color="cyan">
        <v-toolbar-items>
          <v-btn to="/appointments" flat>APPOINTMENTS</v-btn>
          <v-btn to="/clients" flat>CLIENTS</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>