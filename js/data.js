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

/* Vereenvoudigde SVG-vlaggen (werken overal, anders dan emoji-vlaggen op Windows).
   t = patroon (v3/h3/h2 = verticale/horizontale strepen) of svg = eigen tekening,
   binnen een viewBox van 0 0 3 2. */
const FLAG = {
  NED:{t:"h3",c:["#AE1C28","#FFFFFF","#21468B"]},
  ARG:{svg:'<rect width="3" height="2" fill="#74ACDF"/><rect y="0.667" width="3" height="0.666" fill="#fff"/><circle cx="1.5" cy="1" r="0.26" fill="#F6B40E"/>'},
  FRA:{t:"v3",c:["#002395","#FFFFFF","#ED2939"]},
  BRA:{svg:'<rect width="3" height="2" fill="#009C3B"/><path d="M1.5 0.25 L2.75 1 L1.5 1.75 L0.25 1 Z" fill="#FFDF00"/><circle cx="1.5" cy="1" r="0.42" fill="#002776"/>'},
  ENG:{svg:'<rect width="3" height="2" fill="#fff"/><rect x="1.3" width="0.4" height="2" fill="#CE1124"/><rect y="0.8" width="3" height="0.4" fill="#CE1124"/>'},
  ESP:{svg:'<rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/>'},
  POR:{svg:'<rect width="3" height="2" fill="#DA291C"/><rect width="1.2" height="2" fill="#046A38"/><circle cx="1.2" cy="1" r="0.3" fill="#FFE000"/>'},
  GER:{t:"h3",c:["#000000","#DD0000","#FFCE00"]},
  BEL:{t:"v3",c:["#2D2926","#FAE042","#ED2939"]},
  ITA:{t:"v3",c:["#009246","#FFFFFF","#CE2B37"]},
  CRO:{t:"h3",c:["#FF0000","#FFFFFF","#171796"]},
  URU:{svg:'<rect width="3" height="2" fill="#fff"/><rect y="0.45" width="3" height="0.22" fill="#0038A8"/><rect y="0.9" width="3" height="0.22" fill="#0038A8"/><rect y="1.35" width="3" height="0.22" fill="#0038A8"/><rect width="1.1" height="1.12" fill="#fff"/><circle cx="0.55" cy="0.56" r="0.28" fill="#FCD116"/>'},
  COL:{svg:'<rect width="3" height="2" fill="#FCD116"/><rect y="1" width="3" height="0.5" fill="#003893"/><rect y="1.5" width="3" height="0.5" fill="#CE1126"/>'},
  MAR:{svg:'<rect width="3" height="2" fill="#C1272D"/><path d="M1.5 0.62 L1.68 1.18 L1.13 0.83 L1.87 0.83 L1.32 1.18 Z" fill="none" stroke="#006233" stroke-width="0.09"/>'},
  JPN:{svg:'<rect width="3" height="2" fill="#fff"/><circle cx="1.5" cy="1" r="0.55" fill="#BC002D"/>'},
  DEN:{svg:'<rect width="3" height="2" fill="#C8102E"/><rect x="0.95" width="0.35" height="2" fill="#fff"/><rect y="0.82" width="3" height="0.35" fill="#fff"/>'},
  SUI:{svg:'<rect width="3" height="2" fill="#D52B1E"/><rect x="1.3" y="0.55" width="0.4" height="0.9" fill="#fff"/><rect x="1.05" y="0.8" width="0.9" height="0.4" fill="#fff"/>'},
  SEN:{t:"v3",c:["#00853F","#FDEF42","#E31B23"]},
  USA:{svg:'<rect width="3" height="2" fill="#fff"/><rect y="0" width="3" height="0.154" fill="#B22234"/><rect y="0.308" width="3" height="0.154" fill="#B22234"/><rect y="0.615" width="3" height="0.154" fill="#B22234"/><rect y="0.923" width="3" height="0.154" fill="#B22234"/><rect y="1.231" width="3" height="0.154" fill="#B22234"/><rect y="1.538" width="3" height="0.154" fill="#B22234"/><rect y="1.846" width="3" height="0.154" fill="#B22234"/><rect width="1.3" height="1.077" fill="#3C3B6E"/>'},
  MEX:{t:"v3",c:["#006847","#FFFFFF","#CE1126"]},
  SRB:{t:"h3",c:["#C6363C","#0C4076","#FFFFFF"]},
  AUT:{t:"h3",c:["#ED2939","#FFFFFF","#ED2939"]},
  TUR:{svg:'<rect width="3" height="2" fill="#E30A17"/><circle cx="1.2" cy="1" r="0.45" fill="#fff"/><circle cx="1.35" cy="1" r="0.36" fill="#E30A17"/>'},
  NOR:{svg:'<rect width="3" height="2" fill="#BA0C2F"/><rect x="0.85" width="0.5" height="2" fill="#fff"/><rect y="0.75" width="3" height="0.5" fill="#fff"/><rect x="0.97" width="0.26" height="2" fill="#00205B"/><rect y="0.87" width="3" height="0.26" fill="#00205B"/>'},
  SWE:{svg:'<rect width="3" height="2" fill="#006AA7"/><rect x="0.9" width="0.35" height="2" fill="#FECC00"/><rect y="0.82" width="3" height="0.35" fill="#FECC00"/>'},
  POL:{t:"h2",c:["#FFFFFF","#DC143C"]},
  UKR:{t:"h2",c:["#005BBB","#FFD500"]},
  ECU:{svg:'<rect width="3" height="2" fill="#FFDD00"/><rect y="1" width="3" height="0.5" fill="#034EA2"/><rect y="1.5" width="3" height="0.5" fill="#ED1C24"/>'},
  NGA:{t:"v3",c:["#008751","#FFFFFF","#008751"]},
  CIV:{t:"v3",c:["#F77F00","#FFFFFF","#009E60"]},
  KOR:{svg:'<rect width="3" height="2" fill="#fff"/><circle cx="1.5" cy="1" r="0.42" fill="#CD2E3A"/><path d="M1.5 0.58 A0.21 0.21 0 0 1 1.5 1 A0.21 0.21 0 0 0 1.5 1.42 Z" fill="#0047A0"/>'},
  AUS:{svg:'<rect width="3" height="2" fill="#00008B"/><rect width="1.3" height="1" fill="#012169"/><path d="M0 0 L1.3 1 M1.3 0 L0 1" stroke="#fff" stroke-width="0.12"/><circle cx="2.2" cy="1.35" r="0.13" fill="#fff"/>'},
  EGY:{t:"h3",c:["#CE1126","#FFFFFF","#000000"]},
  ALG:{svg:'<rect width="3" height="2" fill="#fff"/><rect width="1.5" height="2" fill="#006233"/><circle cx="1.5" cy="1" r="0.4" fill="#D21034"/><circle cx="1.62" cy="1" r="0.32" fill="#fff"/>'},
  GHA:{svg:'<rect width="3" height="2" fill="#CE1126"/><rect y="0.667" width="3" height="0.666" fill="#FCD116"/><rect y="1.333" width="3" height="0.667" fill="#006B3F"/><path d="M1.5 0.83 L1.68 1.33 L1.13 1.02 L1.87 1.02 L1.32 1.33 Z" fill="#000"/>'},
  SCO:{svg:'<rect width="3" height="2" fill="#0065BF"/><path d="M0 0 L3 2 M3 0 L0 2" stroke="#fff" stroke-width="0.3"/>'},
  HUN:{t:"h3",c:["#CD2A3E","#FFFFFF","#436F4D"]},
  CZE:{svg:'<rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#D7141A"/><path d="M0 0 L1.5 1 L0 2 Z" fill="#11457E"/>'},
  WAL:{svg:'<rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#00AB39"/><path d="M0.9 0.75 q0.6 -0.35 1.1 0.1 q-0.45 0.25 0 0.55 q-0.65 0.2 -1.1 -0.15 Z" fill="#D30731"/>'},
  CAN:{svg:'<rect width="3" height="2" fill="#fff"/><rect width="0.75" height="2" fill="#FF0000"/><rect x="2.25" width="0.75" height="2" fill="#FF0000"/><path d="M1.5 0.5 L1.6 0.85 L1.9 0.78 L1.7 1.05 L1.98 1.18 L1.62 1.22 L1.66 1.55 L1.5 1.32 L1.34 1.55 L1.38 1.22 L1.02 1.18 L1.3 1.05 L1.1 0.78 L1.4 0.85 Z" fill="#FF0000"/>'},
  CMR:{t:"v3",c:["#007A5E","#CE1126","#FCD116"]},
  IRN:{t:"h3",c:["#239F40","#FFFFFF","#DA0000"]},
  PER:{t:"v3",c:["#D91023","#FFFFFF","#D91023"]},
  CHI:{svg:'<rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#D52B1E"/><rect width="1" height="1" fill="#0039A6"/><path d="M0.5 0.28 L0.61 0.6 L0.27 0.4 L0.73 0.4 L0.39 0.6 Z" fill="#fff"/>'},
  KSA:{svg:'<rect width="3" height="2" fill="#006C35"/><rect x="0.4" y="1.25" width="2.2" height="0.12" fill="#fff"/><rect x="0.6" y="0.72" width="1.8" height="0.1" fill="#fff"/>'},
  QAT:{svg:'<rect width="3" height="2" fill="#8A1538"/><rect width="0.9" height="2" fill="#fff"/>'},
  CRC:{svg:'<rect width="3" height="2" fill="#002B7F"/><rect y="0.34" width="3" height="1.32" fill="#fff"/><rect y="0.67" width="3" height="0.66" fill="#CE1126"/>'},
  PAN:{svg:'<rect width="3" height="2" fill="#fff"/><rect x="1.5" width="1.5" height="1" fill="#D21034"/><rect y="1" width="1.5" height="1" fill="#072357"/>'},
  TUN:{svg:'<rect width="3" height="2" fill="#E70013"/><circle cx="1.5" cy="1" r="0.5" fill="#fff"/><circle cx="1.6" cy="1" r="0.36" fill="#E70013"/><circle cx="1.72" cy="1" r="0.28" fill="#fff"/>'}
};
