<template>
  <div>
    <v-btn text @click.stop="dialog = true">Edit</v-btn>

    <v-dialog v-model="dialog" max-width="360">
      <v-card>
        <v-card-title class="headline">Edit Meetup</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field name="title" label="Title " v-model="editedTitle" id="title"></v-text-field>
          <v-text-field name="location" label="Location " id="locaction" v-model="editedLocation"></v-text-field>
          <v-textarea
            name="description"
            label="Description"
            id="description"
            v-model="editedDescription"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>

          <v-btn color="green darken-1" text @click="onSaveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedLocation: this.meetup.location,
      editedDescription: this.meetup.description,
      editedDate: this.meetup.date
    };
  },
  computed: {},
  methods: {
    onSaveChanges() {
      this.dialog = false;
      if (
        this.editedTitle.trim() === "" &&
        this.editedLocation.trim() === "" &&
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        title: this.editedTitle,
        location: this.editedLocation,
        description: this.editedDescription
      });
    }
  }
};
</script>