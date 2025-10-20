# Guide de Configuration - Lodenn Studio Website

## Démarrage Rapide

### 1. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 2. Build de production

```bash
npm run build
npm start
```

---

## Configurations Importantes à Faire

### 🔧 1. Formulaire de Contact (PRIORITAIRE)

Le formulaire de contact nécessite un service externe pour fonctionner.

**Option recommandée: Formspree (Gratuit)**

1. Inscrivez-vous sur [https://formspree.io/](https://formspree.io/)
2. Créez un nouveau formulaire
3. Copiez votre Form ID
4. Ouvrez `components/ContactForm.tsx`
5. Ligne 26, remplacez `YOUR_FORM_ID` par votre ID réel :

```typescript
const response = await fetch('https://formspree.io/f/VOTRE_ID_ICI', {
```

### 🎬 2. Vidéo Trailer d'Aetheris

Actuellement, une vidéo YouTube placeholder est utilisée.

1. Uploadez votre trailer sur YouTube
2. Copiez l'ID de la vidéo (ex: `dQw4w9WgXcQ` dans `youtube.com/watch?v=dQw4w9WgXcQ`)
3. Ouvrez `app/games/aetheris/page.tsx`
4. Ligne 64, remplacez l'ID :

```html
<iframe
  src="https://www.youtube.com/embed/VOTRE_ID_ICI"
```

### 📱 3. Liens Réseaux Sociaux

Mettez à jour vos vrais liens sociaux dans **2 fichiers** :

#### Fichier 1: `components/Footer.tsx` (lignes 15-46)
```typescript
const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/VOTRE_COMPTE',  // ← Modifier ici
```

#### Fichier 2: `app/contact/page.tsx` (lignes 16-63)
Même structure, modifiez les URLs.

### 👥 4. Informations de l'Équipe

#### Pour vous-même (actuellement "Founder")

Ouvrez `app/about/page.tsx`, ligne 22-27 :

```typescript
{
  name: 'Votre Nom',  // ← Remplacez "Founder"
  role: 'Game Designer & Developer',
  bio: 'Votre description...',
  avatar: '/images/team/votre-photo.jpg',  // ← Décommentez si vous avez une photo
},
```

#### Pour ajouter un membre d'équipe

Ajoutez un nouvel objet dans le tableau :

```typescript
{
  name: 'Nom du membre',
  role: 'Son rôle',
  bio: 'Sa description',
  avatar: '/images/team/photo.jpg',  // Optionnel
},
```

### 🖼️ 5. Ajouter une Photo de Profil

1. Ajoutez votre photo dans `public/images/team/`
2. Nommez-la (ex: `founder.jpg`)
3. Dans `app/about/page.tsx`, décommentez la ligne avatar :

```typescript
avatar: '/images/team/founder.jpg',
```

---

## Ajouter du Contenu

### Ajouter des Images d'Aetheris

1. Placez les images dans `public/images/aetheris/`
2. Ouvrez `app/games/aetheris/page.tsx`
3. Ajoutez-les au tableau `galleryImages` (ligne 17) :

```typescript
{
  src: '/images/aetheris/nouvelle-image.jpg',
  alt: 'Description de l\'image',
},
```

### Ajouter un Nouveau Jeu

Quand vous aurez un 2ème jeu :

1. Créez `app/games/nouveau-jeu/page.tsx`
2. Copiez la structure de `app/games/aetheris/page.tsx`
3. Créez `public/images/nouveau-jeu/`
4. Mettez à jour la navigation dans `components/Header.tsx`

---

## Déploiement

### Sur Vercel (Recommandé - Gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Connectez votre repository GitHub
3. Vercel détectera automatiquement Next.js
4. Cliquez "Deploy" !

### Configuration DNS

Après déploiement, configurez votre domaine personnalisé dans les paramètres Vercel.

---

## Structure du Site

```
Pages créées :
✅ / (Home)              - Page d'accueil avec hero + présentation
✅ /games/aetheris       - Page dédiée Aetheris avec galerie + vidéo
✅ /about                - À propos du studio + équipe
✅ /contact              - Formulaire de contact + FAQ

Composants :
✅ Header                - Navigation sticky responsive
✅ Footer                - Réseaux sociaux + liens
✅ ImageGallery          - Galerie avec lightbox
✅ TeamMember            - Card membre d'équipe
✅ ContactForm           - Formulaire avec validation
```

---

## Fonctionnalités Incluses

- ✅ **Design responsive** (mobile, tablette, desktop)
- ✅ **Navigation sticky** avec menu burger mobile
- ✅ **Galerie d'images** avec lightbox et navigation
- ✅ **Formulaire de contact** avec validation
- ✅ **SEO optimisé** (meta tags, Open Graph)
- ✅ **Favicon** (logo Lodenn)
- ✅ **Palette de couleurs** du logo intégrée
- ✅ **Animations** légères (hover, scroll)
- ✅ **Structure extensible** pour futurs jeux et membres

---

## Palette de Couleurs

Utilisez ces classes Tailwind personnalisées :

- `bg-primary` ou `text-primary` - Orange principal (#FF6B1A)
- `bg-sky-light` - Bleu ciel (#5BA4D4)
- `bg-nature-green` - Vert nature (#7BC74D)
- `bg-sand-light` - Beige sable (#E8D5B7)

---

## Support & Questions

Si vous avez des questions ou besoin d'aide pour personnaliser le site :

1. Consultez le `README.md` pour les détails techniques
2. La documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
3. La documentation Tailwind : [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## Checklist Avant Lancement

- [ ] Configurer Formspree pour le formulaire de contact
- [ ] Remplacer la vidéo trailer placeholder
- [ ] Mettre à jour tous les liens réseaux sociaux
- [ ] Changer "Founder" par votre vrai nom
- [ ] Ajouter votre photo de profil (optionnel)
- [ ] Vérifier que toutes les images se chargent correctement
- [ ] Tester le site sur mobile
- [ ] Tester le formulaire de contact
- [ ] Déployer sur Vercel ou autre plateforme
- [ ] Configurer le domaine personnalisé

---

Bon développement ! 🚀
