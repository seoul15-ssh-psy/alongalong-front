<template>
  <div style="height: 85px"></div>
  <div>
    <q-layout
      view="hHh Lpr lff"
      container
      class="rounded-borders"
      :style="[{ height: this.windowHeight + 'px' }, { zIndex: 3 }]"
    >
      <drag-and-drop-contents></drag-and-drop-contents>
    </q-layout>
  </div>
</template>

<script>
import Mixins from '../../api/common/mixins'
import DragAndDropContents from 'src/components/plan/DragAndDropContents.vue'

export default {
  components: { DragAndDropContents },
  mixins: [Mixins]
}
</script>
