# IBilboardStartProject


Napište v JavaScriptu a v Node.js aplikaci, která

* přijímá HTTP POST požadavky jen na routě /track
   * z požadavku získá data předaná jako query string parametry
   * uloží data do souboru na lokálním disku jako JSON (append)
   * pokud se v datech vyskytuje parametr count, zvýší o jeho hodnotu položku s klíčem 'count' v databázi Redis
* přijímá HTTP GET požadavky jen na routě /count
   * vrátí hodnotu klíče 'count' v databázi Redis
   * Napište příslušné unit testy, které zvládnete.

Dodatečné info o node.js můžete najít např. na http://www.nodebeginner.org/. Celkem zajímavý seriál o node.js je i na zdrojak.cz, špatný není ani např. http://eloquentjavascript.net/ (to je spíš k javascriptu obecně, node.js se tam věnují dvě kapitoly). 
Klíčové je dobře porozumět, jak funguje Event loop, jak se řeší asynchronnost (eventy, callbacky). 



