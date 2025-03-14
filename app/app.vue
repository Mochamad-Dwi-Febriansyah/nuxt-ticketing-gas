<script setup>
useHead({
  script: [
    {
      src: "https://app.sandbox.midtrans.com/snap/snap.js",
      "data-client-key": "SB-Mid-client-pN7cVtmNtQ55yj8S",
      type: "text/javascript",
    },
  ],
});
</script>


<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
