/* Oranje-variant: gecureerde kernselecties van het Nederlands elftal bij elke
   EK- en WK-eindronde sinds WK 1974 (Oranje deed niet aan elk toernooi mee).
   Eén "seizoen" (Oranje) met als "clubs" de eindrondes; de engine draait
   hetzelfde als de Eredivisie-versie. Posities: GK RB CB LB DM CM AM LW RW ST.
   Ratings (65-99) zijn
   subjectief, naar statuur en vorm ten tijde van het toernooi. Bij benadering. */
const SEASONS = {
"Oranje":[

{n:"WK 1974",a:"W74",p:[
["Jan Jongbloed","GK",80],["Wim Suurbier","RB",84],["Wim Rijsbergen","CB",80],
["Arie Haan","CB",87],["Ruud Krol","LB",90],["Wim Jansen","DM",83],
["Johan Neeskens","CM",92],["Willem van Hanegem","CM",90],["Johnny Rep","RW",86],
["Rob Rensenbrink","LW",88],["Johan Cruyff","ST",99],["Piet Keizer","LW",84],
["René van de Kerkhof","RW",80],["Willy van de Kerkhof","CM",79],["Theo de Jong","CM",76],
["Pleun Strik","CM",73],["Jan Hulshoff","CB",74],["Piet Schrijvers","GK",78]]},

{n:"EK 1976",a:"E76",p:[
["Piet Schrijvers","GK",80],["Wim Suurbier","RB",83],["Wim Rijsbergen","CB",80],
["Arie Haan","CB",86],["Ruud Krol","LB",89],["Wim Jansen","DM",82],
["Johan Neeskens","CM",90],["Willem van Hanegem","CM",88],["Johnny Rep","RW",85],
["Rob Rensenbrink","LW",87],["Johan Cruyff","ST",98],["René van de Kerkhof","RW",80],
["Willy van de Kerkhof","CM",79],["Ruud Geels","ST",80],["Jan Peters","CM",74],
["Hugo Hovenkamp","CB",75],["Jan Jongbloed","GK",78]]},

{n:"WK 1978",a:"W78",p:[
["Jan Jongbloed","GK",80],["Wim Suurbier","RB",82],["Ernie Brandts","CB",79],
["Ruud Krol","CB",90],["Jan Poortvliet","LB",78],["Wim Jansen","DM",82],
["Johan Neeskens","CM",90],["Arie Haan","CM",87],["Johnny Rep","RW",86],
["René van de Kerkhof","RW",80],["Rob Rensenbrink","LW",90],["Willy van de Kerkhof","CM",80],
["Dick Nanninga","ST",76],["Pieter Wildschut","RW",73],["Adri van Kraay","CB",74],
["Hugo Hovenkamp","CB",75],["Piet Schrijvers","GK",79],["Jan Boskamp","CM",73]]},

{n:"EK 1980",a:"E80",p:[
["Piet Schrijvers","GK",80],["Michel van de Korput","RB",76],["Ernie Brandts","CB",79],
["Hugo Hovenkamp","CB",76],["Ruud Krol","LB",88],["Willy van de Kerkhof","DM",80],
["Arie Haan","CM",85],["Frans Thijssen","AM",84],["René van de Kerkhof","RW",80],
["Johnny Rep","LW",84],["Kees Kist","ST",80],["Johan Neeskens","CM",84],
["Arnold Mühren","CM",84],["Tscheu La Ling","RW",78],["Dick Nanninga","ST",75],
["Jan Peters","CM",75],["Wim Meutstege","RB",72],["Piet Wildschut","RW",72]]},

{n:"EK 1988",a:"E88",p:[
["Hans van Breukelen","GK",84],["Berry van Aerle","RB",80],["Ronald Koeman","CB",90],
["Frank Rijkaard","CB",92],["Adri van Tiggelen","LB",80],["Jan Wouters","DM",84],
["Arnold Mühren","CM",83],["Gerald Vanenburg","AM",82],["Erwin Koeman","CM",80],
["Ruud Gullit","LW",95],["Marco van Basten","ST",97],["Wim Kieft","ST",80],
["John van 't Schip","RW",80],["Aron Winter","CM",80],["Hennie Meijer","ST",73],
["Sjaak Troost","CB",73],["Joop Hiele","GK",75],["Wim Koevermans","CB",73]]},

{n:"WK 1990",a:"W90",p:[
["Hans van Breukelen","GK",84],["Berry van Aerle","RB",79],["Ronald Koeman","CB",90],
["Frank Rijkaard","CB",92],["Adri van Tiggelen","LB",80],["Jan Wouters","DM",83],
["Aron Winter","CM",82],["Ruud Gullit","AM",92],["John van 't Schip","RW",80],
["Marco van Basten","ST",97],["Erwin Koeman","LW",79],["Gerald Vanenburg","AM",80],
["Wim Kieft","ST",79],["Hans Gillhaus","ST",78],["Richard Witschge","LW",80],
["Graeme Rutjes","CB",75],["Stanley Menzo","GK",77],["Gerald de Hoop","CM",72]]},

{n:"EK 1992",a:"E92",p:[
["Hans van Breukelen","GK",83],["Aron Winter","RB",82],["Ronald Koeman","CB",90],
["Frank Rijkaard","CB",91],["Adri van Tiggelen","LB",79],["Jan Wouters","DM",83],
["Rob Witschge","CM",80],["Dennis Bergkamp","AM",90],["Bryan Roy","RW",80],
["Ruud Gullit","LW",90],["Marco van Basten","ST",97],["Wim Jonk","CM",80],
["Richard Witschge","LW",79],["John van 't Schip","RW",79],["Peter van Vossen","ST",77],
["John de Wolf","CB",74],["Ed de Goey","GK",78],["Erwin Koeman","CM",78]]},

{n:"WK 1994",a:"W94",p:[
["Ed de Goey","GK",80],["Frank de Boer","CB",84],["Ronald Koeman","CB",88],
["Danny Blind","CB",82],["Stan Valckx","LB",76],["Jan Wouters","DM",82],
["Wim Jonk","CM",82],["Dennis Bergkamp","AM",92],["Marc Overmars","RW",86],
["Bryan Roy","LW",80],["Ronald de Boer","ST",82],["Aron Winter","CM",82],
["Rob Witschge","CM",79],["Peter van Vossen","ST",77],["Gaston Taument","RW",77],
["Ulrich van Gobbel","RB",75],["Ed de Kock","CB",72],["Johan de Kock","CB",73]]},

{n:"EK 1996",a:"E96",p:[
["Edwin van der Sar","GK",86],["Michael Reiziger","RB",82],["Danny Blind","CB",80],
["Winston Bogarde","CB",78],["Arthur Numan","LB",80],["Aron Winter","DM",82],
["Ronald de Boer","CM",82],["Dennis Bergkamp","AM",92],["Marc Overmars","RW",86],
["Patrick Kluivert","ST",85],["Jordi Cruyff","LW",78],["Frank de Boer","CB",84],
["Clarence Seedorf","CM",84],["Edgar Davids","DM",84],["Phillip Cocu","CM",82],
["Peter Hoekstra","LW",76],["Gaston Taument","RW",76],["Johan de Kock","CB",73]]},

{n:"WK 1998",a:"W98",p:[
["Edwin van der Sar","GK",86],["Michael Reiziger","RB",82],["Jaap Stam","CB",88],
["Frank de Boer","CB",85],["Arthur Numan","LB",80],["Edgar Davids","DM",86],
["Phillip Cocu","CM",84],["Ronald de Boer","AM",82],["Marc Overmars","RW",86],
["Dennis Bergkamp","ST",93],["Patrick Kluivert","ST",88],["Clarence Seedorf","CM",84],
["Wim Jonk","CM",80],["Boudewijn Zenden","LW",80],["Giovanni van Bronckhorst","LB",80],
["Pierre van Hooijdonk","ST",80],["Jimmy Floyd Hasselbaink","ST",82],["Aron Winter","CM",80]]},

{n:"EK 2000",a:"E00",p:[
["Edwin van der Sar","GK",87],["Michael Reiziger","RB",82],["Jaap Stam","CB",88],
["Frank de Boer","CB",85],["Giovanni van Bronckhorst","LB",82],["Edgar Davids","DM",86],
["Phillip Cocu","CM",84],["Marc Overmars","AM",86],["Boudewijn Zenden","RW",82],
["Dennis Bergkamp","ST",91],["Patrick Kluivert","ST",89],["Clarence Seedorf","CM",85],
["Arthur Numan","LB",80],["Roy Makaay","ST",82],["Pierre van Hooijdonk","ST",80],
["Paul Bosvelt","CM",78],["Ronald de Boer","AM",80],["Sander Westerveld","GK",80]]},

{n:"EK 2004",a:"E04",p:[
["Edwin van der Sar","GK",87],["Michael Reiziger","RB",81],["Jaap Stam","CB",87],
["Wilfred Bouma","CB",78],["Giovanni van Bronckhorst","LB",83],["Edgar Davids","DM",85],
["Phillip Cocu","CM",84],["Rafael van der Vaart","AM",84],["Andy van der Meyde","RW",79],
["Ruud van Nistelrooy","ST",92],["Arjen Robben","LW",86],["Patrick Kluivert","ST",86],
["Clarence Seedorf","CM",85],["Mark van Bommel","CM",82],["Roy Makaay","ST",84],
["John Heitinga","CB",78],["Frank de Boer","CB",80],["Pierre van Hooijdonk","ST",79]]},

{n:"WK 2006",a:"W06",p:[
["Edwin van der Sar","GK",87],["Khalid Boulahrouz","RB",79],["Jaap Stam","CB",86],
["John Heitinga","CB",80],["Giovanni van Bronckhorst","LB",83],["Mark van Bommel","DM",83],
["Phillip Cocu","CM",82],["Rafael van der Vaart","AM",84],["Dirk Kuyt","RW",82],
["Ruud van Nistelrooy","ST",90],["Arjen Robben","LW",87],["Wesley Sneijder","AM",84],
["Robin van Persie","ST",82],["Joris Mathijsen","CB",79],["André Ooijer","CB",78],
["Nigel de Jong","DM",79],["Ryan Babel","LW",78],["Hedwiges Maduro","DM",76]]},

{n:"EK 2008",a:"E08",p:[
["Edwin van der Sar","GK",86],["Khalid Boulahrouz","RB",78],["John Heitinga","CB",81],
["André Ooijer","CB",78],["Giovanni van Bronckhorst","LB",82],["Nigel de Jong","DM",80],
["Orlando Engelaar","CM",76],["Wesley Sneijder","AM",87],["Dirk Kuyt","RW",82],
["Ruud van Nistelrooy","ST",88],["Arjen Robben","LW",88],["Rafael van der Vaart","AM",84],
["Robin van Persie","ST",84],["Klaas-Jan Huntelaar","ST",82],["Joris Mathijsen","CB",80],
["Mario Melchiot","RB",77],["Demy de Zeeuw","CM",77],["Ibrahim Afellay","AM",78]]},

{n:"WK 2010",a:"W10",p:[
["Maarten Stekelenburg","GK",82],["Gregory van der Wiel","RB",80],["John Heitinga","CB",81],
["Joris Mathijsen","CB",80],["Giovanni van Bronckhorst","LB",82],["Nigel de Jong","DM",83],
["Mark van Bommel","CM",85],["Wesley Sneijder","AM",90],["Dirk Kuyt","RW",83],
["Robin van Persie","ST",88],["Arjen Robben","LW",90],["Rafael van der Vaart","AM",84],
["Klaas-Jan Huntelaar","ST",83],["Eljero Elia","LW",78],["Ibrahim Afellay","AM",79],
["Demy de Zeeuw","CM",77],["Khalid Boulahrouz","CB",77],["André Ooijer","CB",77]]},

{n:"EK 2012",a:"E12",p:[
["Maarten Stekelenburg","GK",81],["Gregory van der Wiel","RB",80],["Joris Mathijsen","CB",80],
["John Heitinga","CB",80],["Jetro Willems","LB",76],["Nigel de Jong","DM",82],
["Mark van Bommel","CM",83],["Wesley Sneijder","AM",88],["Arjen Robben","RW",90],
["Robin van Persie","ST",90],["Ibrahim Afellay","LW",79],["Klaas-Jan Huntelaar","ST",84],
["Rafael van der Vaart","AM",83],["Dirk Kuyt","RW",81],["Kevin Strootman","CM",80],
["Luuk de Jong","ST",76],["Ron Vlaar","CB",78],["Wilfred Bouma","LB",75]]},

{n:"WK 2014",a:"W14",p:[
["Jasper Cillessen","GK",80],["Daryl Janmaat","RB",79],["Ron Vlaar","CB",80],
["Stefan de Vrij","CB",81],["Bruno Martins Indi","LB",78],["Nigel de Jong","DM",82],
["Georginio Wijnaldum","CM",80],["Wesley Sneijder","AM",85],["Arjen Robben","RW",91],
["Robin van Persie","ST",88],["Memphis Depay","LW",80],["Klaas-Jan Huntelaar","ST",82],
["Dirk Kuyt","RW",81],["Jonathan de Guzman","CM",78],["Daley Blind","LB",82],
["Jordy Clasie","DM",78],["Joël Veltman","CB",76],["Terence Kongolo","CB",74]]},

{n:"EK 2021",a:"E21",p:[
["Maarten Stekelenburg","GK",76],["Denzel Dumfries","RB",80],["Stefan de Vrij","CB",84],
["Matthijs de Ligt","CB",85],["Daley Blind","LB",80],["Frenkie de Jong","DM",88],
["Georginio Wijnaldum","CM",85],["Marten de Roon","CM",78],["Steven Berghuis","RW",80],
["Memphis Depay","ST",85],["Donyell Malen","LW",78],["Nathan Aké","CB",80],
["Wout Weghorst","ST",78],["Ryan Gravenberch","CM",78],["Owen Wijndal","LB",75],
["Davy Klaassen","CM",78],["Quincy Promes","LW",78],["Tim Krul","GK",76]]},

{n:"WK 2022",a:"W22",p:[
["Andries Noppert","GK",75],["Denzel Dumfries","RB",81],["Jurriën Timber","CB",80],
["Virgil van Dijk","CB",90],["Nathan Aké","LB",83],["Marten de Roon","DM",78],
["Frenkie de Jong","CM",88],["Davy Klaassen","AM",78],["Steven Berghuis","RW",79],
["Memphis Depay","ST",84],["Cody Gakpo","LW",84],["Wout Weghorst","ST",78],
["Teun Koopmeiners","CM",80],["Steven Bergwijn","LW",80],["Daley Blind","LB",79],
["Xavi Simons","AM",80],["Luuk de Jong","ST",76],["Noa Lang","LW",77]]},

{n:"EK 2024",a:"E24",p:[
["Bart Verbruggen","GK",79],["Denzel Dumfries","RB",81],["Stefan de Vrij","CB",80],
["Virgil van Dijk","CB",89],["Nathan Aké","LB",83],["Jerdy Schouten","DM",78],
["Tijjani Reijnders","CM",82],["Xavi Simons","AM",83],["Cody Gakpo","LW",85],
["Memphis Depay","ST",83],["Donyell Malen","RW",80],["Wout Weghorst","ST",78],
["Steven Bergwijn","LW",80],["Joey Veerman","CM",77],["Micky van de Ven","CB",80],
["Jurriën Timber","RB",80],["Lutsharel Geertruida","RB",77],["Brian Brobbey","ST",77]]}

]
};
