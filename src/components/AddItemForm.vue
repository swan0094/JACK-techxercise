<template>
  <section class="panel form-panel">
    <h2 class="section-title">Add Recurring Transaction</h2>
    <form class="stack-form" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="entity">Department</label>
        <select id="entity" v-model="formData.entity" class="control" required>
          <option v-for="entity in ENTITIES" :key="entity" :value="entity">
            {{ entity }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="name">Description</label>
        <input
          id="name"
          v-model="formData.name"
          class="control"
          type="text"
          placeholder="e.g., Salary, Rent, Groceries"
          required
        />
      </div>

      <div class="field">
        <label for="amount">Amount ($)</label>
        <input
          id="amount"
          v-model.number="formData.amount"
          class="control"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div class="field">
        <fieldset>
          <legend>Type</legend>
          <div class="field-options">
            <label>
              <input v-model="formData.type" type="radio" value="income" />
              Income
            </label>
            <label>
              <input v-model="formData.type" type="radio" value="expense" />
              Expense
            </label>
            <label>
              <input v-model="formData.type" type="radio" value="transfer" />
              Transfer
            </label>
          </div>
        </fieldset>
      </div>

      <div v-if="formData.type === TransactionType.Transefer" class="field">
        <label for="toEntity">Transfer To</label>
        <select id="toEntity" v-model="formData.toEntity" class="control" required>
          <option v-for="entity in toEntities" :key="entity" :value="entity">
            {{ entity }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="frequency">Frequency</label>
        <select id="frequency" v-model="formData.frequency" class="control" required>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="once">Once-off (Month 1 only)</option>
        </select>
      </div>

      <button type="submit" class="btn btn--primary">
        {{ formData.type === TransactionType.Transefer ? 'Add Transfer' : 'Add Transaction' }}
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useCashflowStore } from '@/stores/cashflow'
import { ENTITIES } from '@/models/models'
import { EntityType, TransactionType, ItemFrequency } from '@/models/models'

const store = useCashflowStore()

const getDefaultToEntity = (fromEntity: EntityType): EntityType => {
  const fallback = ENTITIES.find((entity) => entity !== fromEntity)
  return fallback ?? fromEntity
}

const formData = reactive({
  entity: ENTITIES[0] as EntityType,
  name: '',
  amount: 0,
  type: TransactionType.Income,
  frequency: ItemFrequency.Monthly,
  toEntity: getDefaultToEntity(ENTITIES[0] as EntityType),
})

const toEntities = computed(() => {
  return ENTITIES.filter((entity) => entity !== formData.entity)
})

watch(
  () => formData.entity,
  (currentEntity) => {
    if (formData.toEntity === currentEntity) {
      formData.toEntity = getDefaultToEntity(currentEntity)
    }
  },
)

const handleSubmit = () => {
  if (!formData.name.trim() || formData.amount <= 0) {
    return
  }

  if (formData.type === TransactionType.Transefer) {
    store.addTransfer({
      name: formData.name,
      amount: formData.amount,
      frequency: formData.frequency,
      fromEntity: formData.entity,
      toEntity: formData.toEntity,
    })
  } else {
    store.addItem({
      name: formData.name,
      amount: formData.amount,
      type: formData.type,
      frequency: formData.frequency,
      entity: formData.entity,
    })
  }

  formData.name = ''
  formData.amount = 0
  formData.type = TransactionType.Income
  formData.frequency = ItemFrequency.Monthly
  formData.toEntity = getDefaultToEntity(formData.entity)
}
</script>
