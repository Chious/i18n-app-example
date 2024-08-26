import Link from "next/link";
import React from "react";
import { useTranslation } from "@/app/i18n";
import { Footer } from "@/components/Footer";

export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "second-page");

  return (
    <>
      <div>{t("title")}</div>{" "}
      <Link className=" underline" href={`/${lng}`}>
        Back
      </Link>
      <Footer lng={lng} />
    </>
  );
}
