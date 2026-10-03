import type { ImageKey } from "@/shared/assets/images";
import { l, type Localized } from "@/shared/lib/localized";

export interface CostLine {
  label: Localized;
  range: [min: number, max: number];
}

export interface ItalyCity {
  slug: string;
  name: Localized;
  region: Localized;
  image: ImageKey;
  imageAlt: Localized;
  rhythm: Localized;
  intro: Localized;
  universities: string[];
  study: Localized;
  live: Localized;
  cost: CostLine[];
  discover: Localized[];
  hasFirst30?: boolean;
}

const rent = l("Room in a shared flat", "Комната в квартире");
const food = l("Groceries", "Продукты");
const transport = l("Transport", "Транспорт");
const other = l("Phone, coffee, the rest", "Связь, кофе и прочее");

export const italyCities: ItalyCity[] = [
  {
    slug: "milan",
    name: l("Milan", "Милан"),
    region: l("Lombardy", "Ломбардия"),
    image: "desk",
    imageAlt: l("A desk with a laptop, notes and coffee", "Стол с ноутбуком, конспектами и кофе"),
    rhythm: l("Moves faster", "Двигается быстрее"),
    intro: l(
      "Design, business and engineering in a city that works like a clock. Expensive, international, and full of people who arrived last year and figured it out.",
      "Дизайн, бизнес и инженерия в городе, который работает как часы. Дорого, интернационально и полно людей, которые приехали год назад и уже во всём разобрались.",
    ),
    universities: ["Politecnico di Milano", "Università Bocconi", "Università degli Studi di Milano"],
    study: l(
      "Strong English-taught programmes in engineering, architecture, design and economics. Admissions open early and fill quickly.",
      "Сильные англоязычные программы по инженерии, архитектуре, дизайну и экономике. Приём открывается рано и быстро заполняется.",
    ),
    live: l(
      "Città Studi and Lambrate for students, Navigli for evenings, NoLo for something more local. The metro gets you almost everywhere in twenty minutes.",
      "Città Studi и Ламбрате для студентов, Навильи для вечеров, NoLo для чего-то более местного. Метро довезёт почти куда угодно за двадцать минут.",
    ),
    cost: [
      { label: rent, range: [600, 900] },
      { label: food, range: [220, 320] },
      { label: transport, range: [22, 40] },
      { label: other, range: [80, 150] },
    ],
    discover: [
      l("Aperitivo along the canals", "Аперитив вдоль каналов"),
      l("Free museum Sundays", "Бесплатные музеи по воскресеньям"),
      l("Day trips to Lake Como", "Поездки на озеро Комо"),
    ],
    hasFirst30: true,
  },
  {
    slug: "bologna",
    name: l("Bologna", "Болонья"),
    region: l("Emilia-Romagna", "Эмилия-Романья"),
    image: "colonnade",
    imageAlt: l("A long stone colonnade", "Длинная каменная колоннада"),
    rhythm: l("Built around a university", "Построена вокруг университета"),
    intro: l(
      "Home to the oldest university in the Western world. Porticoes, red brick and a city where students are not a minority but the main character.",
      "Здесь старейший университет западного мира. Портики, красный кирпич и город, где студенты не меньшинство, а главные герои.",
    ),
    universities: ["Università di Bologna"],
    study: l(
      "A huge range of programmes, many in English, and campuses spread across Romagna as well.",
      "Огромный выбор программ, многие на английском, и кампусы по всей Романье.",
    ),
    live: l(
      "Everything is walkable. The university district is loud, the hills to the south are quiet.",
      "Всё в пешей доступности. Университетский квартал шумный, холмы на юге тихие.",
    ),
    cost: [
      { label: rent, range: [450, 650] },
      { label: food, range: [200, 280] },
      { label: transport, range: [0, 30] },
      { label: other, range: [70, 130] },
    ],
    discover: [
      l("Walk up to San Luca under the porticoes", "Подъём к Сан-Луке под портиками"),
      l("Mercato delle Erbe", "Рынок Mercato delle Erbe"),
      l("Tortellini, obviously", "Тортеллини, конечно"),
    ],
  },
  {
    slug: "rome",
    name: l("Rome", "Рим"),
    region: l("Lazio", "Лацио"),
    image: "colosseum",
    imageAlt: l("The Colosseum on film", "Колизей на плёнку"),
    rhythm: l("Feels international from day one", "С первого дня ощущается интернациональным"),
    intro: l(
      "A capital that is also a very big village. Slow bureaucracy, fast scooters, and history on the way to the supermarket.",
      "Столица, которая одновременно очень большая деревня. Медленная бюрократия, быстрые скутеры и история по дороге в супермаркет.",
    ),
    universities: ["Sapienza Università di Roma", "Università di Roma Tor Vergata", "Università Roma Tre"],
    study: l(
      "Large public universities with growing English-taught tracks, especially in medicine, engineering and international relations.",
      "Большие государственные университеты с растущим числом англоязычных программ, особенно в медицине, инженерии и международных отношениях.",
    ),
    live: l(
      "San Lorenzo near Sapienza is the student default. Distances are big, so check commute times before signing a lease.",
      "Сан-Лоренцо рядом с Сапиенцей — студенческий вариант по умолчанию. Расстояния большие, проверяй дорогу до вуза до подписания договора.",
    ),
    cost: [
      { label: rent, range: [500, 750] },
      { label: food, range: [220, 300] },
      { label: transport, range: [20, 35] },
      { label: other, range: [80, 140] },
    ],
    discover: [
      l("First Sunday of the month: free state museums", "Первое воскресенье месяца: бесплатные госмузеи"),
      l("Trastevere before the tourists wake up", "Трастевере, пока туристы спят"),
      l("The sea at Ostia, one train away", "Море в Остии, один поезд"),
    ],
  },
  {
    slug: "florence",
    name: l("Florence", "Флоренция"),
    region: l("Tuscany", "Тоскана"),
    image: "tuscany",
    imageAlt: l("Soft Tuscan hills", "Мягкие тосканские холмы"),
    rhythm: l("Quieter, and very beautiful", "Тише и очень красиво"),
    intro: l(
      "Art, architecture and a city centre the size of a campus. Busy with visitors by day, small and local by night.",
      "Искусство, архитектура и исторический центр размером с кампус. Днём много туристов, вечером город маленький и свой.",
    ),
    universities: ["Università degli Studi di Firenze"],
    study: l(
      "Known for architecture, art history, agriculture and design. Many international programmes run alongside.",
      "Известна архитектурой, историей искусства, агрономией и дизайном. Много международных программ.",
    ),
    live: l(
      "Rent rises near the Duomo. Students look at Campo di Marte, Novoli and Rifredi.",
      "Ближе к Дуомо аренда дороже. Студенты смотрят Кампо-ди-Марте, Новоли и Рифреди.",
    ),
    cost: [
      { label: rent, range: [500, 700] },
      { label: food, range: [210, 290] },
      { label: transport, range: [20, 35] },
      { label: other, range: [70, 130] },
    ],
    discover: [
      l("Sunset at San Miniato", "Закат у Сан-Миниато"),
      l("Sant’Ambrogio market", "Рынок Сант-Амброджо"),
      l("Weekend trains to Siena and Lucca", "Поезда на выходные в Сиену и Лукку"),
    ],
  },
  {
    slug: "pisa",
    name: l("Pisa", "Пиза"),
    region: l("Tuscany", "Тоскана"),
    image: "pisaTower",
    imageAlt: l("The Leaning Tower of Pisa at dusk", "Пизанская башня в сумерках"),
    rhythm: l("Small, focused, student-sized", "Маленькая, собранная, по размеру студента"),
    intro: l(
      "A small city where a third of the people you meet are students. The tower is for visitors. The river and the libraries are yours.",
      "Маленький город, где каждый третий встречный — студент. Башня для туристов. Река и библиотеки — твои.",
    ),
    universities: ["Università di Pisa", "Scuola Normale Superiore", "Scuola Superiore Sant’Anna"],
    study: l(
      "Strong in sciences, engineering and computer science, with two highly selective schools of excellence.",
      "Сильна в естественных науках, инженерии и информатике, плюс две очень избирательные школы excellence.",
    ),
    live: l(
      "Bike everywhere. The coast is twenty minutes away and Florence is an hour by train.",
      "Везде на велосипеде. До моря двадцать минут, до Флоренции час на поезде.",
    ),
    cost: [
      { label: rent, range: [350, 500] },
      { label: food, range: [190, 260] },
      { label: transport, range: [0, 25] },
      { label: other, range: [60, 110] },
    ],
    discover: [
      l("Lungarni walks at night", "Прогулки по набережным ночью"),
      l("The beach at Marina di Pisa", "Пляж в Марина-ди-Пиза"),
      l("Luminara in June", "Луминара в июне"),
    ],
  },
];

export function getItalyCity(slug: string) {
  return italyCities.find((city) => city.slug === slug);
}
