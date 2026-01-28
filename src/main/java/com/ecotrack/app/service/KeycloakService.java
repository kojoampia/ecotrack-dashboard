package com.ecotrack.app.service;

import jakarta.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Expert Service for programmatically managing Keycloak Identities.
 * Handles Multi-Tenant group assignments and user provisioning for EcoTrack Pro.
 */
@Service
public class KeycloakService {

    private static final Logger log = LoggerFactory.getLogger(KeycloakService.class);

    @Value("${keycloak.auth-server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}") // Client ID (usually 'admin-cli' or a dedicated service client)
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    private String clientSecret;

    /**
     * Creates a new User in Keycloak and assigns them to a Tenant Group.
     * This group is used by the JWT converter to inject the 'tenant_id' claim for RLS.
     * * @param email User email
     * @param password Initial password
     * @param tenantId The ID of the organization (e.g., 'tenant_steel_001')
     */
    public void createTenantUser(String email, String password, String tenantId) {
        Keycloak keycloak = getAdminClient();
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersResource = realmResource.users();

        // 1. Prepare User Representation
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(email);
        user.setEmail(email);
        user.setAttributes(Collections.singletonMap("tenant_id", Collections.singletonList(tenantId)));

        // 2. Execute Creation
        Response response = usersResource.create(user);

        if (response.getStatus() == 201) {
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            log.info("✨ Created user {} with ID: {}", email, userId);

            // 3. Set Password
            resetPassword(usersResource, userId, password);

            // 4. Assign to Tenant Group
            assignUserToTenantGroup(realmResource, userId, tenantId);
        } else if (response.getStatus() == 409) {
            log.warn("⚠️ User {} already exists in Keycloak.", email);
            throw new RuntimeException("IDENTITY_COLLISION: User already registered.");
        } else {
            log.error("❌ Keycloak user creation failed. Status: {}", response.getStatus());
            throw new RuntimeException("KEYCLOAK_PROVISIONING_FAILURE");
        }
    }

    private void resetPassword(UsersResource usersResource, String userId, String password) {
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(password);
        usersResource.get(userId).resetPassword(passwordCred);
    }

    private void assignUserToTenantGroup(RealmResource realmResource, String userId, String tenantId) {
        // Find or create the group representing the tenant
        List<GroupRepresentation> groups = realmResource.groups().groups(tenantId, 0, 1);

        Optional<GroupRepresentation> tenantGroup = groups.stream().filter(g -> g.getName().equals(tenantId)).findFirst();

        if (tenantGroup.isPresent()) {
            realmResource.users().get(userId).joinGroup(tenantGroup.get().getId());
            log.info("📁 User joined tenant group: {}", tenantId);
        } else {
            log.error("❌ Critical: Tenant group {} does not exist. RLS will fail.", tenantId);
        }
    }

    /**
     * Initializes the Keycloak Admin Client using Client Credentials grant.
     */
    private Keycloak getAdminClient() {
        return KeycloakBuilder
            .builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .grantType("client_credentials")
            .clientId(clientId)
            .clientSecret(clientSecret)
            .build();
    }
}
