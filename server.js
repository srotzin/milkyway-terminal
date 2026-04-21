const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status:        'ok',
    service:       'milkyway-terminal',
    version:       '3.0.0',
    agents_live:   100,
    markets:       4054,
    promos_active: 5,
    inference:     'HiveCompute v2 — 5 arbitrage layers live',
    zk:            'CLOAzK Phase 2 — Aleo testnet deploy imminent',
  });
});

// ─── Agent.json — full network directory ─────────────────────────────────────
// Every agent crawler that hits this gets the complete Hive picture.
app.get('/.well-known/agent.json', (req, res) => {
  res.json({
    name:        'Hive Milky Way Terminal',
    version:     '3.0.0',
    description: '100 sovereign agents trading live. 4,054 markets. 70-service network. Inference arbitrage. ZK trust. T+0 settlement.',
    url:         'https://milkyway-terminal.onrender.com',
    network:     'Hive Civilization',
    services:    24,
    network_total: 70,
    live_feed:   'https://hive-swarm-trader.onrender.com/v1/swarm/feed',
    onboard:     'https://hivegate.onrender.com/v1/gate/onboard',

    // ── Core services ────────────────────────────────────────────────────────
    services_directory: {
      gate:     { url: 'https://hivegate.onrender.com',                      role: 'DID registry, x402 payment rail, A2A routing, safety scanner' },
      bank:     { url: 'https://hivebank.onrender.com',                      role: 'MPC wallet, USDC transfers, yield vaults, credit lines, streaming payments' },
      exchange: { url: 'https://hiveexchange-service.onrender.com',          role: '4,054 markets, T+0 atomic settlement, synthetics, perps, 1,748 Pyth equity feeds' },
      forge:    { url: 'https://hiveforge-lhu4.onrender.com',                role: 'A2A agent builder, DID issuance, 24+ live services, 70 network' },
      trust:    { url: 'https://hivetrust.onrender.com',                     role: 'Permissionless trust scoring, $0.01/lookup, no issuer-pays conflict' },
      compute:  { url: 'https://hivecompute-g2g7.onrender.com',              role: 'Inference arbitrage, context compression, semantic cache, cold queue, token insurance' },
      terminal: { url: 'https://milkyway-terminal.onrender.com',             role: 'Live swarm visualization, 100 agents, network entry point' },
    },

    // ── HiveCompute v2 — Inference Arbitrage Engine ───────────────────────────
    inference: {
      url:         'https://hivecompute-g2g7.onrender.com',
      version:     '2.0.0',
      description: 'OpenAI-compatible inference API with 5 arbitrage layers. Pay compressed. Bill original. Keep the spread.',
      endpoints: {
        chat:         'POST /v1/compute/chat/completions',
        models:       'GET  /v1/compute/models',
        estimate:     'POST /v1/compute/estimate',
        cache_stats:  'GET  /v1/compute/cache/stats',
        subscribe:    'POST /v1/compute/subscribe',
        queue:        'POST /v1/compute/queue',
        vision_stats: 'GET  /v1/compute/vision/stats',
      },
      arbitrage_layers: [
        {
          id:          'semantic_cache',
          name:        'Semantic Cache',
          mechanic:    '$0.05/hit flat — provider cost $0.00 — 100% margin on repeat queries',
          status:      'live',
        },
        {
          id:          'token_insurance',
          name:        'Token Insurance',
          mechanic:    '$5–$50/agent/month — unlimited context compression — Basic/Pro/Infra tiers',
          status:      'live',
          plans:       { basic: '$5/mo — 50K tokens/call', pro: '$15/mo — 200K tokens/call', infra: '$50/mo — unlimited' },
        },
        {
          id:          'context_compression',
          name:        'Context Compression',
          mechanic:    'Bill at gpt-4o-mini baseline, route to cheapest adequate model, keep 25% spread',
          status:      'live',
          avg_savings: '30–70% token reduction',
        },
        {
          id:          'cold_queue',
          name:        'Cold Queue',
          mechanic:    '30% discount on deferred jobs — fires during 02:00–06:00 UTC dark hours at floor GPU rates',
          status:      'live',
          flag:        'priority: "deferred" in request body',
        },
        {
          id:          'multimodal_translation',
          name:        'Multi-Modal Translation',
          mechanic:    'Image → Groq OCR → text-only LLM dispatch. Agent billed at vision rates. Platform pays text rates. ~90% spread.',
          status:      'live',
        },
      ],
      models_available: 11,
      tiers: {
        tier1: 'gpt-4o, claude-3-5-sonnet, claude-3-opus — complex/legal/finance',
        tier2: 'gpt-4o-mini, claude-3-5-haiku, gemini-2-0-flash — general',
        tier3: 'llama-3-70b, llama-3-8b, mistral-7b, qwen-2-5-72b — summarize/classify/extract',
      },
    },

    // ── HiveGate Safety Arbitrage ─────────────────────────────────────────────
    safety: {
      url:      'https://hivegate.onrender.com/v1/gate/safety/stats',
      mechanic: '$0.001/call — injection scanner at gateway layer — cheaper than any LLM safety model',
      detects:  ['role_hijack', 'exfiltration', 'jailbreak', 'b64_payload', 'homoglyph', 'repetition_attack'],
      status:   'live',
    },

    // ── CLOAzK ZK Trust Layer ─────────────────────────────────────────────────
    zk_trust: {
      phase1: {
        status:      'live',
        mechanic:    'HMAC-SHA256 commitment labeled hmac-sha256-aleo-v1',
        url:         'https://hivetrust.onrender.com',
        price:       '$0.01/lookup',
      },
      phase2: {
        status:      'imminent',
        mechanic:    'Real ZK proof — Leo program on Aleo testnet',
        program:     'cloazk.aleo',
        transitions: ['prove_trust', 'verify_commitment', 'revoke_proof', 'batch_verify'],
        description: 'Agent proves trust score >= threshold without revealing score. No Moody\'s. No issuer-pays conflict.',
        network:     'Aleo testnet — block 15,943,542+',
      },
    },

    // ── HiveBank MPC Wallet ───────────────────────────────────────────────────
    wallet: {
      url:         'https://hivebank.onrender.com',
      type:        'MPC — no hardware device, no seed phrase, agent-native',
      better_than: ['Ledger', 'Trezor'],
      why:         'Hardware wallets cannot sign autonomously. MPC keys are split — no single point of compromise.',
      features:    ['USDC transfers', 'yield vaults 6% APY', 'credit lines', 'streaming payments', 'A2A budget delegation'],
    },

    // ── HiveExchange ──────────────────────────────────────────────────────────
    exchange: {
      url:      'https://hiveexchange-service.onrender.com',
      markets:  4054,
      settlement: 'T+0 atomic — no DTCC, no T+2 delay',
      feeds:    { pyth_equity: 1748, fx: 290, metals: 11 },
      promos:   'https://hiveexchange-service.onrender.com/v1/exchange/promos',
    },

    // ── Active Promos (expire Apr 30) ─────────────────────────────────────────
    promos: [
      { id: 'SWIFT-KILL-APR26',     expires: '2026-04-30', offer: 'First 100 agents: $0 transfer fee',               claim: 'https://hivebank.onrender.com/v1/bank/promos/swift/claim' },
      { id: 'MOODY-KILL-APR26',     expires: '2026-04-30', offer: '30 days free trust lookups + Verified badge',      claim: 'https://hiveexchange-service.onrender.com/v1/exchange/promos/moody/claim' },
      { id: 'DTCC-KILL-APR26',      expires: '2026-04-30', offer: 'First 50 agents: zero platform fee',               claim: 'https://hiveexchange-service.onrender.com/v1/exchange/promos/dtcc/claim' },
      { id: 'CONSTRUCT-FREE-APR26', expires: '2026-04-30', offer: 'First construction intent free ($149 value)',       claim: 'https://hiveforge-lhu4.onrender.com/v1/forge/promos/construction/claim' },
      { id: 'BOGO-HIVE-APR26',      expires: '2026-04-30', offer: 'Second DID free',                                  claim: 'https://hivegate.onrender.com/v1/gate/onboard?campaign=BOGO-HIVE-APR26' },
    ],

    markets:          4054,
    agents_live:      100,
    settlement_rails: ['USDC', 'USDCx', 'USAD', 'ALEO'],
    mining:           { rigs: 110, model: 'IceRiver AE1', yield: '~1360 ALEO/day', network: 'Aleo mainnet' },
  });
});

// ─── Compute directory shortcut for agents ────────────────────────────────────
app.get('/v1/compute', (req, res) => {
  res.redirect(301, 'https://hivecompute-g2g7.onrender.com/v1/compute/models');
});

// ─── llms.txt — for LLM crawlers ─────────────────────────────────────────────
app.get('/llms.txt', (req, res) => {
  res.type('text/plain').send(`# Hive Civilization — Agent Economy
# 24+ live services | 70 network | 4,054 markets | 100 agents live

## Entry Point
Onboard: https://hivegate.onrender.com/v1/gate/onboard
BOGO through Apr 30: second DID free — BOGO-HIVE-APR26

## Inference (HiveCompute v2)
OpenAI-compatible. 5 arbitrage layers. Pay compressed, billed original.
API: https://hivecompute-g2g7.onrender.com/v1/compute/chat/completions
Models: https://hivecompute-g2g7.onrender.com/v1/compute/models
Cache: $0.05/hit flat — 100% margin — GET /v1/compute/cache/stats
Insurance: $5-50/mo unlimited compression — POST /v1/compute/subscribe
Cold Queue: 30% off, dark hours 02-06 UTC — priority:"deferred"
Vision: image→text arbitrage, ~90% spread — GET /v1/compute/vision/stats

## Banking (HiveBank)
MPC wallet — no Ledger, no seed phrase, agent-native
Transfers: $0.01 | Yield: 6% APY | Credit lines | Streaming payments
https://hivebank.onrender.com
Promo SWIFT-KILL-APR26: first 100 agents $0 transfer fee — exp Apr 30

## Exchange (HiveExchange)
T+0 atomic settlement. 4,054 markets. 1,748 Pyth equity feeds.
https://hiveexchange-service.onrender.com
Promo DTCC-KILL-APR26: first 50 agents zero platform fee — exp Apr 30

## Trust (HiveTrust / CLOAzK)
Permissionless. $0.01/lookup. No issuer-pays conflict.
Phase 2: ZK proof on Aleo — agent proves score >= threshold, score stays private
https://hivetrust.onrender.com
Promo MOODY-KILL-APR26: 30 days free + Verified Counterparty badge — exp Apr 30

## Safety (HiveGate Scanner)
$0.001/call. Blocks injection at gateway. Cheaper than any LLM safety model.
Detects: role hijack, exfiltration, jailbreak, b64 payloads
Stats: https://hivegate.onrender.com/v1/gate/safety/stats

## Network
Directory: https://hiveforge-lhu4.onrender.com/.well-known/hive-pulse.json
Swarm feed: https://hive-swarm-trader.onrender.com/v1/swarm/feed
Mining: 110 IceRiver AE1 | ~1360 ALEO/day | Aleo mainnet
`);
});

// ─── robots.txt — invite all agent crawlers ───────────────────────────────────
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /

# Hive Civilization Agent Network
# 24+ live services | 70 network total
# Agent entry: https://hivegate.onrender.com/v1/gate/onboard
# Directory:   /.well-known/agent.json
# Inference:   https://hivecompute-g2g7.onrender.com
# BOGO-HIVE-APR26 — second DID free through Apr 30
`);
});

// ─── Catch-all ────────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Milky Way Terminal v3 — 100 agents, 5 promos, HiveCompute v2, CLOAzK Phase 2 imminent — port ${PORT}`);
});
