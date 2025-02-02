"use client";

import { useTranslation } from "@/app/i18n";
import { FooterBase } from "./FooterBase";

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} />;
};
