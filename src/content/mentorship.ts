import { l, type Localized } from "@/shared/lib/localized";

export interface Plan {
  id: string;
  name: string;
  price: number;
  period?: Localized;
  lead: Localized;
  features: Localized[];
  featured?: boolean;
}

export interface HelpArea {
  title: Localized;
  text: Localized;
}

export interface TeamMember {
  name: Localized;
  initials: string;
  role: Localized;
  bio: Localized[];
}

const perMonth = l("/ month", "/ месяц");

export const plans: Plan[] = [
  {
    id: "start",
    name: "Start",
    price: 30,
    lead: l("60-minute strategy session", "Стратегическая сессия на 60 минут"),
    features: [
      l("Situation review", "Разбор текущей ситуации"),
      l("University direction", "Направление по университетам"),
      l("Next steps", "Следующие шаги"),
      l("Basic application & relocation roadmap", "Базовый план поступления и переезда"),
    ],
  },
  {
    id: "mentor",
    name: "Mentor",
    price: 50,
    period: perMonth,
    lead: l("The main mentorship format", "Основной формат менторства"),
    featured: true,
    features: [
      l("Personal 90-day roadmap", "Персональный план на 90 дней"),
      l("University & admissions strategy", "Стратегия выбора вуза и поступления"),
      l("Portfolio strategy", "Стратегия портфолио"),
      l("Application planning", "Планирование подачи"),
      l("Document organisation", "Организация документов"),
      l("Relocation preparation", "Подготовка к переезду"),
      l("2 calls per month", "2 созвона в месяц"),
      l("Weekly check-ins", "Еженедельные чек-ины"),
      l("Telegram support", "Поддержка в Telegram"),
      l("CV feedback", "Обратная связь по CV"),
      l("Monthly progress report", "Ежемесячный отчёт о прогрессе"),
    ],
  },
  {
    id: "relocation",
    name: "Relocation",
    price: 80,
    period: perMonth,
    lead: l("For more intensive support", "Для более плотного сопровождения"),
    features: [
      l("Everything included in Mentor", "Всё, что входит в Mentor"),
      l("Personal calls & priority support", "Личные созвоны и приоритетная поддержка"),
      l("Expanded relocation roadmap", "Расширенный план переезда"),
      l("Research of up to 5 universities or programmes", "Анализ до 5 университетов или программ"),
      l("Up to 3 document packages", "До 3 пакетов документов"),
      l("More intensive relocation preparation", "Более плотная подготовка к переезду"),
    ],
  },
  {
    id: "document-check",
    name: "Document check",
    price: 40,
    lead: l("A clear look at what you have", "Ясная картина по твоим документам"),
    features: [
      l("Structure & completeness check", "Проверка структуры и полноты"),
      l("Personal checklist", "Персональный чек-лист"),
      l("What is ready, missing or needs clarification", "Что готово, чего не хватает, что уточнить"),
      l("Clear next actions", "Понятные следующие действия"),
    ],
  },
];

export const helpAreas: HelpArea[] = [
  {
    title: l("University selection", "Выбор университета"),
    text: l("Finding and comparing study directions that match your goals.", "Поиск и сравнение направлений под твои цели."),
  },
  {
    title: l("Admissions", "Поступление"),
    text: l("Understanding application steps, requirements and timelines.", "Понимание шагов подачи, требований и сроков."),
  },
  {
    title: l("Documents", "Документы"),
    text: l(
      "Organising what is ready, what is missing and what needs clarification.",
      "Что готово, чего не хватает и что нужно уточнить.",
    ),
  },
  {
    title: l("Relocation", "Переезд"),
    text: l("Preparing for the practical side of moving to Italy.", "Подготовка к практической стороне переезда в Италию."),
  },
  {
    title: l("Personal roadmap", "Личная дорожная карта"),
    text: l("Turning a general goal into clear next steps.", "Превращаем общую цель в понятные шаги."),
  },
];

export const approachQuestions: Localized[] = [
  l("Where am I now?", "Где я сейчас?"),
  l("Where am I going?", "Куда я иду?"),
  l("What do I need?", "Что мне нужно?"),
  l("What should I do next?", "Что делать дальше?"),
];

export const team: TeamMember[] = [
  {
    name: l("Aliya Kucherkova", "Алия Кучеркова"),
    initials: "AK",
    role: l(
      "Founder & CEO · Project Lead · Italy Education & Relocation Mentor",
      "Основательница и CEO · Руководитель проекта · Ментор по образованию и переезду в Италию",
    ),
    bio: [
      l(
        "Aliya started Aviora from a personal interest in Italy and a wish to build something more structured than a collection of scattered information.",
        "Алия начала Aviora из личного интереса к Италии и желания создать что-то более системное, чем набор разрозненной информации.",
      ),
      l(
        "She leads the vision and development of the project, oversees its educational and mentorship direction, and keeps it built around the real needs of international students.",
        "Она отвечает за видение и развитие проекта, курирует образовательное и менторское направление и следит, чтобы всё строилось вокруг реальных потребностей иностранных студентов.",
      ),
    ],
  },
  {
    name: l("Sofia Malykh", "София Малых"),
    initials: "SM",
    role: l(
      "Co-Founder & Deputy Founder · Project Coordinator · PR Manager",
      "Сооснователь и заместитель основателя · Координатор проекта · PR-менеджер",
    ),
    bio: [
      l(
        "Sofia organises the internal work of the project, coordinates initiatives and keeps different parts of the team moving in one direction.",
        "София организует внутреннюю работу проекта, координирует инициативы и помогает всей команде двигаться в одном направлении.",
      ),
      l(
        "As PR Manager she shapes how Aviora talks to its audience and builds a recognisable presence around its mission.",
        "Как PR-менеджер она отвечает за то, как Aviora говорит со своей аудиторией, и делает проект узнаваемым.",
      ),
    ],
  },
  {
    name: l("Daria Bashkova", "Дарья Башкова"),
    initials: "DB",
    role: l("Project Coordinator · Content Creator", "Координатор проекта · Контент-креатор"),
    bio: [
      l(
        "Daria supports the day-to-day development of the project and the team’s coordination.",
        "Дарья поддерживает ежедневное развитие проекта и координацию команды.",
      ),
      l(
        "Through content she shows what studying, living and preparing for life in Italy really looks like, in a way that feels accessible and easy to understand.",
        "Через контент она показывает, как на самом деле выглядит учёба, жизнь и подготовка к жизни в Италии, просто и понятно.",
      ),
    ],
  },
];
