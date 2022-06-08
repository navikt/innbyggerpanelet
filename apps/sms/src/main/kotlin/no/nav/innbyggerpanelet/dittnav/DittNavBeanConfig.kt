package no.nav.innbyggerpanelet.dittnav

import io.confluent.kafka.serializers.KafkaAvroSerializer
import no.nav.brukernotifikasjon.schemas.input.NokkelInput
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.core.DefaultKafkaProducerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.core.ProducerFactory
import org.apache.kafka.clients.producer.ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG
import org.apache.kafka.clients.producer.ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG

@Configuration
class DittNavBeanConfig {

    @Bean
    fun dittNavKafkaOperations(pf: ProducerFactory<Any, Any>) =
        KafkaTemplate(DefaultKafkaProducerFactory<NokkelInput, Any>(HashMap(pf.configurationProperties)
            .apply {
                put(KEY_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer::class.java)
                put(VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer::class.java)
            }
        ))
}
