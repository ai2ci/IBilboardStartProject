# IBilboardStartProject
This project will be developed for purposes of interview in IBilboard company.


Napište v JavaScriptu a v Node.js aplikaci, která

* přijímá HTTP POST požadavky jen na routě /track
   * z požadavku získá data předaná jako query string parametry
   * uloží data do souboru na lokálním disku jako JSON (append)
   * pokud se v datech vyskytuje parametr count, zvýší o jeho hodnotu položku s klíčem 'count' v databázi Redis
* přijímá HTTP GET požadavky jen na routě /count
   * vrátí hodnotu klíče 'count' v databázi Redis
   * Napište příslušné unit testy, které zvládnete.

URL: http://www.ibillboard.com/uloha/vyvojar-uloha-1

Helpful links:

