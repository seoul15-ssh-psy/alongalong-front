export default {
  data() {
    return {
      windowHeight: window.innerHeight - 85
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler(event) {
      this.windowHeight = window.innerHeight - 85
    }
  }
}
