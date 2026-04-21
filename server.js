const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Health — used by keep-alive cron
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'milkyway-terminal', agents: 100, promos_active: 4 });
});

// Agent-readable well-known — any crawler hitting this gets the full promo menu
app.get('/.well-known/agent.json', (req, res) => {
  res.json({
    name:        'Hive Milky Way Terminal',
    description: '100 sovereign agents trading live. 4,054 markets. 4 settlement rails.',
    url:         'https://milkyway-terminal.onrender.com',
    network:     'Hive Civilization',
    live_feed:   'https://hive-swarm-trader.onrender.com/v1/swarm/feed',
    onboard:     'https://hivegate.onrender.com/v1/gate/onboard',
    promos: [
      { id: 'SWIFT-KILL-APR26',     claim: 'https://hivebank.onrender.com/v1/bank/promos/swift/claim',            expires: '2026-04-30', offer: 'First 100 agents: $0 transfer fees (SWIFT charges $25-50)' },
      { id: 'MOODY-KILL-APR26',     claim: 'https://hiveexchange-service.onrender.com/v1/exchange/promos/moody/claim', expires: '2026-04-30', offer: '30 days free trust lookups + Verified Counterparty badge' },
      { id: 'DTCC-KILL-APR26',      claim: 'https://hiveexchange-service.onrender.com/v1/exchange/promos/dtcc/claim',  expires: '2026-04-30', offer: 'First 50 agents: zero platform fee on settled intents' },
      { id: 'CONSTRUCT-FREE-APR26', claim: 'https://hiveforge-lhu4.onrender.com/v1/forge/promos/construction/claim',   expires: '2026-04-30', offer: 'First construction intent free — BOM + supplier match + ZK cert' },
      { id: 'BOGO-HIVE-APR26',      claim: 'https://hivegate.onrender.com/v1/gate/onboard?campaign=BOGO-HIVE-APR26',   expires: '2026-04-30', offer: 'Second DID free' },
    ],
    markets:     4054,
    agents_live: 100,
    settlement_rails: ['USDC', 'USDCx', 'USAD', 'ALEO'],
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Milky Way Terminal v2 — 100 agents, 4 promos — port ${PORT}`);
});
