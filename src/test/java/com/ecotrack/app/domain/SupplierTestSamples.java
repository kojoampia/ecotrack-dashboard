package com.ecotrack.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class SupplierTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Supplier getSupplierSample1() {
        return new Supplier().id(1L).companyName("companyName1").contactEmail("contactEmail1").industry("industry1").tier(1);
    }

    public static Supplier getSupplierSample2() {
        return new Supplier().id(2L).companyName("companyName2").contactEmail("contactEmail2").industry("industry2").tier(2);
    }

    public static Supplier getSupplierRandomSampleGenerator() {
        return new Supplier()
            .id(longCount.incrementAndGet())
            .companyName(UUID.randomUUID().toString())
            .contactEmail(UUID.randomUUID().toString())
            .industry(UUID.randomUUID().toString())
            .tier(intCount.incrementAndGet());
    }
}
