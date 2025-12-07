# TempleOfNeah

1. `TempleOfNeah.Sync` - Pulls Blockchain. Maybe we can use this for the api as well. If not then we can proceed to `2.`
2. `TempleOfNeah.Api` - Api layer to communicate with React App and `TempleOfNeah.Sync`

## Must Knows

1. `Context` - communicates with the database directly. In charge of database transactions.
2. `Models` - these are our tables in the database. We can customize it however we like as long as it follows: `IReducerModel`.
3. `Reducers` - in charge of the logic with rollforwards and rollbacks before storing or updating the database.

## Cardano Node Setup 
1. Install Prerequisited - (`cardano-node`, `cardano-cli`, `mithril-client`)
2. Install json files (can also be found in the downloaded `cardano-node/share/preview`)
4. Transfer these json files, if not already, into a dedicated `Cardano` folder.
3. Install db - `mithril-client cardano-db download latest --download-dir ./db`
4. Setup cardano-node - `cardano-node run --config ./config.json --database-path ./db/db --topology topology.json --socket-path /tmp/preview-node.socket --port 31000`
5. Check cardano socket - `cardano-cli query tip --testnet-magic 2 --socket-path /tmp/preview-node.socket`