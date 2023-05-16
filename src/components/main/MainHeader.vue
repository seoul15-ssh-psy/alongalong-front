<template>
  <div class="row q-mt-md">
    <a>
      <div class="wrapper">
        <slot name="header-icon"></slot>
        <div class="text-h4 text-bold text-teal-5 no-wrap">
          <slot name="header-title"></slot>
        </div>
        <q-separator
          class="q-ml-md q-mr-md gt-md"
          vertical
          color="teal-1"
          size="3px"
        />
        <div class="subtext text-h6 text-bold text-teal-6 gt-md">
          <slot name="header-text"></slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
}
</style>
