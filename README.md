# i18n with NextJS App Router Example

> 在產品開發中，偶爾會碰到需要國際化的案子，處理起來總是特別頭痛。因此這次想透過 `i18next`, `react-i18next` 等套件去摸索在 React 當中如何設定。

大部分網頁的內容只不過是做文字的抽換，其他架構則是不變的，`i18next` 當中提供了許多好用的 hooks 去處理抽換的過程。

```jsx
function Component() {
  return <Card title={"中文標題"} content={"內文..."} />;
}
```

## Server Side Router and i18n setup

1. 在 `/app` 設定 [lng] 的動態路徑，控制語系會跳轉到哪一頁。同時在 `Page` 當中透過 [params](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) 就能取得動態路徑屬於哪一個語系。

```text
├── [lng]
│   ├── client-page
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── second-page
│       └── page.tsx
├── favicon.ico
├── globals.css
├── layout.tsx
└── page.tsx
```

```jsx
export default function Page({ params: { lng } }) {
  /// Rest of code here
}
```

2. 設定好 `/i18n`：與語系相關檔案：

```
├── client.ts
├── index.ts
├── locales
│   ├── de
│   │   ├── client-page.json
│   │   ├── footer.json
│   │   ├── second-page.json
│   │   └── translation.json
│   └── en
│       ├── client-page.json
│       ├── footer.json
│       ├── second-page.json
│       └── translation.json
└── setting.ts
```

- `index.ts`：建立好 i18n 的 instance ，包含定義有哪些語系、該讀哪些檔案等（[參考這邊](https://react.i18next.com/latest/using-with-hooks)）。同時在這個檔案客製化了 `useTranslation`，以確保在 SSR、CSR 之間的語言一致性。

- `json`：定義文字的內容

```json
{
  "title": "Hallo Leute!",
  "to-second-page": "Zur zweiten Seite",
  "to-client-page": "Zur clientseitigen Seite"
}
```

3. `middleware.ts`：根據使用者的請求來判斷進到哪個語系的頁面。

> 通過檢查 `cookies` 和 `Accept-Language` 來確定應用的語言設定。如果當前路徑沒有語言前綴，它會重定向到包含語言前綴的 URL，並在需要時更新語言 cookie，以便用戶的語言偏好能夠在不同頁面間持續存在。

### Apply i18n in Server Component

設定好路徑與方法，就可以透過 hooks 去取得資料：

```jsx
import Link from "next/link";
import { useTranslation } from "../i18n";
import { Footer } from "@/components/Footer";

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, "translation");
  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
      <br />
      <Link href={`/${lng}/client-page`}>{t("to-client-page")}</Link>
      <Footer lng={lng} />
    </>
  );
}
```

- `useTranslation` 代表語系是 `lng` 且去取得 `translation.json` 的資料。

## TBD

- Client Side Component：以 `Footer` 為例（參考 client.ts）

## 參考資料

Reference: [i18n with Next.js 13/14 and app directory / App Router](https://locize.com/blog/next-app-dir-i18n/)
