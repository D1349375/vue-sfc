<template>
  <div class="app-container">
    <h1>金史紀 | 黃金走勢與事件追蹤</h1>

    <ControlPanel @filter-change="updateFilters" />

    <GoldChart :chartData="filteredData" @open-modal="showEventDetails" />

    <EventModal 
      v-if="isModalOpen" 
      :eventData="selectedEvent" 
      @close="isModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ControlPanel from './components/ControlPanel.vue';
import GoldChart from './components/GoldChart.vue';
import EventModal from './components/EventModal.vue';

const rawData = ref([]);
const filters = ref({ keyword: '', startDate: '', endDate: '' });
const isModalOpen = ref(false);
const selectedEvent = ref({});

// 讀取 public/events.json 靜態資料
onMounted(async () => {
  try {
    const res = await fetch('./events.json');
    const data = await res.json();
    rawData.value = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (err) {
    console.error('載入資料失敗:', err);
  }
});

// 更新篩選條件
const updateFilters = (newFilters) => {
  filters.value = newFilters;
};

// 處理篩選邏輯，自動傳遞給圖表
const filteredData = computed(() => {
  return rawData.value.filter(item => {
    if (filters.value.keyword) {
      const kw = filters.value.keyword.toLowerCase();
      const matchEvent = item.event && item.event.toLowerCase().includes(kw);
      const matchDetail = item.detail && item.detail.toLowerCase().includes(kw);
      if (!matchEvent && !matchDetail) return false;
    }
    if (filters.value.startDate && new Date(item.date) < new Date(filters.value.startDate)) return false;
    if (filters.value.endDate && new Date(item.date) > new Date(filters.value.endDate)) return false;
    return true;
  });
});

// 開啟 Modal
const showEventDetails = (eventData) => {
  selectedEvent.value = eventData;
  isModalOpen.value = true;
};
</script>

<style>
/* 針對全站的基礎設定 */
body {
  background-color: #121212;
  margin: 0;
}
.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
  color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
h1 {
  text-align: center;
  color: #FFD700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
  margin-bottom: 30px;
}
</style>