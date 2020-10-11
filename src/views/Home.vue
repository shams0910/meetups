<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="6" xs="12" align="end">
          <v-btn>View Meetups</v-btn>
        </v-col>
        <v-col cols="6" xs="12" align="start">
          <v-btn to="/meetups/create">Organize Meetups</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="loading" class="fill-height" align="center" justify="center">
        <v-col class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
      <v-container>
        <v-carousel show-arrows-on-hover height="450px" v-if="!loading">
          <v-carousel-item
            v-for="item in meetups"
            :key="item.id"
            :src="item.imageUrl"
            @click="loadMeetup(item.id)"
          >
            <div class="title">{{item.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  components: {},
  methods: {
    loadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: relative;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
