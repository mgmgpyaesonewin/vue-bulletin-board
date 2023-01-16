<template>
  <v-card>
    <v-card-item class="bg-teal-lighten-1">
      <v-card-title>Create Post</v-card-title>
    </v-card-item>
    <v-card-text class="mx-4 mt-8">
      <v-row>
        <v-col cols="3">
          <v-list-subheader>What is your Post's title</v-list-subheader>
        </v-col>

        <v-col cols="9">
          <v-text-field label="Title" suffix="0/255"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-list-subheader>
            Write your post description here
          </v-list-subheader>
        </v-col>

        <v-col cols="9">
          <v-textarea label="Description"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mx-4">
      <v-row>
        <v-col cols="9" offset="3">
          <v-btn
            prepend-icon="fa-solid fa-floppy-disk"
            class="px-6"
            variant="flat"
            title="Save"
            color="teal-lighten-1"
          >
            Confirm
          </v-btn>
          <v-btn
            prepend-icon="fa-solid fa-xmark"
            class="px-6"
            variant="tonal"
            title="Cancel"
          >
            Clear
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
