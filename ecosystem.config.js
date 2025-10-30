module.exports = {
  apps: [{
    name: "rapids-roosts",
    script: "npm",
    args: "run dev",
    cwd: "./",
    watch: false,
    env: {
      NODE_ENV: "development",
      PORT: 5000
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    },
    error_file: "./logs/err.log",
    out_file: "./logs/out.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: "10s"
  }]
};
