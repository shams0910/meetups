<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id">
      <v-col sm="8" offset-sm="2" justify="start">
        <v-card color="grey lighten-4">
          <v-row>
            <v-col xs="12" sm="5" justify="start">
              <v-img class="ma-3" height="200px" :src="meetup.imageUrl"></v-img>
            </v-col>
            <v-col sm="5">
              <v-card-title primary-title>{{meetup.title}}</v-card-title>
              <v-card-subtitle>{{meetup.date|date}}</v-card-subtitle>
              <v-card-actions class="d-flex align-end">
                <v-btn text :to="'/meetups/'+ meetup.id" exact>Explore</v-btn>
                <v-btn text>Join</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      rating: 4.5
    };
  },
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>