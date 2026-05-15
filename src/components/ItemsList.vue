<template>
  <section class="panel">
    <h2 class="section-title">Recurring Transactions</h2>
    <div v-if="store.items.length === 0" class="empty-state">
      <p>No recurring transactions added yet. Add one to get started!</p>
    </div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Department</th>
          <th>Description</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Frequency</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.items" :key="item.id">
          <td>{{ item.entity }}</td>
          <td>{{ item.name }}</td>
          <td>
            <span :class="['badge', item.type === 'income' ? 'badge-income' : 'badge-expense']">
              {{ item.type }}
            </span>
          </td>
          <td class="cell-amount">${{ item.amount.toFixed(2) }}</td>
          <td>{{ item.frequency }}</td>
          <td>
            <button class="btn btn--danger btn--sm" @click="store.removeItem(item.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { useCashflowStore } from '@/stores/cashflow'

const store = useCashflowStore()
</script>
