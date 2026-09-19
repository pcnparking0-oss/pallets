import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { sendContactEmails, sendOrderEmails, sendSubscriptionEmails } from './api/_mailer';

function apiRoutesPlugin(): Plugin {
  return {
    name: 'vite-plugin-zoho-api-routes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = req.url.split('?')[0];

        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          return;
        }

        let bodyBuffer = '';
        req.on('data', chunk => {
          bodyBuffer += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = bodyBuffer ? JSON.parse(bodyBuffer) : {};

            if (url === '/api/contact') {
              if (!body.name || !body.email || !body.message) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Name, email, and message required.' }));
                return;
              }
              const ticketId = body.ticketId || `EPL-${Math.floor(100000 + Math.random() * 900000)}`;
              const result = await sendContactEmails({ ...body, ticketId });
              res.statusCode = 200;
              res.end(JSON.stringify({ 
                success: true, 
                ticketId, 
                message: 'Inquiry sent successfully via Zoho Mail.',
                messageId: result.customerResult.messageId 
              }));
              return;
            }

            if (url === '/api/order') {
              if (!body.customer?.email || !body.items?.length) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Customer email and items required.' }));
                return;
              }
              const result = await sendOrderEmails(body);
              res.statusCode = 200;
              res.end(JSON.stringify({ 
                success: true, 
                orderNumber: body.orderNumber, 
                message: 'Order confirmation dispatched via Zoho Mail.',
                customerMessageId: result.customerResult.messageId 
              }));
              return;
            }

            if (url === '/api/subscribe') {
              if (!body.email || !body.email.includes('@')) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Valid email required.' }));
                return;
              }
              const discountCode = body.discountCode || 'EURO10';
              const result = await sendSubscriptionEmails(body.email, discountCode);
              res.statusCode = 200;
              res.end(JSON.stringify({ 
                success: true, 
                email: body.email, 
                discountCode, 
                message: '10% discount voucher dispatched via Zoho Mail.',
                messageId: result.subscriberResult.messageId 
              }));
              return;
            }

            // Unknown endpoint
            res.statusCode = 404;
            res.end(JSON.stringify({ success: false, error: 'API route not found' }));
          } catch (err: any) {
            console.error('API Route Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error' }));
          }
        });
      });
    }
  };
}

// LINT.IfChange(aistudio_media_plugin)

function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aistudioMediaPlugin(), apiRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
