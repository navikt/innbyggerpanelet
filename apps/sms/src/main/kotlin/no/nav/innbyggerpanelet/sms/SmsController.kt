package no.nav.innbyggerpanelet.sms

import no.nav.innbyggerpanelet.dittnav.DittNavService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
internal class SmsController(private val router: Router) {

    @PostMapping("/sms")
    fun sms(@RequestBody sms: Sms) = router.route(sms)
}