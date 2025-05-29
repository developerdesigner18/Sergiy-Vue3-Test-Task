<template>
  <div class="max-w-full mx-auto">
    <div class="table-container bg-white" ref="tableContainer" @scroll="handleScroll">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <input type="checkbox" @change="toggleSelectAll" :checked="allSelected" />
            </th>
            <th
              v-for="(header, idx) in headers"
              :key="header"
              :class="`min-w-[${size[idx]}] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`"
            >
              {{ header }}
            </th>

            <th
              v-for="fixedHeader in fixedHeaders"
              :key="fixedHeader.title"
              :class="[
                'px-6 py-3 text-left text-xs font-medium min-w-[10rem] text-gray-500 uppercase tracking-wider',
                isScrolledToEnd ? '' : fixedHeader.class
              ]"
            >
              {{ fixedHeader.title }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="row in rows" :key="row.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <input type="checkbox" v-model="row.selected" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex flex-row items-center gap-4">
                <img :src="row.image" alt="Product" class="w-12 h-12 object-cover" />
                <div class="whitespace-nowrap text-sm font-medium text-gray-900">
                  <div>{{ row.name }}</div>
                  <div
                    v-if="row.highlight"
                    class="text-xs text-blue-600 font-semibold flex items-center"
                  >
                    ⚡ {{ row.highlight }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ row.price }} ₾</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ row.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ row.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span
                :class="row.statusClass"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ row.statusLabel }}
              </span>
              <div class="text-xs text-gray-400 mt-1">{{ row.updatedAt }}</div>
            </td>
            <td
              :class="[
                'px-6 py-4 whitespace-nowrap w-[10rem] h-full',
                isScrolledToEnd ? 'text-sm font-medium' : 'fixed-column'
              ]"
            >
              <div class="flex items-center justify-center gap-2">
                <IconButton
                  icon="lightning"
                  class="rounded-full"
                  icon-weight="fill"
                  type="contrasted"
                />
                <IconButton icon="pencil-simple-line" class="rounded-s-full" type="contrasted" />
                <IconButton
                  icon="dots-three-vertical"
                  class="rounded-full"
                  type="contrasted"
                  @click="deleteSelected"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
// import IconButton from '../Buttons/IconButton.vue'

const headers = ['პროდუქტი', 'ფასი', 'ნახვები', 'სტატუსი', 'ქმედებები']
const size = ['16rem', '6.5rem', '5.5rem', '9.125rem']
const fixedHeaders = [{ title: 'ქმედებები', class: 'fixed-column' }]

const rows = ref([
  {
    id: 1,
    image:
      'https://ik.imagekit.io/vampire/pngimg.com%20-%20airPods_PNG21.png?updatedAt=1748503704460',
    name: 'Apple AirPods Pro 2nd Generation',
    highlight: 'დასასრულებელი 29 მაისამდე',
    price: 629,
    quantity: 200,
    status: 'აქტიური',
    statusLabel: 'აქტიური',
    statusClass: 'bg-green-100 text-green-800',
    updatedAt: '26 სექტემბერი',
    selected: false
  },
  {
    id: 2,
    image:
      'https://ik.imagekit.io/vampire/pngimg.com%20-%20airPods_PNG21.png?updatedAt=1748503704460',
    name: 'Apple AirPods Pro 2nd Generation',
    price: 629,
    quantity: 200,
    status: 'დასრულებული',
    statusLabel: 'ტესტირება',
    statusClass: 'bg-blue-100 text-blue-800',
    updatedAt: '',
    selected: false
  },
  {
    id: 3,
    image:
      'https://ik.imagekit.io/vampire/pngimg.com%20-%20airPods_PNG21.png?updatedAt=1748503704460',
    name: 'Apple AirPods Pro 2nd Generation',
    highlight: 'დასასრულებელი',
    price: 629,
    quantity: 200,
    status: 'აქტიური',
    statusLabel: 'აქტიური',
    statusClass: 'bg-green-100 text-green-800',
    updatedAt: '26 სექტემბერი',
    selected: false
  },
  {
    id: 4,
    image:
      'https://ik.imagekit.io/vampire/pngimg.com%20-%20airPods_PNG21.png?updatedAt=1748503704460',
    name: 'Apple AirPods Pro 2nd Generation',
    price: 629,
    quantity: 200,
    status: 'აქტიური',
    statusLabel: 'გაშვებულია',
    statusClass: 'bg-green-100 text-green-800',
    updatedAt: '26 სექტემბერი',
    selected: false
  },
  {
    id: 5,
    image:
      'https://ik.imagekit.io/vampire/pngimg.com%20-%20airPods_PNG21.png?updatedAt=1748503704460',
    name: 'Apple AirPods Pro 2nd Generation',
    price: 629,
    quantity: 200,
    status: 'დასრულებული',
    statusLabel: 'დასრულებული',
    statusClass: 'bg-gray-200 text-gray-800',
    updatedAt: '',
    selected: false
  }
])

const isScrolledToEnd = ref(true)

const allSelected = computed(() => rows.value.every((row) => row.selected))

const checkScrollVisibility = () => {
  const container = tableContainer.value
  if (!container) return
  if (container.scrollWidth > container.clientWidth) {
    isScrolledToEnd.value =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
  } else {
    isScrolledToEnd.value = true
  }
}

const handleScroll = () => {
  checkScrollVisibility()
}

onMounted(() => {
  nextTick(() => {
    checkScrollVisibility()
    tableContainer.value.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkScrollVisibility)
  })
})

onBeforeUnmount(() => {
  if (tableContainer.value) {
    tableContainer.value.removeEventListener('scroll', handleScroll)
  }
  window.removeEventListener('resize', checkScrollVisibility)
})

const toggleSelectAll = (event) => {
  const isChecked = event.target.checked
  rows.value.forEach((row) => {
    row.selected = isChecked
  })
}

const deleteSelected = () => {
  rows.value = rows.value.filter((row) => !row.selected)
}

const tableContainer = ref(null)
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  position: relative;
}

.fixed-column {
  position: sticky;
  right: 0;
  background-color: white;
  z-index: 10;
}

.fixed-column::before {
  content: '';
  position: absolute;
  top: 0;
  left: -5px;
  width: 5px;
  height: 100%;
  box-shadow: -4px 0px 17px -6px rgba(23, 43, 77, 0.4);
}
td.flex.items-center {
  height: 100%;
}
</style>
