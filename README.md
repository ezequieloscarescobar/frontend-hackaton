# MeliPago Frontend — Hackathon IT Boarding

> **Este repositorio es utilizado exclusivamente como material de práctica durante el proceso de onboarding de nuevos ingenieros.**

## Contexto de negocio

MeliPago es el sistema de pagos digitales de Mercado Libre. Permite a los usuarios gestionar su billetera virtual, realizar pagos y a los equipos internos monitorear el estado operativo de las transacciones en tiempo real.

El sistema se compone de tres superficies:

- **Wallet App** — interfaz del usuario final para consultar saldo, movimientos y configurar su cuenta de billetera.
- **Payment App** — interfaz del usuario final para iniciar y confirmar pagos entre cuentas o hacia comercios.
- **Ops Dashboard** — herramienta interna del equipo de operaciones para monitorear transacciones, detectar anomalías y gestionar el estado de las cuentas.

En este repositorio se trabaja sobre las tres apps de forma simultánea a través de un monorepo, compartiendo componentes comunes mediante la librería `shared-ui`.

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
