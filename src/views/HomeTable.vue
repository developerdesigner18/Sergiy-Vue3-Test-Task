<template>
  <div class="w-full h-dvh flex justify-center items-center">
    <div class="scroll-bar mx-auto xl:max-w-[1100px] flex xl:justify-center w-full overflow-x-auto  p-3 rounded-2xl" ref="tableContainer" @scroll="handleScroll">
      <table class=" bg-white border border-gray-200">
        <thead>
          <tr>
            <th
              class="py-2 px-5 border-b border-b-[#edeff3]"
            >
            <div class="flex items-center justify-center">
              <input type="checkbox" class="w-[16px] h-[16px]" @change="toggleSelectAll" :checked="allSelected" />
            </div>
            </th>
            <th
              v-for="(header, idx) in headers"
              :key="header"
              :class="`min-w-[${size[idx]}] pr-8 border-b border-b-[#edeff3] py-5 text-left text-sm font-medium text-[#162a4c70] uppercase -tracking-wider`"
            >
              {{ header }}
            </th>

            <th
              v-for="fixedHeader in fixedHeaders"
              :key="fixedHeader.title"
              :class="[
                'px-4 py-5 text-left border-b border-b-[#edeff3] text-sm font-medium text-[#162a4c70] uppercase -tracking-wider',
                isScrolledToEnd ? '' : fixedHeader.class
              ]"
            >
              {{ fixedHeader.title }}
            </th>
          </tr>
        </thead>
         <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="row in rows" :key="row.id">
            <td class="py-2 px-5">
              <input type="checkbox" class="w-[16px] h-[16px]" v-model="row.selected" />
            </td>
            <td class="pr-8 py-5 whitespace-nowrap text-sm text-gray-500">
              <div class="flex flex-row items-center gap-3 w-max">
                <div class="w-[50px] h-[50px] rounded-md flex justify-center items-center bg-[#F7F8F9]">
                  <img :src="row.image" alt="Product" class="w-[90%] h-[90%] object-contain" />
                </div>
                <div class="flex flex-col gap-1">
                  <div class="text-base font-semibold text-[#2B3E5C]">{{ row.name }}</div>
                  <div
                    v-if="row.highlight"
                    class="flex items-end gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" x="0" y="0" viewBox="0 0 192 192" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M155.109 74.028a4 4 0 0 0-3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0-7.373-2.614L36.917 113.905A4 4 0 0 0 40.324 120h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z"  opacity="1" data-original="#0C66E4" :class="row.status === 'აქტიური' ? 'fill-[#0C66E4]' : 'fill-[#6E5DC6]'"></path></g></svg>
                    <span class="text-sm font-semibold leading-none pb-[3px]" :class="row.status === 'აქტიური' ? 'text-[#0C66E4]' : 'text-[#6E5DC6]'">{{ row.highlight }}</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="pr-8 py-4"><div class="w-max text-sm font-semibold text-[#2B3E5C]">{{ row.price }} ₾</div></td>
            <td class="pr-8 py-4"><div class="w-max text-sm font-semibold text-[#2B3E5C]">{{ row.quantity }}</div></td>
            <td class="pr-8 py-4"><div class="w-max text-sm font-semibold text-[#2B3E5C]">{{ row.status }}</div></td>
            <td class="pr-8 py-4 text-sm font-semibold text-[#2B3E5C] w-max">
              <div class="flex flex-col gap-1 items-start">
                <span
                  :class="row.statusClass"
                  class="px-3 flex text-xs leading-none py-1.5 font-semibold -tracking-wide rounded-full"
                >
                  {{ row.statusLabel }}
                </span>
                <div class="text-xs font-medium -tracking-wide text-[#162a4c70]">{{ row.updatedAt }}</div>
              </div>
            </td>
            <td
              :class="[
                'px-6 py-4 whitespace-nowrap w-[10rem] h-full',
                isScrolledToEnd ? 'text-sm font-medium' : 'fixed-column'
              ]"
            >
              <div class="flex items-center justify-center gap-2">
                <div class="size-[40px] rounded-full bg-[#EBF3FF] flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 192 192" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M155.109 74.028a4 4 0 0 0-3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0-7.373-2.614L36.917 113.905A4 4 0 0 0 40.324 120h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" fill="#0C66E4" opacity="1" data-original="#0C66E4" class=""></path></g></svg>
                </div>
                <div class="size-[40px] rounded-full bg-[#F1F2F4] flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M4.76 18.81h.11l2.93-.27c.41-.04.79-.22 1.08-.51L19.94 6.97c.52-.52.81-1.21.81-1.94s-.29-1.42-.81-1.94l-.71-.71c-1.04-1.04-2.85-1.04-3.89 0l-1.41 1.41-9.64 9.64c-.29.29-.47.67-.5 1.08l-.27 2.93c-.03.37.1.73.36 1 .24.24.55.37.88.37zM17.29 3.07c.32 0 .64.12.88.37l.71.71a1.234 1.234 0 0 1 0 1.76l-.88.88-2.47-2.47.88-.88c.24-.24.56-.37.88-.37zM5.28 14.65c0-.06.03-.11.07-.15l9.11-9.12 2.47 2.47-9.11 9.11s-.1.07-.15.07l-2.63.24.24-2.63zM22.75 22c0 .41-.34.75-.75.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75z" fill="#455570" opacity="1" data-original="#455570" class=""></path></g></svg>
                </div>
                <div class=" flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 26c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 6c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z" fill="#354663" opacity="1" data-original="#354663"></path></g></svg>
                </div>
                <!-- <IconButton
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
                /> -->
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
const size = ['16rem', '9.5rem', '5.5rem', '9.125rem']
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
    highlight: 'დასასრულებელი',
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
  right: -12px;
  background-color: white;
  z-index: 10;
}

.fixed-column::before {
  content: '';
  position: absolute;
  top: 0;
  left: -5px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
  width: 5px;
  height: 100%;
}
td.flex.items-center {
  height: 100%;
}
.scroll-bar::-webkit-scrollbar{
width: 0;
height: 0;
}
</style>
