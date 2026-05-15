<script setup lang="ts">
import AddItemForm from './components/AddItemForm.vue'
import ItemsList from './components/ItemsList.vue'
import ProjectionTable from './components/ProjectionTable.vue'
import TransfersList from './components/TransfersList.vue'
</script>

<template>
  <div class="app-shell">
    <header class="app-header panel">
      <h1>Cashflow Forecasting Tool</h1>
      <p class="subtitle">Plan your monthly cashflow with recurring income and expenses</p>
    </header>

    <main class="app-main">
      <AddItemForm />
      <ItemsList />
      <TransfersList />
      <ProjectionTable />
    </main>
  </div>
</template>
