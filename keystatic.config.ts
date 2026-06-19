import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      previewUrl: '/blog/{slug}',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        pubDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        heroImage: fields.image({
          label: 'Cover Image',
          description: 'Upload gambar untuk artikel',
          directory: 'public/images/blog',
          publicPath: '/images/blog/'
        }),
        description: fields.text({ label: 'Description / Ringkasan', multiline: true }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
  },
  singletons: {
    packages: singleton({
      label: 'Packages',
      path: 'src/data/packages',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            subtitle: fields.text({ label: 'Subtitle' }),
            image: fields.image({
              label: 'Upload Image',
              directory: 'public/images/packages',
              publicPath: '/images/packages/'
            }),
            alt: fields.text({ label: 'Image Alt Text' }),
            fallbackImage: fields.image({
              label: 'Fallback Upload Image',
              directory: 'public/images/packages',
              publicPath: '/images/packages/'
            }),
          }),
          {
            label: 'Packages List',
            itemLabel: props => props.fields.title.value || 'New Package'
          }
        )
      }
    }),
    schedules: singleton({
      label: 'Jadwal Keberangkatan',
      path: 'src/data/schedules',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            tanggal: fields.text({ label: 'Tanggal Keberangkatan (Contoh: 27 Juli 2026)' }),
            paket: fields.text({ label: 'Nama Paket (Contoh: Umrah Dermawan Plus Thaif)' }),
            pesawat: fields.text({ label: 'Pesawat (Contoh: Lion Air)' }),
            durasi: fields.text({ label: 'Durasi (Contoh: 12 Hari)' }),
            sisaSeat: fields.text({ label: 'Teks Sisa Seat (Contoh: Sisa 5 Seat / Tersedia)' }),
            statusColor: fields.select({
              label: 'Warna Status Seat',
              description: 'Hijau untuk Tersedia, Kuning untuk mulai penuh, Merah untuk hampir habis.',
              options: [
                { label: 'Hijau (Tersedia)', value: 'green' },
                { label: 'Kuning (Menipis)', value: 'yellow' },
                { label: 'Merah (Hampir Habis)', value: 'red' },
              ],
              defaultValue: 'green',
            }),
            linkBooking: fields.text({ 
              label: 'Link Booking WhatsApp', 
              defaultValue: 'https://wa.me/6285956129389' 
            }),
          }),
          {
            label: 'Daftar Jadwal',
            itemLabel: props => props.fields.tanggal.value ? `${props.fields.tanggal.value} - ${props.fields.paket.value}` : 'Jadwal Baru'
          }
        )
      }
    })
  }
});
