# Loki Log Aggregation for EcoTrack Pro

To audit financial and rate-limiting rejections across all scaled backend instances, use the following LogQL queries in the Grafana Explore view.

### 1. Aggregated Budget Breaches by Tenant

This query counts how many times the "Budget Exhausted" error was logged across all pods, grouped by the `tenant_id` label.

```
sum by (tenant_id) (
  count_over_time(
    {service_name=~"ecotrack-backend.*"} |= "CARBON_CREDIT_EXHAUSTED" [24h]
  )
)
```

### 2. Rate Limit Violations Over Time

Visualize the frequency of tenants "hammering" the AI API.

```
sum by (tenant_id) (
  rate(
    {service_name=~"ecotrack-backend.*"} |= "RATE_LIMIT_EXCEEDED" [5m]
  )
)
```

### 3. Correlated Logs for a Specific Budget Breach

If you have a `trace_id` from Tempo and want to see the specific budget state at that microsecond:

```
{service_name=~"ecotrack-backend.*"} |= "trace_id=<YOUR_TRACE_ID>"
```
