# Portfolio Photovoltaïque — Baila Guisse

Site React + Vite, dark mode tech, néons vert/bleu, pensé comme un « portail de supervision PV ».

## 1. Ouvrir le projet dans VS Code

1. Décompresse le dossier `eco-portfolio-enr`.
2. Ouvre VS Code → `Fichier > Ouvrir un dossier...` → sélectionne `eco-portfolio-enr`.
3. Ouvre un terminal dans VS Code (`Terminal > Nouveau terminal`).

## 2. Installer et lancer le site

Dans le terminal, tape ces deux commandes (une par une) :

```bash
npm install
npm run dev
```

Le terminal affiche une adresse du type `http://localhost:5173`. Ouvre-la dans ton navigateur : le site est en ligne, en local, sur ton ordinateur. À chaque fois que tu modifies un fichier et que tu sauvegardes, la page se met à jour toute seule.

## 3. Modifier tes informations (le plus important)

**Tout le contenu texte se trouve dans un seul fichier :**
`src/data/profile.ts`

Tu peux y changer :
- ton numéro, ton email, ta tagline (`identity`)
- les chiffres clés affichés dans le hero (`kpis`)
- ta formation, tes outils, tes compétences, tes langues
- tes expériences (`experiences`) — ajoute ou retire des blocs librement, le design s'adapte automatiquement
- **tes réalisations** (`galleryItems`) — c'est ta galerie de projets

Pas besoin de toucher au design pour changer le texte.

## 4. Remplacer les miniatures de la galerie par de vraies photos

Actuellement, chaque carte de la galerie affiche une miniature générée en CSS (grille animée). C'est volontaire tant que tu n'as pas encore trié tes photos de chantier — mais l'objectif est de les remplacer.

1. Crée un dossier `src/assets/gallery/` et dépose tes photos dedans (ex : `belmont-1.jpg`).
2. Dans `src/data/profile.ts`, ajoute un champ `image` à l'objet concerné dans `galleryItems`, par exemple :
   ```ts
   { title: '...', meta: '...', category: 'Installation', description: '...', image: '/src/assets/gallery/belmont-1.jpg' }
   ```
   (il faudra aussi ajouter `image?: string` dans le type `GalleryItem`)
3. Dans `src/components/Gallery.tsx`, remplace le composant `<Thumbnail ... />` par une balise `<img src={item.image} className="thumb-photo" alt={item.title} />` quand `item.image` existe.

Si tu bloques sur cette étape, montre-moi tes fichiers et je te donne le code exact à coller.

## 5. Mettre le site en ligne (pour l'envoyer à un recruteur)

Le plus simple pour un projet React + Vite :

1. Crée un compte gratuit sur [vercel.com](https://vercel.com) (connexion possible avec GitHub).
2. Mets ton projet sur GitHub (VS Code a un bouton « Publish to GitHub » dans l'onglet Source Control).
3. Sur Vercel, clique « Add New Project », choisis ton repo GitHub, laisse les réglages par défaut (Vite est détecté automatiquement) et clique « Deploy ».
4. Vercel te donne une URL du type `ton-portfolio.vercel.app` à mettre sur ton CV et LinkedIn.

## 6. Structure du projet

```
src/
  data/profile.ts       ← tout ton contenu texte (à éditer en priorité)
  components/           ← une section = un fichier
    Nav.tsx              navigation fixe avec indicateur de section active
    Hero.tsx             en-tête avec grille animée + compteurs KPI
    About.tsx            profil + formation + langues
    Skills.tsx           outils, compétences clés, certifications
    Experience.tsx       expériences pro et projets académiques
    Gallery.tsx          galerie filtrable (Installation / Étude / SAV)
    Contact.tsx          bloc de contact final
    Footer.tsx
  index.css              variables de couleur / typographie (le thème)
  components.css         styles détaillés de chaque section
```

Pour changer les couleurs néon, modifie simplement les variables tout en haut de `src/index.css` (`--green`, `--blue`, etc.) — tout le site suit automatiquement.

## 7. Commandes utiles

| Commande | Effet |
|---|---|
| `npm run dev` | Lance le site en local avec rechargement automatique |
| `npm run build` | Génère la version optimisée dans `dist/` (pour la mise en ligne) |
| `npm run preview` | Prévisualise la version buildée |
