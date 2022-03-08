<template>
  <div class="notes">
    <div class="notesItem">
      <my-notes></my-notes>
    </div>
  </div>
</template>
<script>
import MyNotes from "@/components/common/mynotes/MyNotes.vue";

export default {
  name: "Notes",
  components: { MyNotes },
};
</script>

<style>
</style>