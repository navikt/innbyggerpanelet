package no.nav.innbyggerpanelet

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SmsApplication

fun main(args: Array<String>) {
	runApplication<SmsApplication>(*args)
}
