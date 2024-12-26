# Prometheus and Grafana Monitoring with Node.js App

This repository demonstrates a monitoring solution for a **Node.js application** using **Prometheus**, **Grafana**, **Traefik**, **cAdvisor**, and **Node Exporter**. It provides real-time metrics collection and visualization for both application and infrastructure performance.

---

## Features
- **Reverse Proxy with Traefik:** Manages HTTP routing and exposes metrics.
- **Prometheus Monitoring:** Collects metrics from Traefik, Node Exporter, and cAdvisor.
- **Grafana Dashboards:** Visualizes collected metrics with customizable dashboards.
- **Node Exporter:** Monitors host-level metrics like CPU, memory, and disk usage.
- **cAdvisor:** Monitors container resource usage and performance.

---

## Architecture Overview

![Architecture Diagram](project_architecture.webp)

### Components
1. **Node.js Application**:  
   - Serves the application logic and HTTP requests.  
   - Traefik handles routing traffic to this application.  

2. **Traefik Web Server**:  
   - Acts as a reverse proxy.  
   - Exposes metrics at `/metrics` for Prometheus integration.  

3. **Prometheus**:  
   - Collects metrics from all sources, including:
     - **Traefik**
     - **Node Exporter**
     - **cAdvisor**  
   - Stores metrics for querying.  

4. **Grafana**:  
   - Connects to Prometheus as a data source.  
   - Provides real-time dashboards for monitoring system and application health.  

5. **Node Exporter**:  
   - Provides hardware and OS-level metrics (e.g., CPU, memory).  

6. **cAdvisor**:  
   - Monitors container-level resource utilization and performance metrics.  

---

## Prerequisites
- **Docker** and **Docker Compose** installed.
- A working knowledge of Docker-based applications.

---

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Farouk-Echaref/Prometheus_and_Grafana_with_NodeJs_App.git
cd Prometheus_and_Grafana_with_NodeJs_App
```

### Configuration Files
1. **Traefik Configuration**:  
   Located in `traefik.yml` and defines Traefik's settings, such as:
   - Metrics endpoint at `http://traefik:8082`.
   - Routing rules for the Node.js application.

2. **Prometheus Configuration**:  
   Defined in `prometheus.yml`, specifying scrape jobs for:
   - Prometheus itself.
   - Node Exporter.
   - cAdvisor.
   - Traefik metrics.

3. **Grafana Datasource Configuration**:  
   Located in `grafana/datasources/datasources.yml`, which preconfigures Prometheus as the default data source.

### Start the Services
Use Docker Compose to spin up the entire stack:
```bash
docker-compose up -d
```

### Access the Services
- **Node.js Application**:  
  Accessible via Traefik at `http://localhost:8081`.  
- **Traefik Dashboard**:  
  Accessible at `http://localhost:8082`.  
- **Prometheus**:  
  Accessible at `http://localhost:9090`.  
- **Grafana**:  
  Accessible at `http://localhost:3000` (Default credentials: `admin/grafana`).

---

## Directory Structure
```
├── docker-compose.yml       # Defines the multi-container setup.
├── traefik.yml              # Configuration for Traefik.
├── prometheus.yml           # Prometheus scrape configurations.
├── grafana/
│   └── datasources/
│       └── datasources.yml  # Preconfigures Prometheus as a Grafana data source.
├── index.js                 # Node.js application code.
└── README.md                # Project documentation.
```

---

## Prometheus Configuration

Key scrape jobs in `prometheus.yml`:
```yaml
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["prometheus:9090"]

  - job_name: "node"
    static_configs:
      - targets: ["node-exporter:9100"]

  - job_name: "cadvisor"
    static_configs:
      - targets: ["cadvisor:8080"]

  - job_name: "traefik"
    static_configs:
      - targets: ["traefik:8082"]
```

---

## Grafana Configuration

- **Data Source**: Pre-configured to connect to Prometheus at `http://prometheus:9090`.
- **Dashboards**: Create custom dashboards to visualize metrics like:
  - HTTP request counts and durations (Traefik).
  - Host system performance (Node Exporter).
  - Container resource usage (cAdvisor).

---

## Troubleshooting
1. **Service Not Starting**:  
   - Check logs using `docker-compose logs <service-name>`.
2. **Metrics Not Visible**:  
   - Ensure all services are on the same `sample-net` Docker network.  
   - Verify the configuration files for syntax errors.

---

## Future Enhancements
- Add **Alertmanager** to trigger alerts for critical conditions.
- Include more exporters (e.g., database metrics with MySQL Exporter).
- Automate dashboard provisioning with Grafana’s API.

---

