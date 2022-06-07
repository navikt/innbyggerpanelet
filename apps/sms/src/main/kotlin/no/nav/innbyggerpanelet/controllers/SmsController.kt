package no.nav.innbyggerpanelet.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class SmsController {

  @GetMapping("/")
  fun sms(): String {
    return "Helloooo"
  }
}
