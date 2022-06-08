package no.nav.innbyggerpanelet.dittnav

import no.nav.brukernotifikasjon.schemas.builders.BeskjedInputBuilder
import no.nav.brukernotifikasjon.schemas.builders.NokkelInputBuilder
import no.nav.brukernotifikasjon.schemas.input.NokkelInput
import no.nav.innbyggerpanelet.sms.Sms
import org.apache.kafka.clients.producer.ProducerRecord
import org.springframework.stereotype.Service
import org.springframework.kafka.core.KafkaOperations
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC
import java.util.*

@Service
class DittNavService(
    private val dittNav: KafkaOperations<NokkelInput, Any>
) {

    fun createMessage(sms: Sms) {
        with (keyInput(sms.birthNumber, "groupId", "eventId") ) {
            dittNav.send(
                ProducerRecord("aapen-brukernotifikasjon-nyBeskjed-v1", this, message(sms.message))
            )
        }
    }

    private fun message(message: String) =
        BeskjedInputBuilder()
            .withEksternVarsling(true)
            .withSmsVarslingstekst(message)
            .withTidspunkt(LocalDateTime.now(UTC))
            .withTekst(message)
            .withSikkerhetsnivaa(3)
            .build()

    private fun keyInput(birthNumber: String, groupingId: String, eventId: String) =
        NokkelInputBuilder()
            .withFodselsnummer(birthNumber)
            .withEventId(UUID.randomUUID().toString())
            .withGrupperingsId(groupingId)
            .withAppnavn("innbyggerpanelet")
            .withNamespace("localhost")
            .build()
}
