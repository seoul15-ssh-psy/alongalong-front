<template>
  <div style="margin: auto; padding: 100px">
    <div class="row q-px-md q-pt-md justify-around items-center">
      <div class="col-1">
        <div class="row q-pb-md justify-end">
          <q-btn label="일정 추가" color="primary" @click="addRow" />
        </div>
        <div class="row justify-end">
          <q-btn label="일정 삭제" color="accent" @click="removeRow" />
        </div>
      </div>
      <div
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop"
        id="bookmark-container"
        class="col-5 q-pa-md rounded-borders overflow-hidden bg-grey-2"
        :style="[
          {
            height: 200 * Math.floor(bookMarked.length / 4 + 1) + 'px'
          }
        ]"
      >
        <my-attraction-card
          v-for="(item, index) in bookMarked"
          :key="item"
          :id="`card${index}`"
          link="/"
          :imageUrl="item.firstimage"
          :title="item.title"
          draggable="true"
          @dragstart="onDragStart"
        ></my-attraction-card>
      </div>

      <div class="col-5">
        <div v-for="(item, index) in myPlans" :key="item">
          <div class="text-h5 text-bold q-pa-sm">
            {{ '📝' + (index + 1) + '일 차' }}
          </div>
          <div
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDrop"
            :id="`plan-container${index + 1}`"
            class="full-width rounded-borders q-pa-md bg-grey-2 q-mb-sm"
            style="height: 200px"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyAttractionCard from './MyAttractionCard.vue'

const locationStore = 'locationStore'

export default {
  components: { MyAttractionCard },
  computed: {
    ...mapState(locationStore, ['bookMarked', 'myPlans'])
  },
  setup() {
    let day = 1
    return {
      day,

      // store the id of the draggable element
      onDragStart(e) {
        e.dataTransfer.setData('text', e.target.id)
        e.dataTransfer.dropEffect = 'move'
      },

      onDragEnter(e) {
        console.log(e.target)
        // don't drop on other draggables
        if (e.target.draggable !== true) {
          e.target.classList.add('drag-enter')
        }
      },

      onDragLeave(e) {
        e.target.classList.remove('drag-enter')
      },

      onDragOver(e) {
        e.preventDefault()
      },

      onDrop(e) {
        e.preventDefault()

        // don't drop on other draggables
        if (e.target.draggable === true) {
          return
        }

        const draggedId = e.dataTransfer.getData('text')
        const draggedEl = document.getElementById(draggedId)

        // check if original parent node
        if (draggedEl.parentNode === e.target) {
          e.target.classList.remove('drag-enter')
          return
        }

        // 드래그 가능한 곳이 아니라면
        if (
          e.target.id.substring(0, 14) !== 'plan-container' &&
          e.target.id !== 'bookmark-container'
        ) {
          e.target.classList.remove('drag-enter')
          return
        }

        // make the exchange
        draggedEl.parentNode.removeChild(draggedEl)
        e.target.appendChild(draggedEl)
        e.target.classList.remove('drag-enter')
      },

      addRow() {
        plan.value.push(day++)
      },
      removeRow() {
        plan.value.pop()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.drag-enter {
  outline-style: dashed;
}
</style>
