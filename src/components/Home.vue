<template>
  <div>
    <div>
      <b-navbar>
        <template #start>
          <b-navbar-item href="/appointments"> APPOINTMENTS </b-navbar-item>
          <b-navbar-item href="/clients"> CLIENTS </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
