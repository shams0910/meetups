<template>
  <form @submit.prevent="onCreateMeetup">
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <h2>Create a new Meetup</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <v-text-field name="title" label="Title " id="title" v-model="title" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <v-text-field name="location" label="Location " id="locaction" v-model="location" required></v-text-field>
      </v-col>
    </v-row>
    <!--image upload-->
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <v-img :src="imageUrl" max-height="200px"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <v-textarea
          name="description"
          label="Description"
          id="description"
          v-model="description"
          required
        ></v-textarea>
      </v-col>
    </v-row>
    <!-- Date Pickers -->
    <v-row justify="center" cols="10" offset="1" sm="6" offset-sm="3" class="mb-2">
      <v-date-picker v-model="date" @click="filterDate" event-color="warning"></v-date-picker>
    </v-row>

    <v-row justify="center" cols="10" offset="1" sm="6" offset-sm="3">
      <v-time-picker v-model="time" format="24hr" @click="filterDate"></v-time-picker>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" sm="6" offset-sm="3">
        <v-btn :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "Some Text to describe the meetup",
      date: new Date().toISOString().slice(0, 10),
      time: new Date(),
      image: null
    };
  },
  computed: {
    filterDate() {
      const mydate = new Date(this.date);
      if (typeof this.time === "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        mydate.setHours(hours);
        mydate.setMinutes(minutes);
      } else {
        mydate.setHours(this.time.getHours());
        mydate.setMinutes(this.time.getMinutes());
      }
      return mydate;
    },
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.filterDate
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>