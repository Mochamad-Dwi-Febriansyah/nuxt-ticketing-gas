<script setup>
import Card from './ui/Card.vue'
import CardContent from './ui/CardContent.vue'
import Input from './ui/Input.vue'
import Label from './ui/Label.vue'
import Button from './ui/Button.vue'
import Select from './ui/Select.vue'
import ContactCard from './ContactCard.vue'


</script>


<template>
    <section ref="contactRef" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Hubungi Kami</h2>
          <p class="text-lg text-gray-600">
            Punya pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi tim dukungan pelanggan kami.
          </p>
        </div>
  
        <div class="grid md:grid-cols-2 gap-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactCard
              name="Outlet Pemuda"
              address="Jl. Pemuda No. 123, Sekayu, Semarang Tengah, Semarang 50132"
              phone="(024) 1234-5678"
              time="08:00 - 17:00 WIB"
            />
            <ContactCard
              name="Outlet Majapahit"
              address="Jl. Majapahit No. 345, Pedurungan Kidul, Semarang 50192"
              phone="(024) 8765-4321"
              time="08:00 - 18:00 WIB"
            />
            <ContactCard
              name="Outlet Siliwangi"
              address="Jl. Siliwangi No. 567, Kalibanteng Kulon, Semarang 50145"
              phone="(024) 9876-5432"
              time="07:30 - 17:30 WIB"
            />
            <ContactCard
              name="Outlet Ngaliyan"
              address="Jl. Ngaliyan Raya No. 789, Ngaliyan, Semarang 50184"
              phone="(024) 3456-7890"
              time="08:00 - 17:00 WIB"
            />
          </div>
  
          <div class="space-y-6">
            <Card>
              <CardContent>
                <h3 class="text-2xl font-bold mb-6">Kirim Testimonial</h3>
                <form class="space-y-4">
                  <div class="grid gap-2">
                    <!-- <Label>Nama</Label> -->
                    <Input placeholder="Nama Lengkap"  label="Nama Lengkap" name="nama_lengkap" />
                  </div>
                  <div class="grid gap-2">
                    <!-- <Label>Email</Label> -->
                    <Input type="email"  label="Email" placeholder="email@example.com" name="email" />
                  </div>
                  <div class="grid gap-2">
                    <!-- <Label>Rating</Label> -->
                    <Select name="rating" label="Rating"
                      :options="[
                        { value: '5', label: '⭐⭐⭐⭐⭐ (Sangat Puas)' },
                        { value: '4', label: '⭐⭐⭐⭐ (Puas)' },
                        { value: '3', label: '⭐⭐⭐ (Cukup)' },
                        { value: '2', label: '⭐⭐ (Kurang)' },
                        { value: '1', label: '⭐ (Sangat Kurang)' },
                      ]"
                      placeholder="Pilih rating"
                    />
                  </div>
                  <div class="grid gap-2">
                    <Label>Testimonial</Label>
                    <textarea name="testimonial"
                      class="min-h-[120px] rounded-md border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Bagikan pengalaman Anda menggunakan layanan kami..."
                    />
                  </div>
                  <Button type="submit" class="w-full">Kirim Testimonial</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </template>
  
