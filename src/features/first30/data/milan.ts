import type { CityGuide } from "../model/types";
import { l } from "@/shared/lib/localized";

const agenziaEntrate = "https://www.agenziaentrate.gov.it";
const poliziaDiStato = "https://www.poliziadistato.it";
const atsMilano = "https://www.ats-milano.it";
const studentTip = l("Student tip", "Совет студентов");

export const milan: CityGuide = {
  id: "milan",
  name: l("Milan", "Милан"),
  country: l("Italy", "Италия"),
  tagline: l(
    "Fast city, short distances, a lot of paperwork in week one.",
    "Быстрый город, короткие расстояния и много бумаг в первую неделю.",
  ),
  center: [45.4642, 9.19],
  budget: { rent: 750, food: 280, transport: 22, phone: 10, health: 60, fun: 150 },
  tips: [
    {
      text: l("Don’t try to do everything on your first day.", "Не пытайся сделать всё в первый же день."),
      author: studentTip,
    },
    {
      text: l(
        "Make five photocopies of your passport and visa. Every office asks for one.",
        "Сделай пять копий паспорта и визы. Их просят в каждом офисе.",
      ),
      author: studentTip,
    },
    {
      text: l(
        "Keep the post-office receipt with you. Until the card arrives, it is your permit.",
        "Носи с собой квитанцию с почты. Пока не пришла карта, она и есть твой вид на жительство.",
      ),
      author: studentTip,
    },
    {
      text: l("Most offices close for lunch. Go in the morning.", "Большинство офисов закрываются на обед. Иди утром."),
      author: studentTip,
    },
  ],
  tasks: [
    {
      id: "emergency-basics",
      title: l("Save emergency numbers", "Сохрани экстренные номера"),
      summary: l(
        "112 works for everything. Add your university’s international office too.",
        "112 работает для всего. Добавь ещё номер international office своего вуза.",
      ),
      category: "daily",
      urgency: "easy",
      minutes: 2,
      window: [1, 10],
      dependsOn: [],
      steps: [
        l("Save 112 as the single emergency number.", "Сохрани 112 как единый экстренный номер."),
        l(
          "Save the international office phone and email from your admission letter.",
          "Сохрани телефон и почту international office из письма о зачислении.",
        ),
        l("Share your address with someone at home.", "Отправь свой адрес кому-нибудь из близких."),
      ],
      documents: [],
      sources: [{ kind: "official", label: l("European emergency number 112", "Единый номер 112"), url: "https://112.eu" }],
    },
    {
      id: "housing-proof",
      title: l("Get proof of where you live", "Получи подтверждение адреса"),
      summary: l(
        "A registered lease or a host’s declaration. Almost every next step asks for it.",
        "Зарегистрированный договор аренды или декларация хозяина. Её просят почти на каждом следующем шаге.",
      ),
      category: "housing",
      urgency: "critical",
      minutes: 15,
      window: [1, 3],
      dependsOn: [],
      steps: [
        l(
          "Ask your landlord for a copy of the registered lease (contratto registrato).",
          "Попроси у арендодателя копию зарегистрированного договора (contratto registrato).",
        ),
        l(
          "If you rent a room without your own lease, ask for a dichiarazione di ospitalità.",
          "Если живёшь без своего договора, попроси dichiarazione di ospitalità.",
        ),
        l("Keep a PDF on your phone and one paper copy.", "Держи PDF в телефоне и одну бумажную копию."),
      ],
      documents: [l("Passport", "Паспорт"), l("Lease or host declaration", "Договор аренды или декларация хозяина")],
      sources: [
        {
          kind: "official",
          label: l("Agenzia delle Entrate: lease registration", "Agenzia delle Entrate: регистрация аренды"),
          url: agenziaEntrate,
        },
        {
          kind: "community",
          label: l(
            "Ask the landlord in writing, so you have it in the chat.",
            "Проси у хозяина письменно, чтобы это осталось в переписке.",
          ),
        },
      ],
      tip: l(
        "No proof of address usually means a second trip to the post office.",
        "Без подтверждения адреса почти всегда придётся идти на почту второй раз.",
      ),
    },
    {
      id: "tax-code",
      title: l("Get your codice fiscale", "Получи codice fiscale"),
      summary: l(
        "Italy’s tax code. Banks, phone plans, transport passes and doctors all ask for it.",
        "Итальянский налоговый код. Его спрашивают банк, оператор связи, транспорт и врач.",
      ),
      category: "admin",
      urgency: "critical",
      minutes: 45,
      costEur: [0, 0],
      window: [1, 5],
      dependsOn: [],
      steps: [
        l(
          "Check your admission email: some universities or consulates already issued it.",
          "Проверь письмо о зачислении: иногда код уже выдал вуз или консульство.",
        ),
        l(
          "If not, book a slot at Agenzia delle Entrate or go early in the morning.",
          "Если нет, запишись в Agenzia delle Entrate или приходи рано утром.",
        ),
        l(
          "Fill in form AA4/8 and hand it in with your passport and visa.",
          "Заполни форму AA4/8 и подай её вместе с паспортом и визой.",
        ),
        l(
          "You leave with a paper certificate. The plastic card comes by post later.",
          "Тебе выдадут бумажный сертификат. Пластиковая карта придёт почтой позже.",
        ),
      ],
      documents: [l("Passport", "Паспорт"), l("Visa", "Виза"), l("Form AA4/8", "Форма AA4/8")],
      sources: [
        { kind: "official", label: l("Agenzia delle Entrate", "Agenzia delle Entrate"), url: agenziaEntrate },
        {
          kind: "community",
          label: l("Queues are shortest right at opening time.", "Очереди короче всего сразу после открытия."),
        },
      ],
    },
    {
      id: "residence-permit",
      title: l("Residence registration", "Вид на жительство"),
      summary: l(
        "Non-EU students request a permesso di soggiorno within 8 working days of arrival.",
        "Студенты не из ЕС подают на permesso di soggiorno в течение 8 рабочих дней после въезда.",
      ),
      category: "admin",
      urgency: "critical",
      minutes: 60,
      costEur: [110, 130],
      window: [1, 8],
      dependsOn: ["housing-proof"],
      nonEuOnly: true,
      steps: [
        l(
          "Pick up the permit kit at a post office with a Sportello Amico desk.",
          "Возьми набор документов в почтовом отделении со стойкой Sportello Amico.",
        ),
        l(
          "Fill in only the pages that apply to study permits.",
          "Заполни только страницы, которые относятся к учебному permesso.",
        ),
        l("Buy a €16 marca da bollo at a tabaccheria.", "Купи марку marca da bollo за €16 в табаккерии."),
        l(
          "Hand in the open envelope at the post office and pay the fees.",
          "Отдай открытый конверт на почте и оплати сборы.",
        ),
        l(
          "Keep the receipt: it shows your Questura appointment date.",
          "Сохрани квитанцию: в ней дата приёма в Questura.",
        ),
      ],
      documents: [
        l("Passport and copies of every page", "Паспорт и копии всех страниц"),
        l("University enrolment letter", "Письмо о зачислении"),
        l("Proof of address", "Подтверждение адреса"),
        l("Health insurance", "Медицинская страховка"),
        l("Proof of funds", "Подтверждение средств"),
      ],
      sources: [
        { kind: "official", label: l("Portale Immigrazione", "Portale Immigrazione"), url: "https://www.portaleimmigrazione.it" },
        {
          kind: "official",
          label: l("Polizia di Stato: residence permits", "Polizia di Stato: вид на жительство"),
          url: poliziaDiStato,
        },
        {
          kind: "community",
          label: l(
            "Bring a pen and fill in the kit at a café, not at the counter.",
            "Возьми ручку и заполни набор в кафе, а не у окошка.",
          ),
        },
      ],
      tip: l(
        "Fees change. Check the amount on the official portal before you go.",
        "Сборы меняются. Проверь сумму на официальном портале перед походом.",
      ),
    },
    {
      id: "sim-card",
      title: l("Get an Italian SIM", "Купи итальянскую SIM-карту"),
      summary: l(
        "A local number for the bank, the university and two-factor codes.",
        "Местный номер для банка, университета и кодов подтверждения.",
      ),
      category: "daily",
      urgency: "important",
      minutes: 30,
      costEur: [8, 15],
      window: [1, 4],
      dependsOn: ["tax-code"],
      steps: [
        l("Compare student offers from the main operators.", "Сравни студенческие тарифы основных операторов."),
        l("Bring your passport and codice fiscale to the shop.", "Возьми в салон паспорт и codice fiscale."),
        l(
          "Turn on Wi-Fi calling in case your room has a weak signal.",
          "Включи звонки по Wi-Fi на случай слабого сигнала в комнате.",
        ),
      ],
      documents: [l("Passport", "Паспорт"), l("Codice fiscale", "Codice fiscale")],
      sources: [
        {
          kind: "community",
          label: l(
            "An eSIM is fine for the first days, a local number is better for the bank.",
            "eSIM хватит на первые дни, но для банка лучше местный номер.",
          ),
        },
      ],
    },
    {
      id: "supermarket",
      title: l("Find a supermarket", "Найди супермаркет"),
      summary: l(
        "The nearest supermarket and a pharmacy on your street.",
        "Ближайший супермаркет и аптека на твоей улице.",
      ),
      category: "daily",
      urgency: "easy",
      minutes: 10,
      window: [1, 16],
      dependsOn: [],
      steps: [
        l(
          "Open the map and look for supermarkets within ten minutes on foot.",
          "Открой карту и найди супермаркеты в десяти минутах пешком.",
        ),
        l("Get the store’s loyalty card: the discounts are real.", "Оформи карту лояльности: скидки там настоящие."),
        l("Note the nearest pharmacy with a green cross.", "Запомни ближайшую аптеку с зелёным крестом."),
      ],
      documents: [],
      sources: [
        {
          kind: "community",
          label: l(
            "Neighbourhood markets are cheaper for fruit and vegetables.",
            "На районных рынках фрукты и овощи дешевле.",
          ),
        },
      ],
    },
    {
      id: "university-enrolment",
      title: l("Student ID", "Студенческий билет"),
      summary: l(
        "Finish enrolment at your university and get your student card and email.",
        "Заверши зачисление в университете и получи студенческий и почту.",
      ),
      category: "university",
      urgency: "important",
      minutes: 20,
      window: [2, 10],
      dependsOn: [],
      steps: [
        l(
          "Log in to the university portal with the credentials from your admission email.",
          "Зайди в портал университета с данными из письма о зачислении.",
        ),
        l(
          "Upload the missing documents and a passport-style photo.",
          "Загрузи недостающие документы и фото как на паспорт.",
        ),
        l(
          "Visit the international office if anything is still marked as pending.",
          "Сходи в international office, если что-то висит в статусе pending.",
        ),
      ],
      documents: [l("Admission letter", "Письмо о зачислении"), l("Passport photo", "Фото на документы")],
      sources: [
        { kind: "official", label: l("Your university’s international office", "International office твоего вуза") },
        {
          kind: "community",
          label: l(
            "Welcome week is the fastest way to fix enrolment issues in person.",
            "Welcome week — самый быстрый способ решить вопросы с зачислением лично.",
          ),
        },
      ],
    },
    {
      id: "transport-pass",
      title: l("Get an ATM transport pass", "Оформи проездной ATM"),
      summary: l(
        "Under-27 monthly passes cover metro, trams and buses.",
        "Месячный проездной для младше 27 лет покрывает метро, трамваи и автобусы.",
      ),
      category: "transport",
      urgency: "important",
      minutes: 25,
      costEur: [22, 40],
      window: [3, 12],
      dependsOn: ["tax-code", "university-enrolment"],
      steps: [
        l("Create an account in the ATM app or visit an ATM Point.", "Создай аккаунт в приложении ATM или приди в ATM Point."),
        l(
          "Upload a photo and your codice fiscale for the personal card.",
          "Загрузи фото и codice fiscale для именной карты.",
        ),
        l(
          "Load a monthly pass. Until then, tap in with a contactless bank card.",
          "Загрузи месячный проездной. До этого можно платить бесконтактной картой.",
        ),
      ],
      documents: [l("Passport", "Паспорт"), l("Codice fiscale", "Codice fiscale"), l("Photo", "Фото")],
      sources: [
        { kind: "official", label: l("ATM Milano", "ATM Milano"), url: "https://www.atm.it" },
        {
          kind: "community",
          label: l("Contactless tap-in works from day one.", "Бесконтактная оплата работает с первого дня."),
        },
      ],
      place: { name: "ATM Point Duomo", address: "Duomo metro station, Milano", lat: 45.4641, lng: 9.1897 },
    },
    {
      id: "bank-account",
      title: l("Open a bank account", "Открой банковский счёт"),
      summary: l(
        "For rent, scholarships and some phone contracts.",
        "Для аренды, стипендии и некоторых тарифов связи.",
      ),
      category: "money",
      urgency: "important",
      minutes: 40,
      costEur: [0, 5],
      window: [8, 20],
      dependsOn: ["tax-code", "sim-card"],
      steps: [
        l("Decide between a traditional bank and an online one.", "Выбери между обычным банком и онлайн-банком."),
        l(
          "Prepare your passport, codice fiscale and proof of address.",
          "Подготовь паспорт, codice fiscale и подтверждение адреса.",
        ),
        l(
          "Ask specifically for a student account with no monthly fee.",
          "Спроси именно студенческий счёт без ежемесячной платы.",
        ),
      ],
      documents: [
        l("Passport", "Паспорт"),
        l("Codice fiscale", "Codice fiscale"),
        l("Proof of address", "Подтверждение адреса"),
      ],
      sources: [
        {
          kind: "community",
          label: l(
            "Many students start with an online bank and add a local one later.",
            "Многие начинают с онлайн-банка, а местный открывают позже.",
          ),
        },
      ],
    },
    {
      id: "questura-appointment",
      title: l("Questura fingerprint appointment", "Отпечатки пальцев в Questura"),
      summary: l(
        "Go on the date printed on your post-office receipt. Bring everything again.",
        "Приди в день, указанный в квитанции с почты. Возьми все документы снова.",
      ),
      category: "admin",
      urgency: "critical",
      minutes: 90,
      window: [10, 30],
      dependsOn: ["residence-permit"],
      nonEuOnly: true,
      steps: [
        l(
          "Check the date and time on your receipt or on the Polizia di Stato website.",
          "Проверь дату и время в квитанции или на сайте Polizia di Stato.",
        ),
        l(
          "Bring four passport photos and copies of everything you sent.",
          "Возьми четыре фото и копии всего, что отправлял.",
        ),
        l("After fingerprints, track the status of your card online.", "После отпечатков отслеживай статус карты онлайн."),
      ],
      documents: [
        l("Post-office receipt", "Квитанция с почты"),
        l("4 passport photos", "4 фото на документы"),
        l("Passport", "Паспорт"),
      ],
      sources: [{ kind: "official", label: l("Polizia di Stato", "Polizia di Stato"), url: poliziaDiStato }],
      place: { name: "Questura di Milano", address: "Via Fatebenefratelli 11, Milano", lat: 45.4733, lng: 9.1906 },
    },
    {
      id: "healthcare",
      title: l("Sort out healthcare", "Разберись с медициной"),
      summary: l(
        "Join the national health service (SSN) or keep private insurance valid in Italy.",
        "Встань на учёт в SSN или оставь частную страховку, действующую в Италии.",
      ),
      category: "health",
      urgency: "important",
      minutes: 60,
      costEur: [0, 700],
      window: [10, 30],
      dependsOn: ["tax-code", "residence-permit"],
      steps: [
        l("Check what your current insurance covers in Italy.", "Проверь, что покрывает твоя текущая страховка в Италии."),
        l(
          "If you choose the SSN, pay the yearly student fee and book at your local ATS office.",
          "Если выбираешь SSN, оплати годовой студенческий взнос и запишись в местный офис ATS.",
        ),
        l("EU students: bring your EHIC card.", "Студенты из ЕС: возьмите карту EHIC."),
      ],
      documents: [
        l("Codice fiscale", "Codice fiscale"),
        l("Permit receipt (non-EU)", "Квитанция на permesso (не ЕС)"),
        l("Enrolment certificate", "Справка о зачислении"),
      ],
      sources: [
        { kind: "official", label: l("ATS Milano", "ATS Milano"), url: atsMilano },
        {
          kind: "community",
          label: l(
            "Ask other students which ATS office has the shortest wait.",
            "Спроси у студентов, в каком офисе ATS очередь меньше.",
          ),
        },
      ],
    },
    {
      id: "family-doctor",
      title: l("Choose a family doctor", "Выбери семейного врача"),
      summary: l(
        "Once registered with the SSN, pick a medico di base near home.",
        "После регистрации в SSN выбери medico di base рядом с домом.",
      ),
      category: "health",
      urgency: "easy",
      minutes: 20,
      window: [15, 30],
      dependsOn: ["healthcare"],
      steps: [
        l("Pick a doctor from the list at the ATS office or online.", "Выбери врача из списка в ATS или онлайн."),
        l(
          "Save their opening hours: many see patients without an appointment only on some days.",
          "Запиши часы приёма: многие принимают без записи только в определённые дни.",
        ),
      ],
      documents: [l("Health card (tessera sanitaria)", "Медицинская карта (tessera sanitaria)")],
      sources: [{ kind: "official", label: l("ATS Milano", "ATS Milano"), url: atsMilano }],
    },
    {
      id: "scholarship",
      title: l("Check DSU scholarship deadlines", "Проверь сроки стипендии DSU"),
      summary: l(
        "Regional grants and reduced fees depend on income documents. Deadlines come early.",
        "Региональные гранты и скидки зависят от справок о доходах. Сроки наступают рано.",
      ),
      category: "money",
      urgency: "important",
      minutes: 30,
      window: [5, 25],
      dependsOn: ["university-enrolment"],
      steps: [
        l("Find the DSU or scholarship page on your university website.", "Найди страницу DSU или стипендий на сайте вуза."),
        l(
          "Write down the deadline and the income documents they ask for.",
          "Запиши дедлайн и список документов о доходах.",
        ),
        l(
          "Ask the international office which translations they accept.",
          "Уточни в international office, какие переводы принимают.",
        ),
      ],
      documents: [l("Family income documents", "Документы о доходах семьи")],
      sources: [{ kind: "official", label: l("Your university’s student services", "Студенческий сервис твоего вуза") }],
    },
    {
      id: "meet-people",
      title: l("Go to one student event", "Сходи на одно студенческое событие"),
      summary: l(
        "One evening with other internationals saves weeks of searching for answers.",
        "Один вечер с другими иностранцами экономит недели поиска ответов.",
      ),
      category: "social",
      urgency: "easy",
      minutes: 120,
      window: [4, 21],
      dependsOn: [],
      steps: [
        l(
          "Look up the Erasmus Student Network or your university’s student associations.",
          "Найди Erasmus Student Network или студенческие объединения своего вуза.",
        ),
        l("Pick one event this week. Just one.", "Выбери одно событие на этой неделе. Только одно."),
      ],
      documents: [],
      sources: [
        {
          kind: "community",
          label: l(
            "The most practical answers come from people who arrived a year earlier.",
            "Самые практичные ответы — от тех, кто приехал на год раньше.",
          ),
        },
      ],
    },
    {
      id: "residenza",
      title: l("Consider registering your residence", "Подумай о регистрации по месту жительства"),
      summary: l(
        "Iscrizione anagrafica at the Comune. Optional for many students, useful for longer stays.",
        "Iscrizione anagrafica в Comune. Многим студентам необязательна, но полезна при долгом проживании.",
      ),
      category: "admin",
      urgency: "easy",
      minutes: 30,
      window: [20, 30],
      dependsOn: ["housing-proof", "tax-code"],
      steps: [
        l(
          "Check on the Comune di Milano website whether it applies to you.",
          "Проверь на сайте Comune di Milano, относится ли это к тебе.",
        ),
        l("Submit the request online and wait for the address check.", "Подай заявку онлайн и дождись проверки адреса."),
      ],
      documents: [l("Passport", "Паспорт"), l("Lease", "Договор аренды"), l("Permit or receipt", "Permesso или квитанция")],
      sources: [{ kind: "official", label: l("Comune di Milano", "Comune di Milano"), url: "https://www.comune.milano.it" }],
    },
  ],
};
