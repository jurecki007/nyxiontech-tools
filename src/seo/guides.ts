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
          '**In the tool.** Drop the file on [Edit metadata](/edit-pdf-metadata) to see the six text fields of the information dictionary. The tool does not show the dates or the XMP packet, so use pdfinfo or exiftool for those.',
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
        p: 'The tool writes the whole file again instead of appending a change at the end, so the old values are not left in an earlier revision. That is not a given: the ExifTool documentation warns that its own PDF edits are reversible because "old information is never actually deleted from the file" ([ExifTool PDF tags](' +
          EXIFTOOL_PDF +
          ')).',
      },

      { h2: 'What Edit metadata does not remove' },
      {
        ul: [
          '**Creation and modification dates.** They stay as they are.',
          '**The XMP packet.** If the file has one, it stays, with whatever author and title it holds.',
          '**Comments, form field values and data inside embedded images.**',
          '**Anything on the page.** A name in a header or footer is page text, not metadata. Remove it with [Redact PDF](/redact-pdf).',
        ],
      },

      { h2: 'When the XMP packet or the dates must go too' },
      {
        p: 'Build a new file from the pages. In [Split PDF](/split-pdf), choose **By ranges**, type `1-` under **Ranges** and click **Split PDF**. You get one file with every page, named like `report_p1-12.pdf`.',
      },
      {
        p: 'That file is made from scratch. The old information dictionary and the XMP packet of the document are not copied, both dates are set to the moment of the split, and Creator and Producer name pdf-lib, the library the tool uses. Run the result through Edit metadata if you want those two fields empty as well. Comments and any metadata attached to single pages or images travel with the pages. Bookmarks and interactive form fields of the original are not carried over, so do this on the final version.',
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
];

/** The guides about a tool, in one language (for the link on the tool's page). */
export const guidesFor = (tool: ToolId, lang: Lang) => GUIDES.filter((g) => g.tool === tool && g.lang === lang);
