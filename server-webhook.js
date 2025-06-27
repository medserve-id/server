const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    exec('cd ~/server && git pull && pm2 restart all', (err, stdout, stderr) => {
      if (err) return console.error('Exec error:', err);
      console.log('Pulled and restarted:', stdout);
    });
    res.writeHead(200);
    res.end('OK');
  } else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => console.log('Webhook server running on port 3000'));
