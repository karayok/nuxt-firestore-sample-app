<template>
  <article
    v-if="!!post"
    class="card post elevation-1">
    <div
      v-if="post.title"
      class="title">
      <h2>{{ post.title }}</h2>
    </div>
    <div
      v-if="post.content"
      class="content"
      v-html="formattedPostContent"/>
    <div
      v-if="post.created_at"
      class="created-at"
      v-html="formattedPostCreatedAt"/>
  </article>
</template>

<script>
import h from 'htmlspecialchars'
export default {
  name: 'CardPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedPostContent() {
      return h(this.post.content)
    },
    formattedPostCreatedAt() {
      const date = new Date(1970, 0, 1)
      date.setSeconds(this.post.created_at.seconds)

      // TODO : fix
      const formattedDate = 'YYYY/MM/DD'
        .replace(/YYYY/g, date.getFullYear())
        .replace(/MM/g, date.getMonth() + 1)
        .replace(/DD/g, date.getDate())
      return '作成日 : ' + formattedDate
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 8px;
  background: $background-light;
  padding: $spacing-x-small;

  div {
    margin: $spacing-xx-small;
    &.title {
      color: $primary-color;
      font-size: 16px;
    }

    &.created-at {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
