# Temple of Neah - Learn Cardano

**Temple of Neah** (also known as **Learn Cardano**) is an interactive, beginner-friendly web application that helps users understand how the Cardano blockchain works by transforming real blockchain data into visual explanations. Instead of showing raw blocks, transactions, or cryptic data structures, we simplify and explain them using clean UI, diagrams, and guided walkthroughs.

## 🎯 Features

- **Block Explorer**: Browse and explore Cardano blocks with detailed information
- **Interactive Learning Modules**:
  - **Blocks**: Understand block structure, slots, and epochs
  - **Transactions**: Learn how transactions work on Cardano
  - **Wallets**: Explore wallet addresses and their relationships
  - **UTXOs**: Visualize Unspent Transaction Outputs
  - **Staking**: Understand Cardano's staking and delegation system
  - **Epochs**: Learn about Cardano's epoch system
- **AI Chat Widget**: Get instant answers to Cardano-related questions powered by Google Gemini
- **Real-time Data**: Built with real Cardano blockchain data via [Argus](https://docs.saib.dev/docs/argus/getting-started/overview) indexer
- **Visualizations**: Interactive diagrams and visual representations of blockchain concepts

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Radix UI** components
- **Lucide React** for icons

### Backend
- **.NET 9.0** (C#)
- **Argus.Sync** for Cardano blockchain indexing
- **Entity Framework Core** with PostgreSQL
- **ASP.NET Core** Web API
- **Swagger/OpenAPI** for API documentation

### Database
- **PostgreSQL** with Argus indexer schema

### AI Integration
- **Google Gemini API** for the AI chat widget

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) and npm
- **.NET 9.0 SDK**
- **PostgreSQL** (v12 or higher)
- **Cardano Node** (for blockchain synchronization)
  - `cardano-node`
  - `cardano-cli`
  - `mithril-client`

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Despee2k/temple-of-neah.git
cd temple-of-neah
```

### 2. Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb argus
   ```

2. The database will be populated by the Argus indexer when the server runs.

### 3. Cardano Node Setup

The server requires a running Cardano node to sync blockchain data. Follow these steps:

1. **Install Prerequisites**:
   - Install `cardano-node`, `cardano-cli`, and `mithril-client`

2. **Download Configuration Files**:
   - Download Cardano configuration files (can be found in `cardano-node/share/preview`)
   - Place them in a dedicated `Cardano` folder

3. **Download Database**:
   ```bash
   mithril-client cardano-db download latest --download-dir ./db
   ```

4. **Start Cardano Node**:
   ```bash
   cardano-node run \
     --config ./config.json \
     --database-path ./db/db \
     --topology topology.json \
     --socket-path /tmp/preview-node.socket \
     --port 31000
   ```

5. **Verify Cardano Node**:
   ```bash
   cardano-cli query tip --testnet-magic 2 --socket-path /tmp/preview-node.socket
   ```

### 4. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server/src/TempleOfNeah.Sync
   ```

2. **Configure Database Connection**:
   
   Update `appsettings.json` or `appsettings.Development.json` with your PostgreSQL connection details:
   ```json
   {
     "ConnectionStrings": {
       "CardanoContext": "Host=localhost;Database=argus;Username=postgres;Password=your_password;Port=5432",
       "CardanoContextSchema": "cardanoindexer"
     }
   }
   ```

3. **Configure Cardano Node Connection**:
   
   Update the `CardanoNodeConnection` section in `appsettings.json`:
   ```json
   {
     "CardanoNodeConnection": {
       "ConnectionType": "UnixSocket",
       "UnixSocket": {
         "Path": "/tmp/preview-node.socket"
       },
       "NetworkMagic": 2,
       "Slot": 99241337,
       "Hash": "2d7da233c88a18ce59aa798bc979ada09532fd381e8681722e058d7e1f9442aa",
       "Height": 3862290
     }
   }
   ```
   
   Adjust these values based on your Cardano node setup.

4. **Restore Dependencies**:
   ```bash
   dotnet restore
   ```

5. **Run Database Migrations**:
   ```bash
   dotnet ef database update
   ```

6. **Run the Server**:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5292`

7. **Access Swagger Documentation**:
   - Navigate to `http://localhost:5292/swagger` in your browser

### 5. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5292
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   **Note**: 
   - `VITE_API_URL` is the backend API URL (defaults to `http://localhost:5292` if not set)
   - `VITE_GEMINI_API_KEY` is required for the AI chat widget. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or the port Vite assigns)

5. **Build for Production**:
   ```bash
   npm run build
   ```

   The production build will be in the `dist` directory.

## 📖 Usage

### Running the Application

1. **Start the Cardano Node** (if not already running):
   ```bash
   cardano-node run --config ./config.json --database-path ./db/db --topology topology.json --socket-path /tmp/preview-node.socket --port 31000
   ```

2. **Start the Backend Server**:
   ```bash
   cd server/src/TempleOfNeah.Sync
   dotnet run
   ```

3. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```

4. **Open in Browser**:
   - Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Application Features

#### Navigation
- **Landing Page**: Introduction and overview
- **Get Started**: Getting started guide
- **Explorer**: Block explorer interface
- **Modules**: Access to all learning modules
- **About**: Information about the project and developers

#### Learning Modules

1. **Blocks Module** (`/modules/blocks`):
   - View block summaries with pagination
   - Filter by slot, epoch, or date range
   - See block statistics and metrics

2. **Transactions Module** (`/modules/transactions`):
   - Explore transaction flows
   - Understand transaction structure

3. **Wallets Module** (`/modules/wallets`):
   - View wallet addresses
   - Understand address relationships

4. **UTXOs Module** (`/modules/utxos`):
   - Visualize Unspent Transaction Outputs
   - Understand UTXO model

5. **Staking Module** (`/modules/staking`):
   - Learn about staking pools
   - Understand delegation

6. **Epochs Module** (`/modules/epochs`):
   - Explore epochs and slots
   - Understand Cardano's time system

#### AI Chat Widget

The AI chat widget is available on all pages as a floating button. It provides:
- Answers to Cardano-related questions
- Educational explanations
- Context-aware responses
- Word-limited responses for clarity (120 words default, 200 words when requested)

**Note**: The AI chat requires a valid Gemini API key configured in the frontend `.env` file.

### API Endpoints

The backend provides the following main endpoints:

- `GET /api/BlockSummary` - Get all block summaries (with pagination and filters)
- `GET /api/BlockSummary/{blockHash}` - Get a specific block by hash
- `GET /api/BlockSummary/slot/{slot}` - Get a block by slot number
- `GET /api/BlockSummary/epoch/{epoch}` - Get blocks by epoch
- `GET /api/BlockSummary/latest` - Get latest blocks
- `GET /api/BlockSummary/statistics` - Get block statistics
- `GET /api/BlockSummary/aggregate/last-days` - Get aggregated metrics

See the Swagger documentation at `http://localhost:5292/swagger` for detailed API documentation.

## 🏗️ Project Structure

```
temple-of-neah/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   ├── components/    # React components
│   │   │   └── ui/        # UI component library
│   │   ├── config/        # Configuration files
│   │   ├── pages/         # Page components
│   │   │   ├── modules/   # Learning module pages
│   │   │   └── about/     # About page
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # .NET backend application
│   └── src/
│       └── TempleOfNeah.Sync/
│           ├── Controllers/    # API controllers
│           ├── Data/
│           │   ├── Context/    # Database context
│           │   ├── Models/     # Data models
│           │   └── Reducers/   # Data reducers
│           ├── Migrations/     # Database migrations
│           └── Program.cs      # Application entry point
│
└── README.md
```

## 🔧 Development

### Frontend Development

- **Linting**: `npm run check:lint`
- **Formatting**: `npm run check:format`
- **Fix Linting**: `npm run fix:lint`
- **Fix Formatting**: `npm run fix:format`
- **Build**: `npm run build`
- **Preview Production Build**: `npm run preview`

### Backend Development

- **Run Migrations**: `dotnet ef migrations add MigrationName`
- **Update Database**: `dotnet ef database update`
- **Build**: `dotnet build`
- **Run**: `dotnet run`

### Architecture Notes

- **Context**: Communicates with the database directly, handles database transactions
- **Models**: Database tables that follow the `IReducerModel` interface
- **Reducers**: Handle logic with rollforwards and rollbacks before storing or updating the database

## 🔐 Environment Variables

### Backend
Configure in `appsettings.json` or `appsettings.Development.json`:
- Database connection string
- Cardano node connection settings

### Frontend
Create a `.env` file in the `client` directory:
- `VITE_API_URL`: Backend API URL (default: `http://localhost:5292`)
- `VITE_GEMINI_API_KEY`: Google Gemini API key for AI chat

## 📝 License

See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with real Cardano data via [Argus](https://docs.saib.dev/docs/argus/getting-started/overview) indexer
- Powered by [Google Gemini](https://aistudio.google.com/) for AI chat functionality

## 📧 Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/Despee2k/temple-of-neah).

---

**Built with ❤️ by the Temple of Neah team**
