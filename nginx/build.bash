docker stop mynginx && docker remove mynginx
docker build -t my-nginx .
docker run --name mynginx -p 443:443 -p 80:80 -d my-nginx

# chmod u+x build.bash
