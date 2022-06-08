package no.nav.innbyggerpanelet

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.kafka.annotation.EnableKafka

@SpringBootApplication
@EnableKafka
@ConfigurationPropertiesScan
class SmsApplication

fun main(args: Array<String>) {
	runApplication<SmsApplication>(*args)
}
