FROM nginx:latest

ADD src/ /opt/www/

ADD ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
