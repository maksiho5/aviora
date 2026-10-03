import type { CityGuide } from "../model/types";
import { l } from "@/shared/lib/localized";

const amsterdamGemeente = "https://www.amsterdam.nl/en/";
const ind = "https://ind.nl/en";
const studentTip = l("Student tip", "Совет студентов");

export const amsterdam: CityGuide = {
  id: "amsterdam",
  name: l("Amsterdam", "Амстердам"),
  country: l("Netherlands", "Нидерланды"),
  tagline: l(
    "Same first month, different system: everything starts with your BSN.",
    "Тот же первый месяц, другая система: всё начинается с BSN.",
  ),
  center: [52.3676, 4.9041],
  budget: { rent: 950, food: 300, transport: 40, phone: 12, health: 40, fun: 150 },
  tips: [
    {
      text: l(
        "Book the municipality appointment before you fly. Slots go fast in August.",
        "Запишись в муниципалитет ещё до вылета. В августе слоты быстро заканчиваются.",
      ),
      author: studentTip,
    },
    {
      text: l("Buy two bike locks. Seriously, two.", "Купи два замка для велосипеда. Серьёзно, два."),
      author: studentTip,
    },
    {
      text: l(
        "Make sure your address allows registration before you sign anything.",
        "Убедись, что по адресу можно зарегистрироваться, прежде чем что-то подписывать.",
      ),
      author: studentTip,
    },
  ],
  tasks: [
    {
      id: "housing-check",
      title: l("Check your address allows registration", "Проверь, что по адресу можно зарегистрироваться"),
      summary: l(
        "Without a registrable address there is no BSN, and without a BSN almost nothing else works.",
        "Без адреса с правом регистрации не будет BSN, а без BSN почти ничего не работает.",
      ),
      category: "housing",
      urgency: "critical",
      minutes: 15,
      window: [1, 3],
      dependsOn: [],
      steps: [
        l(
          "Ask your landlord in writing whether you can register at the address.",
          "Спроси у арендодателя письменно, можно ли зарегистрироваться по адресу.",
        ),
        l(
          "Get a signed rental contract or a statement from the main occupant.",
          "Получи подписанный договор аренды или заявление основного жильца.",
        ),
      ],
      documents: [l("Rental contract", "Договор аренды"), l("Passport", "Паспорт")],
      sources: [
        { kind: "official", label: l("City of Amsterdam", "Муниципалитет Амстердама"), url: amsterdamGemeente },
        {
          kind: "community",
          label: l(
            "“No registration” rooms are cheaper for a reason. Avoid them.",
            "Комнаты «без регистрации» дешевле не просто так. Лучше избегать.",
          ),
        },
      ],
    },
    {
      id: "municipality-registration",
      title: l("Municipality registration", "Регистрация в муниципалитете"),
      summary: l(
        "Register in the BRP at the city’s appointment desk if you stay longer than four months.",
        "Зарегистрируйся в BRP в муниципалитете, если остаёшься дольше четырёх месяцев.",
      ),
      category: "admin",
      urgency: "critical",
      minutes: 45,
      window: [1, 5],
      dependsOn: ["housing-check"],
      steps: [
        l(
          "Book an appointment on the City of Amsterdam website.",
          "Запишись на приём на сайте муниципалитета Амстердама.",
        ),
        l(
          "Check whether your birth certificate needs an apostille and translation.",
          "Проверь, нужен ли апостиль и перевод для свидетельства о рождении.",
        ),
        l("Go to the appointment with every original document.", "Приходи на приём со всеми оригиналами."),
      ],
      documents: [
        l("Passport", "Паспорт"),
        l("Rental contract", "Договор аренды"),
        l("Birth certificate (if requested)", "Свидетельство о рождении (если попросят)"),
      ],
      sources: [
        { kind: "official", label: l("City of Amsterdam: registration", "Амстердам: регистрация"), url: amsterdamGemeente },
        {
          kind: "community",
          label: l(
            "Universities often run registration days with the city in September.",
            "В сентябре вузы часто проводят дни регистрации вместе с муниципалитетом.",
          ),
        },
      ],
    },
    {
      id: "bsn",
      title: l("Receive your BSN", "Получи BSN"),
      summary: l(
        "Your citizen service number. Banks, insurers, employers and doctors all ask for it.",
        "Твой персональный номер. Его спрашивают банк, страховая, работодатель и врач.",
      ),
      category: "admin",
      urgency: "critical",
      minutes: 5,
      window: [2, 10],
      dependsOn: ["municipality-registration"],
      steps: [
        l(
          "You usually get it at the appointment or by letter a few days later.",
          "Обычно его выдают на приёме или присылают письмом через несколько дней.",
        ),
        l("Keep a photo of the letter somewhere safe.", "Сохрани фото письма в надёжном месте."),
      ],
      documents: [],
      sources: [{ kind: "official", label: l("Government of the Netherlands", "Правительство Нидерландов"), url: "https://www.government.nl" }],
    },
    {
      id: "residence-permit-nl",
      title: l("Collect your residence permit", "Забери вид на жительство"),
      summary: l(
        "Non-EU students pick up the permit card at an IND desk by appointment.",
        "Студенты не из ЕС забирают карту вида на жительство в офисе IND по записи.",
      ),
      category: "admin",
      urgency: "critical",
      minutes: 60,
      window: [1, 14],
      dependsOn: [],
      nonEuOnly: true,
      steps: [
        l("Wait for the IND or university email with the pickup instructions.", "Дождись письма от IND или вуза с инструкцией."),
        l("Book the pickup appointment and bring your passport.", "Запишись на выдачу и возьми паспорт."),
        l(
          "Check whether your nationality requires a TB test.",
          "Проверь, нужен ли для твоего гражданства тест на туберкулёз.",
        ),
      ],
      documents: [l("Passport", "Паспорт"), l("IND letter", "Письмо от IND")],
      sources: [{ kind: "official", label: l("IND", "IND"), url: ind }],
    },
    {
      id: "ovpay",
      title: l("Travel with OVpay", "Езди с OVpay"),
      summary: l(
        "Tap in and out with your contactless bank card on trams, metro and trains.",
        "Прикладывай бесконтактную карту при входе и выходе в трамвае, метро и поезде.",
      ),
      category: "transport",
      urgency: "easy",
      minutes: 5,
      window: [1, 2],
      dependsOn: [],
      steps: [
        l("Use the same card or phone to check in and out.", "Используй одну и ту же карту или телефон на входе и выходе."),
        l("Always check out, or you pay the maximum fare.", "Всегда отмечайся на выходе, иначе спишут максимальный тариф."),
      ],
      documents: [],
      sources: [
        { kind: "official", label: l("OVpay", "OVpay"), url: "https://www.ovpay.nl/en" },
        {
          kind: "community",
          label: l("For daily trips a bike is cheaper than any pass.", "Для ежедневных поездок велосипед дешевле любого проездного."),
        },
      ],
    },
    {
      id: "bank-account-nl",
      title: l("Open a Dutch bank account", "Открой голландский счёт"),
      summary: l(
        "Many shops and the university canteen only take Dutch debit cards.",
        "Многие магазины и столовая вуза принимают только голландские дебетовые карты.",
      ),
      category: "money",
      urgency: "important",
      minutes: 30,
      window: [3, 15],
      dependsOn: ["bsn"],
      steps: [
        l("Compare student accounts at the major banks.", "Сравни студенческие счета в крупных банках."),
        l("Open it in the app with your passport and BSN.", "Открой счёт в приложении с паспортом и BSN."),
      ],
      documents: [l("Passport", "Паспорт"), l("BSN", "BSN")],
      sources: [
        {
          kind: "community",
          label: l("Some banks let you start before the BSN arrives.", "Некоторые банки позволяют начать до получения BSN."),
        },
      ],
    },
    {
      id: "digid",
      title: l("Apply for DigiD", "Оформи DigiD"),
      summary: l(
        "Your login for government, tax and health websites.",
        "Логин для госуслуг, налоговой и медицинских сайтов.",
      ),
      category: "admin",
      urgency: "important",
      minutes: 15,
      window: [7, 20],
      dependsOn: ["bsn"],
      steps: [
        l("Apply online with your BSN.", "Подай заявку онлайн с BSN."),
        l("Activate it with the code sent to your address.", "Активируй его кодом, который придёт по почте."),
      ],
      documents: [l("BSN", "BSN")],
      sources: [{ kind: "official", label: l("DigiD", "DigiD"), url: "https://www.digid.nl/en" }],
    },
    {
      id: "health-insurance-nl",
      title: l("Check your health insurance", "Проверь медицинскую страховку"),
      summary: l(
        "If you take a part-time job, Dutch basic insurance becomes mandatory.",
        "Если устроишься на подработку, базовая голландская страховка станет обязательной.",
      ),
      category: "health",
      urgency: "important",
      minutes: 30,
      window: [5, 30],
      dependsOn: ["bsn"],
      steps: [
        l("Check what your current student insurance covers.", "Проверь, что покрывает твоя студенческая страховка."),
        l(
          "If you start working, switch to Dutch basic insurance within four months.",
          "Если начнёшь работать, перейди на базовую голландскую страховку в течение четырёх месяцев.",
        ),
      ],
      documents: [l("BSN", "BSN"), l("Current policy", "Текущий полис")],
      sources: [{ kind: "official", label: l("Government of the Netherlands", "Правительство Нидерландов"), url: "https://www.government.nl" }],
    },
    {
      id: "gp-registration",
      title: l("Register with a GP", "Прикрепись к врачу общей практики"),
      summary: l(
        "A huisarts near home is your entry point to all healthcare.",
        "Huisarts рядом с домом — вход во всю медицинскую систему.",
      ),
      category: "health",
      urgency: "easy",
      minutes: 20,
      window: [10, 30],
      dependsOn: ["health-insurance-nl"],
      steps: [
        l("Find practices that accept new patients in your postcode.", "Найди практики, которые принимают новых пациентов по твоему индексу."),
        l("Fill in their registration form.", "Заполни их регистрационную форму."),
      ],
      documents: [l("BSN", "BSN"), l("Insurance details", "Данные страховки")],
      sources: [{ kind: "community", label: l("Student GP practices near campus are the easiest start.", "Студенческие практики возле кампуса — самый простой вариант.") }],
    },
    {
      id: "student-card-nl",
      title: l("Student ID", "Студенческий билет"),
      summary: l(
        "Finish enrolment and collect your student card during introduction week.",
        "Заверши зачисление и получи студенческий в introduction week.",
      ),
      category: "university",
      urgency: "important",
      minutes: 20,
      window: [2, 8],
      dependsOn: [],
      steps: [
        l("Upload your photo in the university portal.", "Загрузи фото в портал университета."),
        l("Pick up the card at the service desk.", "Забери карту на сервисной стойке."),
      ],
      documents: [l("Passport", "Паспорт")],
      sources: [{ kind: "official", label: l("Your university’s student desk", "Студенческий офис твоего вуза") }],
    },
    {
      id: "bike",
      title: l("Get a bike", "Купи велосипед"),
      summary: l("The real public transport of the city.", "Настоящий общественный транспорт города."),
      category: "transport",
      urgency: "easy",
      minutes: 60,
      costEur: [80, 200],
      window: [2, 12],
      dependsOn: [],
      steps: [
        l("Buy second-hand from a shop, not from a stranger at night.", "Покупай б/у в магазине, а не у незнакомца ночью."),
        l("Get lights and two locks.", "Купи фары и два замка."),
      ],
      documents: [],
      sources: [{ kind: "community", label: l("A bike subscription is a good start if you are unsure.", "Если сомневаешься, начни с подписки на велосипед.") }],
    },
    {
      id: "supermarket-nl",
      title: l("Find a supermarket", "Найди супермаркет"),
      summary: l("Locate the nearest supermarket and get its bonus card.", "Найди ближайший супермаркет и оформи бонусную карту."),
      category: "daily",
      urgency: "easy",
      minutes: 10,
      window: [1, 3],
      dependsOn: [],
      steps: [l("Look on the map for supermarkets within ten minutes.", "Найди на карте супермаркеты в десяти минутах.")],
      documents: [],
      sources: [],
    },
  ],
};
