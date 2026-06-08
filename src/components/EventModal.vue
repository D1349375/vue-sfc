<template>
  <div class="modal-overlay show" @click.self="$emit('close')">
    <div class="modal-content">
      <span class="close-btn" @click="$emit('close')">&times;</span>
      <div class="modal-header">
        <span>{{ eventData.date }}</span>
        <span class="modal-price">${{ eventData.price?.toFixed(2) }}</span>
      </div>
      <div>
        <strong class="event-title">{{ eventData.event }}</strong>
        <span class="event-detail">{{ eventData.detail || '此事件暫無詳細背景說明。' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['eventData']);
defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.modal-content {
  background: #1e1e1e; border: 1px solid #FFD700; padding: 30px;
  border-radius: 16px; width: 90%; max-width: 550px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2); position: relative;
}
.close-btn {
  position: absolute; top: 15px; right: 20px; font-size: 2rem;
  color: #aaa; cursor: pointer;
}
.close-btn:hover { color: #FFD700; }
.modal-header {
  display: flex; justify-content: space-between; border-bottom: 1px solid #333;
  padding-bottom: 10px; margin-bottom: 20px; font-size: 1.1rem; color: #aaa;
}
.modal-price { color: #FFD700; font-weight: bold; }
.event-title { color: #FFD700; font-size: 1.2rem; display: block; margin-bottom: 15px; }
.event-detail { font-size: 1rem; color: #ddd; }
</style>