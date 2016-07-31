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


Dále pro zajímavost posílám pár odkazů, ze kterých se o nás ještě můžete něco dočíst: 
- http://programio.havrlant.cz/ - Zajímavý blog našeho kolegy. Nepíše se tam jen o javascriptu a node.js, je to souhrnně dobrá ukázka věcí, které ve firmě řešíme při vývoji našich systémů. 
- http://www.ibillboard.com/cs/ - něco informací k firmě 
- http://www.ibillboard.com/cs/spolecnost/spolecnost/kariera/202-vyvojar/ - popis poptávené pozice pogramátora 
- https://www.facebook.com/InternetBiIlBoard/ - náše Facebookové stránky 
- https://www.youtube.com/watch?v=6o570kDbJXo - Video o našem vývoji 1/2 
- https://www.youtube.com/watch?v=uNjf_ScdZyg - Video o našem vývoji 2/2 

Dodatečné info o node.js můžete najít např. na http://www.nodebeginner.org/. Celkem zajímavý seriál o node.js je i na zdrojak.cz, špatný není ani např. http://eloquentjavascript.net/ (to je spíš k javascriptu obecně, node.js se tam věnují dvě kapitoly). 
Klíčové je dobře porozumět, jak funguje Event loop, jak se řeší asynchronnost (eventy, callbacky). 



