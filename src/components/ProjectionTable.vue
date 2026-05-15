<template>
  <section class="panel projection-panel">
    <div class="projection-header">
      <h2 class="section-title">Cashflow Projection</h2>
      <div class="control-inline">
        <label for="entityProjection">Entity:</label>
        <select id="entityProjection" v-model="selectedEntity" class="control control--sm">
          <option v-for="entity in ENTITIES" :key="entity" :value="entity">
            {{ entity }}
          </option>
        </select>
      </div>
      <div class="control-inline">
        <label for="months">Project for:</label>
        <input
          id="months"
          :value="store.numberOfMonths"
          class="control control--sm control--number"
          type="number"
          min="1"
          max="60"
          @change="handleMonthsChange"
        />
        <span>months</span>
      </div>
    </div>

    <table class="data-table projection-table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Income</th>
          <th>Expenses</th>
          <th>Transfer In</th>
          <th>Transfer Out</th>
          <th>Net Cashflow</th>
          <th>Cumulative Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proj in selectedEntityProjection" :key="proj.month">
          <td>{{ proj.monthLabel }}</td>
          <td class="cell-amount text-positive">${{ proj.totalIncome.toFixed(2) }}</td>
          <td class="cell-amount text-negative">${{ proj.totalExpenses.toFixed(2) }}</td>
          <td class="cell-amount text-positive">${{ proj.totalTransfersIn.toFixed(2) }}</td>
          <td class="cell-amount text-negative">${{ proj.totalTransfersOut.toFixed(2) }}</td>
          <td
            class="cell-amount"
            :class="proj.netCashflow >= 0 ? 'text-positive' : 'text-negative'"
          >
            {{ proj.netCashflow >= 0 ? '+' : '' }}${{ proj.netCashflow.toFixed(2) }}
          </td>
          <td
            class="cell-amount"
            :class="proj.cumulativeBalance >= 0 ? 'text-positive' : 'text-negative'"
          >
            ${{ proj.cumulativeBalance.toFixed(2) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCashflowStore } from '@/stores/cashflow'
import { ENTITIES } from '@/models/models'
import { EntityType } from '@/models/models'

const store = useCashflowStore()
const selectedEntity = ref<EntityType>(ENTITIES[0] ?? EntityType.Sales)

const selectedEntityProjection = computed(() => {
  return store.getEntityProjectedCashflow(selectedEntity.value)
})

const handleMonthsChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  store.setNumberOfMonths(Number.parseInt(target.value, 10) || 1)
}
</script>
