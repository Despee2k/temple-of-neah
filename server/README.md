# TempleOfNeah

1. `TempleOfNeah.Sync` - Pulls Blockchain. Maybe we can use this for the api as well. If not then we can proceed to `2.`
2. `TempleOfNeah.Api` - Api layer to communicate with React App and `TempleOfNeah.Sync`

## Must Knows

1. `Context` - communicates with the database directly. In charge of database transactions.
2. `Models` - these are our tables in the database. We can customize it however we like as long as it follows: `IReducerModel`.
3. `Reducers` - in charge of the logic with rollforwards and rollbacks before storing or updating the database.