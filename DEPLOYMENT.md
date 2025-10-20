# 🚀 Guide de déploiement - Lodenn Studio Website

Ce guide vous accompagne étape par étape pour déployer votre site Next.js sur votre VPS avec déploiement automatique via GitHub Actions.

## 📋 Prérequis

- ✅ VPS Ubuntu 24.04 LTS (147.93.121.181)
- ✅ Nom de domaine: lodennstudio.com
- ✅ Accès SSH root au VPS
- ✅ Repository GitHub avec le code source

---

## 🎯 Étape 1 : Configuration initiale du VPS

### 1.1 Connexion au VPS

```bash
ssh root@147.93.121.181
```

Mot de passe : `Mathew35851303@`

### 1.2 Téléchargement du script d'installation

Une fois connecté au VPS, téléchargez le repository :

```bash
cd /tmp
git clone https://github.com/Mathew3585/lodenn-studio-website.git
cd lodenn-studio-website
```

### 1.3 Exécution du script d'installation

Rendez le script exécutable et lancez-le :

```bash
chmod +x scripts/setup-vps.sh
bash scripts/setup-vps.sh
```

Ce script va installer automatiquement :
- Node.js 20 LTS
- PM2 (gestionnaire de processus)
- Nginx (serveur web et reverse proxy)
- Certbot (pour les certificats SSL gratuits)
- Firewall UFW (sécurité)
- Clone du repository dans `/var/www/lodennstudio`

**⏱️ Durée estimée : 5-10 minutes**

---

## 🌐 Étape 2 : Configuration DNS

Vous devez pointer votre nom de domaine vers votre VPS.

### 2.1 Accès à votre registrar de domaine

Connectez-vous au site où vous avez acheté votre domaine (ex: OVH, Gandi, Namecheap, etc.)

### 2.2 Configuration des enregistrements DNS

Ajoutez/modifiez les enregistrements suivants :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 147.93.121.181 | 3600 |
| A | www | 147.93.121.181 | 3600 |

**Exemple chez OVH :**
1. Allez dans "Web Cloud" > "Noms de domaine"
2. Cliquez sur votre domaine "lodennstudio.com"
3. Onglet "Zone DNS"
4. Ajoutez les enregistrements A

**Exemple chez Namecheap :**
1. Dashboard > Domain List
2. Manage > Advanced DNS
3. Ajoutez les enregistrements A

### 2.3 Vérification de la propagation DNS

La propagation DNS peut prendre de quelques minutes à 24-48h. Vérifiez avec :

```bash
# Sur votre ordinateur local
nslookup lodennstudio.com
ping lodennstudio.com
```

Ou utilisez : https://dnschecker.org

---

## 🔧 Étape 3 : Configuration Nginx

### 3.1 Copie de la configuration Nginx

Toujours connecté en SSH sur votre VPS :

```bash
cd /var/www/lodennstudio
sudo nano /etc/nginx/sites-available/lodennstudio
```

Copiez le contenu du fichier `scripts/nginx-config.txt` dans l'éditeur nano.

**Raccourcis nano :**
- `Ctrl + O` : Sauvegarder
- `Entrée` : Confirmer le nom du fichier
- `Ctrl + X` : Quitter

### 3.2 Activation de la configuration

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/lodennstudio /etc/nginx/sites-enabled/

# Supprimer la config par défaut (optionnel)
sudo rm /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

---

## 🚀 Étape 4 : Démarrage de l'application

### 4.1 Création du répertoire logs

```bash
cd /var/www/lodennstudio
mkdir -p logs
```

### 4.2 Démarrage avec PM2

```bash
cd /var/www/lodennstudio
pm2 start ecosystem.config.js
pm2 save
```

### 4.3 Vérification

```bash
pm2 status
pm2 logs lodennstudio
```

Vous devriez voir votre application tourner sur le port 3000.

### 4.4 Test local

```bash
curl http://localhost:3000
```

Si vous voyez du HTML, c'est bon ! 🎉

---

## 🔒 Étape 5 : Configuration SSL/HTTPS (après propagation DNS)

**⚠️ Attendez que vos DNS soient bien propagés avant cette étape !**

### 5.1 Installation du certificat SSL

```bash
sudo certbot --nginx -d lodennstudio.com -d www.lodennstudio.com
```

Suivez les instructions :
1. Entrez votre email
2. Acceptez les conditions
3. Choisissez "Redirect" pour forcer HTTPS

### 5.2 Renouvellement automatique

Certbot configure automatiquement le renouvellement. Testez avec :

```bash
sudo certbot renew --dry-run
```

---

## 🤖 Étape 6 : Configuration GitHub Actions

Pour activer le déploiement automatique, vous devez ajouter des secrets dans GitHub.

### 6.1 Accès aux secrets GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche : **Secrets and variables** > **Actions**
4. Cliquez sur **New repository secret**

### 6.2 Ajout des secrets

Ajoutez ces 3 secrets :

| Nom | Valeur |
|-----|--------|
| `VPS_HOST` | `147.93.121.181` |
| `VPS_USERNAME` | `root` |
| `VPS_PASSWORD` | `Mathew35851303@` |

**⚠️ Sécurité :**
Ces informations sont sensibles ! Ne les partagez jamais publiquement.

Pour améliorer la sécurité plus tard, vous pourrez :
- Créer un utilisateur dédié (non-root)
- Utiliser des clés SSH au lieu d'un mot de passe

### 6.3 Test du déploiement automatique

Faites un petit changement dans votre code et poussez sur main :

```bash
git add .
git commit -m "Test déploiement automatique"
git push origin main
```

Ensuite, allez dans l'onglet **Actions** de votre repository GitHub pour voir le workflow s'exécuter.

---

## 📧 Étape 7 : Configuration de l'envoi d'emails (OPTIONNEL - à faire plus tard)

Pour que le formulaire de contact fonctionne, vous devez configurer Resend.

### 7.1 Création d'un compte Resend

1. Allez sur https://resend.com
2. Créez un compte gratuit
3. Vérifiez votre email

### 7.2 Obtention de la clé API

1. Dans le dashboard Resend : **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez-lui un nom (ex: "Lodenn Studio Production")
4. Copiez la clé (elle commence par `re_...`)

### 7.3 Configuration sur le VPS

```bash
ssh root@147.93.121.181
cd /var/www/lodennstudio
nano .env.production
```

Ajoutez :

```env
NODE_ENV=production
PORT=3000
RESEND_API_KEY=re_votre_clé_api_ici
CONTACT_EMAIL=contact@lodennstudio.com
NEXT_PUBLIC_SITE_URL=https://lodennstudio.com
```

Sauvegardez et redémarrez l'application :

```bash
pm2 restart lodennstudio
```

### 7.4 Vérification du domaine sur Resend

Pour envoyer des emails depuis votre propre domaine :

1. Dans Resend : **Domains** > **Add Domain**
2. Ajoutez `lodennstudio.com`
3. Suivez les instructions pour ajouter les enregistrements DNS (SPF, DKIM, DMARC)

---

## 🛠️ Commandes utiles

### Gestion de l'application

```bash
# Voir les logs en temps réel
pm2 logs lodennstudio

# Voir le statut
pm2 status

# Redémarrer l'application
pm2 restart lodennstudio

# Arrêter l'application
pm2 stop lodennstudio

# Démarrer l'application
pm2 start ecosystem.config.js
```

### Gestion de Nginx

```bash
# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir les logs Nginx
sudo tail -f /var/log/nginx/lodennstudio-access.log
sudo tail -f /var/log/nginx/lodennstudio-error.log
```

### Mise à jour manuelle du code

```bash
cd /var/www/lodennstudio
git pull origin main
npm install
npm run build
pm2 restart lodennstudio
```

### Vérification de l'espace disque

```bash
df -h
```

### Vérification de la mémoire

```bash
free -h
```

---

## 🐛 Troubleshooting

### Le site n'est pas accessible

1. Vérifiez que PM2 tourne :
   ```bash
   pm2 status
   ```

2. Vérifiez les logs PM2 :
   ```bash
   pm2 logs lodennstudio --lines 50
   ```

3. Vérifiez que Nginx tourne :
   ```bash
   sudo systemctl status nginx
   ```

4. Vérifiez les logs Nginx :
   ```bash
   sudo tail -f /var/log/nginx/lodennstudio-error.log
   ```

### Erreur "502 Bad Gateway"

Cela signifie que Nginx ne peut pas se connecter à Next.js.

1. Vérifiez que l'application tourne sur le port 3000 :
   ```bash
   curl http://localhost:3000
   pm2 status
   ```

2. Redémarrez l'application :
   ```bash
   pm2 restart lodennstudio
   ```

### Le déploiement GitHub Actions échoue

1. Vérifiez les logs dans l'onglet **Actions** de GitHub
2. Vérifiez que les secrets sont bien configurés
3. Vérifiez que vous pouvez vous connecter en SSH manuellement

### L'application consomme trop de mémoire

```bash
# Redémarrer l'application
pm2 restart lodennstudio

# Si le problème persiste, regardez les logs
pm2 logs lodennstudio
```

### DNS ne se propage pas

- Attendez jusqu'à 48h (généralement beaucoup moins)
- Vérifiez avec : https://dnschecker.org
- Vérifiez que vous avez bien sauvegardé les changements DNS chez votre registrar

---

## 🔐 Améliorations de sécurité (recommandé pour plus tard)

### 1. Créer un utilisateur dédié (non-root)

```bash
# Créer l'utilisateur
sudo adduser deploy
sudo usermod -aG sudo deploy

# Transférer les fichiers
sudo chown -R deploy:deploy /var/www/lodennstudio

# Configurer PM2 pour cet utilisateur
su - deploy
cd /var/www/lodennstudio
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 2. Utiliser des clés SSH au lieu de mots de passe

```bash
# Sur votre ordinateur local
ssh-keygen -t ed25519 -C "github-actions"

# Copiez la clé publique sur le VPS
ssh-copy-id root@147.93.121.181

# Dans GitHub Secrets, remplacez VPS_PASSWORD par VPS_SSH_KEY
# avec le contenu de votre clé privée
```

### 3. Désactiver l'authentification par mot de passe SSH

```bash
sudo nano /etc/ssh/sshd_config

# Changez:
PasswordAuthentication no

# Redémarrez SSH
sudo systemctl restart ssh
```

### 4. Configurer Fail2Ban

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 📊 Monitoring et maintenance

### Logs à surveiller

- **Application** : `pm2 logs lodennstudio`
- **Nginx** : `/var/log/nginx/lodennstudio-*.log`
- **Système** : `/var/log/syslog`

### Mises à jour système

```bash
# Mise à jour des paquets (à faire régulièrement)
sudo apt update && sudo apt upgrade -y

# Redémarrer si nécessaire
sudo reboot
```

### Sauvegarde

Il est recommandé de faire des sauvegardes régulières :
- Base de données (si vous en avez une)
- Configuration Nginx
- Fichiers de l'application

---

## 🎉 Félicitations !

Votre site est maintenant déployé avec :
- ✅ Déploiement automatique via GitHub Actions
- ✅ HTTPS/SSL avec Let's Encrypt
- ✅ Gestion automatique des processus avec PM2
- ✅ Reverse proxy Nginx optimisé
- ✅ Support multi-langue (FR/EN)

Chaque fois que vous ferez un `git push` sur la branche `main`, votre site sera automatiquement mis à jour ! 🚀

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez les logs (voir section "Commandes utiles")
2. Vérifiez la section Troubleshooting
3. Consultez la documentation Next.js : https://nextjs.org/docs
4. Consultez la documentation PM2 : https://pm2.keymetrics.io/docs

---

**Dernière mise à jour :** 2025-01-20
