import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { findTask } from "@/features/first30/data";
import { cityOrNotFound, taskStaticParams } from "@/features/first30/model/city-param";
import { TaskDetail } from "@/features/first30/ui/task-detail";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";

export const dynamicParams = false;

export const generateStaticParams = taskStaticParams;

export async function generateMetadata({ params }: PageProps<"/[locale]/first-30/[city]/tasks/[taskId]">) {
  const { locale, city, taskId } = await params;
  const task = findTask(cityOrNotFound(city), taskId);
  if (!task) return {};
  const lang = locale as Locale;
  return {
    ...pageMetadata(lang, `/first-30/${city}/tasks/${taskId}`, { title: task.title[lang], description: task.summary[lang] }),
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/first-30/[city]/tasks/[taskId]">) {
  const { locale, city, taskId } = await params;
  setRequestLocale(locale as Locale);
  const cityId = cityOrNotFound(city);
  const task = findTask(cityId, taskId);
  if (!task) notFound();
  return <TaskDetail cityId={cityId} task={task} />;
}
