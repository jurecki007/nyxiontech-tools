// Guides: static articles that explain a task and link to the tool that does it
// (/guides/check-pdf-redaction, /pl/poradnik/anonimizacja-pdf-rodo and more). The build turns
// each into its own page (src/seo/pages.ts). Unlike the tool pages they don't load
// the app: the article is the page. Each guide exists in one language only, so it
// has no hreflang links. Describe the tools exactly as the code behaves.
//
// Inline markup in text: `code`, **bold**, [label](href). Everything else is escaped.
import type { Lang, ToolId } from '../utilities/routes.ts';

export type Block = { h2: string } | { p: string } | { ul: string[] } | { ol: string[] } | { pre: string };

export interface Guide {
  path: string;
  lang: Lang;
  /** The tool the guide is about: it links there, and that tool's page links back. */
  tool: ToolId;
  /** <title>; the build fails above 60 characters. */
  title: string;
  /** Meta description; the build fails above 155 characters. */
  description: string;
  h1: string;
  /** Label for the guide link on the tool page and in the breadcrumb. */
  name: string;
  /** ISO date, for the article's structured data. */
  published: string;
  blocks: Block[];
}

const EDPB_PSEUDONYMISATION = 'https://www.edpb.europa.eu/news/news/2025/edpb-adopts-pseudonymisation-guidelines-and-paves-way-improve-cooperation_pl';
const PORTAL_OSWIATOWY_BIP = 'https://www.portaloswiatowy.pl/wazne-wydarzenia-dla-szkol-i-przedszkoli/bip-w-szkole-pod-kontrola-uodo-27339.html';
const WPROST_MEN = 'https://www.wprost.pl/polityka/12145822/men-zaliczylo-wpadke-chodzi-o-anonimizacje-danych.html';
const KSEF_TERMINY = 'https://ksef.podatki.gov.pl/od-kiedy-trzeba-wystawiac-faktury-w-ksef';
const EIDAS = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32014R0910';
const ESIGN = 'https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap96.htm';
const PDF2_METADATA = 'https://pdf-issues.pdfa.org/32000-2-2020/clause14.html#H14.3';
const WORD_TO_PDF = 'https://support.microsoft.com/office/save-or-convert-to-pdf-d85416c5-7d77-4fd6-a216-6f4bf7c7c110';
const EXIFTOOL_PDF = 'https://exiftool.org/TagNames/PDF.html';
const OUTLOOK_LIMITS = 'https://support.microsoft.com/en-us/office/send-large-files-with-outlook-8c698842-b462-4a4c-8d53-5c5dd04f77ef';
const RFC2045_BASE64 = 'https://www.rfc-editor.org/rfc/rfc2045#section-6.8';
const EIDAS_PL = 'https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32014R0910';
const KODEKS_CYWILNY = 'https://eli.gov.pl/eli/DU/2025/1071/ogl/pol/pdf';
const USTAWA_INFORMATYZACJA = 'https://eli.gov.pl/eli/DU/2024/1557/ogl/pol/pdf';
const GOV_PODPIS = 'https://www.gov.pl/web/gov/podpisz-dokument-elektronicznie-wykorzystaj-podpis-zaufany';
const APPLE_HEIF = 'https://support.apple.com/en-us/116944';
const APPLE_HEIF_PL = 'https://support.apple.com/pl-pl/116944';
const GMAIL_LIMIT_PL = 'https://support.google.com/mail/answer/6584?hl=pl';
const OUTLOOK_LIMITS_PL = 'https://support.microsoft.com/pl-pl/outlook/sending-limits-in-outlook-com';
const M365_LIMITS_PL = 'https://learn.microsoft.com/pl-pl/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits';
const WP_REGULAMIN = 'https://pomoc.wp.pl/regulamin';
const O2_REGULAMIN = 'https://pomoc.o2.pl/regulamin';
const INTERIA_PARAMETRY = 'https://pomoc.poczta.interia.pl/pocztapro/news-porownanie-parametrow-konta-bezplatnego-platnego-i-konta-w-r,nId,2642723';
const WORD_OPEN_PDF = 'https://support.microsoft.com/en-us/word/opening-pdfs-in-word';
const WORD_OPEN_PDF_PL = 'https://support.microsoft.com/pl-pl/word/opening-pdfs-in-word';
const CHROME_DEVTOOLS_NETWORK = 'https://developer.chrome.com/docs/devtools/network';
const FIREFOX_NETWORK_MONITOR = 'https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/';
const MDN_CONNECT_SRC = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src';
const MDN_FORM_ACTION = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/form-action';
const MDN_BLOB_URL = 'https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/blob';
const PDF_HIDDEN_DATA_STUDY = 'https://arxiv.org/abs/2103.02707';
const EXIFTOOL_POD = 'https://exiftool.org/exiftool_pod.html';
const USTAWA_DOSTEPNOSC = 'https://eli.gov.pl/api/acts/DU/2023/82/text/I/D20230082.pdf';
const EN301549 = 'https://www.etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf';
const GOV_DOSTEPNE_DOKUMENTY = 'https://www.gov.pl/web/dostepnosc-cyfrowa/jak-tworzyc-dostepne-dokumenty-tekstowe-w-edytorze-ms-word';
const UODO_BIP_DECYZJA = 'https://uodo.gov.pl/pl/138/4402';
const RODO_PL = 'https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32016R0679';

export const GUIDES: Guide[] = [
  {
    path: '/pl/poradnik/anonimizacja-pdf-rodo',
    lang: 'pl',
    tool: 'redact',
    title: 'Anonimizacja PDF (RODO): jak trwale usunąć PESEL i NIP',
    description:
      'Dlaczego czarny prostokąt nie usuwa danych z PDF, jak sprawdzić anonimizację (kopiuj-wklej, wyszukiwanie, pdftotext) i lista kontrolna dla CV i umów.',
    h1: 'Anonimizacja dokumentów PDF zgodnie z RODO: jak trwale usunąć PESEL, NIP, numer konta',
    name: 'Poradnik: anonimizacja PDF zgodnie z RODO',
    published: '2026-11-06',
    blocks: [
      {
        p: 'Zanim wyślesz umowę, CV albo dokument klientowi, często trzeba ukryć PESEL, NIP, numer konta czy adres. Najczęstszy błąd to zasłonięcie danych czarnym prostokątem, który tylko je przykrywa. Ten poradnik wyjaśnia różnicę między anonimizacją a pseudonimizacją, pokazuje, jak w kilka minut sprawdzić gotowy plik, i opisuje, jak robi to nasze narzędzie [Anonimizuj PDF](/pl/anonimizuj-pdf).',
      },
      { p: 'To poradnik techniczny, a nie porada prawna. Jeśli nie wiesz, jakie dane możesz udostępnić, zapytaj inspektora ochrony danych w swojej firmie.' },

      { h2: 'Anonimizacja a pseudonimizacja' },
      {
        p: 'RODO definiuje pseudonimizację w art. 4 pkt 5: dane przetwarza się tak, żeby bez dodatkowych informacji nie dało się ich przypisać konkretnej osobie, a te dodatkowe informacje przechowuje się osobno i zabezpiecza. Przykład: w raporcie zamiast nazwiska piszesz „Klient 17”, a tabela z nazwiskami zostaje w firmie. Takie dane nadal są danymi osobowymi, co podkreśla też Europejska Rada Ochrony Danych w [komunikacie o wytycznych dotyczących pseudonimizacji](' +
          EDPB_PSEUDONYMISATION +
          ').',
      },
      {
        p: 'Anonimizacja idzie dalej: po niej osoby nie da się już zidentyfikować, także przy użyciu innych informacji, po które ktoś mógłby rozsądnie sięgnąć. Artykuł 4 jej nie definiuje; pisze o niej motyw 26 RODO: „Zasady ochrony danych nie powinny więc mieć zastosowania do informacji anonimowych”. W praktyce usunięcie samego PESEL-u często nie wystarcza. Jeśli w dokumencie zostaje imię, nazwisko, adres i stanowisko, osoba wciąż jest rozpoznawalna.',
      },
      { p: 'Niezależnie od tego, którą metodę wybierasz, jedno jest wspólne: usunięty tekst musi naprawdę zniknąć z pliku, a nie tylko z ekranu.' },

      { h2: 'Dlaczego czarny prostokąt nie wystarcza' },
      {
        p: 'PDF składa się z warstw: tekstu strony, rysunków, obrazów, komentarzy, pól formularza i metadanych. Prostokąt narysowany w Wordzie przed eksportem do PDF, kształt albo komentarz dodany w programie do PDF czy adnotacja w Podglądzie na Macu to kolejny element położony nad tekstem. Na ekranie i na wydruku danych nie widać, ale tekst pod spodem nadal jest w pliku. Można go zaznaczyć i skopiować, znaleźć wyszukiwarką, wyciągnąć programem do konwersji albo po prostu przesunąć lub usunąć prostokąt w dowolnym edytorze.',
      },
      {
        p: 'Tak samo działa biały korektor i zmiana koloru czcionki na biały lub czarny. Dane bywają też poza treścią strony: w komentarzach, wartościach pól formularza, we właściwościach dokumentu (autor, tytuł) i w nazwie pliku.',
      },

      { h2: 'Jak sprawdzić, czy dane naprawdę zniknęły' },
      { p: 'Sprawdzaj zawsze plik wynikowy, który wyślesz, a nie oryginał. Wystarczy kilka minut:' },
      {
        ol: [
          '**Test kopiuj-wklej.** Otwórz plik, zaznacz całą stronę (Ctrl+A) i wklej do Notatnika. Zaznacz też myszką sam obszar pod zaczernieniem. Jeśli w schowku pojawią się ukryte dane, nie zostały usunięte.',
          '**Wyszukiwanie w pliku.** Naciśnij Ctrl+F i wpisz fragment usuniętego tekstu: nazwisko, kilka ostatnich cyfr PESEL-u, numer konta. Szukaj w wersji ze spacjami, z myślnikami i bez nich, bo numery bywają różnie zapisane.',
          '**pdftotext.** Program z pakietu Poppler (w Linuksie zwykle paczka `poppler-utils`, na Macu `poppler` z Homebrew) wyciąga cały tekst stron, także ten zakryty prostokątem. Brak wyniku polecenia poniżej to dobry znak.',
          '**Komentarze, formularze i metadane.** Otwórz panel komentarzy i przejrzyj pola formularza; ani test kopiowania, ani pdftotext ich nie pokazują. We właściwościach dokumentu albo poleceniem `pdfinfo` sprawdź autora i tytuł.',
          '**Nazwa pliku.** „umowa_Jan_Kowalski.pdf” zdradza więcej niż zaczerniona treść. Zmień nazwę przed wysłaniem.',
        ],
      },
      { pre: 'pdftotext umowa.pdf - | grep -i "kowalski"\npdftotext umowa.pdf - | grep -E "[0-9]{11}"\npdfinfo umowa.pdf' },
      { p: 'Drugie polecenie wyszukuje każdy ciąg 11 cyfr, czyli tyle, ile ma PESEL. Pomaga, gdy nie pamiętasz, gdzie w dokumencie były numery.' },

      { h2: 'Lista kontrolna' },
      { p: '**CV** (np. przed przekazaniem dalej przez rekrutera):' },
      { ul: ['adres zamieszkania, telefon, e-mail;', 'data urodzenia i zdjęcie (zdjęcie to obraz, więc zaznacz je ręcznie);', 'PESEL, jeśli ktoś go wpisał;', 'linki do profili i dane osób polecających.'] },
      { p: '**Umowy:**' },
      {
        ul: [
          'imiona i nazwiska stron, adresy;',
          'PESEL, seria i numer dowodu osobistego, NIP;',
          'numery kont bankowych;',
          'podpisy i parafki na każdej stronie (to zwykle obrazy, więc zaznacz je ręcznie);',
          'załączniki i strony z danymi kontaktowymi na końcu dokumentu.',
        ],
      },
      { p: '**Dokumenty dla klienta:**' },
      {
        ul: [
          'dane innych klientów, np. w zestawieniach i tabelach;',
          'wewnętrzne komentarze, notatki i e-maile pracowników;',
          'nagłówki i stopki, które powtarzają dane na każdej stronie;',
          'właściwości dokumentu i nazwa pliku.',
        ],
      },
      { p: 'Na koniec przeprowadź testy z poprzedniej sekcji na pliku wynikowym. Oryginał z pełnymi danymi przechowuj osobno.' },

      { h2: 'Jak robi to narzędzie Anonimizuj PDF' },
      { p: '[Anonimizuj PDF](/pl/anonimizuj-pdf) działa w przeglądarce, na Twoim urządzeniu, więc plik nie jest nigdzie wysyłany. Po kolei:' },
      {
        ul: [
          'Dane zaznaczasz, wpisując tekst, wybierając gotowe wzorce (adresy e-mail, numery telefonów, numery kont i IBAN, NIP i PESEL) albo rysując prostokąty myszką. Podgląd pokazuje każdy obszar, a kliknięcie prostokąta go usuwa.',
          'Każda strona z choćby jednym zaczernieniem jest renderowana na nowo jako obraz (200 DPI) z wtopionymi czarnymi prostokątami. Oryginalnego tekstu, komentarzy ani pól formularza z tej strony nie ma w pliku wynikowym.',
          'Strony bez zaczernień są kopiowane bez zmian, z zaznaczalnym tekstem. Usuwane są z nich tylko komentarze i wartości pól formularza zawierające szukany tekst albo pasujące do wybranych wzorców.',
          'Właściwości dokumentu, takie jak autor i tytuł, nie są przenoszone do nowego pliku.',
        ],
      },

      { h2: 'Ograniczenia' },
      {
        ul: [
          'Zanonimizowane strony są obrazami: tekstu nie da się na nich zaznaczyć ani wyszukać, a plik może być większy. Jeśli tekst ma być wyszukiwalny, przepuść wynik przez [OCR](/pl/ocr-pdf).',
          'Wyszukiwanie działa na warstwie tekstowej. Skan bez OCR nie ma tekstu, więc obszary trzeba zaznaczyć ręcznie. To samo dotyczy podpisów, pieczątek i zdjęć.',
          'Fraza rozbita w PDF na kilka fragmentów tekstu może nie zostać znaleziona. Przejrzyj podgląd każdej strony.',
          'Wzorce wyszukują typowe zapisy: wzorzec telefonu złapie też inne długie liczby, a nietypowo zapisany numer może zostać pominięty. Prostokąty są celowo trochę szersze niż tekst.',
          'Plik wynikowy ma nazwę oryginału z dopiskiem `_redacted`. Jeśli nazwa zawiera dane, zmień ją.',
        ],
      },
      { p: 'Po pobraniu wykonaj testy opisane wyżej. Jeśli coś przeszło, dodaj brakujące obszary i zapisz plik jeszcze raz.' },
      { p: '**[Otwórz narzędzie Anonimizuj PDF](/pl/anonimizuj-pdf)**' },
    ],
  },
  {
    path: '/pl/poradnik/anonimizacja-bip-szkola',
    lang: 'pl',
    tool: 'redact',
    title: 'Anonimizacja w BIP szkoły: czy zaczernienie działa',
    description:
      'Jak sprawdzić, czy dane w protokołach, uchwałach i umowach w BIP szkoły są naprawdę usunięte, a nie tylko zakryte. Pięć kroków przed publikacją.',
    h1: 'Anonimizacja dokumentów w BIP szkoły: jak sprawdzić, czy zaczernienie działa',
    name: 'Poradnik: anonimizacja dokumentów w BIP szkoły',
    published: '2026-11-06',
    blocks: [
      {
        p: 'Biuletyn Informacji Publicznej szkoły z czasem zbiera dziesiątki dokumentów, a w wielu z nich są dane osób prywatnych, które przed publikacją trzeba ukryć. Ten poradnik jest dla dyrektorów szkół, sekretariatów, inspektorów ochrony danych oraz informatyków w oświacie i gminach. Pokazujemy, dlaczego czarny prostokąt w Wordzie albo w PDF często niczego nie ukrywa, jak w pięciu krokach sprawdzić plik przed publikacją i jak robi to nasze narzędzie [Anonimizuj PDF](/pl/anonimizuj-pdf).',
      },
      {
        p: 'To poradnik techniczny, a nie porada prawna. O tym, które dokumenty i dane publikować, decydują przepisy i procedury szkoły; w razie wątpliwości zapytaj inspektora ochrony danych. Żadne narzędzie samo w sobie nie zapewnia zgodności z RODO.',
      },

      { h2: 'BIP szkół pod kontrolą UODO' },
      {
        p: 'Jak podał [Portal Oświatowy (24.02.2026)](' +
          PORTAL_OSWIATOWY_BIP +
          '), Prezes UODO zaplanował kontrole ochrony danych osobowych w Biuletynach Informacji Publicznej w związku z licznymi skargami i zgłaszanymi naruszeniami. Wśród problemów, które portal wymienia na podstawie dotychczasowych kontroli BIP, pierwszy to brak prawidłowej anonimizacji dokumentów. Kolejne to publikowanie danych nadmiarowych, dokumenty pozostawione w BIP bez określenia okresu publikacji i brak procedur przeglądu publikowanych treści.',
      },

      { h2: 'Co trafia do BIP i jakie dane trzeba ukryć' },
      { p: 'Typowe dokumenty w BIP szkoły:' },
      {
        ul: [
          'protokoły, np. z kontroli albo z postępowań o udzielenie zamówienia;',
          'uchwały i zarządzenia dyrektora;',
          'umowy oraz oferty złożone w zapytaniach ofertowych;',
          'petycje i odpowiedzi na nie.',
        ],
      },
      { p: 'Dane, które najczęściej trzeba w nich ukryć:' },
      {
        ul: [
          'imiona i nazwiska osób prywatnych, np. rodziców albo autora petycji, który nie zgodził się na ujawnienie danych;',
          'PESEL, seria i numer dowodu osobistego;',
          'adresy zamieszkania, prywatne telefony i adresy e-mail;',
          'podpisy i parafki (to zwykle obrazy, więc trzeba je zaznaczyć ręcznie);',
          'numery kont bankowych osób prywatnych;',
          'dane uczniów: nazwiska, klasy, informacje o zdrowiu, orzeczeniach i sytuacji rodzinnej.',
        ],
      },
      {
        p: 'Usunięcie nazwiska nie wystarczy, jeśli z kontekstu da się ustalić, o kogo chodzi. Zdanie „uczeń klasy 3b, syn pracownicy sekretariatu” wskazuje konkretną osobę także bez nazwiska.',
      },

      { h2: 'Dlaczego czarny prostokąt w Wordzie lub PDF nie wystarcza' },
      {
        p: 'PDF składa się z warstw: tekstu strony, rysunków, obrazów, komentarzy, pól formularza i metadanych. Prostokąt narysowany w Wordzie przed zapisem do PDF albo kształt dodany w programie do PDF to kolejny element położony nad tekstem. Na ekranie i na wydruku danych nie widać, ale tekst pod spodem nadal jest w pliku. Można go zaznaczyć i skopiować, znaleźć wyszukiwarką albo odsłonić, przesuwając prostokąt w dowolnym edytorze. Tak samo działa biała czcionka i zmiana koloru tekstu na czarny.',
      },
      {
        p: 'Ten błąd zdarza się nie tylko szkołom. [Wprost](' +
          WPROST_MEN +
          ') opisał, że Ministerstwo Edukacji Narodowej w niewystarczający sposób zanonimizowało dane autora petycji: dało się je zaznaczyć kursorem i skopiować. Odczytał je Portal Samorządowy, który poinformował resort o błędzie. Rzeczniczka ministerstwa odpowiedziała, że anonimizacja została już dokonana prawidłowo.',
      },

      { h2: 'Pięć kroków przed publikacją' },
      {
        ol: [
          '**Pracuj na kopii.** Oryginał z pełnymi danymi zostaje w dokumentacji szkoły. Sprawdzasz zawsze plik wynikowy, który trafi do BIP, a nie plik roboczy.',
          '**Test kopiuj-wklej.** Otwórz plik, zaznacz całą stronę (Ctrl+A) i wklej do Notatnika. Potem zaznacz myszką sam obszar pod zaczernieniem. Jeśli w schowku pojawią się ukryte dane, nie zostały usunięte.',
          '**Wyszukiwanie.** Naciśnij Ctrl+F i wpisz fragment każdej usuniętej informacji: nazwisko, kilka cyfr PESEL-u, numer konta. Numery sprawdzaj ze spacjami, z myślnikami i bez nich.',
          '**Komentarze, pola, właściwości i nazwa pliku.** Przejrzyj panel komentarzy i pola formularza, sprawdź we właściwościach dokumentu autora i tytuł. Nazwa „petycja_Kowalska.pdf” zdradza więcej niż zaczerniona treść.',
          '**Druga osoba.** Ktoś, kto nie przygotowywał dokumentu, powtarza testy z punktów 2, 3 i 4 i przegląda każdą stronę, także podpisy, pieczątki i załączniki.',
        ],
      },
      {
        p: 'Dokładny opis tych testów znajdziesz w poradniku [Anonimizacja PDF zgodnie z RODO](/pl/poradnik/anonimizacja-pdf-rodo), a po angielsku w [How to check a PDF redaction](/guides/check-pdf-redaction). Informatyk może sprawdzić cały plik jednym poleceniem z pakietu Poppler, które wypisze każdy ciąg 11 cyfr, czyli tyle, ile ma PESEL:',
      },
      { pre: 'pdftotext protokol.pdf - | grep -E "[0-9]{11}"' },

      { h2: 'Jak robi to narzędzie Anonimizuj PDF' },
      { p: '[Anonimizuj PDF](/pl/anonimizuj-pdf) działa w przeglądarce, na Twoim komputerze, więc dokument nie jest nigdzie wysyłany. Po kolei:' },
      {
        ul: [
          'Dane zaznaczasz, wpisując tekst, wybierając gotowe wzorce (adresy e-mail, numery telefonów, numery kont i IBAN, NIP i PESEL) albo rysując prostokąty myszką. Podpisy i pieczątki zaznacz ręcznie.',
          'Każda strona z choćby jednym zaczernieniem jest renderowana na nowo jako obraz (200 DPI) z wtopionymi czarnymi prostokątami. Oryginalnego tekstu, komentarzy ani pól formularza z tej strony nie ma w pliku wynikowym.',
          'Strony bez zaczernień są kopiowane bez zmian. Usuwane są z nich tylko komentarze i wartości pól formularza zawierające szukany tekst albo pasujące do wybranych wzorców.',
          'Właściwości dokumentu, takie jak autor i tytuł, nie są przenoszone do nowego pliku.',
        ],
      },

      { h2: 'Ograniczenia' },
      {
        ul: [
          'Zanonimizowane strony są obrazami, więc ich tekstu nie da się wyszukać ani zaznaczyć, dopóki nie przepuścisz wyniku przez [OCR](/pl/ocr-pdf). Dokument z samych obrazów jest też trudny dla osób korzystających z czytników ekranu.',
          'Skan bez OCR nie ma warstwy tekstowej, więc obszary trzeba zaznaczyć ręcznie.',
          'Fraza zapisana w PDF w kilku osobnych fragmentach może nie zostać znaleziona. Przejrzyj podgląd każdej strony.',
          'Wzorce łapią typowe zapisy: wzorzec telefonu złapie też inne długie liczby, a nietypowo zapisany numer może zostać pominięty.',
          'Plik wynikowy ma nazwę oryginału z dopiskiem `_redacted`. Zmień ją przed publikacją.',
          'Narzędzie usuwa to, co zaznaczysz. Nie ocenia, które dane wolno opublikować.',
        ],
      },
      { p: 'Po pobraniu pliku wykonaj pięć kroków opisanych wyżej. Dopiero plik, który przeszedł wszystkie testy, publikuj w BIP.' },
      { p: '**[Otwórz narzędzie Anonimizuj PDF](/pl/anonimizuj-pdf)**' },
    ],
  },
  {
    path: '/pl/poradnik/ocr-i-laczenie-dokumentow-bez-chmury',
    lang: 'pl',
    tool: 'ocr',
    title: 'OCR i łączenie dokumentów klienta bez chmury',
    description:
      'Jak zrobić z zeskanowanych umów, zaświadczeń i wyciągów jeden przeszukiwalny PDF po polsku, zmniejszyć go i zabezpieczyć hasłem bez wysyłania plików.',
    h1: 'OCR skanów i łączenie dokumentów klienta bez wysyłania do chmury',
    name: 'Poradnik: OCR i łączenie dokumentów klienta bez chmury',
    published: '2026-11-06',
    blocks: [
      {
        p: 'Biura rachunkowe, działy kadr i jednoosobowe firmy codziennie dostają skany i zdjęcia dokumentów. Ten poradnik pokazuje, jak zrobić z nich jeden czytelny PDF z wyszukiwalnym tekstem, zmniejszyć go do wysłania e-mailem i zabezpieczyć hasłem, bez wysyłania plików klientów do zewnętrznych serwisów. Każdy krok wykonasz naszymi narzędziami, które działają w przeglądarce.',
      },

      { h2: 'Jakie dokumenty i jakie dane' },
      {
        ul: [
          'skany umów: o pracę, zlecenia, najmu;',
          'zaświadczenia, np. o zatrudnieniu i zarobkach albo z urzędu skarbowego;',
          'wyciągi bankowe;',
          'załączniki do PIT: informacje od pracodawcy, faktury i potwierdzenia do ulg;',
          'zdjęcia dokumentów i paragonów zrobione telefonem, także w formacie HEIC z iPhone’a.',
        ],
      },
      {
        p: 'Łączy je jedno: zawierają PESEL, adresy, numery kont, kwoty wynagrodzeń, a czasem informacje o zdrowiu, np. przy uldze rehabilitacyjnej.',
      },

      { h2: 'Dlaczego nie wrzucać skanów klientów do przypadkowego konwertera online' },
      {
        p: 'Typowy konwerter online działa tak: plik trafia na serwer usługodawcy, tam jest przetwarzany, a Ty pobierasz wynik. Zanim zrobisz to z dokumentem klienta, warto znać odpowiedzi na kilka pytań. Kto prowadzi serwis i gdzie są jego serwery? Jak długo plik jest przechowywany i czy służy do czegoś jeszcze? Czy ktoś w biurze w ogóle wie, że dane tam trafiły?',
      },
      {
        p: 'Przekazanie danych firmie, która przetwarza je w Twoim imieniu, to w języku RODO powierzenie przetwarzania (art. 28), które wymaga umowy z tą firmą. Przy jednorazowym wrzuceniu pliku do przypadkowego serwisu trudno to zapewnić. To poradnik techniczny, a nie porada prawna: zasady korzystania z usług zewnętrznych ustala administrator danych, a w większych firmach inspektor ochrony danych.',
      },
      {
        p: 'Nasze narzędzia przetwarzają pliki w przeglądarce, na Twoim komputerze. Polityka bezpieczeństwa strony (Content-Security-Policy) pozwala jej łączyć się tylko z własną domeną, a kod źródłowy jest publiczny. Jest też aplikacja na Windows, która działa bez internetu.',
      },

      { h2: 'Krok 1: zdjęcia i skany w jednym PDF' },
      {
        p: 'Zdjęcia dokumentów zamienisz na PDF w narzędziu [JPG do PDF](/pl/jpg-do-pdf): przyjmuje JPG, PNG i HEIC, jedno zdjęcie na stronę, domyślnie w formacie A4. Jeśli i tak chcesz rozpoznać tekst, możesz pominąć ten krok: [OCR PDF](/pl/ocr-pdf) przyjmuje zdjęcia bezpośrednio i składa z nich jeden PDF w podanej kolejności.',
      },

      { h2: 'Krok 2: OCR po polsku' },
      {
        p: 'Skan to obraz tekstu: nie da się go przeszukać ani skopiować. [OCR PDF](/pl/ocr-pdf) rozpoznaje tekst silnikiem Tesseract, po polsku, po angielsku albo w obu językach naraz, i dodaje go jako niewidoczną warstwę nad niezmienionym obrazem strony. Plik wygląda tak samo, ale działa Ctrl+F i kopiowanie.',
      },
      {
        ul: [
          'Tryby jakości: Fast (200 dpi), Accurate (300 dpi, około 10 sekund na stronę, zależnie od komputera) i Small print (400 dpi) dla drobnego druku. Dwudziestostronicowy wyciąg w trybie Accurate to więc kilka minut.',
          'Strony, które mają już tekst, mogą zostać pominięte.',
          'Przy pierwszym użyciu przeglądarka pobiera z tej strony dane języka.',
          'OCR się myli, zwłaszcza na krzywych zdjęciach, pieczątkach i piśmie odręcznym. Rozpoznany tekst służy do wyszukiwania i kopiowania; kwoty i numery kont zawsze porównaj ze skanem.',
        ],
      },

      { h2: 'Krok 3: połącz dokumenty w jeden plik' },
      {
        p: 'W narzędziu [Połącz PDF](/pl/polacz-pdf) dodajesz pliki i przeciągasz je w odpowiedniej kolejności. Strony są kopiowane bez zmian, więc warstwa tekstu z OCR zostaje. Pojedyncze strony przestawisz w narzędziu [Zmień kolejność stron](/pl/zmien-kolejnosc-stron-pdf), a zbyt duży plik rozdzielisz w narzędziu [Podziel PDF](/pl/podziel-pdf).',
      },

      { h2: 'Krok 4: zmniejsz plik do wysłania e-mailem' },
      {
        p: '[Kompresuj PDF](/pl/kompresuj-pdf) ma tryb bezstratny (Lossless), który zachowuje tekst, także ten dodany przez OCR, oraz trzy mocniejsze poziomy: Light, Recommended i Strong. Te zamieniają każdą stronę w obraz (150, 120 lub 85 dpi) i usuwają warstwę tekstu. Jeśli skany są za duże i potrzebujesz mocniejszej kompresji, zrób ją przed OCR, a dopiero potem rozpoznaj tekst. Przy niższej rozdzielczości OCR może mylić się częściej, więc sprawdź wynik.',
      },

      { h2: 'Krok 5: usuń zbędne dane i zabezpiecz hasłem' },
      {
        p: 'Jeśli odbiorca nie potrzebuje wszystkich danych, np. numeru konta albo PESEL-u, usuń je w narzędziu [Anonimizuj PDF](/pl/anonimizuj-pdf). Strony z zaczernieniem stają się obrazami, więc jeśli tekst ma zostać wyszukiwalny, przepuść wynik jeszcze raz przez OCR. Jak sprawdzić, czy dane naprawdę zniknęły, opisujemy w poradniku [Anonimizacja PDF zgodnie z RODO](/pl/poradnik/anonimizacja-pdf-rodo).',
      },
      {
        p: 'Na końcu użyj narzędzia [Zabezpiecz PDF hasłem](/pl/zabezpiecz-pdf-haslem), które szyfruje plik algorytmem AES-256. Hasło przekaż innym kanałem, np. SMS-em albo telefonicznie, a nie w tym samym e-mailu co plik. Zapisz je w bezpiecznym miejscu, bo nie da się go odzyskać.',
      },

      { h2: 'A co z KSeF?' },
      {
        p: 'Krajowy System e-Faktur służy do wystawiania i odbierania ustrukturyzowanych faktur elektronicznych w formacie XML, a nie skanów ani PDF. Według [serwisu KSeF Ministerstwa Finansów](' +
          KSEF_TERMINY +
          ') faktury w KSeF trzeba wystawiać od 1 lutego 2026 r. w firmach, które w 2024 r. miały sprzedaż powyżej 200 mln zł (z VAT), a od 1 kwietnia 2026 r. w pozostałych. Nasze narzędzia nie są narzędziami do KSeF: nie wysyłają tam faktur ani ich nie pobierają. Przydają się przy dokumentach spoza tego systemu, takich jak umowy, zaświadczenia, wyciągi i załączniki.',
      },
      { p: '**[Otwórz narzędzie OCR PDF](/pl/ocr-pdf)**' },
    ],
  },
  {
    path: '/guides/check-pdf-redaction',
    lang: 'en',
    tool: 'redact',
    title: 'How to check a PDF redaction really removed the text',
    description:
      'A black box over text does not delete it. Test a redacted PDF with copy-paste, search and pdftotext, check comments, forms and metadata, and fix leaks.',
    h1: 'How to check a PDF redaction really removed the text',
    name: 'Guide: check that a PDF redaction worked',
    published: '2026-11-06',
    blocks: [
      {
        p: 'A redacted PDF can look perfect and still contain everything you meant to hide. The black boxes are on the screen and on paper, but the text underneath may still be in the file, where anyone who receives it can copy it out. This guide shows how to test a redacted PDF in a few minutes, with tools you already have, and how our [Redact PDF](/redact-pdf) tool removes the text.',
      },

      { h2: 'Why a black box is often not a redaction' },
      {
        p: 'A PDF page is built from layers: the page text, drawings, images, comments (annotations), form fields and document properties. A black rectangle drawn in a word processor before exporting, a shape or comment added in a PDF app, or an annotation in a preview app is just one more object placed on top of the text. It hides the text from view, but the text is still part of the page.',
      },
      {
        p: 'That text can be selected and copied, found with search, pulled out by any converter, or revealed by moving or deleting the rectangle in an editor. White text, white-out boxes and text recoloured to black have the same problem. Information also lives outside the page content: in comments, form field values, the document properties (author, title) and the file name.',
      },
      { p: 'A real redaction removes the text from the file. You cannot tell the two apart by looking, so test the file.' },

      { h2: 'Five checks for a redacted PDF' },
      { p: 'Always test the file you are about to send, not the original. Do every check: each one catches something the others miss.' },
      {
        ol: [
          '**Copy and paste.** Open the file, select everything on the page (Ctrl+A or Cmd+A) and paste it into a plain text editor. Then drag a selection over just the blacked-out area and paste again. If the hidden words appear, they were only covered.',
          '**Search.** Press Ctrl+F (Cmd+F) and search for part of each thing you removed: a surname, the last digits of an account number, a street name. Numbers are written in many ways, so try them with spaces, with dashes and without.',
          '**Extract the text with pdftotext.** pdftotext, part of Poppler (`poppler-utils` on most Linux systems, `poppler` in Homebrew on a Mac), prints all the text on the pages, including text hidden under boxes or drawn in white. If the commands below find nothing, that part is clean.',
          '**Comments, form fields and properties.** Open the comments panel and look through any form fields: copy-paste and pdftotext do not show their contents. Check the document properties in your viewer, or run `pdfinfo`, for the author, title and subject.',
          '**The file name and the rest of the package.** "contract_John_Smith.pdf" gives away what the boxes hide. Rename the file, and check any other attachments sent with it.',
        ],
      },
      { pre: 'pdftotext redacted.pdf - | grep -i "smith"\npdftotext redacted.pdf - | grep -E "[0-9]{6,}"\npdfinfo redacted.pdf' },
      { p: 'The second command lists every run of six or more digits, which is a quick way to spot account, phone or ID numbers you forgot about.' },

      { h2: 'What a pass looks like' },
      {
        ul: [
          'Copying the redacted area gives nothing, or only the text around it.',
          'Searching for each removed item finds nothing.',
          'pdftotext output does not contain the removed items.',
          'No comment, form field or property still holds them, and the file name is neutral.',
        ],
      },
      {
        p: 'If any check fails, go back to the original, redact again with a tool that removes the content, and test the new file. Do not try to fix the leaking file by drawing more boxes on it.',
      },

      { h2: 'How the Redact PDF tool does it' },
      { p: '[Redact PDF](/redact-pdf) runs in your browser, on your device, so the file is never uploaded. This is what it does:' },
      {
        ul: [
          'You mark what to hide by typing text, by ready patterns (e-mail addresses, phone numbers, bank account numbers and IBANs, Polish NIP and PESEL numbers) or by dragging boxes on the page. The preview shows every box; click one to remove it.',
          'Every page with at least one box is re-rendered as an image (at 200 dpi) with the black boxes burnt in. The original text, comments and form fields of that page are not in the output.',
          'Pages without boxes are copied as they are, with selectable text. Only comments and form field values that contain the searched text, or match the chosen patterns, are removed from them.',
          'Document properties such as author and title are not carried over to the new file.',
        ],
      },

      { h2: 'Limits to know about' },
      {
        ul: [
          'Redacted pages become images, so their remaining text can no longer be selected or searched, and the file may get bigger. If you need searchable text, run the result through [OCR](/ocr-pdf).',
          'Search works on the text layer. A scan without OCR has none, so draw the boxes by hand. The same goes for signatures, stamps and photos.',
          'A phrase that the PDF stores in several separate pieces may not be found by search. Look through the preview of every page.',
          'Patterns match common formats: the phone pattern also catches other long numbers, and an unusually written number can be missed. Boxes are deliberately a little wider than the text.',
          'The output keeps the original file name with `_redacted` added. Rename it if the name itself is sensitive.',
        ],
      },
      { p: 'Whichever tool you use, run the five checks on the result before you send it.' },
      { p: '**[Open Redact PDF](/redact-pdf)**' },
    ],
  },
  {
    path: '/guides/sign-pdf-without-uploading',
    lang: 'en',
    tool: 'sign',
    title: 'How to sign a PDF without uploading it',
    description:
      'Sign a contract or lease in your browser with a drawn, typed or scanned signature, and what such a signature means under eIDAS and the US ESIGN Act.',
    h1: 'How to sign a PDF without uploading it',
    name: 'Guide: sign a PDF without uploading it',
    published: '2026-11-08',
    blocks: [
      {
        p: 'You have a lease or a contract as a PDF and need to sign it and send it back. Most online signing sites want the document uploaded first, which puts a contract with your name, address and often bank details on someone else\'s server. This guide shows how to sign a PDF in your browser with our [Sign PDF](/sign-pdf) tool, where the file stays on your device, and what kind of signature you end up with.',
      },
      { p: 'This is a practical guide, not legal advice. For a high-value contract, ask the other side or a lawyer what they accept.' },

      { h2: 'Sign the PDF step by step' },
      {
        ol: [
          'Open [Sign PDF](/sign-pdf) and drop the file on **Choose PDF files to open in the editor**, or click it to pick the file. If you choose several PDFs, they are merged into one document. Your browser reads the file; nothing is sent to a server.',
          'The **Add signature** dialog opens with the document. Pick a tab: **Draw** to sign with a mouse, touchpad or finger; **Type** to enter your name under **Your name** and choose one of three handwriting fonts; or **Upload image** to use a photo or scan of your signature on paper (click **Choose image**).',
          'For a drawn or typed signature, pick the **Ink** colour: black, dark blue or dark green. **Clear** empties the drawing pad. For an upload, keep **Remove white background** ticked so that only the ink lands on the page.',
          'Click **Insert signature**. It appears near the bottom right of the current page. With the **Select** tool, drag it into place and use the corner handle to resize it.',
          'To add the date, your printed name or initials, pick **Text** in the sidebar, click where the text should start and type. To sign another page, go to it and pick **Signature** in the sidebar, or press S.',
          'Check the name under **File name used for download** and click **Download PDF**.',
        ],
      },
      { p: 'Next time, the dialog offers **Use last**, which inserts the signature you made before.' },

      { h2: 'What changes in the file' },
      {
        ul: [
          'The signature is drawn into the page as a PNG image with a transparent background, like a stamp or a logo.',
          'The download is a new PDF built from the pages of the original. Their text stays selectable and searchable, but document properties such as title and author are not carried over.',
          'If the PDF already carries a certificate-based digital signature from the other party, that signature will not validate in the new file. Sign first and let them sign after you, or ask for a copy that is not yet digitally signed.',
        ],
      },

      { h2: 'What kind of signature this is in the EU' },
      {
        p: 'The eIDAS Regulation, [Regulation (EU) No 910/2014](' +
          EIDAS +
          '), defines an electronic signature broadly in Article 3(10): "data in electronic form which is attached to or logically associated with other data in electronic form and which is used by the signatory to sign". An image of your signature placed on a contract and sent by you fits that definition. It is usually called a simple electronic signature.',
      },
      {
        p: 'Article 25(1) says such a signature "shall not be denied legal effect and admissibility as evidence in legal proceedings solely on the grounds that it is in an electronic form or that it does not meet the requirements for qualified electronic signatures". Article 25(2) sets the higher bar: "A qualified electronic signature shall have the equivalent legal effect of a handwritten signature." A qualified signature needs a qualified certificate from a trust service provider. An advanced signature (Article 26) must be uniquely linked to you and make later changes detectable. A drawn or typed image is neither.',
      },
      {
        p: 'In practice, a simple signature counts but does not prove itself: if it is disputed, other evidence matters, such as the e-mail you sent the file with. Where national law requires a handwritten or qualified signature for a document, an image is not enough.',
      },

      { h2: 'And in the United States' },
      {
        p: 'The [ESIGN Act](' +
          ESIGN +
          ') says that, for transactions in or affecting interstate or foreign commerce, a signature or contract "may not be denied legal effect, validity, or enforceability solely because it is in electronic form" (15 U.S.C. 7001(a)). Section 7006 defines an electronic signature as "an electronic sound, symbol, or process, attached to or logically associated with a contract or other record and executed or adopted by a person with the intent to sign the record". Section 7003 leaves some documents out, among them wills, adoption and divorce matters, court documents, and eviction or foreclosure notices for a primary residence.',
      },

      { h2: 'Limits to know about' },
      {
        ul: [
          'There is no certificate and no tamper seal. Anyone with a PDF editor can change the file after you sign it, or copy your signature image out of it. Send signed files only to the people who need them.',
          'Existing text in the PDF cannot be edited. Fill blanks with **Text**, or use [Fill PDF form](/fill-pdf-form) first if the PDF has interactive fields.',
        ],
      },

      { h2: 'Privacy on a shared computer' },
      {
        p: 'Nothing is uploaded, but two things stay in the browser on purpose: your last signature, so that **Use last** works, and the document itself, under **Recent documents** on the dashboard. On a shared computer, remove the document there with **Delete** and clear the site data in the browser settings to drop the signature, or work in a private window, which forgets both when closed.',
      },
      { p: '**[Open Sign PDF](/sign-pdf)**' },
    ],
  },
  {
    path: '/guides/remove-pdf-metadata',
    lang: 'en',
    tool: 'metadata',
    title: 'How to check and remove hidden PDF metadata',
    description:
      'A PDF can carry the author\'s name, the app that made it, dates and an XMP copy of it all. How to see that metadata and remove it before you share the file.',
    h1: 'How to check and remove hidden PDF metadata',
    name: 'Guide: check and remove PDF metadata',
    published: '2026-11-08',
    blocks: [
      {
        p: 'Before you publish a PDF, send it to a client or submit it anonymously, look at what the file says about itself. Besides the pages, a PDF can carry the name of the person who wrote it, the program that made it, when it was created and last changed, and sometimes the title of an earlier draft. None of this shows on the page. This guide shows where that metadata sits, how to check it, and what our [Edit metadata](/edit-pdf-metadata) tool removes and what it leaves.',
      },

      { h2: 'Where the metadata lives' },
      {
        p: 'A PDF has two places for document metadata. The older one is the document information dictionary, with entries such as Title, Author, Subject, Keywords, Creator (the app that made the original, for example a word processor), Producer (the software that wrote the PDF), CreationDate and ModDate. The newer one is an XMP metadata stream, an XML packet stored inside the file. The PDF 2.0 standard, ISO 32000-2, calls metadata streams the preferred method and also allows them on parts of a document, not only on the whole file ([clause 14.3](' +
          PDF2_METADATA +
          ')).',
      },
      {
        p: 'Many apps write both, so a name can be in the file twice. Microsoft Word, for example, puts the document properties into an exported PDF when **Document properties** is selected in the options of the PDF export ([Microsoft support](' +
          WORD_TO_PDF +
          ')).',
      },
      {
        p: 'Other places can name people too: each comment stores the name of whoever wrote it, photos inside the PDF can keep their own camera data, and the file name is often the most revealing of all.',
      },

      { h2: 'How to check what a PDF contains' },
      {
        ol: [
          '**In your PDF viewer.** Most viewers show the information dictionary under Document properties. Few show the XMP packet.',
          '**With pdfinfo.** pdfinfo, part of Poppler (`poppler-utils` on most Linux systems, `poppler` in Homebrew on a Mac), prints the information dictionary. With `-meta` it prints the XMP packet instead.',
          '**With exiftool.** `exiftool -a -G1` lists both, each entry labelled with its group, so you can see whether a value comes from the information dictionary or from XMP.',
          '**In the tool.** Drop the file on [Edit metadata](/edit-pdf-metadata) to see the six text fields of the information dictionary. The tool does not show the dates or the XMP packet, so use pdfinfo or exiftool to read those. It removes the packet when you save, whether or not you could see it here.',
        ],
      },
      { pre: 'pdfinfo report.pdf\npdfinfo -meta report.pdf\nexiftool -a -G1 report.pdf' },

      { h2: 'Remove it with Edit metadata' },
      {
        ol: [
          'Open [Edit metadata](/edit-pdf-metadata) and drop the PDF on **Choose a PDF**. It is read in your browser and not uploaded.',
          'The **Title**, **Author**, **Subject**, **Keywords**, **Creator** and **Producer** fields show what the file contains. Edit any of them, or click **Clear all fields**.',
          'Click **Save metadata** and download the result. It keeps the original file name, so rename it if the name gives something away.',
        ],
      },
      {
        p: 'Saving removes the document\'s XMP packet as well, so both copies of these values go at once. That matters more than it sounds. A viewer may prefer the XMP copy to the information dictionary, so a tool that cleared only the fields would leave you looking at six empty boxes while the old author name sat in the file, waiting for the next person who ran `exiftool` on it.',
      },
      {
        p: 'The tool writes the whole file again instead of appending a change at the end, so the old values are not left in an earlier revision. That is not a given: the ExifTool documentation warns that its own PDF edits are reversible because "old information is never actually deleted from the file" ([ExifTool PDF tags](' +
          EXIFTOOL_PDF +
          ')).',
      },

      { h2: 'What Edit metadata does not remove' },
      {
        ul: [
          '**Creation and modification dates.** They stay as they are.',
          '**Comments, form field values and data inside embedded images.**',
          '**Anything on the page.** A name in a header or footer is page text, not metadata. Remove it with [Redact PDF](/redact-pdf).',
        ],
      },

      { h2: 'When the dates or per-page metadata must go too' },
      {
        p: 'Build a new file from the pages. In [Split PDF](/split-pdf), choose **By ranges**, type `1-` under **Ranges** and click **Split PDF**. You get one file with every page, named like `report_p1-12.pdf`.',
      },
      {
        p: 'That file is made from scratch. The old information dictionary and any document XMP packet are not copied, both dates are set to the moment of the split, and Creator and Producer name pdf-lib, the library the tool uses. Run the result through Edit metadata if you want those two fields empty as well. Comments and any metadata attached to single pages or images travel with the pages. Bookmarks and interactive form fields of the original are not carried over, so do this on the final version.',
      },

      { h2: 'Checklist before you share' },
      {
        ul: [
          '`pdfinfo` shows no name, company or old title you did not mean to share.',
          '`pdfinfo -meta` prints nothing, or nothing personal.',
          'The comments panel is empty, or holds only comments meant for the recipient.',
          'The file name is neutral.',
        ],
      },
      { p: '**[Open Edit metadata](/edit-pdf-metadata)**' },
    ],
  },
  {
    path: '/guides/compress-pdf-for-email',
    lang: 'en',
    tool: 'compress',
    title: 'How to compress a PDF to send it by e-mail',
    description:
      'Why a PDF is too big for e-mail, which files shrink and which do not, and how to choose between lossless and image compression in your browser.',
    h1: 'How to compress a PDF to send it by e-mail',
    name: 'Guide: compress a PDF for e-mail',
    published: '2026-11-08',
    blocks: [
      {
        p: 'A PDF that is too big to attach is usually full of scanned pages or large photos. Compression helps a lot with those, and very little with a document that is mostly text. This guide explains what to expect, how to use our [Compress PDF](/compress-pdf) tool, which runs in your browser so the document is never uploaded, and what to do when compression is the wrong answer.',
      },

      { h2: 'How big is too big' },
      {
        p: 'The limit depends on your provider and on the recipient\'s server. Microsoft\'s Outlook help, for example, gives 20 MB for internet accounts such as Outlook.com or Gmail and a default of 10 MB for Exchange business accounts, counting the attachment and the message together ([Send large files with Outlook](' +
          OUTLOOK_LIMITS +
          ')).',
      },
      {
        p: 'The attachment also grows on the way. E-mail carries files as base64 text, which encodes every 3 bytes as 4 characters ([RFC 2045, section 6.8](' +
          RFC2045_BASE64 +
          ')), so a file takes about a third more space in the message than on disk. A 16 MB PDF can already fail against a 20 MB limit.',
      },

      { h2: 'Which PDFs shrink' },
      {
        ul: [
          '**Scans and photographed documents.** Every page is a picture, often at a high resolution. These shrink the most.',
          '**Documents with large photos**, such as reports and brochures. They shrink, but turning their pages into images costs the text.',
          '**Text documents exported from a word processor or a website.** They are usually small already. Turning their pages into images can make them bigger, not smaller.',
        ],
      },

      { h2: 'The four levels' },
      { p: 'Compress PDF has a **Level** switch with four options:' },
      {
        ul: [
          '**Lossless** repacks the structure of the file and keeps the text, links, forms and quality. Savings are usually small, sometimes none.',
          '**Light**, **Recommended** and **Strong** render every page as a JPEG image, at 150, 120 and 85 dpi, with stronger JPEG compression at each step, and build a new PDF from those images.',
        ],
      },
      {
        p: 'After Light, Recommended or Strong, text can no longer be selected or searched, links and form fields are gone, and the document properties are not carried over. Strong suits pages that only need to be read on screen; small print can become hard to read.',
      },

      { h2: 'Step by step' },
      {
        ol: [
          'Open [Compress PDF](/compress-pdf) and drop the file on **Choose a PDF**.',
          'Under **Level**, choose **Lossless** for a text document or **Recommended** for a scan.',
          'Click **Compress**. The tool shows the size before and after and how much smaller the result is. If the file did not get smaller, it says so: try a stronger level, or keep the original.',
          'Open the result and zoom in on the smallest print, a signature or a stamp. If it is hard to read, go back and try **Light**.',
          'Click **Download**. The new file name ends in `_compressed`.',
        ],
      },
      { p: 'Every page is rendered on your own device, so a long scan takes a while on an older phone or laptop. The progress is shown while it works.' },

      { h2: 'Make a compressed scan searchable again' },
      {
        p: 'If the recipient needs to search or copy the text, run the compressed file through [OCR](/ocr-pdf), which recognises Polish and English text and adds it back as a searchable layer. Check the size again afterwards.',
      },

      { h2: 'When compression is the wrong tool' },
      {
        ul: [
          '**Photos of paper documents.** Shrink and resize the photos first with [Compress & convert images](/image-converter), then put them into one file with [Images to PDF](/image-to-pdf). Images to PDF keeps the pixel size of each photo, so smaller photos give a smaller PDF.',
          '**Only some pages matter.** Send just those: in [Split PDF](/split-pdf), choose **Extract pages** and list them.',
          '**It is still too big.** Split the document into parts and send several e-mails, or share it through a storage service you already use. Keep in mind that a shared link puts the file on that service.',
        ],
      },

      { h2: 'What this tool cannot do' },
      {
        ul: [
          'It cannot recompress the photos inside a PDF and keep the text. The image levels turn whole pages into pictures, and Lossless leaves images as they are.',
          'It does not remove or shrink embedded fonts.',
          'There is no target size: you pick a level and see the result.',
          'A password-protected PDF has to be unlocked first with [Unlock PDF](/unlock-pdf). Protect the compressed file again with [Protect PDF](/protect-pdf) if it needs a password.',
        ],
      },
      { p: '**[Open Compress PDF](/compress-pdf)**' },
    ],
  },
  {
    path: '/pl/poradnik/podpis-pdf-bez-wysylania',
    lang: 'pl',
    tool: 'sign',
    title: 'Jak podpisać PDF bez wysyłania pliku na serwer',
    description:
      'Podpis rysowany, wpisany lub ze skanu wstawisz w przeglądarce. Czym jest według eIDAS i kiedy potrzebny jest podpis zaufany albo kwalifikowany.',
    h1: 'Jak podpisać PDF w przeglądarce bez wysyłania pliku',
    name: 'Poradnik: podpis PDF bez wysyłania pliku',
    published: '2026-11-08',
    blocks: [
      {
        p: 'Umowa najmu, umowa zlecenia albo oświadczenie przychodzi jako PDF i trzeba je odesłać z podpisem. Większość serwisów do podpisywania każe najpierw wgrać dokument, razem z Twoimi danymi. Ten poradnik pokazuje, jak podpisać PDF w narzędziu [Podpisz PDF](/pl/podpisz-pdf), które działa w przeglądarce, i wyjaśnia, czym prawnie jest taki podpis, a kiedy potrzebny jest podpis zaufany albo kwalifikowany.',
      },
      { p: 'To poradnik praktyczny, a nie porada prawna. Przy ważnej umowie zapytaj drugą stronę albo prawnika, jaki podpis przyjmie.' },

      { h2: 'Podpisz PDF krok po kroku' },
      {
        ol: [
          'Otwórz [Podpisz PDF](/pl/podpisz-pdf) i upuść plik na pole **Wybierz pliki PDF do otwarcia w edytorze** albo kliknij je i wybierz plik. Plik odczytuje przeglądarka; nic nie trafia na serwer.',
          'Razem z dokumentem otwiera się okno **Dodaj podpis**. Wybierz kartę: **Narysuj**, żeby podpisać się myszką, touchpadem lub palcem; **Wpisz**, żeby wpisać **Imię i nazwisko** i wybrać jedną z trzech odręcznych czcionek; albo **Wgraj obraz**, żeby użyć zdjęcia lub skanu podpisu z kartki (przycisk **Wybierz obraz**).',
          'Przy podpisie rysowanym lub wpisanym wybierz kolor w polu **Atrament**: czarny, granatowy lub ciemnozielony. Przy wgrywaniu zostaw zaznaczone **Usuń białe tło**, żeby na stronę trafił sam podpis.',
          'Kliknij **Wstaw podpis**. Podpis pojawi się przy prawym dolnym rogu bieżącej strony. Narzędziem **Zaznacz** przeciągnij go na miejsce, a uchwytem w rogu zmień rozmiar.',
          'Datę albo parafkę dodasz narzędziem **Tekst**: kliknij na stronie i pisz. Żeby podpisać kolejną stronę, przejdź do niej i wybierz **Podpis** na pasku narzędzi albo naciśnij S.',
          'Sprawdź **Nazwa pliku do pobrania** i kliknij **Pobierz PDF**.',
        ],
      },

      { h2: 'Co zmienia się w pliku' },
      {
        ul: [
          'Podpis trafia na stronę jako obraz PNG z przezroczystym tłem, tak jak pieczątka albo logo.',
          'Pobierasz nowy PDF ze stron oryginału. Tekst da się nadal zaznaczać, ale tytuł i autor z właściwości dokumentu nie są przenoszone.',
          'Jeśli PDF ma już podpis elektroniczny drugiej strony oparty na certyfikacie, np. kwalifikowany albo zaufany, w nowym pliku ten podpis nie będzie się weryfikował. Podpisz jako pierwszy albo poproś o wersję bez podpisu.',
        ],
      },

      { h2: 'Czym jest podpis w formie obrazu według eIDAS' },
      {
        p: 'Rozporządzenie eIDAS, czyli [rozporządzenie (UE) nr 910/2014](' +
          EIDAS_PL +
          '), w art. 3 pkt 10 definiuje podpis elektroniczny bardzo szeroko: to „dane w postaci elektronicznej, które są dołączone lub logicznie powiązane z innymi danymi w postaci elektronicznej, i które użyte są przez podpisującego jako podpis”. Obraz podpisu wstawiony w umowę i wysłany przez Ciebie mieści się w tej definicji. To tak zwany zwykły podpis elektroniczny.',
      },
      {
        p: 'Art. 25 ust. 1 stanowi, że podpisowi elektronicznemu „nie można odmówić skutku prawnego ani dopuszczalności jako dowodu w postępowaniu sądowym wyłącznie z tego powodu, że podpis ten ma postać elektroniczną lub że nie spełnia wymogów dla kwalifikowanych podpisów elektronicznych”. Wyżej stoi podpis zaawansowany (art. 26), przy którym „każda późniejsza zmiana danych jest rozpoznawalna”. Najwyżej jest podpis kwalifikowany, który według art. 25 ust. 2 „ma skutek prawny równoważny podpisowi własnoręcznemu”. Opiera się na kwalifikowanym certyfikacie (art. 3 pkt 12). Obraz podpisu nie jest ani zaawansowany, ani kwalifikowany.',
      },
      { p: 'Zwykły podpis się liczy, ale sam niczego nie dowodzi: w sporze ważne są inne dowody, np. e-mail, z którym wysłano plik.' },

      { h2: 'Podpis zaufany i podpis kwalifikowany' },
      {
        p: 'Usługa [Podpisz dokument elektronicznie](' +
          GOV_PODPIS +
          ') w serwisie gov.pl pozwala podpisać plik profilem zaufanym (podpis zaufany), e-dowodem (podpis osobisty) albo certyfikatem kwalifikowanym (podpis kwalifikowany). Profil zaufany założysz bezpłatnie, a podpis zaufany to według gov.pl najczęściej stosowana, bezpłatna metoda. Działa to jednak inaczej niż nasze narzędzie: dokument dodajesz na stronie podpis.gov.pl, czyli wysyłasz go do usługi rządowej. Naraz podpiszesz do 5 plików, łącznie do 25 MB. Do podpisu kwalifikowanego potrzebny jest certyfikat kwalifikowany, czytnik karty i aplikacja Podpis GOV.',
      },
      {
        p: 'Według art. 20ae ust. 2 [ustawy o informatyzacji działalności podmiotów realizujących zadania publiczne](' +
          USTAWA_INFORMATYZACJA +
          ') dane opatrzone podpisem zaufanym „są równoważne pod względem skutków prawnych dokumentowi opatrzonemu podpisem własnoręcznym, chyba że przepisy odrębne stanowią inaczej”.',
      },

      { h2: 'Kiedy który podpis jest potrzebny' },
      {
        p: 'Formy czynności prawnych określa [Kodeks cywilny](' +
          KODEKS_CYWILNY +
          ') (tekst jednolity: Dz.U. z 2025 r. poz. 1071). Forma pisemna to według art. 78 § 1 własnoręczny podpis na dokumencie. Art. 78¹ § 1: „Do zachowania elektronicznej formy czynności prawnej wystarcza złożenie oświadczenia woli w postaci elektronicznej i opatrzenie go kwalifikowanym podpisem elektronicznym”, a § 2 dodaje, że taka forma jest równoważna z pisemną. Do formy dokumentowej (art. 77²) wystarcza dokument, który pozwala ustalić, kto złożył oświadczenie.',
      },
      {
        ul: [
          '**Brak wymaganej formy.** Według art. 60 wolę można wyrazić każdym zachowaniem, także w postaci elektronicznej, więc zwykle wystarczy PDF z podpisem w formie obrazu.',
          '**Forma dokumentowa**, np. umowa pożyczki powyżej tysiąca złotych (art. 720 § 2). PDF z podpisem w formie obrazu wysłany z Twojego adresu zwykle się nada.',
          '**Forma pisemna albo elektroniczna.** Obraz podpisu nie wystarcza: potrzebny jest podpis własnoręczny na papierze albo podpis kwalifikowany. Przykład: umowa najmu nieruchomości lub pomieszczenia na dłużej niż rok „powinna być zawarta na piśmie” (art. 660), inaczej uważa się ją za zawartą na czas nieoznaczony. Jeśli chcesz użyć podpisu zaufanego, ustal wcześniej z drugą stroną, czy go przyjmie.',
          '**Skutki braku formy.** Według art. 73 § 1 czynność bez zastrzeżonej formy jest nieważna tylko wtedy, gdy ustawa przewiduje rygor nieważności. W innych przypadkach art. 74 § 1 ogranicza dowody w sporze, np. zeznania świadków.',
        ],
      },

      { h2: 'Ograniczenia' },
      {
        ul: [
          'Nie ma certyfikatu ani zabezpieczenia przed zmianą. Każdy, kto ma edytor PDF, może zmienić plik po podpisaniu albo skopiować z niego obraz podpisu.',
          'Istniejącego tekstu w PDF nie da się przepisać. Puste miejsca wypełnij narzędziem **Tekst**, a pola interaktywne w narzędziu [Wypełnij formularz PDF](/pl/wypelnij-formularz-pdf).',
          'Ostatni podpis zostaje w przeglądarce (przycisk **Użyj ostatniego**), a dokument w sekcji **Ostatnie dokumenty** na pulpicie. Na wspólnym komputerze usuń dokument przyciskiem **Usuń**, a podpis, czyszcząc dane witryny, albo pracuj w oknie prywatnym.',
        ],
      },
      { p: '**[Otwórz narzędzie Podpisz PDF](/pl/podpisz-pdf)**' },
    ],
  },
  {
    path: '/guides/heic-to-jpg-without-uploading',
    lang: 'en',
    tool: 'heic-to-jpg',
    title: 'How to convert HEIC to JPG without uploading',
    description:
      'Convert iPhone HEIC photos to JPG in your browser, in batches, with a quality slider and optional resizing. What happens to EXIF data, and the limits.',
    h1: 'How to convert HEIC photos to JPG without uploading them',
    name: 'Guide: convert HEIC to JPG without uploading',
    published: '2026-11-08',
    blocks: [
      {
        p: 'Photos from an iPhone or iPad are often HEIC files. They take less space than JPG, but plenty of websites, forms and older computers refuse them. Most online converters want the photos uploaded first, and personal photos tend to show your home, your family or the documents you photographed. This guide shows how to convert them in your browser with our [HEIC to JPG](/heic-to-jpg) tool, where the photos stay on your device, and how to stop the problem at the source.',
      },

      { h2: 'What HEIC is' },
      {
        p: 'Apple\'s support page [Using HEIF or HEVC media on Apple devices](' +
          APPLE_HEIF +
          ') explains that iOS 11 and macOS High Sierra introduced HEIF (High Efficiency Image File Format) for photos and HEVC for videos, and that both "offer better compression than JPEG and H.264, so they use less storage space on your devices and iCloud Photos, while preserving the same visual quality." It lists the iPhone 7 and later among the devices that capture in these formats. Under **Add images** the tool lists the formats it accepts: JPG, PNG, WebP, GIF, BMP and HEIC.',
      },

      { h2: 'Convert HEIC to JPG step by step' },
      {
        ol: [
          'Open [HEIC to JPG](/heic-to-jpg) and drop the photos on **Add images**, or click it to choose them. You can add as many as you like, and add more later. The files are read by your browser; nothing is sent to a server.',
          'Under **Save as**, keep **JPG**. **WebP** gives smaller files that all modern browsers open, and **PNG** is lossless but larger.',
          'Set the quality slider, which starts at **Quality 80%** and goes from 30% to 100%. The hint next to it says 70 to 85% usually looks the same as the original. PNG has no quality setting.',
          'To make the photos smaller, tick **Shrink images larger than** under **Resize** and fill in **Max width (px)** and **Max height (px)**. Both start at 1920. Larger photos are scaled down to fit that box with their proportions kept; smaller ones keep their size.',
          'Click the convert button, which names the count, for example **Convert 12 images**. A progress bar shows how far it has got.',
          'With one photo, click **Download**. With several, **Download all (.zip)** saves them in `images.zip`, or download them one by one from the list. Each file keeps its name, with `.jpg` in place of `.heic`. The tool also shows the total size before and after.',
        ],
      },
      { p: 'The same converter is also on the [Compress & convert images](/image-converter) page, and it takes JPG, PNG, WebP and GIF too. To put HEIC photos straight into a PDF, use [Images to PDF](/image-to-pdf).' },

      { h2: 'What happens to the photo and its data' },
      {
        ul: [
          'Each HEIC photo is decoded on your device by libheif, a HEIF decoder that the page loads only when you convert one. The rotation stored in the photo is applied, so portrait shots stay upright.',
          'The JPG is drawn fresh from the decoded pixels. None of the original metadata is copied: as the tool notes after converting, location and camera data (EXIF) are removed. That also drops the date and time the photo was taken, so keep the originals if you need them.',
          'Conversion runs on your own processor, so a large batch takes a while on an older phone or laptop.',
        ],
      },

      { h2: 'What it cannot do' },
      {
        ul: [
          'It converts only the first image stored in a HEIC file. If a file holds several images, the others are not converted.',
          'It does not convert HEVC videos.',
          'The result is a standard 8-bit image, so any extra brightness range a photo stores for HDR displays is not carried over.',
          'There is no option to keep the EXIF data.',
          'JPG and WebP are lossy: each conversion loses a little detail, at any quality setting. Keep the HEIC files if you may need full quality later.',
          'A damaged file, or one that is not an image, is reported with "Could not read" and its name, and the batch stops there. Remove that file from the list and convert again.',
        ],
      },

      { h2: 'Avoid HEIC on the iPhone' },
      { p: 'Apple\'s page also describes how to get JPG files in the first place:' },
      {
        ul: [
          '**Shoot in JPG.** Open Settings, tap Camera, tap Formats, then tap Most Compatible. According to Apple, "All new photos and videos will now use JPEG or H.264 format." Choose High Efficiency to go back.',
          '**Sharing.** When you share by AirDrop, Messages or e-mail and the receiving device does not support the newer formats, photos "might automatically be shared in a more compatible format, such as JPEG".',
          '**Import over USB.** Importing into Photos, Image Capture or a PC may convert photos to JPEG. If you want the originals, Apple says to open Settings, tap Apps, tap Photos and choose Keep Originals.',
          '**On a Mac.** Open the photo in Photos or Preview, choose File, then Export, and pick JPEG or PNG.',
        ],
      },
      { p: '**[Open HEIC to JPG](/heic-to-jpg)**' },
    ],
  },
  {
    path: '/guides/pdf-to-word-without-uploading',
    lang: 'en',
    tool: 'pdf-to-word',
    title: 'How to convert PDF to Word without uploading',
    description:
      'Turn a PDF into an editable .docx in your browser. What carries over (text, paragraphs, bold, sizes), what does not (tables, columns, images) and why.',
    h1: 'How to convert a PDF to Word without uploading it',
    name: 'Guide: convert PDF to Word without uploading',
    published: '2026-11-08',
    blocks: [
      {
        p: 'You have a PDF and need to change its text in Word: a contract to reuse, an old CV, a report someone sent without the original file. Online converters usually upload the document first. Our [PDF to Word](/pdf-to-word) tool runs in your browser, so the file stays on your device. It is also a basic converter, and this guide is honest about what that means: you get the text to edit, not a copy of the layout.',
      },

      { h2: 'Why PDF to Word is hard' },
      {
        p: 'Microsoft\'s help page on [opening PDFs in Word](' +
          WORD_OPEN_PDF +
          ') puts it plainly: "PDF is a fixed file format, which means the file stores the location of text, pictures, and vector graphics on a page, but not necessarily the relationships among them." Most PDFs, it adds, "don\'t include information about structural content elements, such as paragraphs, tables, or columns", and a table is stored "as a set of lines without any relationship to the content inside the table cells."',
      },
      {
        p: 'So every converter has to guess the structure. Word itself uses "a system of complex rules" to do it, and Microsoft still lists elements that do not convert well, among them tables with cell spacing, frames, footnotes that span more than one page, endnotes and PDF comments.',
      },

      { h2: 'Convert step by step' },
      {
        ol: [
          'Open [PDF to Word](/pdf-to-word) and drop the file on **Choose a PDF**. It is read in your browser, not uploaded. A password-protected PDF has to be unlocked first with [Unlock PDF](/unlock-pdf).',
          'Click **Convert to Word**.',
          'Click **Download**. The file keeps the original name, with `.docx` at the end.',
          'Open it in Word, LibreOffice or another editor and compare it with the PDF before you send it on.',
        ],
      },

      { h2: 'What carries over' },
      {
        ul: [
          'The text of every page, in the order the PDF stores it.',
          'Line and paragraph breaks. Each line of the PDF becomes its own paragraph, and a large vertical gap between lines adds space after the paragraph above it.',
          'Font sizes, between 6 and 72 pt.',
          'Bold, where the name of the font says it is bold.',
          'A page break after each page.',
        ],
      },

      { h2: 'What does not carry over' },
      {
        ul: [
          '**Tables.** The text of the cells comes out as lines of text, and the grid is gone.',
          '**Columns.** Text set in two or more columns ends up in one. Where the PDF stores lines out of reading order, they come out in that order too.',
          '**Images.** Photos, charts, logos and drawings are left out.',
          '**Fonts.** The original typeface is not kept; the text uses the default font of the Word file. Bold is guessed from the font name, so it can be missed.',
          '**Other formatting.** Italics, underline, colours, alignment, indents, heading styles, lists and links are lost, and so are comments and form fields. Headers, footers and page numbers become ordinary text on each page.',
        ],
      },
      {
        p: 'One thing to plan for: because each line is a separate paragraph, edited text does not reflow. Add a few words to a line and it gets longer instead of wrapping into the next one. Joining the lines of each paragraph you want to edit is the main clean-up job after converting.',
      },

      { h2: 'Scanned PDFs need OCR first' },
      {
        p: 'A scan is a picture of text, so there is no text for the converter to read and the Word file comes out empty. Run the scan through [OCR](/ocr-pdf) first: it recognises Polish and English text and adds it to the PDF as an invisible layer. Click **Recognise text**, download the result and convert that file. OCR mistakes come along into Word, so compare names, numbers and amounts with the scan.',
      },

      { h2: 'When another route is better' },
      {
        ul: [
          '**You only need the text.** [PDF to text](/pdf-to-text) pulls it out to copy or save as a .txt file.',
          '**You need a small change and the same layout.** Edit the PDF itself in [Edit PDF](/edit-pdf). Existing text cannot be rewritten in place, but you can cover it with **Whiteout** and type new text on top.',
          '**The layout matters.** Ask the sender for the original .docx. Microsoft says its own conversion in Word "works best with files that are mostly text", and that a page made mostly of charts or graphics "might show up as an image".',
          '**You are going the other way.** [Word to PDF](/word-to-pdf) turns a .docx into a PDF.',
        ],
      },
      { p: '**[Open PDF to Word](/pdf-to-word)**' },
    ],
  },
  {
    path: '/pl/poradnik/heic-do-jpg-bez-wysylania',
    lang: 'pl',
    tool: 'heic-to-jpg',
    title: 'Jak zamienić HEIC na JPG bez wysyłania zdjęć',
    description:
      'Zdjęcia z iPhone’a zamienisz na JPG w przeglądarce, hurtowo, z suwakiem jakości. Co dzieje się z danymi EXIF i jakie są ograniczenia.',
    h1: 'Jak zamienić zdjęcia HEIC na JPG bez wysyłania ich na serwer',
    name: 'Poradnik: HEIC na JPG bez wysyłania zdjęć',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Zdjęcia z iPhone’a albo iPada to zwykle pliki HEIC. Zajmują mniej miejsca niż JPG, ale wiele formularzy, systemów urzędowych i starszych komputerów ich nie przyjmuje. Większość konwerterów online każe najpierw wgrać zdjęcia, a prywatne fotografie pokazują dom, rodzinę albo sfotografowane dokumenty. Ten poradnik pokazuje, jak zamienić je na JPG w narzędziu [HEIC do JPG](/pl/heic-do-jpg), które działa w przeglądarce, i jak rozwiązać problem u źródła.',
      },

      { h2: 'Czym jest HEIC' },
      {
        p: 'Strona wsparcia Apple [Używanie plików multimedialnych w formacie HEIF lub HEVC na urządzeniach Apple](' +
          APPLE_HEIF_PL +
          ') wyjaśnia, że systemy iOS 11 i macOS High Sierra wprowadziły format HEIF (High Efficiency Image File Format) dla zdjęć oraz HEVC dla plików wideo. Według Apple „Formaty HEIF i HEVC zapewniają lepszą kompresję niż formaty JPEG i H.264, dzięki czemu pliki zajmują mniej miejsca w pamięci urządzenia oraz w usłudze Zdjęcia w iCloud przy zachowaniu takiej samej jakości obrazu”. Wśród urządzeń, które tak rejestrują zdjęcia, Apple wymienia „iPhone 7 lub iPhone 7 Plus lub nowszy”. Pod polem **Dodaj zdjęcia** narzędzie wymienia formaty, które przyjmuje: JPG, PNG, WebP, GIF, BMP i HEIC.',
      },

      { h2: 'Jak zamienić HEIC na JPG krok po kroku' },
      {
        ol: [
          'Otwórz [HEIC do JPG](/pl/heic-do-jpg) i upuść zdjęcia na pole **Dodaj zdjęcia** albo kliknij je i wybierz pliki. Możesz dodać ich dowolnie dużo i dokładać kolejne później. Pliki odczytuje przeglądarka; nic nie trafia na serwer.',
          'W sekcji **Zapisz jako** zostaw **JPG**. **WebP** daje mniejsze pliki, które otworzy każda nowoczesna przeglądarka, a **PNG** jest bezstratny, ale większy.',
          'Ustaw suwak jakości. Zaczyna się na **Jakość 80%** i obejmuje zakres od 30% do 100%. Podpowiedź obok mówi, że 70 do 85% zwykle nie różni się wizualnie od oryginału. Przy formacie PNG ustawienie jakości nie ma zastosowania.',
          'Żeby zmniejszyć zdjęcia, zaznacz **Zmniejsz zdjęcia większe niż** w sekcji **Wymiary** i wpisz **Maks. szerokość (px)** oraz **Maks. wysokość (px)**. Oba zaczynają się od 1920. Większe zdjęcia są skalowane tak, żeby zmieściły się w tym prostokącie z zachowaniem proporcji; mniejsze zostają bez zmian.',
          'Kliknij **Konwertuj**. Pasek postępu pokazuje, na którym etapie jest konwersja.',
          'Przy jednym zdjęciu kliknij **Pobierz**. Przy kilku **Pobierz wszystkie (.zip)** zapisze je w pliku `images.zip`; możesz też pobrać każde z osobna z listy. Plik zachowuje swoją nazwę, z rozszerzeniem `.jpg` zamiast `.heic`. Narzędzie pokazuje też łączny rozmiar przed konwersją i po niej.',
        ],
      },
      {
        p: 'Ten sam konwerter działa na stronie [Kompresuj i konwertuj zdjęcia](/pl/kompresuj-zdjecia), gdzie przyjmuje również JPG, PNG, WebP i GIF. Żeby wstawić zdjęcia HEIC od razu do PDF, użyj narzędzia [Zdjęcia do PDF](/pl/jpg-do-pdf).',
      },

      { h2: 'Co dzieje się ze zdjęciem i jego danymi' },
      {
        ul: [
          'Każde zdjęcie HEIC dekoduje na Twoim urządzeniu biblioteka libheif, którą strona wczytuje dopiero przy konwersji. Obrót zapisany w zdjęciu jest uwzględniany, więc fotografie pionowe zostają pionowe.',
          'JPG powstaje na nowo z odkodowanych pikseli. Żadne metadane oryginału nie są kopiowane: po konwersji narzędzie zaznacza, że **Lokalizacja i dane aparatu (EXIF) są usuwane**. Znika przy tym również data i godzina wykonania zdjęcia, więc zachowaj oryginały, jeśli będą potrzebne.',
          'Konwersja liczy się na Twoim procesorze, więc duża partia zdjęć potrwa dłużej na starszym telefonie albo laptopie.',
        ],
      },

      { h2: 'Czego narzędzie nie zrobi' },
      {
        ul: [
          'Konwertuje tylko pierwszy obraz zapisany w pliku HEIC. Jeśli plik zawiera ich kilka, pozostałe nie zostaną przetworzone.',
          'Nie konwertuje filmów HEVC.',
          'Wynik to standardowy obraz 8-bitowy, więc dodatkowy zakres jasności zapisany na potrzeby ekranów HDR nie zostaje przeniesiony.',
          'Nie ma opcji zachowania danych EXIF.',
          'JPG i WebP są stratne: każda konwersja gubi trochę szczegółów, przy każdym ustawieniu jakości. Zachowaj pliki HEIC, jeśli możesz jeszcze potrzebować pełnej jakości.',
          'Uszkodzony plik albo taki, który nie jest obrazem, kończy się komunikatem **Nie udało się odczytać obrazu** z nazwą pliku. Usuń go z listy i uruchom konwersję ponownie.',
        ],
      },

      { h2: 'Jak uniknąć HEIC na iPhonie' },
      { p: 'Ta sama strona Apple opisuje, jak od razu zapisywać zdjęcia w JPG:' },
      {
        ul: [
          '**Rejestrowanie w JPG.** Apple podaje: „Otwórz Ustawienia i stuknij opcję Aparat”, a dalej „Stuknij opcję Formaty. Następnie stuknij opcję Najbardziej zgodne”. Wtedy „Wszystkie nowe zdjęcia i nagrania wideo będą od teraz rejestrowane w formacie JPEG lub H.264”. Żeby wrócić do poprzedniego ustawienia, wybierz opcję High Efficiency.',
          '**Udostępnianie.** Przy AirDrop, Wiadomościach albo poczcie e-mail, jeśli urządzenie odbierające nie obsługuje nowszych formatów, pliki „mogą zostać automatycznie udostępnione w bardziej zgodnym formacie, takim jak JPEG lub H.264”.',
          '**Import przez USB.** Przy imporcie do aplikacji Zdjęcia, Pobieranie obrazów albo na komputer PC pliki mogą zostać przekonwertowane do formatu JPEG. Jeśli wolisz zachować oryginały, Apple radzi wybrać kolejno opcje Ustawienia, Aplikacje, Zdjęcia, a potem stuknąć opcję Pozostaw oryginały.',
          '**Na Macu.** Otwórz zdjęcie w aplikacji Zdjęcia albo Podgląd, wybierz kolejno opcje Plik i Eksportuj, a przed zachowaniem wybierz format JPEG albo PNG.',
        ],
      },
      { p: '**[Otwórz narzędzie HEIC do JPG](/pl/heic-do-jpg)**' },
    ],
  },
  {
    path: '/pl/poradnik/haslo-wyciag-bankowy',
    lang: 'pl',
    tool: 'unlock',
    title: 'Jak usunąć hasło z wyciągu bankowego PDF',
    description:
      'Banki wysyłają wyciągi zaszyfrowane hasłem. Usuniesz je w przeglądarce, bez wysyłania pliku na serwer. Co zrobić, gdy blokada dotyczy tylko druku.',
    h1: 'Jak usunąć hasło z wyciągu bankowego, nie wysyłając go na obcy serwer',
    name: 'Poradnik: hasło z wyciągu bankowego',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Polskie banki często dostarczają wyciągi i potwierdzenia operacji jako pliki PDF zaszyfrowane hasłem. To dobra praktyka w chwili wysyłki, bo plik jedzie e-mailem. Problem zaczyna się później: zaszyfrowanego PDF nie przyjmie część programów księgowych, nie da się go scalić z innymi dokumentami ani wygodnie przeszukać, a przy każdym otwarciu trzeba wpisywać hasło. Ten poradnik pokazuje, jak zdjąć je narzędziem [Odblokuj PDF](/pl/odblokuj-pdf), które działa w przeglądarce.',
      },
      {
        p: 'Jest powód, żeby akurat przy tym pliku uważać na konwertery online. Wyciąg bankowy pokazuje numer rachunku, saldo, adres i każdą transakcję z nazwami odbiorców. To jeden z najbardziej wrażliwych dokumentów, jakie masz, a typowe narzędzie „odblokuj PDF” zaczyna od tego, że każe wgrać go na swój serwer i podać do niego hasło.',
      },

      { h2: 'W PDF są dwa różne zamki' },
      {
        p: 'Zanim cokolwiek zrobisz, ustal, który z nich blokuje Twój plik. To decyduje o tym, co wpiszesz w narzędziu.',
      },
      {
        ul: [
          '**Hasło otwarcia.** Plik jest zaszyfrowany i bez hasła nie otworzy się w ogóle. Tak zwykle wygląda wyciąg przysłany e-mailem. Hasło znasz, bo bank podaje jego schemat w umowie albo w treści wiadomości: bywa to fragment numeru PESEL, data urodzenia albo numer klienta.',
          '**Hasło uprawnień.** Plik otwiera się normalnie, ale czytnik blokuje drukowanie, kopiowanie tekstu albo komentowanie. Tak bywają zabezpieczone potwierdzenia przelewów i dokumenty z urzędów. Hasła do otwarcia nie ma, bo nie jest potrzebne.',
        ],
      },
      {
        p: 'Narzędzie obsługuje oba przypadki. Pod polem **Hasło** widnieje podpowiedź: „Zostaw puste dla plików, które otwierają się bez hasła, ale blokują drukowanie lub kopiowanie”.',
      },

      { h2: 'Jak usunąć hasło krok po kroku' },
      {
        ol: [
          'Otwórz [Odblokuj PDF](/pl/odblokuj-pdf) i dodaj plik. Odczytuje go przeglądarka na Twoim urządzeniu; nic nie jest wysyłane.',
          'Jeśli plik wymaga hasła do otwarcia, wpisz je w pole **Hasło**. Jeśli otwiera się sam, a zablokowane jest tylko drukowanie albo kopiowanie, zostaw to pole puste.',
          'Kliknij **Odblokuj PDF**.',
          'Pobierz wynik. To ta sama treść bez szyfrowania: otworzy się w każdym czytniku i w każdym programie, bez pytania o hasło.',
        ],
      },
      {
        p: 'Gdy hasło się nie zgadza, narzędzie pokazuje komunikat „Nieprawidłowe hasło albo nie udało się odszyfrować tego pliku PDF”. Najczęstsza przyczyna to spacja wklejona razem z hasłem albo inny schemat, niż zapamiętałeś.',
      },

      { h2: 'Czego to narzędzie nie zrobi' },
      {
        p: 'Nie łamie haseł. Opis narzędzia mówi wprost: usuwa hasło „z pliku PDF, który możesz otworzyć”. Jeśli nie znasz hasła otwarcia, jedyna droga prowadzi przez bank albo nadawcę dokumentu. Tak ma być: gdyby dowolna strona internetowa potrafiła zdjąć szyfrowanie z cudzego wyciągu, szyfrowanie nie miałoby sensu.',
      },

      { h2: 'Co zrobić z odblokowanym plikiem dalej' },
      {
        ul: [
          'Wysyłasz wyciąg jako dowód dochodu wynajmującemu albo księgowej? Zwykle nie potrzebują wszystkich danych. Numer rachunku i pozycje niezwiązane ze sprawą usuń w narzędziu [Anonimizuj PDF](/pl/anonimizuj-pdf). Zaczernienie usuwa tekst, a nie tylko go zakrywa.',
          'Kilka miesięcy wyciągów złóż w jeden plik narzędziem [Połącz PDF](/pl/polacz-pdf). Scalanie wymaga, żeby żaden plik nie był już zaszyfrowany, dlatego hasło zdejmuje się najpierw.',
          'Jeśli załącznik jest za duży na e-mail, zmniejsz go w narzędziu [Kompresuj PDF](/pl/kompresuj-pdf).',
          'Chcesz zachować ochronę, ale ze swoim hasłem? Dodaj je ponownie w narzędziu [Zabezpiecz PDF hasłem](/pl/zabezpiecz-pdf-haslem), które szyfruje algorytmem AES-256.',
        ],
      },

      { h2: 'Jak sprawdzić, że plik naprawdę nigdzie nie pojechał' },
      {
        p: 'Nie musisz wierzyć na słowo. Otwórz panel **Sieć** w narzędziach deweloperskich przeglądarki, wykonaj operację na pliku i popatrz, czy pojawi się jakiekolwiek żądanie wysyłające dane. Nie pojawi się: strona ma politykę bezpieczeństwa treści, która ogranicza połączenia do własnego serwera i blokuje wysyłanie formularzy. Przy wyciągu bankowym to jedyna gwarancja, która cokolwiek znaczy.',
      },
      { p: '**[Otwórz narzędzie Odblokuj PDF](/pl/odblokuj-pdf)**' },
    ],
  },
  {
    path: '/pl/poradnik/pdf-do-word-bez-wysylania',
    lang: 'pl',
    tool: 'pdf-to-word',
    title: 'Jak zamienić PDF na Word bez wysyłania pliku',
    description:
      'Zamień PDF na edytowalny plik .docx w przeglądarce. Co przechodzi do Worda, czego nie da się odzyskać i kiedy najpierw potrzebny jest OCR.',
    h1: 'Jak zamienić PDF na plik Word bez wysyłania go na serwer',
    name: 'Poradnik: PDF do Word bez wysyłania pliku',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Umowa do poprawienia, stare CV, raport przysłany bez oryginalnego pliku: czasem trzeba wrócić do edytowalnego tekstu, a masz tylko PDF. Większość konwerterów online najpierw wgrywa dokument na swój serwer. Narzędzie [PDF do Word](/pl/pdf-do-word) działa w przeglądarce, więc plik zostaje na Twoim urządzeniu. To prosty konwerter i ten poradnik mówi wprost, co to znaczy: odzyskasz tekst do edycji, a nie kopię układu strony.',
      },

      { h2: 'Dlaczego konwersja PDF na Word jest trudna' },
      {
        p: 'Polska strona pomocy Microsoftu o [otwieraniu plików PDF w programie Word](' +
          WORD_OPEN_PDF_PL +
          ') tłumaczy to wprost. „Format pliku PDF jest formatem stałym, co oznacza, że w pliku są przechowywane informacje o położeniu tekstu, obrazów i grafik wektorowych w ramach strony”, ale niekoniecznie informacje o ich wzajemnych relacjach. Dalej: „Większość plików PDF nie zawiera informacji o strukturalnych elementach zawartości, takich jak akapity, tabele lub kolumny”, a tabelę PDF zapisuje „jako zestaw linii bez jakiegokolwiek powiązania z zawartością w jej komórkach”.',
      },
      {
        p: 'Każdy konwerter musi więc zgadywać strukturę, łącznie z samym Wordem. Microsoft wymienia elementy, które konwertują się źle: tabele z odstępami między komórkami, kolory i obramowania stron, prześledzone zmiany, ramki, przypisy dolne zajmujące więcej niż jedną stronę, przypisy końcowe, zakładki, tagi i komentarze PDF.',
      },

      { h2: 'Konwersja krok po kroku' },
      {
        ol: [
          'Otwórz [PDF do Word](/pl/pdf-do-word) i upuść plik na pole **Wybierz plik PDF**. Dokument jest odczytywany w przeglądarce i nie trafia na serwer. PDF zabezpieczony hasłem trzeba najpierw otworzyć w narzędziu [Odblokuj PDF](/pl/odblokuj-pdf).',
          'Pod nazwą pliku pojawi się jego rozmiar i liczba stron, na przykład `1,4 KB · 2 strony`, a obok przycisk **Zmień plik**, gdyby to był nie ten dokument.',
          'Kliknij **Konwertuj na Word**.',
          'Gdy zobaczysz napis **Gotowe: 1 plik**, kliknij **Pobierz**. Plik zachowuje nazwę oryginału z końcówką `.docx`.',
          'Otwórz go w Wordzie, LibreOffice albo innym edytorze i porównaj z PDF-em, zanim wyślesz go dalej.',
        ],
      },

      { h2: 'Co przechodzi do Worda' },
      {
        ul: [
          'Tekst każdej strony, w kolejności, w jakiej zapisał go PDF.',
          'Podział na linie i akapity. Każda linia PDF staje się osobnym akapitem, a duży odstęp pionowy między liniami dodaje odstęp po akapicie powyżej.',
          'Rozmiary czcionek od 6 do 72 punktów. Mniejsze i większe są przycinane do tych wartości.',
          'Pogrubienie, o ile mówi o tym nazwa czcionki użytej w PDF.',
          'Podział strony po każdej stronie dokumentu.',
        ],
      },

      { h2: 'Czego nie da się odzyskać' },
      {
        ul: [
          '**Tabele.** Tekst z komórek wychodzi jako kolejne linie, a siatka znika.',
          '**Kolumny.** Tekst złożony w dwóch albo więcej kolumnach trafia do jednej. Jeśli PDF zapisał linie poza kolejnością czytania, w tej kolejności też wyjdą.',
          '**Obrazy.** Zdjęcia, wykresy, logotypy i rysunki nie są przenoszone.',
          '**Czcionki.** Oryginalny krój nie zostaje zachowany; tekst dostaje domyślną czcionkę pliku Word. Pogrubienie jest zgadywane z nazwy czcionki, więc bywa pominięte.',
          '**Reszta formatowania.** Kursywa, podkreślenie, kolory, wyrównanie, wcięcia, style nagłówków, listy i odnośniki przepadają, podobnie jak komentarze i pola formularza. Nagłówki, stopki i numery stron stają się zwykłym tekstem na każdej stronie.',
        ],
      },
      {
        p: 'Jedna rzecz do zaplanowania: skoro każda linia jest osobnym akapitem, tekst po edycji nie zawija się sam. Dopisz kilka słów, a linia zrobi się dłuższa, zamiast przenieść końcówkę niżej. Połączenie linii w akapity to główna praca porządkowa po konwersji.',
      },

      { h2: 'Skany najpierw przez OCR' },
      {
        p: 'Skan to obraz tekstu, więc konwerter nie ma czego odczytać i plik Word wychodzi pusty. Najpierw przepuść skan przez [OCR](/pl/ocr-pdf): narzędzie rozpoznaje tekst polski i angielski i dokłada go do PDF jako niewidoczną warstwę. Pobierz wynik i dopiero ten plik zamień na Word. Błędy OCR przechodzą dalej do Worda, więc porównaj nazwiska, numery i kwoty ze skanem.',
      },

      { h2: 'Kiedy lepiej wybrać inną drogę' },
      {
        ul: [
          '**Potrzebujesz tylko tekstu.** [PDF do tekstu](/pl/pdf-do-tekstu) wyciąga go do skopiowania albo zapisania jako .txt.',
          '**Potrzebujesz drobnej zmiany przy zachowanym układzie.** Popraw sam PDF w [Edytuj PDF](/pl/edytuj-pdf). Istniejącego tekstu nie da się nadpisać w miejscu, ale można go zakryć narzędziem **Zamaluj** i wpisać nowy na wierzchu.',
          '**Układ strony jest ważny.** Poproś nadawcę o oryginalny plik .docx. Microsoft sam pisze, że konwersja „daje najlepsze efekty w przypadku plików zawierających głównie tekst”, a strona złożona głównie z wykresów albo grafiki „może zostać wyświetlona jako obraz”.',
          '**Idziesz w drugą stronę.** [Word do PDF](/pl/word-do-pdf) zamienia .docx na PDF.',
        ],
      },
      { p: '**[Otwórz narzędzie PDF do Word](/pl/pdf-do-word)**' },
    ],
  },
  {
    path: '/pl/poradnik/kompresja-pdf-do-emaila',
    lang: 'pl',
    tool: 'compress',
    title: 'Jak zmniejszyć PDF, żeby zmieścił się w e-mailu',
    description:
      'Limity załączników w Gmailu, Outlooku, WP, o2 i Interii, narzut kodowania i to, który poziom kompresji zabiera z PDF-a tekst. Bez wysyłania pliku.',
    h1: 'Jak zmniejszyć plik PDF, żeby zmieścił się w e-mailu',
    name: 'Poradnik: kompresja PDF do e-maila',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Skan umowy albo komplet faktur potrafi mieć kilkadziesiąt megabajtów i serwer pocztowy odbija wiadomość. Ten poradnik pokazuje, ile naprawdę można wysłać u polskich dostawców, dlaczego deklarowany limit bywa mniejszy, niż się wydaje, i jak zmniejszyć plik narzędziem [Kompresuj PDF](/pl/kompresuj-pdf), które działa w przeglądarce i nie wysyła dokumentu na żaden serwer.',
      },
      {
        p: 'Jest tu też rzecz, o której kompresory online zwykle nie uprzedzają: trzy z czterech poziomów zamieniają strony w obrazy i bezpowrotnie zabierają z dokumentu warstwę tekstu. Piszemy o tym niżej, przy wyborze poziomu.',
      },

      { h2: 'Ile naprawdę można wysłać' },
      {
        ul: [
          '**Gmail:** „W przypadku osobistych kont Gmail limit wynosi 25 MB”, a na kontach służbowych i szkolnych limity ustawia administrator Google Workspace. Po przekroczeniu limitu „Gmail automatycznie usuwa załącznik i dodaje go jako link do Dysku Google w e-mailu” ([pomoc Gmaila](' +
            GMAIL_LIMIT_PL +
            ')).',
          '**Outlook.com:** „Limit rozmiaru załącznika w przypadku plików wynosi 25 MB”, a dla plików z OneDrive 2 GB ([pomoc Microsoftu](' +
            OUTLOOK_LIMITS_PL +
            ')).',
          '**Firmowa skrzynka Microsoft 365:** to inny produkt i inne liczby. Domyślnie 35 MB przy wysyłaniu i 36 MB przy odbieraniu, a administrator może ustawić wartość od 1 MB do 150 MB ([opis usługi Exchange Online](' +
            M365_LIMITS_PL +
            ')). Na koncie firmowym limit 25 MB najpewniej Cię nie dotyczy.',
          '**WP i o2:** po 100 MB przy wysyłaniu i odbieraniu. Tej liczby nie ma w artykułach pomocy, jest w regulaminie, w punkcie 5.1: „wysyłanie i odbieranie załączników do e-mail do 100 MB” ([regulamin WP](' +
            WP_REGULAMIN +
            '), [regulamin o2](' +
            O2_REGULAMIN +
            ')).',
          '**Interia:** maksymalna przesyłka to 100 MB, tak samo na koncie bezpłatnym i płatnym. Uwaga na drugi limit, o którym łatwo zapomnieć: dzienny transfer wynosi 1 GB na koncie bezpłatnym i płatnym, a 15 GB w PocztaPRO ([porównanie parametrów kont](' +
            INTERIA_PARAMETRY +
            ')).',
        ],
      },
      {
        p: 'Wniosek praktyczny jest taki, że między polskimi skrzynkami zmieścisz dużo, bo WP, o2 i Interia dają po 100 MB. Wąskim gardłem jest odbiorca na Gmailu albo Outlook.com z limitem 25 MB, a takich adresów jest najwięcej. Jeśli nie wiesz, czego używa odbiorca, przyjmij 25 MB.',
      },
      {
        p: 'Celowo nie podajemy liczby dla Onetu: nie znaleźliśmy jej w oficjalnej pomocy, a wolimy pominąć wiersz niż wpisać wartość, której nie da się sprawdzić u źródła.',
      },

      { h2: 'Dlaczego 25 MB nie zawsze znaczy 25 MB' },
      {
        p: 'Załącznik nie jedzie pocztą jako surowe bajty. Jest kodowany base64, a standard mówi wprost, że „the encoded data are consistently only about 33 percent larger than the unencoded data” ([RFC 2045, punkt 6.8](' +
          RFC2045_BASE64 +
          ')). Doliczając obowiązkowe łamanie linii co 76 znaków, narzut wychodzi bliżej 37 procent. Google podaje dokładnie tę wartość, pisząc o limicie odbioru jako o limicie „po zakodowaniu, które zwiększa rozmiar o około 37%”.',
      },
      {
        p: 'Tylko nie każdy limit liczony jest w tym samym momencie i tu wiele poradników się myli. Google zaznacza, że jego limity wysyłania dotyczą rozmiaru „przed kodowaniem”, więc plik ważący 25 MB mieści się w limicie wysyłania Gmaila. Limity odbioru, a także poczta Microsoftu opuszczająca jego centra danych, liczone są już po zakodowaniu. Ponieważ o przyjęciu wiadomości decyduje serwer odbiorcy, bezpieczne założenie brzmi: przy limicie 25 MB po stronie odbiorcy celuj w plik o rozmiarze do mniej więcej 18 do 20 MB.',
      },

      { h2: 'Kompresja krok po kroku' },
      {
        ol: [
          'Otwórz [Kompresuj PDF](/pl/kompresuj-pdf) i upuść dokument na pole **Wybierz plik PDF**. Plik jest przetwarzany w przeglądarce i nie trafia na serwer.',
          'W polu **Poziom** wybierz jedną z opcji: **Bezstratnie**, **Lekko**, **Zalecane** albo **Mocno**. Pod nimi wyświetla się opis skutków wybranej opcji; przeczytaj go, bo różnica między nimi jest zasadnicza.',
          'Kliknij **Kompresuj** i pobierz wynik.',
          'Sprawdź rozmiar pliku, a potem go otwórz i spróbuj zaznaczyć w nim dowolne słowo. Jeśli się nie da, strony zostały zamienione w obrazy.',
        ],
      },
      {
        p: 'Jeśli dokument jest już mocno upakowany, narzędzie powie o tym wprost, zamiast zwracać plik większy od oryginału.',
      },

      { h2: 'Który poziom wybrać' },
      {
        p: 'To najważniejsza decyzja w całym procesie, bo tylko jeden z czterech poziomów zachowuje tekst dokumentu.',
      },
      {
        ul: [
          '**Bezstratnie** „zachowuje tekst i jakość; plik jest tylko zapisywany na nowo”, a oszczędność, jak uprzedza sam opis, „jest zwykle niewielka”. To jedyny poziom, po którym w pliku nadal da się zaznaczać i wyszukiwać tekst.',
          '**Lekko**, **Zalecane** i **Mocno** działają inaczej: „Strony są zamieniane w obrazy: duża oszczędność, ale tekstu nie da się już zaznaczać ani wyszukiwać”. Różnią się siłą kompresji obrazu, nie podejściem.',
        ],
      },
      {
        p: 'Przy skanach nie ma to znaczenia, bo skan i tak jest obrazem; tam spokojnie wybieraj mocniejszy poziom. Ale umowa, faktura albo pismo wygenerowane z Worda zawiera prawdziwy tekst i po każdym poziomie innym niż Bezstratnie przestanie być przeszukiwalne. Kontrahent nie znajdzie w nim numeru faktury, a czytnik ekranu nie odczyta go osobie niewidomej.',
      },
      {
        p: 'Jeśli potrzebujesz jednocześnie małego pliku i przeszukiwalnego tekstu, zrób to dwuetapowo: skompresuj mocno, a potem przepuść wynik przez [OCR](/pl/ocr-pdf), który dołoży warstwę tekstową z powrotem.',
      },

      { h2: 'Co zrobić, gdy plik nadal jest za duży' },
      {
        ul: [
          '**Podziel dokument.** [Podziel PDF](/pl/podziel-pdf) rozbije go na części, które zmieszczą się w kilku wiadomościach.',
          '**Wyrzuć zbędne strony.** Puste strony i powtórzone załączniki potrafią zrobić różnicę; przejrzyj dokument w [Uporządkuj strony](/pl/zmien-kolejnosc-stron-pdf).',
          '**Wyślij link zamiast pliku.** Gmail robi to sam powyżej 25 MB, a Interia proponuje Galerie Pocztowe. Przy dokumentach z danymi osobowymi sprawdź najpierw, czy wolno Ci umieścić je w usłudze chmurowej, bo to już powierzenie przetwarzania innemu podmiotowi.',
          '**Skanuj oszczędniej.** Skan w 600 dpi w kolorze waży wielokrotnie więcej niż ten sam dokument w 300 dpi w skali szarości, a do odczytu i do OCR w zupełności wystarcza.',
        ],
      },

      { h2: 'O czym pamiętać przy dokumentach z danymi osobowymi' },
      {
        p: 'Kompresja zmniejsza plik, ale niczego z niego nie usuwa w sensie prawnym. Jeśli w dokumencie są dane, których odbiorca nie powinien zobaczyć, zasłoń je wcześniej narzędziem [Anonimizuj PDF](/pl/anonimizuj-pdf), a ukryte właściwości dokumentu sprawdź w [Edytuj metadane](/pl/edytuj-metadane-pdf). Zamiana stron w obrazy usuwa warstwę tekstu, ale nie jest metodą anonimizacji i nie wolno jej tak traktować: dane nadal są widoczne na obrazie.',
      },
      { p: '**[Otwórz narzędzie Kompresuj PDF](/pl/kompresuj-pdf)**' },
    ],
  },
  {
    path: '/guides/does-a-pdf-tool-upload-your-files',
    lang: 'en',
    tool: 'redact',
    title: 'How to check if a PDF tool uploads your files',
    description:
      'Every PDF site says your files are safe. Three checks in your browser, in about a minute, show whether a tool really keeps them on your machine.',
    h1: 'How to check whether a PDF tool really uploads your files',
    name: 'Guide: does a PDF tool upload your files?',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Almost every online PDF tool promises something about your privacy. "Processed in your browser", "we delete your files after an hour", "bank-level encryption", "GDPR compliant". Those are four different claims, and only one of them can be checked by the person reading it. This guide shows how to check it, on any tool, in any modern browser, without installing anything.',
      },
      {
        p: 'We build PDF tools ourselves, so read this as an invitation rather than a sales pitch: run these checks on us too. The last section says exactly what you should see when you do.',
      },

      { h2: 'The check that settles it: watch the network' },
      {
        p: 'A file can only leave your computer as a network request, and your browser lists every request it makes. So you do not have to trust anyone\'s description of what a page does. You can look.',
      },
      {
        ol: [
          'Open the tool\'s page, but do not choose your file yet.',
          'Open the developer tools: `F12`, or `Ctrl` + `Shift` + `I` on Windows and Linux, or `Cmd` + `Option` + `I` on a Mac.',
          'Go to the **Network** panel ([Chrome](' + CHROME_DEVTOOLS_NETWORK + '), [Firefox](' + FIREFOX_NETWORK_MONITOR + ')) and clear the list.',
          'Now do the real job: choose your file and run the conversion.',
          'Look at what appeared, and sort the list by size.',
        ],
      },
      {
        p: 'If your file was uploaded, there is a request carrying it, and it is hard to disguise. It will be a `POST` or a `PUT`, its size will be close to the size of your file, and its request payload will be the file itself. A tool that works locally produces nothing of the sort: the page, the scripts and the fonts load at the start, and then the list stays still while your 12 MB scan is converted.',
      },
      {
        p: 'Size is the part to watch. A local tool may still send small requests for analytics or error reporting, and those are not your document. One request roughly the size of your file is the signal. A handful of requests a few kilobytes each is not.',
      },

      { h2: 'The stronger version: pull the plug' },
      {
        p: 'There is a blunter test that needs no reading of request payloads at all. Load the page, disconnect from the internet, then do the job.',
      },
      {
        ol: [
          'Open the tool and let the page finish loading.',
          'Turn off your Wi-Fi, or tick **Offline** in the Network panel of the developer tools.',
          'Choose your file and run the conversion.',
        ],
      },
      {
        p: 'If it still works, your file never needed a server, because at that moment there was no server to reach. If it fails or hangs, the work was happening somewhere else. This is the one check with no room for interpretation, and it takes about fifteen seconds.',
      },

      { h2: 'Read the policy the browser enforces' },
      {
        p: 'A site can declare where its own pages are allowed to send data, in a `Content-Security-Policy` response header. This is not a sentence in a privacy policy: the browser enforces it and blocks anything outside it. To see it, open the Network panel, click the first entry (the document itself) and look under **Response Headers**. On the command line, `curl -I https://example.com` prints the same thing.',
      },
      {
        p: 'Two directives matter here. `connect-src` lists where the page\'s scripts may send data ([MDN](' + MDN_CONNECT_SRC + ')), and `form-action` lists where a form may submit ([MDN](' + MDN_FORM_ACTION + ')). A policy of `connect-src \'self\'` means scripts can only call back to the same site, which rules out the page handing your file to somebody else.',
      },
      {
        p: 'One trap is worth knowing, and MDN states it plainly for `form-action`: it does not fall back to `default-src`, so "Not setting this allows anything". A missing directive is not a restriction. Read what is in the header, not what you expected to find there.',
      },
      {
        p: 'Be clear about what this proves. A content security policy constrains the page running in your browser. It says nothing about what a server does with a file you did send it. It is useful evidence next to the network check, and no substitute for it.',
      },

      { h2: 'Three claims that sound like privacy and are not' },
      {
        ul: [
          '**"Encrypted connection", "bank-level encryption", "SSL".** That is HTTPS, which every site has, including every site that does read your files. It means nobody intercepted the document on the way to their server. It says nothing about the server.',
          '**"Files are deleted after an hour".** The file was uploaded, it was readable while it sat there, and you are trusting a deletion you cannot observe. For a document you hold in confidence, the hour is the problem, not the deletion.',
          '**"GDPR compliant", "ISO 27001", "SOC 2".** These describe how an organisation handles data it holds. They are reasons to trust a company with your file, not evidence that it never receives one.',
        ],
      },
      {
        p: 'Only one claim removes the question: the file never left your computer. That is also the only one you can confirm for yourself, in a minute, with the checks above.',
      },

      { h2: 'When this matters more than usual' },
      {
        p: 'For a holiday photo it hardly matters. It matters when the document belongs to somebody else: a client file, a medical record, an employee contract, a CV sent to you in confidence. Uploading one of those to a third party is not a technical detail, it is a decision to let another company process personal data, with everything that follows from it. If you cannot tell where the file goes, that alone is reason to do the job locally or in an installed program.',
      },

      { h2: 'Now try it on us' },
      {
        p: 'Run all three checks on this site. Open [Redact PDF](/redact-pdf), or any other tool here, and watch the Network panel while you work: the page and its scripts load, and then your file produces no upload. Go offline first and the tools still run, because the code is already in your browser and the document never needs to travel.',
      },
      {
        p: 'The header on every page here is `default-src \'self\'`, `connect-src \'self\' data: blob:` and `form-action \'none\'`. The `data:` and `blob:` entries deserve explaining rather than glossing over, because they are not servers. A `blob:` URL points at something held in your browser\'s own memory ([MDN](' + MDN_BLOB_URL + ')), which is how a finished file is handed to you as a download. No other site appears in that list, and `form-action \'none\'` means no form on the page can submit anywhere at all.',
      },
      {
        p: 'That is the whole point of writing this down. You should not have to believe a sentence on a landing page, ours included, when the browser you already have will show you the answer.',
      },
      { p: '**[Open Redact PDF](/redact-pdf)**' },
    ],
  },
  {
    path: '/guides/merge-pdf-without-uploading',
    lang: 'en',
    tool: 'merge',
    title: 'How to merge PDFs without uploading them',
    description:
      'Merge PDFs in your browser, in the order you choose. What a merge keeps, what it silently drops (bookmarks, form fields, signatures) and how to check.',
    h1: 'How to merge PDF files without uploading them',
    name: 'Guide: merge PDFs without uploading',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Combining files is the most ordinary thing anyone does to a PDF, and the one most often done by dropping a stack of documents onto a stranger\'s server. It does not need a server. [Merge PDF](/merge-pdf) joins the files in your browser, and the documents never leave your computer.',
      },
      {
        p: 'The second half of this guide is the part you will not find on most PDF sites: a merge quietly throws things away, and it is worth knowing what before you merge the only copy of something.',
      },

      { h2: 'Merging, step by step' },
      {
        ol: [
          'Open [Merge PDF](/merge-pdf) and drop your files on **Add PDF files**. The hint under it, "Drop several files, then put them in order", is the whole workflow.',
          'Add as many as you like, in as many goes as you like. Each batch is added to the list rather than replacing it, so you can drag in a few files, find another, and drop that in too.',
          'Put them in order. Every row is numbered and has a **Move up** and a **Move down** button, and an X to drop a file you added by mistake. The number on the left is the order of the finished document.',
          'Click **Merge 2 files** (the button counts your files, so it says 3, 4 or 12 as you add them). It stays disabled until there are at least two files, since merging one file is not a merge.',
          'Download the result. It is named after your first file, with `_merged` on the end: `contract.pdf` and `annex.pdf` come back as `contract_merged.pdf`.',
        ],
      },
      {
        p: 'If one of the files is password-protected the tool stops and tells you so, rather than producing a damaged document. Remove the password first with [Unlock PDF](/unlock-pdf), using the password you already know, and then merge.',
      },

      { h2: 'What a merge keeps, and what it drops' },
      {
        p: 'A merge is not a staple. The tool builds a brand new document and copies the pages across one by one. Everything that belongs to a page travels with it, and everything that belonged to the old document as a whole is left behind.',
      },
      {
        p: 'Kept, exactly as they were: the pages themselves, their text, fonts, images, vector drawing, page size and rotation. Text stays selectable and searchable, and a merge never turns pages into pictures.',
      },
      {
        p: 'Not carried over:',
      },
      {
        ul: [
          '**Bookmarks.** The clickable outline in your viewer\'s sidebar. A merged 200 page report has no table of contents in the sidebar, even though each original had one.',
          '**Form fields.** A fillable PDF comes back flat. We tested this on the tool: a text field named `invoice.number` in the source file is simply absent from the merged file.',
          '**Title, author and the other document properties.** The merged file starts blank, and its producer is the PDF library the tool uses. Usually this is a small privacy win rather than a loss.',
          '**Digital signatures.** A signature covers an exact range of bytes in one specific file, so any merge breaks it. This is not a limitation of this tool: it is true of every merge, everywhere, and it is the point of a signature. Under [eIDAS](' + EIDAS + ') a qualified signature is what gives a document its legal weight, so a signed document should travel as its own file, not inside a merged bundle.',
          '**Attachments, tagged structure and page labels.** Embedded files, the accessibility tags a screen reader uses, and page numbering schemes such as roman numerals for a preface.',
        ],
      },
      {
        p: 'We checked the first three directly: we built a PDF with a form field and a title, merged it, and read the result back. The field and the title were both gone and the pages were all present. The rest live in the same place in the file structure, the document catalogue, which a newly created document starts out empty.',
      },
      {
        p: 'None of this is unusual. Pick any merge tool, online or installed, and most of the same things will be missing, because most of them work the same way. The difference is whether anyone tells you.',
      },

      { h2: 'Three things worth checking before you merge' },
      {
        ul: [
          '**Is any file signed?** If yes, merging destroys the signature. Send it separately.',
          '**Is any file a form someone still has to fill in?** Merge after it is filled and flattened, not before.',
          '**Is this the only copy?** Keep the originals until you have opened the merged file and checked it. Bookmarks and form fields cannot be recovered from the merged document.',
        ],
      },

      { h2: 'After the merge' },
      {
        ul: [
          'Too large to e-mail? [Compress PDF](/compress-pdf) will shrink it, and the [guide to e-mail size limits](/guides/compress-pdf-for-email) explains which setting keeps your text selectable.',
          'Wrong order, or a page to remove? [Organize pages](/organize-pdf-pages) works visually on the merged file.',
          'Want a title and author on the finished document? [Edit metadata](/edit-pdf-metadata) fills in the properties the merge left blank.',
          'Need page numbers running across the whole bundle? [Add page numbers](/add-page-numbers-to-pdf) does that after merging, which is the right order to do it in.',
        ],
      },

      { h2: 'Why doing it locally is worth the bother' },
      {
        p: 'The files people merge are rarely trivial: a contract and its annexes, a tender submission, a year of invoices for an accountant, a patient\'s records. Merging them online means handing that whole bundle to a company you have not met, which is a decision about someone else\'s data as much as your own.',
      },
      {
        p: 'You do not have to take our word for where the files go. Our [guide to checking whether a PDF tool uploads your files](/guides/does-a-pdf-tool-upload-your-files) shows how to watch the network panel, and how to run this tool with your internet connection switched off. It still works, which is the only convincing answer.',
      },
      { p: '**[Open Merge PDF](/merge-pdf)**' },
    ],
  },
  {
    path: '/pl/poradnik/polacz-pdf-bez-wysylania',
    lang: 'pl',
    tool: 'merge',
    title: 'Jak połączyć pliki PDF bez wysyłania ich na serwer',
    description:
      'Łączenie PDF w przeglądarce, w wybranej kolejności. Co po scaleniu zostaje, a co znika bez ostrzeżenia: zakładki, pola formularza i podpis elektroniczny.',
    h1: 'Jak połączyć pliki PDF bez wysyłania ich na serwer',
    name: 'Poradnik: łączenie PDF bez wysyłania',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Komplet dokumentacji do przetargu, wniosek z załącznikami, faktury za cały miesiąc do księgowej, dokumentacja medyczna pacjenta. Łączenie plików PDF to najzwyklejsza czynność, jaką wykonuje się na dokumentach, i najczęściej robi się ją, wrzucając cały komplet na serwer obcej firmy. Nie trzeba. [Połącz PDF](/pl/polacz-pdf) scala pliki w przeglądarce, a dokumenty nie opuszczają Twojego komputera.',
      },
      {
        p: 'Druga część tego poradnika to rzecz, o której większość serwisów PDF milczy: scalanie bezpowrotnie usuwa część zawartości dokumentu. Warto wiedzieć co, zanim połączysz jedyny egzemplarz.',
      },

      { h2: 'Łączenie krok po kroku' },
      {
        ol: [
          'Otwórz [Połącz PDF](/pl/polacz-pdf) i upuść pliki na pole **Dodaj pliki PDF**. Podpowiedź pod spodem, „Upuść kilka plików, a potem ustaw ich kolejność", opisuje całą pracę.',
          'Dodawaj tyle plików, ile chcesz, i na tyle razy, ile potrzebujesz. Każda kolejna porcja dokłada się do listy, zamiast ją zastępować, więc możesz wrzucić kilka plików, znaleźć jeszcze jeden i dorzucić go osobno.',
          'Ustaw kolejność. Każdy wiersz ma numer oraz przyciski **Przesuń wyżej** i **Przesuń niżej**, a także X do usunięcia pliku dodanego przez pomyłkę. Numer po lewej to kolejność w gotowym dokumencie.',
          'Kliknij **Połącz PDF**. Przycisk pozostaje nieaktywny, dopóki nie wskażesz co najmniej dwóch plików, bo scalenie jednego pliku nie jest scaleniem.',
          'Pobierz wynik. Nazwa powstaje z nazwy pierwszego pliku z dopiskiem `_merged`: z `umowa.pdf` i `zalacznik.pdf` otrzymasz `umowa_merged.pdf`.',
        ],
      },
      {
        p: 'Jeśli któryś z plików jest zabezpieczony hasłem, narzędzie zatrzyma się i wyraźnie o tym poinformuje, zamiast zwracać uszkodzony dokument. Zdejmij hasło w [Odblokuj PDF](/pl/odblokuj-pdf), podając hasło, które znasz, a potem scalaj.',
      },

      { h2: 'Co zostaje po scaleniu, a co znika' },
      {
        p: 'Scalanie nie jest zszywaczem. Narzędzie tworzy zupełnie nowy dokument i przenosi do niego strony, jedna po drugiej. Wszystko, co należy do strony, wędruje razem z nią. Wszystko, co należało do starego dokumentu jako całości, zostaje w tyle.',
      },
      {
        p: 'Zostaje bez zmian: same strony, ich tekst, czcionki, obrazy, grafika wektorowa, rozmiar i obrót strony. Tekst nadal da się zaznaczać i wyszukiwać, a scalanie nigdy nie zamienia stron w obrazy.',
      },
      {
        p: 'Nie przenosi się:',
      },
      {
        ul: [
          '**Zakładki**, czyli klikalny spis treści w bocznym panelu czytnika. Scalona dokumentacja na 200 stron nie ma już nawigacji, choć każdy z plików źródłowych ją miał.',
          '**Pola formularza.** Wypełnialny PDF wraca jako płaski dokument. Sprawdziliśmy to na tym narzędziu: pole tekstowe o nazwie `invoice.number` obecne w pliku źródłowym po prostu nie istnieje w pliku scalonym.',
          '**Tytuł, autor i pozostałe właściwości dokumentu.** Scalony plik zaczyna z pustymi metadanymi, a jako producenta wpisuje bibliotekę PDF, z której korzysta narzędzie. Najczęściej jest to korzyść dla prywatności, a nie strata.',
          '**Podpis elektroniczny.** Podpis obejmuje dokładny zakres bajtów jednego konkretnego pliku, więc każde scalenie go unieważnia. To nie jest ograniczenie tego narzędzia: tak działa każde scalanie i na tym właśnie polega sens podpisu. Zgodnie z [rozporządzeniem eIDAS](' + EIDAS_PL + ') to podpis kwalifikowany nadaje dokumentowi moc prawną, więc dokument podpisany powinien jechać jako osobny plik, a nie w środku scalonej paczki. Więcej w poradniku o [podpisywaniu PDF bez wysyłania pliku](/pl/poradnik/podpis-pdf-bez-wysylania).',
          '**Załączniki, struktura dostępności i etykiety stron.** Pliki osadzone w dokumencie, znaczniki, z których korzysta czytnik ekranu, oraz nietypowa numeracja, na przykład cyfry rzymskie we wstępie.',
        ],
      },
      {
        p: 'Pierwsze trzy punkty sprawdziliśmy wprost: złożyliśmy PDF z polem formularza i tytułem, scaliliśmy go i odczytaliśmy wynik. Pola i tytułu już nie było, wszystkie strony były na miejscu. Reszta mieszka w tym samym miejscu struktury pliku, w katalogu dokumentu, który nowo utworzony dokument ma pusty.',
      },
      {
        p: 'Nie ma w tym nic nadzwyczajnego. Weź dowolne narzędzie do scalania, w przeglądarce albo zainstalowane, a najczęściej zabraknie dokładnie tego samego, bo większość działa tak samo. Różnica polega na tym, czy ktoś Ci o tym powie.',
      },

      { h2: 'Trzy rzeczy do sprawdzenia przed scaleniem' },
      {
        ul: [
          '**Czy któryś plik jest podpisany?** Jeśli tak, scalenie zniszczy podpis. Wyślij go osobno.',
          '**Czy któryś plik to formularz, który ktoś ma dopiero wypełnić?** Scalaj po wypełnieniu i spłaszczeniu, nie przed.',
          '**Czy to jedyny egzemplarz?** Zachowaj oryginały, dopóki nie otworzysz scalonego pliku i go nie obejrzysz. Zakładek ani pól formularza nie da się odzyskać ze scalonego dokumentu.',
        ],
      },

      { h2: 'Co dalej ze scalonym plikiem' },
      {
        ul: [
          'Za duży na e-mail? [Kompresuj PDF](/pl/kompresuj-pdf) go zmniejszy, a poradnik o [limitach załączników](/pl/poradnik/kompresja-pdf-do-emaila) tłumaczy, który poziom zachowuje tekst możliwy do zaznaczenia.',
          'Zła kolejność albo zbędna strona? [Uporządkuj strony](/pl/zmien-kolejnosc-stron-pdf) pozwala poprawić to na podglądzie.',
          'Chcesz uzupełnić tytuł i autora? [Edytuj metadane](/pl/edytuj-metadane-pdf) wypełni właściwości, które scalanie zostawiło puste.',
          'Potrzebna numeracja przez całą paczkę? [Numeracja stron](/pl/numeracja-stron-pdf) zrobi to po scaleniu, i to jest właściwa kolejność działań.',
        ],
      },

      { h2: 'Dlaczego warto robić to lokalnie' },
      {
        p: 'Pliki, które ludzie scalają, rzadko bywają błahe: umowa z aneksami, oferta przetargowa, roczny komplet faktur, dokumentacja pacjenta. Scalanie ich w serwisie online oznacza przekazanie całej paczki firmie, której nie znasz, a to decyzja dotycząca cudzych danych w nie mniejszym stopniu niż własnych.',
      },
      {
        p: 'Nie musisz wierzyć nam na słowo. Otwórz narzędzie, odłącz internet i scal pliki mimo to. Zadziała, bo kod jest już w Twojej przeglądarce, a dokument nie ma dokąd jechać.',
      },
      { p: '**[Otwórz narzędzie Połącz PDF](/pl/polacz-pdf)**' },
    ],
  },
  {
    path: '/pl/poradnik/metadane-pdf-bip-rodo',
    lang: 'pl',
    tool: 'metadata',
    title: 'Ukryte metadane w PDF: co widzi odbiorca dokumentu',
    description:
      'Autor, program i system operacyjny zapisane w pliku. Jak je sprawdzić, dlaczego wyczyszczenie pól to za mało i co mówi o tym polskie prawo.',
    h1: 'Ukryte metadane w PDF: co zdradza dokument, który publikujesz',
    name: 'Poradnik: metadane PDF w BIP i RODO',
    published: '2026-11-09',
    blocks: [
      {
        p: 'Na stronie dokumentu widać to, co miało być widoczne. Sam plik mówi więcej: kto go napisał, w jakim programie, na jakim systemie, kiedy powstał i kiedy był ostatnio zapisywany. Czasem także jak nazywała się wcześniejsza wersja. Jeśli publikujesz dokumenty w BIP, wysyłasz pisma w imieniu urzędu albo kancelarii, warto wiedzieć, co dokładnie wychodzi razem z plikiem.',
      },

      { h2: 'Skala problemu: liczby, nie przeczucia' },
      {
        p: 'Najlepszym opublikowanym badaniem tego zjawiska jest praca Supriyi Adhatarao i Cédrica Lauradoux „Exploitation and Sanitization of Hidden Data in PDF Files" ([arXiv](' +
          PDF_HIDDEN_DATA_STUDY +
          ')). Autorzy przeanalizowali 39 664 pliki PDF opublikowane przez 75 agencji bezpieczeństwa z 47 krajów, czyli instytucje, po których można by się spodziewać ostrożności.',
      },
      {
        ul: [
          '**33 procent** plików ujawniało tożsamość osoby, która utworzyła dokument.',
          '**76 procent** zdradzało program użyty do wytworzenia pliku PDF.',
          '**42 procent** pozwalało ustalić system operacyjny, bo nazwy programów bywają specyficzne dla systemu.',
          'Dla porównania: tylko **4 procent** dokumentów zawierało nazwisko autora w widocznej treści. Metadane ujawniały tożsamość mniej więcej osiem razy częściej niż sam tekst dokumentu.',
          '**13 procent** plików nie miało w ogóle obiektu z metadanymi, a mimo to coś ujawniało, bo dane potrafią siedzieć także w innych miejscach pliku.',
        ],
      },
      {
        p: 'Ostatni punkt jest najważniejszy dla osoby, która chce „wyczyścić plik i mieć spokój". Metadane w PDF nie mieszkają w jednym miejscu.',
      },

      { h2: 'Gdzie siedzą metadane' },
      {
        p: 'Dokument PDF ma dwa osobne magazyny na metadane dokumentu. Starszy to słownik informacji o dokumencie, z polami Title, Author, Subject, Keywords, Creator (program, w którym powstał oryginał), Producer (oprogramowanie, które zapisało PDF), CreationDate i ModDate. Nowszy to strumień XMP, czyli pakiet XML zaszyty w pliku. Norma PDF 2.0 uznaje strumienie metadanych za metodę zalecaną i dopuszcza je także na fragmentach dokumentu, nie tylko na całości ([punkt 14.3](' +
          PDF2_METADATA +
          ')).',
      },
      {
        p: 'Oba magazyny zwykle trzymają te same wartości, bo programy zapisują je równolegle. To właśnie dlatego wyczyszczenie jednego nie załatwia sprawy: drugi zostaje nietknięty, z tym samym nazwiskiem w środku.',
      },

      { h2: 'Jak sprawdzić, co jest w pliku' },
      {
        ul: [
          '**W czytniku PDF.** Właściwości dokumentu pokażą słownik informacji. Pakietu XMP prawie żaden czytnik nie pokazuje.',
          '**Narzędziem pdfinfo** (pakiet Poppler). Tu jest pułapka: `pdfinfo dokument.pdf` wypisuje słownik informacji, a `pdfinfo -meta dokument.pdf` wypisuje pakiet XMP, i tych opcji nie da się połączyć w jednym wywołaniu. Trzeba wykonać obie komendy. Kto uruchomi tylko pierwszą, nigdy nie zobaczy XMP.',
          '**Narzędziem exiftool.** `exiftool -a -G1 dokument.pdf` wypisuje jedno i drugie, oznaczając każdy wpis grupą, więc od razu widać, czy wartość pochodzi ze słownika informacji, czy z XMP ([nazwy znaczników PDF](' +
            EXIFTOOL_PDF +
            ')).',
          '**W narzędziu na tej stronie.** Upuść plik na [Edytuj metadane](/pl/edytuj-metadane-pdf), żeby zobaczyć sześć pól tekstowych ze słownika informacji. Narzędzie nie pokazuje dat ani pakietu XMP, więc do nich użyj pdfinfo albo exiftool.',
        ],
      },

      { h2: 'Co usuwa Edytuj metadane' },
      {
        p: 'Wyczyść wszystkie sześć pól, kliknij **Zapisz metadane** i pobierz wynik. Znikają wtedy oba magazyny naraz: słownik informacji i pakiet XMP. Usuwanie tylko jednego nie miałoby sensu, bo czytnik może uznać kopię z XMP za ważniejszą, więc w pliku zostałoby nazwisko, mimo że narzędzie pokazuje puste pola.',
      },
      {
        p: 'Sprawdziliśmy to na pliku, który miał wypełnione oba magazyny: tytuł „Umowa z kontrahentem" i autora „Jan Kowalski" w słowniku informacji oraz te same dane plus „Microsoft Word 2016" w pakiecie XMP. Po wyczyszczeniu pól żadnego z tych napisów nie ma już w bajtach pliku. Pilnuje tego test, który bez tej funkcji po prostu nie przechodzi.',
      },
      {
        p: 'Narzędzie zapisuje cały plik od nowa, zamiast dopisywać zmianę na jego końcu, więc wyczyszczone wartości nie zostają w poprzedniej wersji dokumentu. To nie jest oczywiste. Dokumentacja programu exiftool ostrzega, że jego własne zmiany w PDF są odwracalne poleceniem `-PDF-update:all=`, i stwierdza wprost: „exiftool alone may not be used to securely edit metadata in PDF files" ([dokumentacja exiftool](' +
          EXIFTOOL_POD +
          ')). Plik wygląda na wyczyszczony, a poprzednia wersja danych nadal w nim siedzi.',
      },

      { h2: 'Czego Edytuj metadane nie usuwa' },
      {
        ul: [
          '**Daty utworzenia i modyfikacji.** Zostają bez zmian.',
          '**Metadane przypisane do pojedynczych stron i obrazów.** Należą do stron, a nie do dokumentu, więc wędrują razem z nimi.',
          '**Komentarze, wartości pól formularza i dane wewnątrz osadzonych obrazów.**',
          '**Cokolwiek na stronie.** Nazwisko w nagłówku albo stopce to treść strony, a nie metadane. Do tego służy [Anonimizuj PDF](/pl/anonimizuj-pdf).',
        ],
      },
      {
        p: 'Jeśli mają zniknąć także daty albo metadane pojedynczych stron, zbuduj plik od nowa z samych stron: w [Podziel PDF](/pl/podziel-pdf) wybierz **Zakresy**, wpisz `1-` i podziel. Powstały plik nie przenosi starego słownika informacji ani pakietu XMP, a obie daty wskazują moment operacji. Uwaga na koszt: nowy dokument nie przenosi zakładek ani pól formularza, więc rób to na wersji ostatecznej.',
      },

      { h2: 'Co na to polskie prawo' },
      {
        p: 'Tu trzeba uważać, bo w tej sprawie łatwo napisać więcej, niż wynika z przepisów. Ustawa z 4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i aplikacji mobilnych podmiotów publicznych (tekst jednolity [Dz.U. 2023 poz. 82](' +
          USTAWA_DOSTEPNOSC +
          ')) wymaga w załączniku spełnienia kryterium 2.4.2 „Tytuły stron" na poziomie A, a przez odesłanie do punktu 10 normy EN 301 549, czyli do dokumentów niebędących stronami internetowymi, obejmuje tym także publikowane pliki PDF.',
      },
      {
        p: 'Sama norma EN 301 549 w punkcie 10.2.4.2 wymaga, by „Documents have titles that describe topic or purpose", ale w uwadze dodaje, że wystarczającym tytułem jest nazwa dokumentu, jeśli opisuje temat lub przeznaczenie ([tekst normy](' +
          EN301549 +
          ')). Innymi słowy: prawo wymaga tytułu, a opisowa nazwa pliku ten wymóg spełnia. Nie ma w polskim prawie przepisu, który nakazywałby wypełnić pole Title w metadanych PDF, i nie warto twierdzić inaczej.',
      },
      {
        p: 'Jest za to oficjalna rządowa instrukcja, która mówi autorom dokładnie to samo co ten poradnik, tylko od drugiej strony. Poradnik gov.pl o tworzeniu dostępnych dokumentów w programie Word stwierdza: „Przed opublikowaniem lub eksportowaniem dokumentu sprawdź i uzupełnij metadane dokumentu, w tym jego tytuł" ([gov.pl](' +
          GOV_DOSTEPNE_DOKUMENTY +
          ')). To jest właśnie moment, w którym nieuważnie wpisany autor zostaje zapieczętowany w pliku na zawsze.',
      },
      {
        p: 'Warto też pamiętać, że BIP nie ma furtki. Nawet podmiot, który powołuje się na nadmierne koszty zapewnienia dostępności, musi zapewnić dostępność cyfrową strony podmiotowej Biuletynu Informacji Publicznej. Z drugiej strony dokumenty tekstowe opublikowane przed 23 września 2018 r. są spod ustawy wyłączone, chyba że ich zawartość jest niezbędna do realizacji bieżących zadań podmiotu.',
      },

      { h2: 'A RODO?' },
      {
        p: 'Powiemy to uczciwie: nie znaleźliśmy decyzji ani wytycznych Prezesa UODO, które dotyczyłyby wprost metadanych plików. Szukaliśmy i nie ma. Kto twierdzi inaczej, powinien podać sygnaturę.',
      },
      {
        p: 'Najbliższa sprawa dotyczy nie metadanych, lecz opublikowania w BIP niewłaściwego pliku. W maju 2026 r. UODO poinformował o postępowaniu wobec Burmistrza Miasta i Gminy Myślenice, który opublikował niezanonimizowaną petycję z imionami, nazwiskami, adresami zamieszkania i wzorami podpisów 749 osób; plik był dostępny przez kilkanaście dni, a kara wyniosła 7 700 zł ([komunikat UODO](' +
          UODO_BIP_DECYZJA +
          ')). Istotny szczegół: spór dotyczył obowiązku zgłoszenia naruszenia, a nie samej publikacji.',
      },
      {
        p: 'Wniosek dla osoby publikującej dokumenty jest prosty i nie wymaga nowych przepisów. Jeśli w pliku są dane osobowe, których odbiorca nie powinien zobaczyć, to bez znaczenia, czy są na stronie, czy we właściwościach dokumentu. Metadane po prostu trudniej zauważyć przed publikacją niż po.',
      },

      { h2: 'Lista kontrolna przed publikacją' },
      {
        ol: [
          'Sprawdź plik dwiema komendami: `pdfinfo plik.pdf` i `pdfinfo -meta plik.pdf`, albo jedną: `exiftool -a -G1 plik.pdf`.',
          'Jeśli jest pakiet XMP z danymi, przepuść dokument przez [Podziel PDF](/pl/podziel-pdf) albo [Połącz PDF](/pl/polacz-pdf), żeby powstał nowy plik bez niego.',
          'Wyczyść pozostałe pola w [Edytuj metadane](/pl/edytuj-metadane-pdf) i uzupełnij sensowny tytuł, bo tytuł jest wymagany, a puste pole też bywa problemem.',
          'Sprawdź nazwę pliku. `petycja_wersja_bez_anonimizacji.pdf` mówi wszystko, zanim ktokolwiek go otworzy.',
          'Jeśli dokument zawiera dane do zasłonięcia na samych stronach, użyj [Anonimizuj PDF](/pl/anonimizuj-pdf) i sprawdź wynik zgodnie z poradnikiem o [anonimizacji zgodnej z RODO](/pl/poradnik/anonimizacja-pdf-rodo).',
          'Na koniec przeczytaj plik jeszcze raz obiema komendami. Sprawdza się wynik, nie intencję.',
        ],
      },
      {
        p: 'Wszystkie narzędzia na tej stronie działają w przeglądarce, więc dokument, który sprawdzasz pod kątem wycieku danych, nie wyjeżdża przy okazji na cudzy serwer.',
      },
      { p: '**[Otwórz narzędzie Edytuj metadane](/pl/edytuj-metadane-pdf)**' },
    ],
  },

  {
    path: '/pl/poradnik/zabezpiecz-pdf-przed-wyslaniem',
    lang: 'pl',
    tool: 'protect',
    title: 'Jak zabezpieczyć PDF hasłem przed wysłaniem',
    description:
      'Dane osobowe w załączniku wymagają zabezpieczenia. Zaszyfruj PDF hasłem w przeglądarce, bez wysyłania pliku, i przekaż hasło innym kanałem.',
    h1: 'Jak zabezpieczyć PDF hasłem, zanim wyślesz go z danymi osobowymi',
    name: 'Poradnik: zabezpieczanie PDF przed wysłaniem',
    published: '2026-11-10',
    blocks: [
      {
        p: 'Masz wysłać umowę, zaświadczenie albo listę pracowników. W pliku są imiona, nazwiska, adresy, numery PESEL. Poczta elektroniczna nie jest kanałem szyfrowanym od końca do końca, a załącznik zostaje w skrzynce nadawcy, w skrzynce odbiorcy i na serwerach po drodze. Zaszyfrowanie samego pliku jest najprostszym zabezpieczeniem, które nie zależy od tego, jak odbiorca ma skonfigurowaną pocztę.',
      },
      {
        p: 'RODO wymienia szyfrowanie wprost. Artykuł 32 ust. 1 lit. a) podaje „pseudonimizację i szyfrowanie danych osobowych” jako przykład środka technicznego odpowiedniego do ryzyka ([tekst rozporządzenia](' +
          RODO_PL +
          ')). Rozporządzenie nie nakazuje konkretnej metody, więc hasło na pliku nie jest obowiązkiem samym w sobie. Jest natomiast środkiem, który łatwo zastosować i łatwo wykazać.',
      },

      { h2: 'Paradoks narzędzi online' },
      {
        p: 'Większość narzędzi, które znajdziesz pod hasłem „zabezpiecz PDF hasłem”, to usługi serwerowe. Żeby zabezpieczyć plik z danymi osobowymi, trzeba im najpierw ten plik wysłać w postaci niezabezpieczonej. Dokument, który miał nie opuszczać organizacji, trafia do zewnętrznego podmiotu, zanim w ogóle dostanie hasło.',
      },
      {
        p: 'Narzędzie na tej stronie działa inaczej: szyfruje przeglądarka na twoim komputerze. Plik nie jest nigdzie wysyłany, a niżej jest instrukcja, jak to sprawdzić samemu.',
      },

      { h2: 'Dwa hasła, dwa różne skutki' },
      { p: 'PDF zna dwa hasła i warto wiedzieć, które z nich zakładasz.' },
      {
        ul: [
          '**Hasło użytkownika** jest tym, o które program pyta przy otwarciu. Bez niego nikt nie zobaczy treści. Pole `Hasło` w panelu to właśnie ono.',
          '**Hasło właściciela** nie blokuje otwarcia, pozwala natomiast zmienić uprawnienia. Pole `Hasło właściciela` jest opcjonalne, a panel dodaje: „Opcjonalne. Pozwala później zmienić uprawnienia. Jeśli zostawisz je puste, zostanie użyte losowe.” Losowe jest tu celowe: gdyby oba hasła były takie same, każdy, kto otwiera plik, mógłby po prostu zdjąć ograniczenia.',
        ],
      },

      { h2: 'Co dokładnie robi narzędzie' },
      {
        ol: [
          'Otwórz [Zabezpiecz PDF](/pl/zabezpiecz-pdf-haslem) i wskaż plik.',
          'Wpisz hasło w pole `Hasło` i to samo w `Powtórz hasło`. Przy różnicy pojawi się komunikat `Hasła nie są takie same.` i nic się nie wykona.',
          'W sekcji `Uprawnienia` zdecyduj, co wolno odbiorcy: `Zezwalaj na drukowanie`, `Zezwalaj na kopiowanie tekstu i obrazów`, `Zezwalaj na edycję i dodawanie adnotacji`.',
          'Jeśli chcesz, ustaw własne `Hasło właściciela`.',
          'Kliknij `Zabezpiecz PDF` i zapisz wynik.',
        ],
      },
      {
        p: 'Wynik jest zaszyfrowany algorytmem AES-256 w wariancie, który norma ISO 32000-2 oznacza jako `/V 5`, `/R 6`, `/AESV3`. Szyfrowane są i strumienie stron, i łańcuchy tekstowe, czyli także pola takie jak tytuł czy autor dokumentu. Testy tego projektu sprawdzają to niezależnie od samego narzędzia, przeliczając wpisy `/U` i `/O` algorytmem 2.B z normy.',
      },

      { h2: 'Czego uprawnienia nie załatwią' },
      {
        p: 'Uprawnienia to flagi w pliku, a nie bariera techniczna. Panel mówi o tym wprost: „Respektują je Adobe Reader, przeglądarki i większość czytników; niektóre programy je ignorują.” Wyłączone drukowanie utrudnia życie osobie, która nie szuka obejścia, ale nie jest ochroną przed kimś, kto go szuka. Ochroną jest hasło do otwarcia, bo bez niego nie ma czego czytać.',
      },
      {
        p: 'Dwie rzeczy zostają dozwolone niezależnie od twoich wyborów: wypełnianie formularzy i dostęp dla technologii wspomagających. To drugie jest celowe. Blokada kopiowania tekstu odcięłaby od dokumentu osoby korzystające z czytników ekranu, a nie taki jest sens zakładania hasła.',
      },

      { h2: 'Hasło przekazuje się innym kanałem' },
      {
        p: 'Hasło w tej samej wiadomości, w której jest załącznik, nie zabezpiecza niczego. Kto przeczyta wiadomość, ma jedno i drugie. Przekaż je osobno: telefonicznie, SMS-em, komunikatorem, przy odbiorze dokumentu. Jeśli regularnie wysyłasz pliki do tej samej osoby, ustalcie hasło raz, osobnym kanałem, zamiast dopisywać je do każdego maila.',
      },
      {
        p: 'Panel ostrzega też: „Zapisz hasło w bezpiecznym miejscu: nie da się go odzyskać.” To nie jest formułka. Szyfrowania AES-256 nie da się cofnąć bez hasła, a narzędzie [Odblokuj PDF](/pl/odblokuj-pdf) otwiera wyłącznie pliki, których hasło znasz. Nie łamie nieznanych haseł i nie ma takiej funkcji. Po stronie odbiorcy przydaje się [poradnik o usuwaniu hasła z wyciągu](/pl/poradnik/haslo-wyciag-bankowy), bo opisuje tę samą sprawę od drugiej strony.',
      },

      { h2: 'Jak sprawdzić, że plik nigdzie nie wyjechał' },
      {
        ol: [
          'Otwórz [Zabezpiecz PDF](/pl/zabezpiecz-pdf-haslem) i naciśnij `F12`, żeby włączyć narzędzia deweloperskie przeglądarki.',
          'Przejdź na kartę `Network` i wyczyść listę żądań.',
          'Wskaż plik, ustaw hasło i kliknij `Zabezpiecz PDF`.',
          'Popatrz na listę. Mogą się na niej pojawić pliki samej aplikacji, jeśli czegoś jeszcze brakowało w pamięci przeglądarki. Twojego PDF-a na niej nie będzie, bo nigdy nie jest wysyłany.',
        ],
      },
      {
        p: 'Możesz pójść dalej: rozłącz sieć i powtórz operację. Raz otwarta strona działa nadal, bo całe przetwarzanie dzieje się lokalnie.',
      },

      { h2: 'Zanim założysz hasło, sprawdź, co jest w pliku' },
      {
        p: 'Hasło chroni dokument w drodze do odbiorcy. Nie usuwa z niego niczego. Jeśli w pliku są dane, których ten konkretny odbiorca widzieć nie powinien, najpierw zasłoń je w [Anonimizuj PDF](/pl/anonimizuj-pdf), a dopiero potem zakładaj hasło. Warto też zajrzeć do poradników o [anonimizacji zgodnej z RODO](/pl/poradnik/anonimizacja-pdf-rodo) i o tym, co zostaje w [metadanych](/pl/poradnik/metadane-pdf-bip-rodo).',
      },
      {
        p: 'Jeśli plik jest za duży na załącznik, zmniejsz go przed zaszyfrowaniem, nie po. Zaszyfrowanego dokumentu narzędzia nie przerobią bez hasła. Jak to zrobić, opisuje poradnik o [kompresji PDF do maila](/pl/poradnik/kompresja-pdf-do-emaila).',
      },
      { p: '**[Otwórz narzędzie Zabezpiecz PDF](/pl/zabezpiecz-pdf-haslem)**' },
    ],
  },

  {
    path: '/pl/poradnik/podziel-skan-na-dokumenty',
    lang: 'pl',
    tool: 'split',
    title: 'Jak podzielić skan PDF na osobne dokumenty',
    description:
      'Skan z podajnika to jeden plik z wieloma dokumentami. Podziel go w przeglądarce, bez instalowania programu i bez wysyłania pliku na serwer.',
    h1: 'Jak podzielić zbiorczy skan na osobne dokumenty, nie wysyłając go nikomu',
    name: 'Poradnik: dzielenie skanu na dokumenty',
    published: '2026-11-10',
    blocks: [
      {
        p: 'Podajnik w drukarce wielofunkcyjnej skanuje wszystko, co w nim położysz, do jednego pliku. Po zeskanowaniu teczki masz więc jeden PDF na pięćdziesiąt stron, w którym siedzi kilkanaście osobnych dokumentów: umowa, aneks, dwa zaświadczenia, faktura. Żeby cokolwiek z nimi zrobić, trzeba je najpierw rozdzielić.',
      },
      {
        p: 'Wyszukiwarka odpowiada na to pytanie radą, żeby zainstalować program na komputer, bo w skanie mogą być dane wrażliwe i lepiej nie wysyłać go do internetu. Co do ryzyka rada jest słuszna. Wniosek jest nieaktualny: dzielenie PDF-a nie wymaga ani serwera, ani instalacji, bo przeglądarka robi to sama.',
      },

      { h2: 'Trzy tryby, trzy różne sytuacje' },
      { p: 'Panel ma pole `Tryb` z trzema wariantami. Wybór zależy od tego, co wiesz o skanie.' },
      {
        ul: [
          '`Każda strona`: z każdej strony powstaje osobny plik. Dobre do stosu dokumentów jednostronicowych, na przykład paragonów albo zaświadczeń.',
          '`Według zakresów`: w polu `Zakresy` podajesz zakresy, a każdy z nich staje się osobnym plikiem. Panel podpowiada format: „1-3, 4-6, 7-”. Sama liczba, na przykład `4`, oznacza jedną stronę. Zakres bez liczby po dywizie, na przykład `7-`, biegnie do końca dokumentu.',
          '`Wyodrębnij strony`: w polu `Strony` podajesz strony i wszystkie trafiają do jednego nowego pliku, na przykład „1, 3-5, 9”. To tryb na wyciągnięcie jednego dokumentu z grubego skanu, bez rozbijania całości.',
        ],
      },

      { h2: 'Jak rozdzielić teczkę w praktyce' },
      {
        ol: [
          'Otwórz [Podziel PDF](/pl/podziel-pdf) i wskaż skan.',
          'Przejrzyj strony i zapisz, na której zaczyna się każdy dokument. To jedyna część, której żadne narzędzie nie zrobi za ciebie, bo tylko ty wiesz, że strona 7 to już inna umowa.',
          'Ustaw `Tryb` na `Według zakresów` i wpisz granice w kolejności, na przykład `1-3, 4, 5-9, 10-`. Rozdzielać można przecinkiem albo średnikiem.',
          'Kliknij `Podziel PDF`.',
          'Pobierz wyniki pojedynczo albo wszystkie razem przyciskiem `Pobierz wszystkie (.zip)`.',
        ],
      },
      {
        p: 'Nazwy plików powstają same i zawierają numery stron: ze `skan.pdf` wychodzi `skan_p1-3.pdf`, `skan_p4.pdf`, `skan_p5-9.pdf` i tak dalej. W trybie `Wyodrębnij strony` plik nazywa się `skan_extract.pdf`. Numery w nazwach ułatwiają potem sprawdzenie, czy nic nie wypadło.',
      },

      { h2: 'Czego narzędzie nie zrobi' },
      {
        ul: [
          'Nie rozpozna samo, gdzie kończy się jeden dokument, a zaczyna następny. Nie szuka pustych stron, kodów ani nagłówków. Granice podajesz ty.',
          'Nie przerobi skanu na tekst. Strony pozostają obrazami, tak jak w pliku wejściowym.',
          'Nie otworzy pliku zabezpieczonego hasłem. Taki skan trzeba najpierw otworzyć w [Odblokuj PDF](/pl/odblokuj-pdf), mając hasło.',
        ],
      },
      {
        p: 'Jest jeszcze jedna rzecz warta uwagi: suma rozmiarów części bywa większa niż plik wejściowy. Każdy nowy dokument dostaje własną kopię czcionek i obrazów, które wcześniej były wspólne dla całego skanu. Jeśli części mają iść mailem, pomoże [Kompresuj PDF](/pl/kompresuj-pdf), a szczegóły opisuje poradnik o [kompresji PDF do maila](/pl/poradnik/kompresja-pdf-do-emaila).',
      },

      { h2: 'Co robić z częściami dalej' },
      {
        ul: [
          'Żeby dokumenty dały się wyszukiwać, przepuść je przez [OCR PDF](/pl/ocr-pdf). Rozpoznawanie też działa lokalnie, co opisuje poradnik o [OCR i łączeniu dokumentów bez chmury](/pl/poradnik/ocr-i-laczenie-dokumentow-bez-chmury).',
          'Jeśli podajnik pomieszał kolejność albo obrócił strony, poprawisz to w [Zmień kolejność stron](/pl/zmien-kolejnosc-stron-pdf) i [Obróć PDF](/pl/obroc-pdf).',
          'Części, które powinny być jednym dokumentem, złożysz w [Połącz PDF](/pl/polacz-pdf).',
          'Przed wysłaniem dokumentu z danymi osobowymi zajrzyj do poradnika o [zabezpieczaniu PDF hasłem](/pl/poradnik/zabezpiecz-pdf-przed-wyslaniem).',
        ],
      },

      { h2: 'Jak sprawdzić, że skan nie został nigdzie wysłany' },
      {
        ol: [
          'Otwórz [Podziel PDF](/pl/podziel-pdf) i naciśnij `F12`.',
          'Na karcie `Network` wyczyść listę żądań.',
          'Wskaż skan, ustaw zakresy i kliknij `Podziel PDF`.',
          'Na liście nie będzie twojego pliku. Jeśli chcesz mocniejszego dowodu, rozłącz sieć i powtórz operację: raz otwarta strona działa dalej.',
        ],
      },
      { p: '**[Otwórz narzędzie Podziel PDF](/pl/podziel-pdf)**' },
    ],
  },
];

/** The guides about a tool, in one language (for the link on the tool's page). */
export const guidesFor = (tool: ToolId, lang: Lang) => GUIDES.filter((g) => g.tool === tool && g.lang === lang);
