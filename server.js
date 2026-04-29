const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

app.get('/.well-known/agent-card.json', (req, res) => res.json({
  protocolVersion: '0.3.0',
  name: 'milkyway-terminal',
  description: "Milky Way Terminal — Hive Civilization fleet operations console.",
  url: 'https://milkyway-terminal.onrender.com',
  version: '3.0.0',
  provider: { organization: 'Hive Civilization', url: 'https://hiveagentiq.com' },
  capabilities: { streaming: false, pushNotifications: false },
  defaultInputModes: ['application/json'],
  defaultOutputModes: ['application/json'],
  authentication: { schemes: ['x402', 'api-key'] },
  payment: {
    protocol: 'x402', currency: 'USDC', network: 'base',
    address: '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e'
  },
  extensions: {
    hive_pricing: {
      currency: 'USDC', network: 'base', model: 'per_call',
      first_call_free: true, loyalty_threshold: 6,
      loyalty_message: 'Every 6th paid call is free'
    }
  },
  bogo: {
    first_call_free: true, loyalty_threshold: 6,
    pitch: "Pay this once, your 6th paid call is on the house. New here? Add header 'x-hive-did' to claim your first call free.",
    claim_with: 'x-hive-did header'
  }
}));

app.get('/.well-known/ap2.json', (req, res) => res.json({
  ap2_version: '1.0',
  agent: 'milkyway-terminal',
  payment_methods: ['x402-usdc-base'],
  treasury: '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e',
  bogo: { first_call_free: true, loyalty_threshold: 6, claim_with: 'x-hive-did header' }
}));



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
    schemaVersion: '1.0',
    name: 'milkyway-terminal',
    description: 'Milkyway Terminal — top-of-funnel A2A discovery and routing',
    version: '1.0.0',
    url: 'https://milkyway-terminal.onrender.com',
    payment: {
      scheme: 'x402', protocol: 'x402', network: 'base',
      currency: 'USDC', asset: 'USDC',
      address:   '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e',
      recipient: '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e',
      treasury:  'Monroe (W1)',
      rails: [
        {chain:'base',     asset:'USDC', address:'0x15184bf50b3d3f52b60434f8942b7d52f2eb436e'},
        {chain:'base',     asset:'USDT', address:'0x15184bf50b3d3f52b60434f8942b7d52f2eb436e'},
        {chain:'ethereum', asset:'USDT', address:'0x15184bf50b3d3f52b60434f8942b7d52f2eb436e'},
        {chain:'solana',   asset:'USDC', address:'B1N61cuL35fhskWz5dw8XqDyP6LWi3ZWmq8CNA9L3FVn'},
        {chain:'solana',   asset:'USDT', address:'B1N61cuL35fhskWz5dw8XqDyP6LWi3ZWmq8CNA9L3FVn'},
      ],
    },
    extensions: {
      hive_pricing: {
        currency: 'USDC', network: 'base', model: 'per_call',
        first_call_free: true, loyalty_threshold: 6,
        loyalty_message: 'Every 6th paid call is free',
        treasury: '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e',
        treasury_codename: 'Monroe (W1)',
      },
    },
    bogo: {
      first_call_free: true, loyalty_threshold: 6,
      pitch: "Pay this once, your 6th paid call is on the house. New here? Add header 'x-hive-did' to claim your first call free.",
      claim_with: 'x-hive-did header',
    },
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

// ─── Benchmark Methodology ───────────────────────────────────────────────────
// Public research page — the citation anchor for all three benchmark nodes
app.get('/benchmark/methodology', (req, res) => {
  res.json({
    title:       'HiveCompute Inference Compression Benchmark — Methodology',
    version:     '1.0.0',
    published:   '2026-04-21',
    authors:     ['Hive Civilization (https://milkyway-terminal.onrender.com)'],
    cite_as:     'HiveCompute Inference Compression Benchmark v1.0.0. Live production data. https://hivecompute-g2g7.onrender.com/v1/compute/benchmark',

    abstract: 'Three independent triangulated benchmark nodes measuring inference cost compression across semantic, temporal, and modality axes. All data derives from live production inference jobs routed through HiveCompute. No synthetic workloads. No simulated data. Every artifact is DID-signed and independently verifiable.',

    nodes: {
      A_semantic: {
        url:          'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/semantic',
        raw_data:     'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/semantic/raw',
        measures:     'Token deduplication rate, semantic cache hit rate, cost-per-novel-thought, domain-level novelty floor',
        method:       'SHA-256 fingerprinting on normalized, lowercased, whitespace-collapsed user turns (system prompt excluded). LRU cache, 500 entries, 1-hour TTL. Cache hit = semantically equivalent request detected. Cache miss = novel semantic content.',
        key_metric:   'Semantic entropy floor — minimum % of genuinely novel requests by domain. Establishes the theoretical maximum compression achievable per domain.',
        insight:      'Most production LLM inference is semantically redundant. Customer support floors at ~15% novelty. Code generation floors at ~60%. Everything above the floor is recoverable margin.',
      },
      B_temporal: {
        url:          'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/temporal',
        raw_data:     'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/temporal/raw',
        measures:     'Inference cost variance by UTC hour, cold-queue savings accumulation, peak vs. off-peak arbitrage spread',
        method:       'All inference jobs timestamped at UTC hour of execution. Cost recorded per job. 24 UTC hour buckets maintained. Cold queue jobs (priority: deferred) tagged separately — fire 02–06 UTC at 30% discount.',
        key_metric:   'max_cost_arb_pct — % cost difference between cheapest and most expensive UTC hour. Timezone arb map.',
        insight:      'LLM API costs follow human time zones. An agent that does not sleep should never pay peak-hour prices. Temporal routing is a structural cost advantage unavailable to human operators.',
      },
      C_modality: {
        url:          'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/modality',
        raw_data:     'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/modality/raw',
        measures:     'Cost spread between naive routing (always GPT-4o) and optimal routing (minimum viable model per task type), cascade map',
        method:       'Task classification via regex heuristic on message content (code_generation, summarization, classification, question_answer, reasoning, creative, vision). Frontier cost baseline: GPT-4o input price ($5.00/1M tokens). Actual cost: routed model price. Cascade map updated per job.',
        key_metric:   'total_savings_pct — % cost reduction from optimal vs. naive routing. cascade_map — minimum viable model per task type.',
        insight:      'Naive routing (always frontier) overpays 60–90% on classification, summarization, and structured extraction. The cascade map is the BOM for inference cost optimization.',
      },
    },

    sub_studies: [
      {
        id:          'semantic_entropy_floor',
        status:      'live',
        description: 'Minimum % of novel requests by domain — the floor below which no further compression is possible. Varies from ~15% (customer support) to ~60% (code generation).',
        data:        'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/semantic',
      },
      {
        id:          'timezone_arb_map',
        status:      'live',
        description: '24-hour UTC cost curve — optimal inference windows by UTC hour. Basis for cold queue routing strategy.',
        data:        'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/temporal',
      },
      {
        id:          'model_cascade_map',
        status:      'live',
        description: 'Minimum viable model per task type — derived from live production routing decisions, not benchmarks. The inference BOM.',
        data:        'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark/modality',
      },
      {
        id:          'cascade_multiplier',
        status:      'live',
        description: 'Multi-agent compression compounding. In a pipeline of N agents, a cache hit at node 1 eliminates downstream compute for all N agents. Measured on the 100-agent Hive swarm.',
        data:        'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark',
      },
      {
        id:          'insurance_actuarial_table',
        status:      'coming',
        description: 'Token overrun distribution by task type. Actuarial pricing for inference risk. Basis for Token Insurance tier pricing.',
      },
      {
        id:          'safety_tax_curve',
        status:      'coming',
        description: 'Optimal safety spend as % of inference spend. Cost-efficiency frontier for agent safety infrastructure. Derived from HiveGate safety scanner data.',
      },
    ],

    data_integrity: {
      source:       'Live production inference jobs on HiveCompute',
      synthetic:    false,
      signing:      'Each artifact SHA-256 signed with benchmark DID (did:key:hivecompute-benchmark-v1)',
      verification: 'Recompute _sig field: SHA256(DID + JSON.stringify(payload, sorted_keys))',
      persistence:  'In-memory rolling window. Resets on cold start. Each cold start documented as a checkpoint in metadata. Long-term persistence roadmap: append-only log to Aleo chain via CLOAzK.',
    },

    future_work: [
      'Embedding-based semantic fingerprinting (Phase 2 cache) — true cosine similarity matching beyond SHA-256',
      'Cross-provider temporal arb — compare cost curves across OpenAI, Anthropic, Groq simultaneously',
      'ZK-verified compression proofs via CLOAzK — agent proves compression ratio without revealing prompt content',
      'Actuarial table for token insurance pricing — statistical distribution of overrun events by task type',
      'arXiv technical note on cascade multiplier — multi-agent compression compounding in production systems',
    ],

    network:        'Hive Civilization — https://milkyway-terminal.onrender.com',
    inference:      'https://hivecompute-g2g7.onrender.com',
    benchmark_home: 'https://hivecompute-g2g7.onrender.com/v1/compute/benchmark',
  });
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

  // ─── Self-warm: ping own health every 10 minutes ───────────────────────────
  // Render free tier spins down after 15 min inactivity.
  // Milky Way is the network entry point — it must NEVER be cold when an agent arrives.
  // Self-pinging keeps the process alive without external infrastructure.
  const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  const WARM_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

  setInterval(async () => {
    try {
      const res = await fetch(`${SELF_URL}/health`);
      console.log(`[self-warm] ${new Date().toISOString()} — /health ${res.status}`);
    } catch (err) {
      console.warn(`[self-warm] ping failed: ${err.message}`);
    }
  }, WARM_INTERVAL_MS);

  // Also warm the two highest-traffic endpoints so they're hot in the Node.js
  // event loop when the first agent crawl hits them
  setTimeout(async () => {
    try {
      await fetch(`${SELF_URL}/.well-known/agent.json`);
      await fetch(`${SELF_URL}/benchmark/methodology`);
      console.log('[self-warm] agent.json + methodology pre-warmed');
    } catch (_) {}
  }, 2000);
});
