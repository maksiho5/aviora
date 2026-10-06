import { l, type Localized } from "@/shared/lib/localized";

export type CaseVisual = "affinity" | "flow" | "iteration" | "architecture" | "palette" | "findings";

export interface CaseSection {
  id: string;
  kicker: Localized;
  title: Localized;
  body: Localized;
  items?: Localized[];
  visual?: CaseVisual;
}

export const affinityGroups: { title: string; notes: Localized[] }[] = [
  {
    title: "Information",
    notes: [l("Too many sources", "Слишком много источников"), l("Outdated forum threads", "Устаревшие ветки форумов")],
  },
  {
    title: "Administration",
    notes: [l("Which office first?", "В какой офис сначала?"), l("Forms only in Italian", "Формы только на итальянском")],
  },
  {
    title: "Money",
    notes: [l("Can’t open a bank account yet", "Пока нельзя открыть счёт"), l("Deposit surprises", "Неожиданный депозит")],
  },
  {
    title: "Navigation",
    notes: [l("Which ticket to buy", "Какой билет покупать"), l("Where the office actually is", "Где на самом деле офис")],
  },
  {
    title: "Social",
    notes: [l("Asking other students", "Спрашиваю у студентов"), l("Group chats as a manual", "Групповые чаты как инструкция")],
  },
  {
    title: "Emotional",
    notes: [l("Feeling behind", "Ощущение, что отстаёшь"), l("Fear of missing a deadline", "Страх пропустить дедлайн")],
  },
];

export const findings: Localized[] = [
  l(
    "Students don’t lack information. They lack prioritization.",
    "Студентам не хватает не информации, а приоритетов.",
  ),
  l(
    "Official university information is useful but fragmented.",
    "Официальная информация вузов полезна, но разрознена.",
  ),
  l(
    "Students rely heavily on other students for how things actually work.",
    "О том, как всё работает на деле, студенты узнают в основном друг от друга.",
  ),
  l(
    "The first week contains many tasks with hidden dependencies.",
    "В первой неделе много задач со скрытыми зависимостями.",
  ),
];

export const caseSections: CaseSection[] = [
  {
    id: "intro",
    kicker: l("Intro", "Введение"),
    title: l("FIRST 30", "FIRST 30"),
    body: l(
      "A digital onboarding system for international students. Designed for students arriving in Milan.",
      "Цифровая система адаптации для иностранных студентов. Спроектирована для тех, кто приезжает в Милан.",
    ),
  },
  {
    id: "context",
    kicker: l("Context", "Контекст"),
    title: l("Moving to another country is exciting. The first month isn’t.", "Переезд в другую страну — это здорово. Первый месяц — нет."),
    body: l(
      "Arrival is a long list of different tasks: housing, registration, banking, insurance, transport and academic onboarding, all at once and in a language you are still learning.",
      "Приезд — это длинный список разных задач: жильё, регистрация, банк, страховка, транспорт и учёба, всё сразу и на языке, который ты ещё учишь.",
    ),
  },
  {
    id: "problem",
    kicker: l("Problem", "Проблема"),
    title: l("The information exists. It is just everywhere.", "Информация есть. Просто она везде."),
    body: l(
      "University pages, government portals, forums, group chats and advice from friends each hold a piece. None of them says what to do first.",
      "Страницы вузов, госпорталы, форумы, чаты и советы друзей — у каждого свой кусочек. Никто не говорит, что делать первым.",
    ),
  },
  {
    id: "research",
    kicker: l("Research", "Исследование"),
    title: l("What makes the first month difficult?", "Что делает первый месяц трудным?"),
    body: l(
      "Aviora’s earlier research with more than 150 students, followed by interviews about the first weeks after arrival. The answers were grouped into an affinity map.",
      "Исследование Aviora среди более чем 150 студентов и интервью о первых неделях после приезда. Ответы сгруппированы в affinity map.",
    ),
    items: [
      l("What was the first thing you did after arriving?", "Что ты сделал первым делом после приезда?"),
      l("What information was difficult to find?", "Какую информацию было трудно найти?"),
      l("What did you ask other students?", "Что ты спрашивал у других студентов?"),
      l("What took longer than expected?", "Что заняло больше времени, чем ожидалось?"),
      l("What do you wish someone had told you?", "Что бы ты хотел, чтобы тебе сказали заранее?"),
    ],
    visual: "affinity",
  },
  {
    id: "insights",
    kicker: l("Insights", "Инсайты"),
    title: l("Four findings", "Четыре вывода"),
    body: l("Each finding became a constraint for the product.", "Каждый вывод стал ограничением для продукта."),
    visual: "findings",
  },
  {
    id: "opportunity",
    kicker: l("Opportunity", "Возможность"),
    title: l(
      "How might we help students understand what to do next, rather than simply giving them more information?",
      "Как помочь студентам понять, что делать дальше, а не просто дать им больше информации?",
    ),
    body: l(
      "The product is not a guide. It is a sequence.",
      "Продукт — не справочник. Это последовательность.",
    ),
  },
  {
    id: "ideation",
    kicker: l("Ideation", "Идеи"),
    title: l("From many ideas to one daily screen", "От множества идей к одному экрану на день"),
    body: l(
      "Checklists, chatbots, city wikis, buddy systems and calendars were all explored. The strongest idea was the simplest: a short list for today that changes tomorrow.",
      "Мы перебрали чек-листы, чат-ботов, городские вики, бадди-системы и календари. Сильнейшей оказалась самая простая идея: короткий список на сегодня, который завтра меняется.",
    ),
  },
  {
    id: "architecture",
    kicker: l("Information architecture", "Информационная архитектура"),
    title: l("Five places, one question each", "Пять разделов, по одному вопросу в каждом"),
    body: l(
      "Today: what now? Timeline: what is coming? Task: how exactly? Map: where? Budget: how much?",
      "Сегодня: что сейчас? Таймлайн: что дальше? Задача: как именно? Карта: где? Бюджет: сколько?",
    ),
    visual: "architecture",
  },
  {
    id: "flow",
    kicker: l("User flow", "Пользовательский путь"),
    title: l("Arrival → onboarding → dashboard → task → completion", "Приезд → онбординг → дашборд → задача → готово"),
    body: l(
      "Three questions on the first visit. Every visit after that opens on today’s plan.",
      "Три вопроса при первом визите. Каждый следующий визит открывается на плане на сегодня.",
    ),
    visual: "flow",
  },
  {
    id: "wireframes",
    kicker: l("Wireframes", "Вайрфреймы"),
    title: l("Grey boxes first", "Сначала серые прямоугольники"),
    body: l(
      "Early versions showed every task at once, grouped by category. It looked complete and felt overwhelming.",
      "Ранние версии показывали все задачи сразу, по категориям. Выглядело полно, а ощущалось подавляюще.",
    ),
  },
  {
    id: "visual-design",
    kicker: l("Visual design", "Визуальный дизайн"),
    title: l("Calm on purpose", "Спокойствие — намеренно"),
    body: l(
      "Olive, linen and cotton from the Aviora palette. An editorial serif for moments, a clear sans for actions. Colour is used for priority only.",
      "Олива, лён и хлопок из палитры Aviora. Редакционный serif для настроения, ясный sans для действий. Цвет используется только для приоритета.",
    ),
    visual: "palette",
  },
  {
    id: "prototype",
    kicker: l("Prototype", "Прототип"),
    title: l("A working product, not a mockup", "Рабочий продукт, а не макет"),
    body: l(
      "The prototype is this website. Try it: tell it when you arrive and it builds your month.",
      "Прототип — этот сайт. Попробуй: укажи дату приезда, и он соберёт твой месяц.",
    ),
  },
  {
    id: "testing",
    kicker: l("Usability testing", "Юзабилити-тестирование"),
    title: l("“You have just arrived in Milan. Find out what you need to do today.”", "«Ты только что прилетел в Милан. Выясни, что нужно сделать сегодня.»"),
    body: l(
      "Five students, one task, observed without help. The goal: see where they hesitate, not whether they finish.",
      "Пять студентов, одна задача, без подсказок. Цель — увидеть, где они сомневаются, а не закончат ли.",
    ),
  },
  {
    id: "iteration",
    kicker: l("Iteration", "Итерация"),
    title: l("Before: 9 different actions. After: 3 priorities.", "Было: 9 разных действий. Стало: 3 приоритета."),
    body: l(
      "Everything else moved one level down, still reachable, no longer competing for attention.",
      "Всё остальное ушло на уровень ниже: доступно, но больше не спорит за внимание.",
    ),
    visual: "iteration",
  },
  {
    id: "final",
    kicker: l("Final product", "Итоговый продукт"),
    title: l("Know what to do next.", "Знай, что делать дальше."),
    body: l(
      "Milan first. The tasks live in data, so another city is a new file, not a new interface.",
      "Сначала Милан. Задачи живут в данных, поэтому новый город — это новый файл, а не новый интерфейс.",
    ),
  },
  {
    id: "reflection",
    kicker: l("Reflection", "Рефлексия"),
    title: l("What I learned about designing for uncertainty", "Чему я научилась, проектируя для неопределённости"),
    body: l(
      "People under stress do not need more options. They need permission to ignore most of them today.",
      "Людям в стрессе не нужно больше вариантов. Им нужно разрешение сегодня не думать о большинстве из них.",
    ),
  },
];
