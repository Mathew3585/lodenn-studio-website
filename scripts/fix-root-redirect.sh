#!/bin/bash

# Script pour optimiser la redirection de / vers /fr dans Nginx
# Cela élimine le délai de redirection et améliore l'expérience utilisateur

set -e

echo "🔧 Optimisation de la redirection racine dans Nginx..."
echo ""

# Vérifier si on est root ou sudo
if [ "$EUID" -ne 0 ]; then
    echo "❌ Ce script doit être exécuté avec sudo"
    echo "Usage: sudo bash scripts/fix-root-redirect.sh"
    exit 1
fi

# Chemin du fichier de configuration Nginx
NGINX_CONFIG="/etc/nginx/sites-available/lodennstudio"

# Vérifier que le fichier existe
if [ ! -f "$NGINX_CONFIG" ]; then
    echo "❌ Fichier de configuration non trouvé : $NGINX_CONFIG"
    exit 1
fi

echo "📝 Ajout de la redirection racine dans Nginx..."

# Backup de la configuration actuelle
cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup-$(date +%Y%m%d-%H%M%S)"
echo "✅ Backup créé"

# Ajouter un bloc de redirection pour la racine
# On va ajouter un bloc server séparé qui redirige / vers /fr
cat > /tmp/nginx_redirect.conf << 'EOF'

# Redirection de la racine vers /fr (détection de langue)
server {
    listen 443 ssl http2;
    server_name lodennstudio.com www.lodennstudio.com;

    ssl_certificate /etc/letsencrypt/live/lodennstudio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lodennstudio.com/privkey.pem;

    # Redirect root to language-specific path
    location = / {
        # Détection basique de la langue via Accept-Language header
        set $lang "fr";
        if ($http_accept_language ~* "^en") {
            set $lang "en";
        }
        return 302 /$lang;
    }

    # Toutes les autres requêtes sont proxy vers Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirection HTTP vers HTTPS
server {
    listen 80;
    server_name lodennstudio.com www.lodennstudio.com;
    return 301 https://$server_name$request_uri;
}
EOF

# Remplacer la config existante
cat /tmp/nginx_redirect.conf > "$NGINX_CONFIG"
rm /tmp/nginx_redirect.conf

echo "✅ Configuration modifiée"
echo ""

# Tester la configuration Nginx
echo "🔍 Test de la configuration Nginx..."
if nginx -t; then
    echo ""
    echo "✅ Configuration valide"
    echo ""

    # Redémarrer Nginx
    echo "🔄 Redémarrage de Nginx..."
    systemctl restart nginx

    echo ""
    echo "✅ Nginx redémarré avec succès"
    echo ""
    echo "🎉 La redirection racine est maintenant instantanée !"
    echo ""
    echo "📊 Pour vérifier :"
    echo "   curl -I https://lodennstudio.com"
    echo ""
else
    echo ""
    echo "❌ Erreur dans la configuration Nginx"
    echo "🔄 Restauration du backup..."
    mv "$NGINX_CONFIG.backup-"* "$NGINX_CONFIG"
    echo "✅ Configuration restaurée"
    exit 1
fi
