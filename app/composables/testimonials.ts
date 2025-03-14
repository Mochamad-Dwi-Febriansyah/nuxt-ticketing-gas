// composables/testimonials.ts
export interface Testimonial {
    id: number
    name: string
    image?: string
    rating: number
    text: string
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Budi Santoso',
      image: '/images/outlet.jpeg',
      rating: 5,
      text: 'Layanan e-ticketing LPG ini sangat memudahkan saya dalam memesan gas. Prosesnya cepat dan tidak ribet.'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      image: '/images/outlet.jpeg',
      rating: 4,
      text: 'Pelayanan bagus dan pengiriman tepat waktu. Semoga terus ditingkatkan!'
    },
    {
      id: 3,
      name: 'Agus Wijaya',
      image: '/images/outlet.jpeg',
      rating: 5,
      text: 'Sekarang tidak perlu antre lagi, cukup pesan lewat aplikasi, gas langsung diantar ke rumah. Terbaik!'
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      image: '/images/outlet.jpeg',
      rating: 4,
      text: 'Awalnya ragu, tapi setelah coba ternyata benar-benar membantu. Recommended banget untuk ibu rumah tangga.'
    },
    {
      id: 5,
      name: 'Rudi Hartono',
      image: '/images/outlet.jpeg',
      rating: 5,
      text: 'Harga transparan, proses cepat, dan layanan customer service sangat ramah. Saya puas!'
    }
  ]
  