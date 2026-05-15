<template>
  <section class="panel">
    <h2 class="section-title">Inter-Entity Transfers</h2>
    <div v-if="store.transfers.length === 0" class="empty-state">
      <p>No transfers added yet.</p>
    </div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
          <th>Frequency</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transfer in store.transfers" :key="transfer.id">
          <td>{{ transfer.name }}</td>
          <td>{{ transfer.fromEntity }}</td>
          <td>{{ transfer.toEntity }}</td>
          <td class="cell-amount">${{ transfer.amount.toFixed(2) }}</td>
          <td>{{ transfer.frequency }}</td>
          <td>
            <button class="btn btn--danger btn--sm" @click="store.removeTransfer(transfer.id)">
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
