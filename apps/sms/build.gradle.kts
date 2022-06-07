import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.7.0"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.6.21"
	kotlin("plugin.spring") version "1.6.21"
	id("com.diffplug.spotless") version "6.2.2"
}

group = "no.nav"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
springBoot {
	buildInfo()
}
configure<com.diffplug.gradle.spotless.SpotlessExtension> {
    
    format("misc") {
        // define the files to apply 'misc' to
        target("*.gradle.kts", "*.md", ".gitignore")
    
        // define the steps to apply to those files
        trimTrailingWhitespace()
        indentWithTabs() // or spaces. Takes an integer argument if you don't like 4
        endWithNewline()
    }
    
    kotlin { // to customize, go to https://github.com/diffplug/spotless/tree/main/plugin-gradle#kotlin

        // Apply ktfmt formatter(similar to google-java-format, but for Kotlin)
        ktfmt()
    }
    kotlinGradle {
        target("*.gradle.kts") // default target for kotlinGradle
        ktfmt()
    }
}
