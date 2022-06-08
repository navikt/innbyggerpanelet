package no.nav.innbyggerpanelet.sms

import no.nav.innbyggerpanelet.dittnav.DittNavService
import org.springframework.stereotype.Component

@Component
class StandardSmsRouter(
    private val dittNav: DittNavService
) {
    fun route(sms: Sms) = dittNav.createMessage(sms)
}
