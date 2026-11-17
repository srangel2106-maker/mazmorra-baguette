# 🥖 Mazmorra Baguette

Herramienta para Dungeon Masters de D&D 5e hecha con React + Vite, la API [dnd5eapi.co](https://www.dnd5eapi.co/api/) y CapacitorJS para Android. Tema inspirado en Kasane Teto.

- **Demo (Vercel):** https://TU-APP.vercel.app
- **APK:** en [Releases](../../releases)

## Módulos
1. **Bestiario:** búsqueda y filtro por CR con `/api/monsters` y tarjetas reutilizables.
2. **Botín:** monedas y objetos según el CR con `/api/equipment` y `/api/magic-items`.
3. **Dados:** d4, d6, d8, d10, d12, d20 y d100.

## Ejecutar
```bash
npm install
npm run dev
```

## Android
```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```
