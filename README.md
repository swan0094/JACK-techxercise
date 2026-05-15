# JACKapp Technical Exercise - Alex Swan

A simple Vue 3 project written in Composition API and TypeScript that will allow a user to conduct a basic
monthly cashflow projection based on expenses, income and transfers.

The user is able to enter either income, expense or a transfer. All 3 can be done either as reoccuring or a single
occurence.
Supports inter-entity transfers and multi-entity hierarchy with seperate reports for each entity.

## Run The App

1. Install dependencies:

```sh
npm install
```

2. Start the development server:

```sh
npm run dev
```

3. Open the local URL shown in the terminal.

## Testing

- To run the test suite:

```sh
npm run test
```

## Assumptions And Simplifications

1. Recurrence is calculated using fixed monthly averages, not calendar-accurate schedules:
   - Daily = `30.44` occurrences per month
   - Weekly = `4.35` occurrences per month
   - Monthly = `1` occurrence per month

2. Recurring items and recurring transactions are not aligned to real dates (for example, no "every Wednesday" logic).

3. Once-off transactions apply to Month 1 only in the projection.

4. Projection is from the current month label and balance starts at 0.

5. Data is in-memory only (no persistence/database/local storage).

6. I was not sure on the idea of "consolidated reporting" so I kept the tables seperate for clarity.
