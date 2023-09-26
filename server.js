'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (request, response) {
    console.log(request.method, request.url);

    if (request.url === '/index.css') {
        const css = fs.readFileSync('index.css', 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(css);
      } else if (request.url.startsWith('/img/')) {
        // Определяем путь к изображению
        const imagePath = request.url.slice(1);
    
        // Проверяем существование файла
        if (fs.existsSync(imagePath)) {
          // Определяем MIME-тип на основе расширения файла
          const ext = path.extname(imagePath).toLowerCase();
          const contentType = {
            '.jpg': 'image/jpg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
          }[ext] || 'application/octet-stream';
    
          // Отправляем изображение клиенту
          fs.readFile(imagePath, (error, data) => {
            if (error) {
              response.writeHead(500);
              response.end('Internal Server Error');
            } else {
              response.writeHead(200, { 'Content-Type': contentType });
              response.end(data);
            }
          });
        } else {
          response.writeHead(404);
          response.end('Not Found');
        }
      } else if (request.url == "/") {
        const html = fs.readFileSync('index.html');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
      }
      else {
        const html = fs.readFileSync('404.html');
        response.writeHead(404);
        response.end(html)
      }
})

server.listen(8000);
console.log('Server started!');