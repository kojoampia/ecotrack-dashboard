package com.ecotrack.app.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Aspect to set tenant context in Hibernate session for RLS.
 */
@Aspect
@Component
public class TenantAspect {

    private final Logger log = LoggerFactory.getLogger(TenantAspect.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Before("execution(* com.ecotrack.app.repository.*.*(..))")
    public void setTenantContext() {
        String tenantId = TenantContext.getCurrentTenant();
        if (tenantId != null && entityManager != null) {
            Session session = entityManager.unwrap(Session.class);
            session.doWork(connection -> {
                try (var statement = connection.createStatement()) {
                    statement.execute("SET app.current_tenant = '" + tenantId + "'");
                }
            });
            log.debug("Set tenant context to: {}", tenantId);
        }
    }
}
