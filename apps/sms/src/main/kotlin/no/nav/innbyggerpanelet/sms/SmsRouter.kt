package no.nav.innbyggerpanelet.sms

import no.nav.innbyggerpanelet.dittnav.DittNavService
import org.springframework.stereotype.Component

@Component
class SmsRouter(private val standard: StandardSmsRouter) : Router {
    override fun route(sms: Sms) = standard.route(sms)
}

interface Router {
    fun route(sms: Sms)
}
