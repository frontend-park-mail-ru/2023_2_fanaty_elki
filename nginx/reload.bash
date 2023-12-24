docker stop nginx && docker remove nginx
docker run --name nginx -v /home/ubuntu/front/nginx/config:/etc/nginx/conf.d -v /home/ubuntu/front/dist:/dist -v /home/ubuntu/front/nginx/keys:/etc/ssl -p 443:443 -p 80:80 -d nginx

# chmod u+x build.bash
