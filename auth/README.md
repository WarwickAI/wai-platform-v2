## Deploying

- Run `docker build -t engiego/wai-auth:<version> .` to build docker container.
- Run `docker push engiego/wai-auth:<version>` to push container to DockerHub.
- SSH into Dokku server.
- Guidance here `https://dokku.com/docs~v0.5.6/deployment/images/`.
- Run `docker pull engiego/wai-auth:<version>` on server.
- Run `docker tag engiego/wai-auth:<version> dokku/auth:latest` on server.
- Run `dokku tags:deploy auth latest`.

- If there are issues setting up a new dokku app with letsencrypt, check this https://github.com/dokku/dokku-letsencrypt#dockerfile-deploys