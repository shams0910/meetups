<template>
  <div>
    <v-row v-if="loading" class="fill-height" align="center" justify="center">
      <v-col class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col md="8" offset-md="2" sm="12">
        <v-card>
          <v-card-title>
            Meetup in {{meetup.title}}
            <v-spacer></v-spacer>
            <template v-if="userIsCreator">
              <app-edit-meetup :meetup="meetup"></app-edit-meetup>
            </template>
          </v-card-title>

          <v-img class="mx-2" height="300px" :src="meetup.imageUrl"></v-img>
          <v-card-subtitle class="info--text d-flex">
            {{meetup.date | date}}, {{meetup.location}}
            <v-spacer></v-spacer>
            <app-edit-meetup-date :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date>
            <app-edit-meetup-time :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time>
          </v-card-subtitle>

          <v-card-text>{{meetup.description}}</v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn class="mb-2 mr-2">Join now</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthorized() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthorized) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
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