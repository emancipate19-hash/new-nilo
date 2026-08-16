import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasTelegramToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      chatId: process.env.TELEGRAM_CHAT_ID || '-1004345720712'
    });
  });

  // Telegram Project Request Notification Endpoint
  app.post('/api/project-request', async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        projectType,
        budget,
        timeline,
        message,
        clientType,
        preferredContact
      } = req.body;

      // 1. Basic Validation
      if (!name || (!email && !phone && !message)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide at least your name, contact email, and project details.'
        });
      }

      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const targetChatId = process.env.TELEGRAM_CHAT_ID || '-1004345720712';

      // 2. Compose the requested message format:
      // 🔔 NEW CLIENT PROJECT REQUEST
      //
      // Name: {name}
      // Email: {email}
      // Project: {project type}
      // Budget: {budget}
      // Timeline: {timeline}
      // Message: {message}
      //
      // 🌐 Niloaxis Studio Website
      // (omitting empty fields)

      const lines: string[] = ['🔔 NEW CLIENT PROJECT REQUEST', ''];

      if (name && name.trim()) {
        lines.push(`Name: ${name.trim()}`);
      }
      if (email && email.trim()) {
        lines.push(`Email: ${email.trim()}`);
      }
      if (phone && phone.trim()) {
        lines.push(`Phone: ${phone.trim()}`);
      }
      if (projectType && projectType.trim()) {
        lines.push(`Project: ${projectType.trim()}`);
      }
      if (budget && budget.trim()) {
        lines.push(`Budget: ${budget.trim()}`);
      }
      if (timeline && timeline.trim()) {
        lines.push(`Timeline: ${timeline.trim()}`);
      }
      if (clientType && clientType.trim()) {
        lines.push(`Client Type: ${clientType.trim()}`);
      }
      if (preferredContact && preferredContact.trim()) {
        lines.push(`Preferred Contact: ${preferredContact.trim()}`);
      }
      if (message && message.trim()) {
        lines.push(`Message: ${message.trim()}`);
      }

      lines.push('');
      lines.push('🌐 Niloaxis Studio Website');

      const telegramMessageText = lines.join('\n');

      // 3. Send to Telegram if BOT_TOKEN configured
      if (!botToken) {
        console.warn('TELEGRAM_BOT_TOKEN is not configured in environment variables.');
        // Return clear response explaining setup
        return res.status(200).json({
          success: true,
          simulated: true,
          message: 'Project request recorded. Please set TELEGRAM_BOT_TOKEN in Settings to deliver directly to Telegram.'
        });
      }

      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const telegramResponse = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: targetChatId,
          text: telegramMessageText
        })
      });

      const responseData = await telegramResponse.json();

      if (!telegramResponse.ok || !responseData.ok) {
        console.error('Telegram API error:', responseData);
        return res.status(502).json({
          success: false,
          error: responseData.description || 'Failed to deliver message to Telegram group.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project request sent successfully.'
      });
    } catch (err: any) {
      console.error('Server error handling project request:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Something went wrong. Please try again.'
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nilo Axis Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
