# Habit RPG Starter

Un starter de jeu "Habit RPG" construit avec React 18, TypeScript, Vite, Tailwind et Zustand.

## Installation

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` : lance le serveur de développement
- `npm run build` : build de production
- `npm run preview` : prévisualisation du build
- `npm run lint` : vérifie le code avec ESLint

## Problèmes courants

Si vous ouvrez `index.html` directement via un fichier local ou un serveur statique, le navigateur ne peut pas interpréter les fichiers `.tsx` et renverra une erreur de type MIME. Pour éviter cela, lancez le serveur de développement Vite :

```bash
npm run dev
```

Ou générez le build puis prévisualisez-le :

```bash
npm run build
npm run preview
```

## Gameplay

- Créez des habitudes et complétez des quêtes quotidiennes pour gagner de l'XP et de l'or.
- XP : 10 par habitude (multiplicateur selon la difficulté), 15 par quête.
- Or : 2 par habitude, 5 par quête.
- Niveaux : `xpNeeded(level) = 100 + (level - 1) * 25` avec bonus de 10 or par niveau.
- Streaks remis à zéro si un jour est manqué. Si aucune action n'est faite sur une journée, -5 HP.

## Structure

- `src/app` : entrée de l'application et router
- `src/components` : composants UI réutilisables
- `src/pages` : pages associées aux routes
- `src/store` : stores Zustand avec persistance localStorage
- `src/utils` : fonctions utilitaires
- `src/types` : types TypeScript
- `src/styles` : styles Tailwind

## Roadmap

- v2 : boss hebdomadaire, guildes/amis
- v3 : historique détaillé, analytics, export CSV
- TODO : auth & sync cloud, IAP réelles, thèmes premium
