## Deploying

- Run `docker build -t engiego/wai-platform-v2:<version> .` to build docker container.
- Run `docker push engiego/wai-platform-v2:<version>` to push container to DockerHub.
- SSH into Dokku server.
- Guidance here `https://dokku.com/docs~v0.5.6/deployment/images/`.
- Run `docker pull engiego/wai-platform-v2:<version>` on server.
- Run `docker tag engiego/wai-platform-v2:<version> dokku/api:latest` on server.
- Run `dokku tags:deploy api latest`.
