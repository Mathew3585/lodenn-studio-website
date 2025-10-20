module.exports = {
  apps: [
    {
      name: 'lodennstudio',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/lodennstudio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        // RESEND_API_KEY sera ajouté plus tard dans .env.production
      },
      error_file: '/var/www/lodennstudio/logs/error.log',
      out_file: '/var/www/lodennstudio/logs/out.log',
      log_file: '/var/www/lodennstudio/logs/combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
