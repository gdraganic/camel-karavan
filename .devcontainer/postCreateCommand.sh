mvn dependency:resolve -f karavan-generator
mvn dependency:resolve -f karavan-web/karavan-app
(cd karavan-core && npm ci)