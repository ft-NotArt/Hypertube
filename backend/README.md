

Valeurs à changer avant de pousser en prod :

MONGO_INITDB_ROOT_PASSWORD → un vrai mot de passe
JWT_SECRET → une clé aléatoire longue (minimum 32 chars), ex: openssl rand -base64 32
ME_CONFIG_BASICAUTH_PASSWORD → mot de passe pour l'interface Mongo Express