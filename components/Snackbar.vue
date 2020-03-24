<template>
  <v-snackbar v-model="snackbar" top>
    {{ snackbarText }}
    <v-btn :color="color" text @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>
