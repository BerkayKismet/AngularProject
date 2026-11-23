# Angular Login

Angular 14 + Bootstrap 5 ile modern bir giriş / kimlik doğrulama arayüzü.

## Gereksinimler

| Araç | Sürüm |
|------|--------|
| Node.js | **16.10+** (önerilen: **16.20.2**, bkz. `.nvmrc`) |
| npm | Node ile birlikte |

> Node 17+ bu projede desteklenmez.

## Başlangıç

```bash
npm install
npm start
```

Uygulama: [http://localhost:4200](http://localhost:4200)

| Komut | Açıklama |
|-------|----------|
| `npm start` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi → `dist/` |
| `npm run watch` | İzlemeli geliştirme derlemesi |

## Klasör yapısı

```
src/app/
  core/           # singleton servisler, guard'lar, interceptors
  shared/         # ortak UI, pipe, directive
  auth/           # login, register, auth-shell, ilgili component'ler
  home/           # ana sayfa
```

Domain klasörleri `app/` altında; ortak kod `shared/`, uygulama geneli `core/` altında.

## Katkı / kod kuralları

Mimari, Angular kod, component ve UI tasarım kuralları **[`.cursor/rules/`](.cursor/rules/)** altında tanımlı (Cursor agent + katkı için tek kaynak).

Özet:
- Standalone component; Reactive Forms; HTTP yalnızca service’te
- Domain route’ları lazy load; auth `core` guard / interceptor ile
- Secret, `.env` ve credential commit etme
