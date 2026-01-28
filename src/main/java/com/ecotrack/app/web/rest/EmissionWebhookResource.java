package com.ecotrack.app.web.rest;

import com.ecotrack.app.service.CarbonCalculationService;
import com.ecotrack.app.service.dto.CarbonCalculationInputDTO;
import com.ecotrack.app.web.rest.errors.BadRequestAlertException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for handling emission webhook data from IoT sensors.
 */
@RestController
@RequestMapping("/api/emission-webhooks")
public class EmissionWebhookResource {

    private final Logger log = LoggerFactory.getLogger(EmissionWebhookResource.class);

    private final CarbonCalculationService carbonCalculationService;
    private final ObjectMapper objectMapper;

    @Value("${ecotrack.webhook.secret}")
    private String webhookSecret;

    public EmissionWebhookResource(CarbonCalculationService carbonCalculationService, ObjectMapper objectMapper) {
        this.carbonCalculationService = carbonCalculationService;
        this.objectMapper = objectMapper;
    }

    /**
     * POST /api/emission-webhooks : Handle emission data from IoT sensors.
     *
     * @param payload the webhook payload
     * @param signature the X-Hub-Signature header
     * @return ResponseEntity
     */
    @PostMapping
    public ResponseEntity<Void> handleEmissionWebhook(
        @RequestBody String payload,
        @RequestHeader(value = "X-Hub-Signature-256", required = false) String signature
    ) {
        log.debug("REST request to handle emission webhook: {}", payload);

        // Validate signature
        if (!isValidSignature(payload, signature)) {
            log.warn("Invalid webhook signature received");
            return ResponseEntity.status(401).build();
        }

        try {
            // Parse payload and create CarbonCalculationInputDTO
            CarbonCalculationInputDTO input = parseWebhookPayload(payload);

            // Process asynchronously
            carbonCalculationService.calculateAndSaveEmission(input);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error processing webhook payload", e);
            throw new BadRequestAlertException("Invalid webhook payload", "EmissionWebhook", "invalidpayload");
        }
    }

    private boolean isValidSignature(String payload, String signature) {
        if (signature == null || !signature.startsWith("sha256=")) {
            return false;
        }

        String expectedSignature = signature.substring(7); // Remove "sha256=" prefix

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            String computedSignature = Base64.getEncoder().encodeToString(hash);

            return computedSignature.equals(expectedSignature);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("Error validating webhook signature", e);
            return false;
        }
    }

    private CarbonCalculationInputDTO parseWebhookPayload(String payload) throws Exception {
        JsonNode jsonNode = objectMapper.readTree(payload);

        CarbonCalculationInputDTO input = new CarbonCalculationInputDTO();
        input.setActivityData(BigDecimal.valueOf(jsonNode.get("activity").asDouble()));
        input.setEmissionFactor(BigDecimal.valueOf(jsonNode.get("emissionFactor").asDouble()));
        input.setEfficiencyRatio(BigDecimal.valueOf(jsonNode.get("reductionEfficiency").asDouble()));

        // Optional fields
        if (jsonNode.has("productId")) {
            input.setProductId(jsonNode.get("productId").asLong());
        }

        return input;
    }
}
