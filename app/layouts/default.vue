<script setup lang="ts">
const props = defineProps<{
  homeRef?: HTMLElement | null
  aboutRef?: HTMLElement | null
  featuresRef?: HTMLElement | null
  testimonialsRef?: HTMLElement | null
  stepsRef?: HTMLElement | null
  contactRef?: HTMLElement | null
}>()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <BaseHeader
      :home-ref="props.homeRef"
      :about-ref="props.aboutRef"
      :features-ref="props.featuresRef"
      :testimonials-ref="props.testimonialsRef"
      :steps-ref="props.stepsRef"
      :contact-ref="props.contactRef"
    />
    <div class="flex-1">
      <slot />
      <Notification />
    </div>
    <BaseFooter />
  </div>
</template>
