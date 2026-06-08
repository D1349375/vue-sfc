<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['chartData']);
const emit = defineEmits(['open-modal']);
const chartCanvas = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (chartInstance) chartInstance.destroy(); // 有新資料就銷毀舊圖表重畫
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.chartData.map(d => d.date),
      datasets: [{
        label: '黃金期貨價格 (USD)',
        data: props.chartData.map(d => d.price),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderWidth: 2, fill: true, tension: 0.1,
        pointRadius: props.chartData.map(d => d.event ? 6 : 0),
        pointBackgroundColor: '#FFD700',
        pointHoverRadius: props.chartData.map(d => d.event ? 8 : 4),
        pointHoverBackgroundColor: '#fff'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#f5f5f5' } },
        tooltip: {
          callbacks: {
            footer: (tooltipItems) => {
              const item = props.chartData[tooltipItems[0].dataIndex];
              return item.event ? `⚠️ 事件: ${item.event}` : '無重大事件';
            }
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const item = props.chartData[elements[0].index];
          if (item && item.event) emit('open-modal', item);
        }
      }
    }
  });
};

onMounted(() => renderChart());
watch(() => props.chartData, () => renderChart(), { deep: true });
</script>

<style scoped>
.chart-container {
  background: #1e1e1e; padding: 20px; border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  height: 500px; width: 100%; box-sizing: border-box;
}
</style>