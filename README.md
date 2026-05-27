# MeliPago Frontend — Hackathon IT Boarding

Monorepo con npm workspaces que contiene la librería de componentes compartida y las tres apps del sistema de pagos MeliPago.

## Estructura

```
packages/
├── shared-ui/        ← librería de componentes compartida
├── wallet-app/       ← app de billetera (usuario final)    → puerto 5173
├── payment-app/      ← app de pagos (usuario final)        → puerto 5174
└── ops-dashboard/    ← dashboard interno de operaciones    → puerto 5175
```

## Requisitos

- Node.js 18+
- npm 8+

## Instalación

```bash
npm install
```

## Levantar las apps

```bash
# Billetera
npm run dev:wallet

# Pagos
npm run dev:payment

# Dashboard de operaciones
npm run dev:ops
```

## Datos de prueba (mock)

| Cuenta   | Estado    | Nivel    |
|----------|-----------|----------|
| acc-001  | ACTIVE    | BASIC    |
| acc-002  | ACTIVE    | PREMIUM  |
| acc-003  | SUSPENDED | BASIC    |
| acc-004  | ACTIVE    | VERIFIED |

| Transacción | Monto   | Estado     |
|-------------|---------|------------|
| txn-001     | $300    | INITIATED  |
| txn-002     | $150    | PROCESSING |
| txn-003     | $1.000  | COMPLETED  |
| txn-004     | $600    | FAILED     |
| txn-005     | $250    | REVERSED   |

**No hay backend real.** Cada app usa datos mockeados con delays simulados.
