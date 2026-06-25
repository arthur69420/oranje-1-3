/* Oranje-variant: gecureerde kernselecties van het Nederlands elftal bij elke
   EK- en WK-eindronde sinds WK 1974 (Oranje deed niet aan elk toernooi mee).
   Formaat: {n, a, p:[[naam, positie(s), rating], ...]}.
   Posities: GK RB CB LB DM CM AM LW RW ST. Een speler mag meerdere rollen
   hebben, gescheiden door "/" (bv. "AM/LW"); de eerste is de hoofdpositie.
   Ratings (subjectief, naar statuur en vorm ten tijde van het toernooi):
   96-99 = all-time groot op z'n piek, 90-95 = wereldtop, 84-89 = topinternational,
   80-83 = vaste basisspeler, 76-79 = rotatie/aanvulling, ≤75 = rand selectie. */
const SEASONS = {
"Oranje":[

{n:"WK 1974",a:"W74",p:[
["Jan Jongbloed","GK",79],["Wim Suurbier","RB",83],["Wim Rijsbergen","CB",80],
["Arie Haan","CB/CM",86],["Ruud Krol","LB/CB",89],["Wim Jansen","DM/CM",82],
["Johan Neeskens","CM/DM",92],["Willem van Hanegem","CM/AM",90],["Johnny Rep","RW",85],
["Rob Rensenbrink","LW",87],["Johan Cruyff","ST/AM",99],["Piet Keizer","LW",82],
["René van de Kerkhof","RW",79],["Willy van de Kerkhof","CM",78],["Theo de Jong","CM",75],
["Jan Hulshoff","CB",74],["Piet Schrijvers","GK",77]]},

{n:"EK 1976",a:"E76",p:[
["Piet Schrijvers","GK",79],["Wim Suurbier","RB",82],["Wim Rijsbergen","CB",80],
["Arie Haan","CB/CM",85],["Ruud Krol","LB/CB",88],["Wim Jansen","DM/CM",82],
["Johan Neeskens","CM/DM",90],["Willem van Hanegem","CM/AM",88],["Johnny Rep","RW",84],
["Rob Rensenbrink","LW",86],["Johan Cruyff","ST/AM",98],["Ruud Geels","ST",79],
["René van de Kerkhof","RW",79],["Willy van de Kerkhof","CM",78],["Jan Peters","CM/AM",74],
["Hugo Hovenkamp","CB",75],["Jan Jongbloed","GK",77]]},

{n:"WK 1978",a:"W78",p:[
["Jan Jongbloed","GK",79],["Wim Suurbier","RB",81],["Ernie Brandts","CB",78],
["Ruud Krol","CB/LB",90],["Jan Poortvliet","LB",77],["Wim Jansen","DM/CM",81],
["Johan Neeskens","CM/DM",89],["Arie Haan","CM/CB",86],["Johnny Rep","RW/ST",85],
["René van de Kerkhof","RW",80],["Rob Rensenbrink","LW/ST",89],["Willy van de Kerkhof","CM",80],
["Dick Nanninga","ST",75],["Pieter Wildschut","RW",72],["Hugo Hovenkamp","CB",75],
["Adri van Kraay","CB/RB",74],["Piet Schrijvers","GK",78]]},

{n:"EK 1980",a:"E80",p:[
["Piet Schrijvers","GK",79],["Michel van de Korput","RB/CB",75],["Ernie Brandts","CB",78],
["Hugo Hovenkamp","CB",76],["Ruud Krol","LB/CB",87],["Willy van de Kerkhof","DM/CM",80],
["Arie Haan","CM/CB",84],["Frans Thijssen","CM/AM",84],["René van de Kerkhof","RW/AM",80],
["Kees Kist","ST",79],["Johnny Rep","RW/ST",83],["Johan Neeskens","CM/DM",83],
["Arnold Mühren","LM/CM",83],["Tscheu La Ling","RW/LW",77],["Jan Peters","CM/AM",74],
["Dick Nanninga","ST",74]]},

{n:"EK 1988",a:"E88",p:[
["Hans van Breukelen","GK",85],["Berry van Aerle","RB",80],["Ronald Koeman","CB/DM",91],
["Frank Rijkaard","DM/CB",92],["Adri van Tiggelen","LB/CB",80],["Jan Wouters","DM/CM",84],
["Arnold Mühren","LM/CM",83],["Gerald Vanenburg","AM/RW",82],["Erwin Koeman","LM/CM",80],
["Ruud Gullit","AM/LW/ST",95],["Marco van Basten","ST",97],["Wim Kieft","ST",80],
["John van 't Schip","RW",80],["Aron Winter","CM/RB",80],["Hennie Meijer","ST",73],
["Sjaak Troost","CB",72],["Joop Hiele","GK",75]]},

{n:"WK 1990",a:"W90",p:[
["Hans van Breukelen","GK",84],["Berry van Aerle","RB",79],["Ronald Koeman","CB/DM",91],
["Frank Rijkaard","DM/CB",92],["Adri van Tiggelen","LB/CB",80],["Jan Wouters","DM/CM",83],
["Aron Winter","CM/RB",82],["Ruud Gullit","AM/LW/ST",91],["John van 't Schip","RW",80],
["Marco van Basten","ST",96],["Erwin Koeman","LM/CM",79],["Gerald Vanenburg","AM/RW",80],
["Wim Kieft","ST",79],["Hans Gillhaus","ST/LW",78],["Richard Witschge","LW/CM",79],
["Graeme Rutjes","CB",75],["Stanley Menzo","GK",77]]},

{n:"EK 1992",a:"E92",p:[
["Hans van Breukelen","GK",83],["Aron Winter","RB/CM",82],["Ronald Koeman","CB/DM",91],
["Frank Rijkaard","DM/CB",91],["Adri van Tiggelen","LB/CB",79],["Jan Wouters","DM/CM",83],
["Rob Witschge","CM/LW",80],["Dennis Bergkamp","ST/AM",90],["Bryan Roy","RW/LW",80],
["Ruud Gullit","AM/CM/ST",90],["Marco van Basten","ST",96],["Wim Jonk","CM/AM",80],
["Richard Witschge","LW/CM",79],["John van 't Schip","RW",78],["Peter van Vossen","ST/RW",77],
["Ed de Goey","GK",78],["Erwin Koeman","LM/CM",77]]},

{n:"WK 1994",a:"W94",p:[
["Ed de Goey","GK",80],["Frank de Boer","CB/LB",84],["Ronald Koeman","CB/DM",88],
["Danny Blind","CB",82],["Stan Valckx","CB/RB",76],["Jan Wouters","DM/CM",82],
["Wim Jonk","CM/AM",82],["Dennis Bergkamp","ST/AM",92],["Marc Overmars","LW/RW",86],
["Bryan Roy","LW/RW",80],["Ronald de Boer","AM/CM/ST",83],["Aron Winter","CM/RB",82],
["Rob Witschge","CM/LW",79],["Peter van Vossen","ST/RW",77],["Gaston Taument","RW",77],
["Ulrich van Gobbel","RB",75],["Marciano Vink","CM",73]]},

{n:"EK 1996",a:"E96",p:[
["Edwin van der Sar","GK",85],["Michael Reiziger","RB/CB",82],["Danny Blind","CB",81],
["Winston Bogarde","CB/LB",78],["Arthur Numan","LB/LW",80],["Aron Winter","DM/CM",82],
["Ronald de Boer","AM/CM",83],["Dennis Bergkamp","ST/AM",92],["Marc Overmars","LW/RW",86],
["Patrick Kluivert","ST",85],["Jordi Cruyff","AM/ST",78],["Frank de Boer","CB/LB",84],
["Clarence Seedorf","CM/AM",85],["Edgar Davids","DM/CM",84],["Phillip Cocu","CM/CB",82],
["Peter Hoekstra","LW",75],["Gaston Taument","RW",76]]},

{n:"WK 1998",a:"W98",p:[
["Edwin van der Sar","GK",86],["Michael Reiziger","RB/CB",82],["Jaap Stam","CB",88],
["Frank de Boer","CB/LB",85],["Arthur Numan","LB/LW",80],["Edgar Davids","DM/CM",87],
["Phillip Cocu","CM/CB",84],["Ronald de Boer","AM/CM",82],["Marc Overmars","LW/RW",87],
["Dennis Bergkamp","ST/AM",93],["Patrick Kluivert","ST",87],["Clarence Seedorf","CM/AM",85],
["Wim Jonk","CM/AM",80],["Boudewijn Zenden","LW/RW",80],["Giovanni van Bronckhorst","LB/CM",80],
["Pierre van Hooijdonk","ST",80],["Jimmy Floyd Hasselbaink","ST",82],["Aron Winter","DM/CM",79]]},

{n:"EK 2000",a:"E00",p:[
["Edwin van der Sar","GK",87],["Michael Reiziger","RB/CB",82],["Jaap Stam","CB",89],
["Frank de Boer","CB/LB",85],["Giovanni van Bronckhorst","LB/CM",82],["Edgar Davids","DM/CM",87],
["Phillip Cocu","CM/CB",84],["Marc Overmars","LW/RW",86],["Boudewijn Zenden","LW/RW",82],
["Patrick Kluivert","ST",89],["Dennis Bergkamp","ST/AM",91],["Clarence Seedorf","CM/AM",85],
["Arthur Numan","LB/LW",81],["Roy Makaay","ST",82],["Pierre van Hooijdonk","ST",79],
["Paul Bosvelt","DM/CM",78],["Ronald de Boer","AM/CM",80],["Sander Westerveld","GK",80]]},

{n:"EK 2004",a:"E04",p:[
["Edwin van der Sar","GK",87],["Michael Reiziger","RB/CB",81],["Jaap Stam","CB",87],
["Wilfred Bouma","CB/LB",78],["Giovanni van Bronckhorst","LB/CM",83],["Edgar Davids","DM/CM",85],
["Phillip Cocu","CM/CB",84],["Rafael van der Vaart","AM/CM",84],["Andy van der Meyde","RW",78],
["Ruud van Nistelrooy","ST",91],["Arjen Robben","LW/RW",85],["Patrick Kluivert","ST",85],
["Clarence Seedorf","CM/AM",85],["Mark van Bommel","DM/CM",82],["Roy Makaay","ST",84],
["Wesley Sneijder","AM/CM",79],["John Heitinga","CB/RB",78],["Frank de Boer","CB",80]]},

{n:"WK 2006",a:"W06",p:[
["Edwin van der Sar","GK",87],["Khalid Boulahrouz","RB/CB",79],["Jaap Stam","CB",85],
["John Heitinga","CB/RB",80],["Giovanni van Bronckhorst","LB/CM",83],["Mark van Bommel","DM/CM",83],
["Phillip Cocu","CM/CB",82],["Rafael van der Vaart","AM/CM",84],["Dirk Kuyt","RW/ST",82],
["Ruud van Nistelrooy","ST",89],["Arjen Robben","LW/RW",87],["Wesley Sneijder","AM/CM",84],
["Robin van Persie","ST/LW",82],["Joris Mathijsen","CB",79],["André Ooijer","CB/RB",78],
["Nigel de Jong","DM/CM",79],["Ryan Babel","LW/ST",77]]},

{n:"EK 2008",a:"E08",p:[
["Edwin van der Sar","GK",86],["Khalid Boulahrouz","RB/CB",78],["John Heitinga","CB/RB",81],
["André Ooijer","CB",78],["Giovanni van Bronckhorst","LB/CM",82],["Nigel de Jong","DM/CM",80],
["Orlando Engelaar","CM/DM",76],["Wesley Sneijder","AM/CM",88],["Dirk Kuyt","RW/ST",82],
["Ruud van Nistelrooy","ST",88],["Arjen Robben","LW/RW",88],["Rafael van der Vaart","AM/CM",85],
["Robin van Persie","ST/LW",84],["Klaas-Jan Huntelaar","ST",82],["Joris Mathijsen","CB",80],
["Mario Melchiot","RB/CB",77],["Demy de Zeeuw","CM/DM",77],["Ibrahim Afellay","AM/CM",78]]},

{n:"WK 2010",a:"W10",p:[
["Maarten Stekelenburg","GK",83],["Gregory van der Wiel","RB",80],["John Heitinga","CB/RB",81],
["Joris Mathijsen","CB",80],["Giovanni van Bronckhorst","LB",82],["Nigel de Jong","DM/CM",83],
["Mark van Bommel","DM/CM",85],["Wesley Sneijder","AM/CM",92],["Dirk Kuyt","RW/ST",83],
["Robin van Persie","ST/LW",87],["Arjen Robben","RW/LW",91],["Rafael van der Vaart","AM/CM",84],
["Klaas-Jan Huntelaar","ST",83],["Eljero Elia","LW/RW",78],["Ibrahim Afellay","AM/CM",79],
["Demy de Zeeuw","CM/DM",77],["Khalid Boulahrouz","CB/RB",76]]},

{n:"EK 2012",a:"E12",p:[
["Maarten Stekelenburg","GK",81],["Gregory van der Wiel","RB",80],["Joris Mathijsen","CB",80],
["John Heitinga","CB/RB",80],["Jetro Willems","LB",76],["Nigel de Jong","DM/CM",83],
["Mark van Bommel","DM/CM",83],["Wesley Sneijder","AM/CM",87],["Arjen Robben","RW/LW",90],
["Robin van Persie","ST",90],["Ibrahim Afellay","AM/LW",79],["Klaas-Jan Huntelaar","ST",84],
["Rafael van der Vaart","AM/CM",83],["Dirk Kuyt","RW/ST",81],["Kevin Strootman","CM/DM",81],
["Ron Vlaar","CB",78],["Luuk de Jong","ST",76]]},

{n:"WK 2014",a:"W14",p:[
["Jasper Cillessen","GK",80],["Daryl Janmaat","RB/RWB",80],["Ron Vlaar","CB",81],
["Stefan de Vrij","CB",82],["Bruno Martins Indi","CB/LB",78],["Nigel de Jong","DM/CM",83],
["Georginio Wijnaldum","CM/AM",80],["Wesley Sneijder","AM/CM",85],["Arjen Robben","RW/LW",92],
["Robin van Persie","ST",88],["Memphis Depay","LW/ST",80],["Klaas-Jan Huntelaar","ST",82],
["Dirk Kuyt","RW/LWB/ST",82],["Jonathan de Guzman","CM/AM",78],["Daley Blind","LB/CB/DM",82],
["Jordy Clasie","DM/CM",78],["Joël Veltman","CB/RB",76]]},

{n:"EK 2021",a:"E21",p:[
["Maarten Stekelenburg","GK",76],["Denzel Dumfries","RB/RW",81],["Stefan de Vrij","CB",84],
["Matthijs de Ligt","CB",85],["Daley Blind","LB/CB",81],["Frenkie de Jong","CM/DM",88],
["Georginio Wijnaldum","CM/AM",86],["Marten de Roon","DM/CM",78],["Steven Berghuis","RW/AM",80],
["Memphis Depay","ST/AM",85],["Donyell Malen","LW/ST",79],["Nathan Aké","CB/LB",81],
["Wout Weghorst","ST",78],["Ryan Gravenberch","CM",78],["Owen Wijndal","LB",75],
["Davy Klaassen","CM/AM",78],["Quincy Promes","LW",77],["Tim Krul","GK",76]]},

{n:"WK 2022",a:"W22",p:[
["Andries Noppert","GK",76],["Denzel Dumfries","RB/RW",82],["Jurriën Timber","CB/RB",81],
["Virgil van Dijk","CB",90],["Nathan Aké","CB/LB",83],["Marten de Roon","DM/CM",78],
["Frenkie de Jong","CM/DM",89],["Davy Klaassen","CM/AM",79],["Steven Berghuis","RW/AM",79],
["Memphis Depay","ST/AM",84],["Cody Gakpo","LW/ST",84],["Wout Weghorst","ST",79],
["Teun Koopmeiners","CM/DM",80],["Steven Bergwijn","LW/RW",80],["Daley Blind","LB/CB",78],
["Xavi Simons","AM/CM",80],["Luuk de Jong","ST",76],["Noa Lang","LW",77]]},

{n:"EK 2024",a:"E24",p:[
["Bart Verbruggen","GK",80],["Denzel Dumfries","RB/RW",82],["Stefan de Vrij","CB",80],
["Virgil van Dijk","CB",89],["Nathan Aké","LB/CB",83],["Jerdy Schouten","DM/CM",79],
["Tijjani Reijnders","CM/AM",82],["Xavi Simons","AM/RW",83],["Cody Gakpo","LW/ST",85],
["Memphis Depay","ST/AM",83],["Donyell Malen","RW/LW",80],["Wout Weghorst","ST",78],
["Steven Bergwijn","LW/RW",80],["Joey Veerman","CM/AM",77],["Micky van de Ven","CB/LB",81],
["Jurriën Timber","RB/CB",81],["Lutsharel Geertruida","RB/CB",78],["Brian Brobbey","ST",77]]},

{n:"WK 2026",a:"W26",p:[
["Bart Verbruggen","GK",82],["Denzel Dumfries","RB/RW",82],["Jeremie Frimpong","RB/RW",80],
["Matthijs de Ligt","CB",85],["Virgil van Dijk","CB",87],["Micky van de Ven","CB/LB",83],
["Nathan Aké","LB/CB",83],["Jorrel Hato","LB/CB",80],["Frenkie de Jong","CM/DM",88],
["Tijjani Reijnders","CM/AM",84],["Ryan Gravenberch","CM/DM",83],["Jerdy Schouten","DM/CM",79],
["Xavi Simons","AM/RW",84],["Cody Gakpo","LW/ST",85],["Donyell Malen","RW/LW",80],
["Justin Kluivert","RW/LW",79],["Memphis Depay","ST/AM",82],["Brian Brobbey","ST",78]]}

]
};

/* Tegenstanders voor de toernooimodus: andere landen met een globale sterkte
   (str → aanval/verdediging) en hun vlag. Per toernooi worden er 31 geloot. */
const NATIONS = [
  {n:"Argentinië",a:"ARG",f:"🇦🇷",str:91}, {n:"Frankrijk",a:"FRA",f:"🇫🇷",str:91},
  {n:"Brazilië",a:"BRA",f:"🇧🇷",str:90}, {n:"Engeland",a:"ENG",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",str:88},
  {n:"Spanje",a:"ESP",f:"🇪🇸",str:89}, {n:"Portugal",a:"POR",f:"🇵🇹",str:87},
  {n:"Duitsland",a:"GER",f:"🇩🇪",str:86}, {n:"België",a:"BEL",f:"🇧🇪",str:85},
  {n:"Italië",a:"ITA",f:"🇮🇹",str:85}, {n:"Kroatië",a:"CRO",f:"🇭🇷",str:84},
  {n:"Uruguay",a:"URU",f:"🇺🇾",str:83}, {n:"Colombia",a:"COL",f:"🇨🇴",str:82},
  {n:"Marokko",a:"MAR",f:"🇲🇦",str:83}, {n:"Japan",a:"JPN",f:"🇯🇵",str:81},
  {n:"Denemarken",a:"DEN",f:"🇩🇰",str:81}, {n:"Zwitserland",a:"SUI",f:"🇨🇭",str:80},
  {n:"Senegal",a:"SEN",f:"🇸🇳",str:81}, {n:"Verenigde Staten",a:"USA",f:"🇺🇸",str:79},
  {n:"Mexico",a:"MEX",f:"🇲🇽",str:79}, {n:"Servië",a:"SRB",f:"🇷🇸",str:79},
  {n:"Oostenrijk",a:"AUT",f:"🇦🇹",str:80}, {n:"Turkije",a:"TUR",f:"🇹🇷",str:80},
  {n:"Noorwegen",a:"NOR",f:"🇳🇴",str:80}, {n:"Zweden",a:"SWE",f:"🇸🇪",str:78},
  {n:"Polen",a:"POL",f:"🇵🇱",str:78}, {n:"Oekraïne",a:"UKR",f:"🇺🇦",str:78},
  {n:"Ecuador",a:"ECU",f:"🇪🇨",str:77}, {n:"Nigeria",a:"NGA",f:"🇳🇬",str:78},
  {n:"Ivoorkust",a:"CIV",f:"🇨🇮",str:77}, {n:"Zuid-Korea",a:"KOR",f:"🇰🇷",str:78},
  {n:"Australië",a:"AUS",f:"🇦🇺",str:76}, {n:"Egypte",a:"EGY",f:"🇪🇬",str:77},
  {n:"Algerije",a:"ALG",f:"🇩🇿",str:77}, {n:"Ghana",a:"GHA",f:"🇬🇭",str:76},
  {n:"Schotland",a:"SCO",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",str:77}, {n:"Hongarije",a:"HUN",f:"🇭🇺",str:77},
  {n:"Tsjechië",a:"CZE",f:"🇨🇿",str:77}, {n:"Wales",a:"WAL",f:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",str:76},
  {n:"Canada",a:"CAN",f:"🇨🇦",str:76}, {n:"Kameroen",a:"CMR",f:"🇨🇲",str:75},
  {n:"Iran",a:"IRN",f:"🇮🇷",str:75}, {n:"Peru",a:"PER",f:"🇵🇪",str:74},
  {n:"Chili",a:"CHI",f:"🇨🇱",str:75}, {n:"Saoedi-Arabië",a:"KSA",f:"🇸🇦",str:72},
  {n:"Qatar",a:"QAT",f:"🇶🇦",str:71}, {n:"Costa Rica",a:"CRC",f:"🇨🇷",str:72},
  {n:"Panama",a:"PAN",f:"🇵🇦",str:71}, {n:"Tunesië",a:"TUN",f:"🇹🇳",str:74}
];
