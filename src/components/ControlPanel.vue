<template>
  <div class="search-box">
    <div class="filter-group">
      <label for="keyword">搜尋關鍵字：</label>
      <input type="text" id="keyword" v-model="localFilters.keyword" @input="emitFilters" placeholder="例如：聯準會..." />
    </div>
    <div class="filter-group">
      <label for="startDate">開始日期：</label>
      <input type="date" id="startDate" v-model="localFilters.startDate" @change="emitFilters" />
    </div>
    <div class="filter-group">
      <label for="endDate">結束日期：</label>
      <input type="date" id="endDate" v-model="localFilters.endDate" @change="emitFilters" />
    </div>
    <button class="btn-clear" @click="clearFilters">重設篩選</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['filter-change']);
const localFilters = reactive({ keyword: '', startDate: '', endDate: '' });

const emitFilters = () => {
  emit('filter-change', { ...localFilters });
};

const clearFilters = () => {
  localFilters.keyword = '';
  localFilters.startDate = '';
  localFilters.endDate = '';
  emitFilters();
};
</script>

<style scoped>
.search-box {
  background: #1e1e1e;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;
}
label { font-size: 0.9rem; color: #FFD700; font-weight: 600; }
input {
  background: #2a2a2a; border: 1px solid #444; color: #fff;
  padding: 10px; border-radius: 6px; font-size: 1rem; outline: none;
}
input:focus { border-color: #FFD700; }
.btn-clear {
  background: #333; color: #fff; border: 1px solid #555;
  padding: 10px 20px; border-radius: 6px; cursor: pointer; height: 42px;
}
.btn-clear:hover { background: #FFD700; color: #000; }
</style>