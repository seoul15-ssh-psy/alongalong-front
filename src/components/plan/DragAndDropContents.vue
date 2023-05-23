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
    <div class="row no-wrap justify-around q-px-md q-pt-md">
      <div
        v-mutation="handler1"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop"
        class="drop-target rounded-borders overflow-hidden"
      >
        <div
          id="box1"
          draggable="true"
          @dragstart="onDragStart"
          class="box navy"
        />
        <div
          id="box2"
          draggable="true"
          @dragstart="onDragStart"
          class="box red"
        />
        <div
          id="box3"
          draggable="true"
          @dragstart="onDragStart"
          class="box green"
        />
        <div
          id="box4"
          draggable="true"
          @dragstart="onDragStart"
          class="box orange"
        />
        <div
          id="box5"
          draggable="true"
          @dragstart="onDragStart"
          class="box navy"
        />
        <div
          id="box6"
          draggable="true"
          @dragstart="onDragStart"
          class="box red"
        />
        <div
          id="box7"
          draggable="true"
          @dragstart="onDragStart"
          class="box green"
        />
        <div
          id="box8"
          draggable="true"
          @dragstart="onDragStart"
          class="box orange"
        />
      </div>

      <div style="width: 45%">
        <div class="row justify-center">
          <div class="full-width">
            <div
              v-for="(item, index) in listItems"
              :key="index"
              v-mutation="handler2"
              @dragenter="onDragEnter"
              @dragleave="onDragLeave"
              @dragover="onDragOver"
              @drop="onDrop"
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

export default {
  setup() {
    // drag and drop
    const status1 = ref([])
    const status2 = ref([])

    // add row
    const listItems = ref([])
    const mutationInfo = ref('')

    let day = 1

    return {
      status1,
      status2,
      listItems,
      mutationInfo,
      day,

      handler1(mutationRecords) {
        status1.value = []
        for (const index in mutationRecords) {
          const record = mutationRecords[index]
          const info = `type: ${record.type}, nodes added: ${
            record.addedNodes.length > 0 ? 'true' : 'false'
          }, nodes removed: ${
            record.removedNodes.length > 0 ? 'true' : 'false'
          }, oldValue: ${record.oldValue}`
          status1.value.push(info)
        }
      },

      handler2(mutationRecords) {
        status2.value = []
        for (const index in mutationRecords) {
          const record = mutationRecords[index]
          const info = `type: ${record.type}, nodes added: ${
            record.addedNodes.length > 0 ? 'true' : 'false'
          }, nodes removed: ${
            record.removedNodes.length > 0 ? 'true' : 'false'
          }, oldValue: ${record.oldValue}`
          status2.value.push(info)
        }
      },

      // store the id of the draggable element
      onDragStart(e) {
        e.dataTransfer.setData('text', e.target.id)
        e.dataTransfer.dropEffect = 'move'
      },

      onDragEnter(e) {
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
  height: 400px;
  width: 45%;
  background-color: gainsboro;
}

.drop-list {
  height: 400px;
  width: 100%;
  background-color: gainsboro;
}

.drag-enter {
  outline-style: dashed;
}

.box {
  width: 25%;
  height: 50%;
  float: left;
  cursor: pointer;
}

// .box:nth-child(3) {
//   clear: both;
// }

.navy {
  background-color: navy;
}

.red {
  background-color: firebrick;
}

.green {
  background-color: darkgreen;
}

.orange {
  background-color: orange;
}
</style>
