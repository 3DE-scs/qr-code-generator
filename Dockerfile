# Utilisez une image Node.js pour construire votre application
FROM node:22.11.0 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Utilisez une image Nginx pour servir votre application
FROM nginx:alpine

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copier le contenu construit de l'étape de construction à Nginx
COPY --from=build /app/www/browser /usr/share/nginx/html

# Supprimer la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier votre configuration personnalisée Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Changer les permissions pour que l'utilisateur non-root ait accès aux fichiers
RUN chown -R appuser:appgroup /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

# Utiliser l'utilisateur non-root
USER appuser

# Exposer le port 80 (Nginx utilise généralement le port 80)
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
