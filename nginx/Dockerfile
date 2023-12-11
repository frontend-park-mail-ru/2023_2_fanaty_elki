FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY dist /dist
COPY keys/prinesy_poday.crt /etc/ssl/
COPY keys/prinesy_poday.key /etc/ssl/
