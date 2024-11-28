# Video Editör Portföy Sitesi

Modern ve fütüristik tasarıma sahip, video editör portföyünü sergileyen kişisel web sitesi.

## Özellikler

- Responsive tasarım
- Modern ve fütüristik arayüz
- Akıcı animasyonlar ve geçişler
- Video portfolyo galerisi
- İletişim formu
- Performans odaklı kod yapısı

## Teknolojiler

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript
- GSAP (GreenSock Animation Platform)

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
```

2. Gerekli dosyaları `assets` klasörüne ekleyin:
- hero-bg.mp4 (Ana sayfa arkaplan videosu)
- wedding.jpg ve wedding.mp4
- corporate.jpg ve corporate.mp4
- music.jpg ve music.mp4

3. Bir web sunucusu üzerinde çalıştırın (örneğin Live Server)

## Kullanım

- Ana sayfada portföy çalışmalarınızı görüntüleyebilirsiniz
- Her portföy öğesine tıkladığınızda video modal açılır
- İletişim formu üzerinden mesaj gönderilebilir

## Özelleştirme

1. Portföy öğelerini eklemek/düzenlemek için `main.js` dosyasındaki `portfolioItems` dizisini güncelleyin
2. Renk şemasını değiştirmek için `style.css` dosyasındaki CSS değişkenlerini düzenleyin
3. İletişim formu backend entegrasyonu için `main.js` dosyasındaki form submission kodunu güncelleyin

## Lisans

MIT License
