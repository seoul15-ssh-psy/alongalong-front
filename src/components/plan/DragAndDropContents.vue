<template>
  <div style="width: 100%; height: 100%">
    <div class="row no-wrap justify-around q-px-md q-pt-md">
      <div class="row q-gutter-md">
        <q-btn
          label="일정 추가"
          color="primary"
          @click="addRow"
          :disable="listItems.length >= 7"
        />
        <q-btn
          label="일정 삭제"
          color="accent"
          @click="removeRow"
          :disable="listItems.length === 0"
        />
      </div>
    </div>
    <div class="row justify-around q-px-md q-pt-md">
      <div
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop"
        id="plan-container"
        class="drop-target rounded-borders overflow-hidden"
      >
        <my-attraction-card
          v-for="(item, index) in attractions"
          :id="`card${index}`"
          :key="index"
          link="/"
          :imageUrl="item.imageUrl"
          :title="item.title"
          draggable="true"
          @dragstart="onDragStart"
        ></my-attraction-card>
      </div>

      <div style="width: 45%">
        <div class="row justify-center">
          <div class="full-width">
            <div
              v-for="(item, index) in listItems"
              :key="index"
              @dragenter="onDragEnter"
              @dragleave="onDragLeave"
              @dragover="onDragOver"
              @drop="onDrop"
              id="plan-container"
              class="drop-list rounded-borders q-mb-md"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import MyAttractionCard from './MyAttractionCard.vue'

export default {
  components: { MyAttractionCard },
  data() {
    return {
      attractions: []
    }
  },
  setup() {
    // add row
    const listItems = ref([])

    let day = 1

    return {
      status1,
      status2,
      listItems,
      mutationInfo,
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
        if (e.target.id !== 'plan-container') {
          e.target.classList.remove('drag-enter')
          return
        }

        // make the exchange
        draggedEl.parentNode.removeChild(draggedEl)
        e.target.appendChild(draggedEl)
        e.target.classList.remove('drag-enter')
      },

      addRow() {
        listItems.value.push(day++)
      },
      removeRow() {
        listItems.value.pop()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.drop-target {
  height: 350px;
  width: 45%;
  background-color: gainsboro;
}

.drop-list {
  height: 175px;
  width: 100%;
  background-color: gainsboro;
}

.drag-enter {
  outline-style: dashed;
}
</style>
