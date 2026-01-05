package com.ecotrack.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class EmissionRecordTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static EmissionRecord getEmissionRecordSample1() {
        return new EmissionRecord().id(1L).carbonGrams(1L).source("source1");
    }

    public static EmissionRecord getEmissionRecordSample2() {
        return new EmissionRecord().id(2L).carbonGrams(2L).source("source2");
    }

    public static EmissionRecord getEmissionRecordRandomSampleGenerator() {
        return new EmissionRecord()
            .id(longCount.incrementAndGet())
            .carbonGrams(longCount.incrementAndGet())
            .source(UUID.randomUUID().toString());
    }
}
