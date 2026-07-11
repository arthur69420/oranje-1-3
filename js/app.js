"use strict";

/* ================= build-config (variant via window.BUILD_CONFIG) =================
   Standaard = Eredivisie-build. oranje.html zet window.BUILD_CONFIG met eigen
   opslag-prefix, branding, shirt en i18n-overrides. */
const CFG = (typeof window !== "undefined" && window.BUILD_CONFIG) || {};
const SK = CFG.store || "e3400_";
const BRAND = CFG.brand || "34–0–0";
const isPerfect = m => !!m && m.d === 0 && m.l === 0 && m.w > 0;
function clubTag(a, s){ return CFG.tagFmt ? CFG.tagFmt(a, s) : a + (CFG.cardSeason === false ? "" : " " + String(s).slice(2)); }

/* ================= configuratie ================= */
/* Balanced-basis per formatie; de speelstijl past hieronder de centrale
   middenvelder(s) aan: aanvallend -> CAM (hoger), verdedigend -> CDM (dieper). */
const FORMATIONS_BASE = {
"4-3-3":[["GK",50,90],["LB",15,73],["CB",37,77],["CB",63,77],["RB",85,73],["CM",28,52],["CM",50,55],["CM",72,52],["LW",18,27],["ST",50,18],["RW",82,27]],
"4-4-2":[["GK",50,90],["LB",15,73],["CB",37,77],["CB",63,77],["RB",85,73],["LM",15,46],["CM",38,51],["CM",62,51],["RM",85,46],["ST",38,20],["ST",62,20]],
"4-2-3-1":[["GK",50,90],["LB",15,73],["CB",37,77],["CB",63,77],["RB",85,73],["CM",38,58],["CM",62,58],["LM",17,38],["CAM",50,41],["RM",83,38],["ST",50,17]],
"4-2-4":[["GK",50,90],["LB",15,73],["CB",37,77],["CB",63,77],["RB",85,73],["CM",38,52],["CM",62,52],["LW",15,25],["ST",38,18],["ST",62,18],["RW",85,25]],
"3-5-2":[["GK",50,90],["CB",27,76],["CB",50,79],["CB",73,76],["LWB",10,50],["CM",32,54],["CM",50,57],["CM",68,54],["RWB",90,50],["ST",38,20],["ST",62,20]],
"5-3-2":[["GK",50,90],["LWB",10,68],["CB",30,77],["CB",50,80],["CB",70,77],["RWB",90,68],["CM",30,51],["CM",50,54],["CM",70,51],["ST",38,20],["ST",62,20]],
"4-5-1":[["GK",50,90],["LB",15,73],["CB",37,77],["CB",63,77],["RB",85,73],["LM",12,44],["CM",32,52],["CM",50,55],["CM",68,52],["RM",88,44],["ST",50,18]],
"3-4-3":[["GK",50,90],["CB",27,76],["CB",50,79],["CB",73,76],["LM",12,48],["CM",38,55],["CM",62,55],["RM",88,48],["LW",18,25],["ST",50,16],["RW",82,25]]
};
/* per formatie en stijl: [slotindex, nieuwe positie, dy, optioneel nieuwe x] */
const STYLE_RULES = {
"4-3-3":   { Aanvallend:[[6,"CAM",-11]],                          Verdedigend:[[6,"CDM",5]] },
"4-4-2":   { Aanvallend:[[6,"CAM",-9],[7,"CAM",-9]],              Verdedigend:[[6,"CDM",6],[7,"CDM",6]] },
"4-2-3-1": { Aanvallend:[[5,"CM",-5],[6,"CM",-5],[8,"CAM",-6]],   Verdedigend:[[5,"CDM",4],[6,"CDM",4]] },
"4-2-4":   { Aanvallend:[[5,"CAM",-8],[6,"CAM",-8]],              Verdedigend:[[5,"CDM",6],[6,"CDM",6]] },
"3-5-2":   { Aanvallend:[[6,"CAM",-12]],                          Verdedigend:[[6,"CDM",5]] },
"5-3-2":   { Aanvallend:[[7,"CAM",-12]],                          Verdedigend:[[7,"CDM",5]] },
"4-5-1":   { Aanvallend:[[7,"CAM",-12]],                          Verdedigend:[[7,"CDM",5]] },
"3-4-3":   { Aanvallend:[[5,"CAM",-9],[6,"CAM",-9]],              Verdedigend:[[5,"CDM",6],[6,"CDM",6]] }
};
function getFormation(name, style){
  const base = FORMATIONS_BASE[name].map(s => s.slice());
  ((STYLE_RULES[name] || {})[style] || []).forEach(([i, code, dy, nx]) => {
    base[i][0] = code;
    if(nx != null) base[i][1] = nx;
    base[i][2] = Math.max(8, Math.min(92, base[i][2] + (dy || 0)));
  });
  return base;
}
function curForm(){ return getFormation(formation, stijl); }
const COMPAT = {
  GK:["GK"],
  RB:["RB"], LB:["LB"], RWB:["RB"], LWB:["LB"], CB:["CB"],
  CDM:["DM","CM"], CM:["CM","DM","AM"], CAM:["AM","CM"],
  LM:["LW"], RM:["RW"], LW:["LW"], RW:["RW"], ST:["ST"]
};
const POSNL = {GK:"Keeper",RB:"Rechtsback",LB:"Linksback",CB:"Centrale verdediger",DM:"Verdedigende middenvelder",CM:"Middenvelder",AM:"Aanvallende middenvelder",LW:"Linksbuiten",RW:"Rechtsbuiten",ST:"Spits"};
const GROUPS = [["Keeper",["GK"]],["Verdediging",["RB","CB","LB"]],["Middenveld",["DM","CM","AM"]],["Aanval",["LW","RW","ST"]]];
const STIJLEN = ["Verdedigend","Gebalanceerd","Aanvallend"];
const ATTPOS = ["AM","LW","RW","ST"], DEFPOS = ["GK","RB","CB","LB","DM"];
const MAX_REROLLS = 3;
/* Per club een vereenvoudigd thuisshirt: patroon + kleuren, afgeleid van
   echte shirts (zie /shirts). p = patroon, c = kleuren (c[0] = basis). */
const KITS = {
  AJA:{p:"band",    c:["#FFFFFF","#C8102E"]},
  PSV:{p:"stripes", c:["#FFFFFF","#ED1C24"]},
  FEY:{p:"halves",  c:["#E2001A","#FFFFFF"]},
  AZ: {p:"sleeves", c:["#DD0000","#FFFFFF"]},
  TWE:{p:"solid",   c:["#E2001A","#FFFFFF"]},
  UTR:{p:"diagonal",c:["#FFFFFF","#FB4F14"]},
  HEE:{p:"stripes", c:["#FFFFFF","#1D5BA4"]},
  GRO:{p:"stripes", c:["#FFFFFF","#0A8A4F"]},
  VIT:{p:"stripes", c:["#FFD200","#1A1A1A"]},
  ROD:{p:"solid",   c:["#FFD400","#1A1A1A"]},
  NAC:{p:"sash",    c:["#FFD200","#1A1A1A"]},
  ADO:{p:"stripes", c:["#F4D000","#0A7A3D"]},
  HER:{p:"stripes", c:["#FFFFFF","#1A1A1A"]},
  NEC:{p:"halves",  c:["#E2001A","#00803D"]},
  VVV:{p:"solid",   c:["#FFE100","#1A1A1A"]},
  EXC:{p:"solid",   c:["#1A1A1A","#E30613"]},
  GRA:{p:"hoops",   c:["#FFFFFF","#1A4F9F"]},
  WIL:{p:"stripes3",c:["#FFFFFF","#E30613","#16285A"]},
  RKC:{p:"stripes", c:["#FFD500","#0066B3"]},
  PEC:{p:"hoops",   c:["#FFFFFF","#1C6FC0"]},
  CAM:{p:"sleeves", c:["#FFDD00","#1A2C7B"]},
  GAE:{p:"band",    c:["#E2001A","#FFD200"]},
  DOR:{p:"band",    c:["#FFFFFF","#0A7A3D"]},
  SPA:{p:"stripes", c:["#FFFFFF","#E30613"]},
  FOR:{p:"sleeves", c:["#F4D616","#1B6A3C"]},
  EMM:{p:"band",    c:["#E30613","#FFFFFF"]},
  VOL:{p:"solid",   c:["#F36C21","#1A1A1A"]},
  ALM:{p:"solid",   c:["#D50000","#1A1A1A"]},
  TEL:{p:"telstar", c:["#FFFFFF","#E40428","#0095D8"]}
};
function clubKit(abbr){ return KITS[abbr] || (CFG.kits && CFG.kits[abbr]) || CFG.kit || {p:"band", c:["#16285A","#FFFFFF"]}; }
function clubColors(abbr){ const c = clubKit(abbr).c; return [c[0], c[1]||c[0]]; }

let _kitSeq = 0;
function shirtSVG(abbr, size){
  const k = clubKit(abbr), c = k.c;
  const id = "kit"+(_kitSeq++);
  const BODY = "M13 1 L2 7 L6.5 15 L10.5 12.5 L10.5 34 L29.5 34 L29.5 12.5 L33.5 15 L38 7 L27 1 Q20 6.5 13 1 Z";
  const SLV_L = "M13 1 L2 7 L6.5 15 L10.5 12.5 Z";
  const SLV_R = "M27 1 L38 7 L33.5 15 L29.5 12.5 Z";
  // accenten (kraag, mouwuiteinden, onderrand) in kleur t
  const trim = t => '<path d="M13 1 Q20 6.5 27 1" fill="none" stroke="'+t+'" stroke-width="1.7"/>'
    + '<line x1="2" y1="7" x2="6.5" y2="15" stroke="'+t+'" stroke-width="2.2"/>'
    + '<line x1="38" y1="7" x2="33.5" y2="15" stroke="'+t+'" stroke-width="2.2"/>'
    + '<rect x="10.5" y="32.1" width="19" height="2" fill="'+t+'"/>';
  let inner = '<rect x="0" y="0" width="40" height="36" fill="'+c[0]+'"/>';
  switch(k.p){
    case "sleeves":
      inner += '<path d="'+SLV_L+'" fill="'+c[1]+'"/><path d="'+SLV_R+'" fill="'+c[1]+'"/>';
      break;
    case "band":
      inner += '<rect x="15.5" y="0" width="9" height="36" fill="'+c[1]+'"/>';
      break;
    case "halves":
      inner += '<rect x="20" y="0" width="20" height="36" fill="'+c[1]+'"/>';
      break;
    case "stripes":
      inner += [4,11,18,25,32].map(x=>'<rect x="'+x+'" y="0" width="3.4" height="36" fill="'+c[1]+'"/>').join("");
      break;
    case "stripes3":
      inner += [[4,1],[11,2],[18,1],[25,2],[32,1]].map(s=>'<rect x="'+s[0]+'" y="0" width="3.4" height="36" fill="'+c[s[1]]+'"/>').join("");
      break;
    case "hoops":
      inner += [5,12,19,26,33].map(y=>'<rect x="0" y="'+y+'" width="40" height="3.6" fill="'+c[1]+'"/>').join("");
      break;
    case "sash":
      inner += '<rect x="-8" y="13.5" width="56" height="7" fill="'+c[1]+'" transform="rotate(33 20 18)"/>';
      break;
    case "diagonal":
      inner += '<polygon points="0,2 38,36 0,36" fill="'+c[1]+'"/>';
      break;
    case "solid":
      if(c[1]) inner += trim(c[1]);
      break;
    case "telstar": // ene kant rood, andere kant blauw
      inner += '<path d="M13 1 Q16.5 4 20 4.4" fill="none" stroke="'+c[1]+'" stroke-width="1.7"/>'
        + '<path d="M20 4.4 Q23.5 4 27 1" fill="none" stroke="'+c[2]+'" stroke-width="1.7"/>'
        + '<line x1="2" y1="7" x2="6.5" y2="15" stroke="'+c[1]+'" stroke-width="2.2"/>'
        + '<line x1="38" y1="7" x2="33.5" y2="15" stroke="'+c[2]+'" stroke-width="2.2"/>'
        + '<rect x="10.5" y="32.1" width="9.5" height="2" fill="'+c[1]+'"/>'
        + '<rect x="20" y="32.1" width="9.5" height="2" fill="'+c[2]+'"/>';
      break;
    case "nl": { // Oranje-shirt: kraag, mouwen, adidas-schouderstrepen, zijpanelen, tonaal patroon
      if(k.geo === "geo88"){ // 1988: fijn geometrisch zigzagpatroon over het hele shirt
        for(let y=2;y<36;y+=4) for(let x=0;x<40;x+=8)
          inner += '<path d="M'+x+' '+(y+2)+' L'+(x+4)+' '+y+' L'+(x+8)+' '+(y+2)+'" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="0.8"/>';
      }
      else if(k.geo === "chevron")
        inner += [6,14,22,30].map(y=>'<path d="M2 '+(y+3)+' L20 '+y+' L38 '+(y+3)+'" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1.3"/>').join("");
      else if(k.geo === "diag")
        inner += '<polygon points="20,0 40,0 40,36 33,36" fill="rgba(0,0,0,.07)"/><polygon points="20,0 20,36 8,36" fill="rgba(0,0,0,.05)"/>';
      else if(k.geo === "tonal")
        inner += '<polygon points="0,9 40,9 40,36 0,36" fill="rgba(0,0,0,.06)"/>';
      if(k.lines === "arc") // 2004: witte gebogen lijnen over de borst
        inner += '<path d="M11 11 Q20 26 29 11" fill="none" stroke="#FFFFFF" stroke-width="0.8"/>'
               + '<path d="M8 8 Q20 25 32 8" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="0.6"/>';
      if(k.side)
        inner += '<rect x="10.5" y="12.5" width="1.7" height="21.5" fill="'+k.side+'"/><rect x="27.8" y="12.5" width="1.7" height="21.5" fill="'+k.side+'"/>';
      if(k.stripes){
        const sc = k.stripes.c, offs = k.stripes.n === 1 ? [0] : [-1,0,1];
        offs.forEach(o=>{
          inner += '<line x1="'+(12+0.48*o)+'" y1="'+(2.4+0.875*o)+'" x2="'+(3.4+0.48*o)+'" y2="'+(7.1+0.875*o)+'" stroke="'+sc+'" stroke-width="0.7"/>'
                 + '<line x1="'+(28-0.48*o)+'" y1="'+(2.4+0.875*o)+'" x2="'+(36.6-0.48*o)+'" y2="'+(7.1+0.875*o)+'" stroke="'+sc+'" stroke-width="0.7"/>';
        });
      }
      if(k.cuff)
        inner += '<line x1="6.5" y1="15" x2="10.5" y2="12.5" stroke="'+k.cuff+'" stroke-width="1.8"/>'
               + '<line x1="33.5" y1="15" x2="29.5" y2="12.5" stroke="'+k.cuff+'" stroke-width="1.8"/>';
      if(k.collar)
        inner += '<path d="M13 1 Q20 6.5 27 1" fill="none" stroke="'+k.collar+'" stroke-width="1.8"/>';
      if(k.hem)
        inner += '<rect x="10.5" y="32.1" width="19" height="1.8" fill="'+k.hem+'"/>';
      break;
    }
  }
  return '<svg class="shirt" width="'+size+'" height="'+Math.round(size*0.9)+'" viewBox="0 0 40 36" aria-hidden="true">'
    + '<defs><clipPath id="'+id+'"><path d="'+BODY+'"/></clipPath></defs>'
    + '<g clip-path="url(#'+id+')">'+inner+'</g>'
    + '<path d="'+BODY+'" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="1.2"/>'
    + '<path d="M13 1 Q20 6.5 27 1 L25.3 2.2 Q20 6 14.7 2.2 Z" fill="rgba(0,0,0,.18)"/>'
    + '</svg>';
}
function clubDot(abbr){
  const c = clubColors(abbr);
  return '<i class="clubdot" style="background:'+c[0]+';box-shadow:inset 0 -3px 0 '+c[1]+'"></i>';
}

/* ================= data voorbereiden =================
   Geen jeugdspeler-opvulling meer: clubs gebruiken hun echte selectie.
   Niet elke club hoeft elke positie te hebben. */
/* posities mogen meerdere rollen bevatten, gescheiden door "/" (bv. "AM/LW").
   De eerste is de hoofdpositie (telt voor indeling en att/def-gemiddelden). */
const splitPos = p => String(p).split("/");
const mainPos = p => splitPos(p)[0];
Object.values(SEASONS).forEach(clubsArr => clubsArr.forEach(c => {
  const avg = arr => arr.length ? arr.reduce((s,pl) => s + pl[2], 0) / arr.length : 64;
  c.s   = avg(c.p);
  c.att = avg(c.p.filter(pl => ATTPOS.includes(mainPos(pl[1]))));
  c.def = avg(c.p.filter(pl => DEFPOS.includes(mainPos(pl[1]))));
}));

/* ================= state ================= */
let season = "?";
let formation = "4-3-3";
let stijl = "Gebalanceerd";
let hardcore = false;
try { hardcore = localStorage.getItem(SK+"hardcore") === "1"; } catch(e){}
let sandbox = false;
try { sandbox = localStorage.getItem(SK+"sandbox") === "1"; } catch(e){}
let phase = "setup";
let teamName = CFG.defaultName || "Mijn XI";
let picks = Array(11).fill(null);
let pickedCount = 0;
let picked = new Set();
let pickedNames = new Set();
let rerolls = MAX_REROLLS;
let currentClub = null;
let currentSeason = null;
let pendingPick = null;
let rigArmed = false;
let draftSeasons = [], draftClubs = [];
let spinTimer = null, revealTimer = null, tableTimer = null, replacedClub = null;
let phaseKey = "phase_setup", hintKey = "hint_setup", hintArg = null;
function setPhaseLine(key){ phaseKey = key; $("phaseline").textContent = t(key); }
function setHint(key, arg){ hintKey = key; hintArg = arg; $("hint").textContent = (arg != null ? t(key, arg) : t(key)); }

const $ = id => document.getElementById(id);
const rnd = a => a[Math.floor(Math.random()*a.length)];
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const normName = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const clubs = () => SEASONS[season];

/* ================= taal / i18n ================= */
let LANG = "nl";
try { LANG = localStorage.getItem(SK+"lang") || "nl"; } catch(e){}
const I18N = {
  nl: {
    apptitle:"De Eredivisie<br>draft challenge", tagline:"Rol · Kies · Simuleer",
    db_title:"Spelersdatabase", sound_title:"Geluid",
    db_heading:"Spelersdatabase", db_search:"Zoek speler in alle seizoenen...",
    close:"Sluiten ✕", hist_heading:"Jouw teams", hist_sub:"De laatste 10 gespeelde seizoenen",
    teamname:"Teamnaam", teamname_ph:"Mijn XI", formation:"Formatie", playstyle:"Speelstijl",
    restart:"Opnieuw beginnen", your_records:"Jouw records", badges:"Badges", view_teams:"Bekijk je teams",
    pick_position:"Kies een positie op het veld", back_squad:"← Terug naar selectie",
    reroll:"Opnieuw rollen", box_score:"Box score", attack:"Aanval", defense:"Verdediging",
    team_rating:"Teamrating", simulate:"Simuleer het seizoen", season_of:"Het seizoen van",
    final_table:"Eindstand Eredivisie", draft_again:"Opnieuw draften", same_team:"Zelfde team, nieuw seizoen",
    share:"Deel je seizoen", share_heading:"Deel je seizoen", share_image:"Delen", save_png:"Bewaar afbeelding",
    share_copy:"Kopieer tekst", saved_png:"Bewaard!", card_sub:"DE EREDIVISIE DRAFT CHALLENGE",
    card_season:"SEIZOEN", card_place:"PLAATS", card_points:"PUNTEN", card_legend:"WINST · GELIJK · VERLIES", card_squad:"ELFTAL",
    footer:"Onofficieel fanproject, niet gelieerd aan de Eredivisie of clubs. Selecties zijn gecureerde kernselecties per seizoen (2010/11–2025/26), bij benadering.",
    roll:"Rol &#127922;", squad_complete:"Elftal compleet",
    sound_on:"Geluid aanzetten", sound_off:"Geluid uitzetten",
    closed:"dicht", already:"al gekozen",
    phase_setup:"Fase: seizoen en opstelling kiezen", phase_draft:"Fase: draften",
    phase_ready:"Fase: klaar voor de aftrap", phase_season:"Fase: seizoen bezig",
    phase_done:"Fase: seizoen afgelopen", demo:"demo",
    hint_setup:"Rol elke ronde een club uit een willekeurig seizoen, kies een speler en zet hem zelf op een oplichtende positie.",
    styles:{Verdedigend:"Verdedigend",Gebalanceerd:"Gebalanceerd",Aanvallend:"Aanvallend"},
    modes:{Normaal:"Normaal",Hardcore:"Hardcore"}, mode:"Modus",
    mode_note:"Hardcore verbergt de ratings.",
    draftmode:"Draft", draftmodes:{Willekeurig:"Willekeurig",Sandbox:"Sandbox"},
    draftmode_note:"Sandbox: kies zelf elke speler i.p.v. willekeurig rollen.",
    sandbox_pick:"Kies een speler", sandbox_search:"Zoek een speler...",
    sandbox_note:"Kies een speler uit elk seizoen voor een open positie.",
    sandbox_toggle:"Sandbox: kies zelf je elftal",
    sandbox_demo:" (Sandbox — telt niet mee voor je records.)",
    shared_season:"Gedeeld seizoen · zoals gesimuleerd",
    share_link:"Kopieer link",
    groups:{Keeper:"Keeper",Verdediging:"Verdediging",Middenveld:"Middenveld",Aanval:"Aanval"},
    pos:{GK:"Keeper",RB:"Rechtsback",LB:"Linksback",CB:"Centrale verdediger",DM:"Verdedigende middenvelder",CM:"Middenvelder",AM:"Aanvallende middenvelder",LW:"Linksbuiten",RW:"Rechtsbuiten",ST:"Spits"},
    home:"T", away:"U",
    st_pos:"Positie", st_won:"Gewonnen", st_draw:"Gelijk", st_lost:"Verloren", st_gd:"Doelsaldo", st_pts:"Punten",
    th_club:"Club", th_w:"W", th_d:"G", th_l:"V", th_gd:"DS", th_pts:"Ptn",
    rec_seasons:"Seizoenen gespeeld", rec_titles:"Landstitels", rec_perfect:"Perfecte seizoenen",
    rec_best:"Beste record", rec_finish:"Beste eindpositie",
    new_badge:" 🏅 Nieuwe badge: ", copied:"Gekopieerd!",
    no_history:"Nog geen seizoenen gespeeld.",
    missing:"mist", complete:"compleet", incomplete:"onvolledig", players:"spelers",
    all_seasons:"Alle seizoenen", all_clubs:"Alle clubs", help_title:"Uitleg",
    draft_filter:"Draftfilter", draft_filter_note:"Beperk de draft tot een of meer seizoenen en/of clubs. Niets geselecteerd = alles willekeurig.",
    seasons_label:"Seizoenen", clubs_label:"Clubs",
    filter_empty:"Geen spelers meer in dit filter voor je open posities. Pas het filter aan of begin opnieuw.",
    help_heading:"Hoe werkt het?",
    help_html:"<p><b>Doel:</b> stel een elftal samen en jaag op het perfecte seizoen: 34 gewonnen, 0 gelijk, 0 verloren — <b>34–0–0</b>.</p>"
      + "<p><b>1. Instellen.</b> Kies een teamnaam, formatie en speelstijl. De speelstijl (verdedigend / gebalanceerd / aanvallend) verschuift je linies op het veld én weegt mee in de uitslagen.</p>"
      + "<p><b>2. Draften.</b> 11 rondes lang rol je een willekeurige club uit een willekeurig seizoen (2010/11–2025/26). Kies een speler uit die selectie en zet hem zelf op een oplichtende, passende positie. Maximaal 3 rerolls per draft. Met het <b>draftfilter</b> kun je je beperken tot één seizoen en/of club.</p>"
      + "<p><b>3. Simuleren.</b> Je elftal speelt een volledig seizoen van 34 wedstrijden tegen de 18 clubs van een geloot seizoen. De ratings bepalen de kansen; daarna volgt de eindstand.</p>"
      + "<p><b>Records &amp; badges</b> worden lokaal bewaard. Met <b>\u{1F4CB}</b> bekijk je de spelersdatabase, met de <b>taalknop</b> wissel je tussen Nederlands en Engels, en met <b>\u{1F50A}</b> zet je het geluid aan/uit.</p>",
    res1:"resultaat", resN:"resultaten", in_all:"in alle seizoenen",
    demo_note:" (Demo — telt niet mee voor je records.)", demo_tag:" · DEMO",
    round_of:n=>"Ronde "+n+" van 11", season_label:s=>"Seizoen "+s,
    hint_draft:tn=>tn+" draft: elke ronde een club uit een willekeurig seizoen. Max "+MAX_REROLLS+" rerolls.",
    ready_hint:tn=>tn+" staat. Simuleer het seizoen via de box score.",
    replaces:(tn,c)=>tn+" neemt de plek in van "+c+" · 34 speelrondes",
    v_perfect:"PERFECT SEIZOEN. Vierendertig uit vierendertig — onsterfelijk.",
    v_champion:tn=>"Kampioen van Nederland. De schaal is voor "+tn+".",
    v_cl:p=>"Plek "+p+": Champions League-voetbal volgend seizoen.",
    v_eur:p=>"Plek "+p+": Europees voetbal in zicht. Keurig seizoen.",
    v_mid:p=>"Plek "+p+": grijze middenmoot. De trommel was je niet gunstig gezind.",
    v_low:p=>"Plek "+p+": lang kijken naar de onderkant van de ranglijst.",
    v_releg:p=>"Plek "+p+": degradatiestress tot de laatste speeldag.",
    ord:n=>n+"e",
    db_stats:(c,tot,pl)=>c+"/"+tot+" clubs compleet · "+pl+" spelers",
    hist_meta:tm=>ord(tm.pos)+" · "+tm.rec+" · "+tm.pts+" ptn · "+tm.formation+" · "+styleLabel(tm.stijl)+" · rating "+tm.rating,
    share_line2:(pos,me)=>ord(pos)+" plaats · "+me.w+"–"+me.d+"–"+me.l+" · "+me.pts+" punten",
    ach:{kampioen:["Kampioen","Win de landstitel"],perfect:["34–0–0","Speel een perfect seizoen"],underdog:["Underdog","Word kampioen met een teamrating onder 70"],tijdmachine:["Tijdmachine","Stel een elftal op met spelers uit 11 verschillende seizoenen"],clubliefde:["Clubliefde","Zet 4 of meer spelers van dezelfde club in je elftal"],zuinig:["Eerste keer goed","Voltooi de draft zonder rerolls"],machine:["Doelpuntenmachine","Scoor 100 of meer goals in een seizoen"],fort:["Het Fort","Krijg hooguit 15 tegengoals in een seizoen"]}
  },
  en: {
    apptitle:"The Eredivisie<br>draft challenge", tagline:"Roll · Pick · Simulate",
    db_title:"Player database", sound_title:"Sound",
    db_heading:"Player database", db_search:"Search player across all seasons...",
    close:"Close ✕", hist_heading:"Your teams", hist_sub:"The last 10 seasons played",
    teamname:"Team name", teamname_ph:"My XI", formation:"Formation", playstyle:"Play style",
    restart:"Start over", your_records:"Your records", badges:"Badges", view_teams:"View your teams",
    pick_position:"Pick a position on the pitch", back_squad:"← Back to squad",
    reroll:"Reroll", box_score:"Box score", attack:"Attack", defense:"Defense",
    team_rating:"Team rating", simulate:"Simulate the season", season_of:"The season of",
    final_table:"Eredivisie final table", draft_again:"Draft again", same_team:"Same team, new season",
    share:"Share your season", share_heading:"Share your season", share_image:"Share", save_png:"Save image",
    share_copy:"Copy text", saved_png:"Saved!", card_sub:"THE EREDIVISIE DRAFT CHALLENGE",
    card_season:"SEASON", card_place:"PLACE", card_points:"POINTS", card_legend:"WIN · DRAW · LOSS", card_squad:"SQUAD",
    footer:"Unofficial fan project, not affiliated with the Eredivisie or its clubs. Squads are curated core selections per season (2010/11–2025/26), approximate.",
    roll:"Roll &#127922;", squad_complete:"Squad complete",
    sound_on:"Turn sound on", sound_off:"Turn sound off",
    closed:"full", already:"already picked",
    phase_setup:"Phase: choose season and line-up", phase_draft:"Phase: drafting",
    phase_ready:"Phase: ready for kick-off", phase_season:"Phase: season in progress",
    phase_done:"Phase: season finished", demo:"demo",
    hint_setup:"Each round, roll a club from a random season, pick a player and place him on a highlighted position yourself.",
    styles:{Verdedigend:"Defensive",Gebalanceerd:"Balanced",Aanvallend:"Attacking"},
    modes:{Normaal:"Normal",Hardcore:"Hardcore"}, mode:"Mode",
    mode_note:"Hardcore hides the ratings.",
    draftmode:"Draft", draftmodes:{Willekeurig:"Random",Sandbox:"Sandbox"},
    draftmode_note:"Sandbox: pick every player yourself instead of rolling random.",
    sandbox_pick:"Pick a player", sandbox_search:"Search a player...",
    sandbox_note:"Pick any player from any season for an open position.",
    sandbox_toggle:"Sandbox: pick your own XI",
    sandbox_demo:" (Sandbox — does not count towards your records.)",
    shared_season:"Shared season · as simulated",
    share_link:"Copy link",
    groups:{Keeper:"Goalkeeper",Verdediging:"Defense",Middenveld:"Midfield",Aanval:"Attack"},
    pos:{GK:"Goalkeeper",RB:"Right-back",LB:"Left-back",CB:"Centre-back",DM:"Defensive midfielder",CM:"Midfielder",AM:"Attacking midfielder",LW:"Left winger",RW:"Right winger",ST:"Striker"},
    home:"H", away:"A",
    st_pos:"Position", st_won:"Won", st_draw:"Drawn", st_lost:"Lost", st_gd:"Goal diff.", st_pts:"Points",
    th_club:"Club", th_w:"W", th_d:"D", th_l:"L", th_gd:"GD", th_pts:"Pts",
    rec_seasons:"Seasons played", rec_titles:"League titles", rec_perfect:"Perfect seasons",
    rec_best:"Best record", rec_finish:"Best finish",
    new_badge:" 🏅 New badge: ", copied:"Copied!",
    no_history:"No seasons played yet.",
    missing:"missing", complete:"complete", incomplete:"incomplete", players:"players",
    all_seasons:"All seasons", all_clubs:"All clubs", help_title:"How to play",
    draft_filter:"Draft filter", draft_filter_note:"Limit the draft to one or more seasons and/or clubs. Nothing selected = all random.",
    seasons_label:"Seasons", clubs_label:"Clubs",
    filter_empty:"No more players in this filter for your open positions. Change the filter or start over.",
    help_heading:"How does it work?",
    help_html:"<p><b>Goal:</b> build an XI and chase the perfect season: 34 won, 0 drawn, 0 lost — <b>34–0–0</b>.</p>"
      + "<p><b>1. Set up.</b> Pick a team name, formation and play style. The play style (defensive / balanced / attacking) shifts your lines on the pitch and weighs into the results.</p>"
      + "<p><b>2. Draft.</b> For 11 rounds you roll a random club from a random season (2010/11–2025/26). Pick a player from that squad and place him on a highlighted, matching position. Max 3 rerolls per draft. Use the <b>draft filter</b> to limit yourself to one season and/or club.</p>"
      + "<p><b>3. Simulate.</b> Your XI plays a full 34-match season against the 18 clubs of a drawn season. Ratings drive the odds; then comes the final table.</p>"
      + "<p><b>Records &amp; badges</b> are stored locally. Use <b>\u{1F4CB}</b> for the player database, the <b>language button</b> to switch between Dutch and English, and <b>\u{1F50A}</b> to toggle sound.</p>",
    res1:"result", resN:"results", in_all:"across all seasons",
    demo_note:" (Demo — does not count towards your records.)", demo_tag:" · DEMO",
    round_of:n=>"Round "+n+" of 11", season_label:s=>"Season "+s,
    hint_draft:tn=>tn+" draft: each round a club from a random season. Max "+MAX_REROLLS+" rerolls.",
    ready_hint:tn=>tn+" is set. Simulate the season via the box score.",
    replaces:(tn,c)=>tn+" takes the place of "+c+" · 34 matchdays",
    v_perfect:"PERFECT SEASON. Thirty-four out of thirty-four — immortal.",
    v_champion:tn=>"Champions of the Netherlands. The title goes to "+tn+".",
    v_cl:p=>"Position "+p+": Champions League football next season.",
    v_eur:p=>"Position "+p+": European football in sight. Solid season.",
    v_mid:p=>"Position "+p+": grey mid-table. The drum wasn't kind to you.",
    v_low:p=>"Position "+p+": staring at the bottom of the table for a while.",
    v_releg:p=>"Position "+p+": relegation stress until the final matchday.",
    ord:n=>n+(n%10===1&&n%100!==11?"st":n%10===2&&n%100!==12?"nd":n%10===3&&n%100!==13?"rd":"th"),
    db_stats:(c,tot,pl)=>c+"/"+tot+" clubs complete · "+pl+" players",
    hist_meta:tm=>ord(tm.pos)+" · "+tm.rec+" · "+tm.pts+" pts · "+tm.formation+" · "+styleLabel(tm.stijl)+" · rating "+tm.rating,
    share_line2:(pos,me)=>ord(pos)+" place · "+me.w+"–"+me.d+"–"+me.l+" · "+me.pts+" points",
    ach:{kampioen:["Champion","Win the league title"],perfect:["34–0–0","Play a perfect season"],underdog:["Underdog","Become champion with a team rating below 70"],tijdmachine:["Time machine","Field a XI with players from 11 different seasons"],clubliefde:["Club love","Field 4 or more players from the same club"],zuinig:["First time right","Complete the draft without rerolls"],machine:["Goal machine","Score 100 or more goals in a season"],fort:["The Fortress","Concede at most 15 goals in a season"]}
  }
};
/* build-specifieke teksten over de standaard heen leggen */
if(CFG.i18n){ for(const _l in CFG.i18n){ if(I18N[_l]) Object.assign(I18N[_l], CFG.i18n[_l]); } }
function t(k, ...a){ const v = I18N[LANG][k]; return typeof v === "function" ? v(...a) : v; }
const styleLabel = v => I18N[LANG].styles[v] || v;
const modeLabel = v => (I18N[LANG].modes && I18N[LANG].modes[v]) || v;
const draftModeLabel = v => (I18N[LANG].draftmodes && I18N[LANG].draftmodes[v]) || v;
const grpLabel = v => I18N[LANG].groups[v] || v;
const posLabel = c => splitPos(c).map(x => I18N[LANG].pos[x] || x).join(" / ");
const ord = n => I18N[LANG].ord(n);
const achName = id => I18N[LANG].ach[id][0];
const achDesc = id => I18N[LANG].ach[id][1];
function setPhaseUI(){
  if(phase === "setup"){ setPhaseLine("phase_setup"); setHint("hint_setup"); $("rollbtn").innerHTML = t("roll"); }
  else if(phase === "draft"){ setPhaseLine("phase_draft"); setHint("hint_draft", teamName); $("rollbtn").innerHTML = sandbox ? t("sandbox_pick") : t("roll"); }
}
function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-html]").forEach(el => el.innerHTML = t(el.dataset.i18nHtml));
  document.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
  document.querySelectorAll("[data-i18n-title]").forEach(el => el.title = t(el.dataset.i18nTitle));
  $("langbtn").textContent = LANG === "nl" ? "EN" : "NL";
  setMuteIcon();
  refreshSetup();
  setPhaseUI();
  renderRecords();
  if($("dbseason") && $("dbseason").options.length) $("dbseason").options[0].textContent = t("all_seasons");
  if($("dbclubsel") && $("dbclubsel").options.length) $("dbclubsel").options[0].textContent = t("all_clubs");
  if(phase !== "setup" && phase !== "draft"){
    $("phaseline").textContent = t(phaseKey);
    $("hint").textContent = (hintArg != null ? t(hintKey, hintArg) : t(hintKey));
  }
  if($("overlay").classList.contains("show") && currentClub && currentSeason) showSquad(currentSeason, currentClub);
  if($("dbmodal").classList.contains("show")) refreshDb();
  if($("histmodal").classList.contains("show")) renderHistory();
  if($("helpmodal").classList.contains("show")) $("helpbody").innerHTML = t("help_html");
  if($("finale").classList.contains("show")){ relocalizeFinale(); drawShareCard(); }
}

/* ================= setup UI ================= */
function buildOptions(containerId, items, current, onpick, label){
  const el = $(containerId);
  el.innerHTML = "";
  items.forEach(it => {
    const b = document.createElement("button");
    b.className = "opt" + (it === current ? " active" : "");
    b.textContent = label ? label(it) : it;
    b.onclick = () => { if(phase !== "setup") return; onpick(it); refreshSetup(); };
    el.appendChild(b);
  });
}
function refreshSetup(){
  buildOptions("formaties", Object.keys(FORMATIONS_BASE), formation, v => formation = v);
  buildOptions("stijlen", STIJLEN, stijl, v => stijl = v, styleLabel);
  buildOptions("modes", ["Normaal", "Hardcore"], hardcore ? "Hardcore" : "Normaal", v => {
    hardcore = (v === "Hardcore");
    try { localStorage.setItem(SK+"hardcore", hardcore ? "1" : "0"); } catch(e){}
  }, modeLabel);
  if($("sandcheck")) $("sandcheck").checked = sandbox;
  document.body.classList.toggle("hardcore", hardcore);
  $("configline").textContent = formation + " \u00B7 " + styleLabel(stijl) + (hardcore ? " \u00B7 " + modeLabel("Hardcore") : "");
  drawPitchSlots();
  drawBoxScore();
}
function setLocked(lock){
  $("setuppanel").classList.toggle("locked", lock);
  $("teamname").disabled = lock;
  if($("sandtoggle")) $("sandtoggle").style.display = lock ? "none" : "flex";
  renderDraftFilter();
}

/* ---- multi-select draftfilter (seizoenen + clubs) ---- */
function toggleArr(arr, v){ const i = arr.indexOf(v); if(i < 0) arr.push(v); else arr.splice(i, 1); }
function clubsForSeasons(){
  const ss = draftSeasons.length ? draftSeasons : Object.keys(SEASONS);
  return [...new Set(ss.flatMap(s => SEASONS[s].map(c => c.n)))].sort();
}
function checkRow(label, on, onclick){
  const lb = document.createElement("label");
  lb.className = "mscheck" + (on ? " on" : "");
  lb.innerHTML = "<span class='msbox'>" + (on ? "✓" : "") + "</span><span class='mslbl'>" + esc(label) + "</span>";
  lb.onclick = e => { e.preventDefault(); onclick(); };
  return lb;
}
function summarize(arr, allLabel, total){
  if(!arr.length) return allLabel;
  if(arr.length <= 2) return arr.join(", ");
  return arr.length + " / " + total;
}
function renderDraftFilter(){
  const sm = $("seasonmenu"); if(!sm) return;
  const locked = phase !== "setup";
  sm.innerHTML = "";
  Object.keys(SEASONS).forEach(s => sm.appendChild(checkRow(s, draftSeasons.includes(s), () => {
    toggleArr(draftSeasons, s);
    const valid = new Set(clubsForSeasons()); draftClubs = draftClubs.filter(c => valid.has(c));
    renderDraftFilter();
  })));
  const cm = $("clubmenu"); cm.innerHTML = "";
  clubsForSeasons().forEach(n => cm.appendChild(checkRow(n, draftClubs.includes(n), () => { toggleArr(draftClubs, n); renderDraftFilter(); })));
  $("seasonsum").textContent = summarize(draftSeasons.slice().sort(), t("all_seasons"), Object.keys(SEASONS).length);
  $("clubsum").textContent = summarize(draftClubs.slice().sort(), t("all_clubs"), clubsForSeasons().length);
  $("seasonbtn").disabled = locked; $("clubbtn").disabled = locked;
  if(locked){ sm.classList.remove("open"); cm.classList.remove("open"); }
}
function getTeamName(){
  const v = $("teamname").value.trim();
  return v ? v : t("teamname_ph");
}

/* ================= veld ================= */
function drawPitchSlots(){
  document.querySelectorAll(".slot").forEach(e => e.remove());
  // de speelstijl bepaalt de posities zelf (zie STYLE_RULES)
  curForm().forEach((p,i) => {
    const d = document.createElement("div");
    d.className = "slot";
    d.id = "slot"+i;
    d.style.left = p[1] + "%";
    d.style.top = p[2] + "%";
    d.textContent = p[0];
    $("pitch").appendChild(d);
  });
}
function fillSlot(i, pick){
  const d = $("slot"+i);
  d.className = "slot filled";
  d.innerHTML = shirtSVG(pick.clubA, 30)
    + '<span class="nm">'+esc(pick.name)+'</span><span class="meta">'+clubTag(pick.clubA, pick.season)+' \u00B7 '+pick.pos+'<span class="r"> \u00B7 '+pick.rating+'</span></span>';
}

/* ================= box score ================= */
function drawBoxScore(){
  const rows = $("bsrows");
  rows.innerHTML = "";
  curForm().forEach((p,i) => {
    const pk = picks[i];
    const div = document.createElement("div");
    div.className = "bsrow" + (pk ? " filled" : "");
    div.innerHTML = '<span class="p">'+p[0]+'</span>'
      + '<span class="n">'+(pk ? esc(pk.name) : "\u2014")+'</span>'
      + (pk ? '<span class="c">'+clubDot(pk.clubA)+clubTag(pk.clubA, pk.season)+'</span><span class="r">'+pk.rating+'</span>' : '');
    rows.appendChild(div);
  });
  $("bscount").textContent = pickedCount + "/11";
  if(pickedCount === 11) showTeamStats();
}
function isDefSlot(slotPos){ return ["GK","CB","RB","LB","RWB","LWB","CDM"].includes(slotPos); }
function ratings(){
  const F = curForm();
  const arr = picks.map((p,i) => p ? {p, slot: F[i][0]} : null).filter(Boolean);
  const att = arr.filter(x => !isDefSlot(x.slot)).map(x => x.p);
  const def = arr.filter(x => isDefSlot(x.slot)).map(x => x.p);
  const avg = a => a.length ? a.reduce((s,p) => s + p.rating, 0) / a.length : 64;
  return { att: avg(att), def: avg(def), tot: avg(arr.map(x => x.p)) };
}
function showTeamStats(){
  const r = ratings();
  $("teamstats").classList.add("show");
  const pct = v => Math.max(4, Math.min(100, (v - 58) / 28 * 100));
  $("attval").textContent = r.att.toFixed(1);
  $("defval").textContent = r.def.toFixed(1);
  $("totval").textContent = r.tot.toFixed(1);
  requestAnimationFrame(() => {
    $("attbar").style.width = pct(r.att) + "%";
    $("defbar").style.width = pct(r.def) + "%";
    $("totbar").style.width = pct(r.tot) + "%";
  });
  $("simbtn").classList.add("show");
}

/* ================= draft ================= */
function openSlotsFor(playerPos){
  const pp = splitPos(playerPos);
  return curForm().map((p,i) => ({pos: p[0], i}))
    .filter(o => !picks[o.i] && pp.some(x => COMPAT[o.pos].includes(x)));
}
function eligiblePlayers(s, club){
  return club.p.map((pl,i) => ({pl, i}))
    .filter(o => !picked.has(s+"#"+club.n+"#"+o.i) && !pickedNames.has(normName(o.pl[0])) && openSlotsFor(o.pl[1]).length > 0);
}
function startDraft(){
  phase = "draft";
  teamName = getTeamName();
  picks = Array(11).fill(null); pickedCount = 0; picked = new Set(); pickedNames = new Set(); replacedClub = null;
  rerolls = MAX_REROLLS;
  pendingPick = null; clearPlacement();
  clearInterval(revealTimer); clearInterval(tableTimer);
  setLocked(true);
  $("season").classList.remove("show");
  $("finale").classList.remove("show");
  $("teamstats").classList.remove("show");
  $("simbtn").classList.remove("show");
  $("resetbtn").style.display = "block";
  setPhaseLine("phase_draft");
  setHint("hint_draft", teamName);
  refreshSetup();
  nextRoll();
}
function nextRoll(){
  drawBoxScore();
  if(pickedCount >= 11){ finishDraft(); return; }
  $("rollbtn").disabled = false;
  $("rollbtn").innerHTML = sandbox ? t("sandbox_pick") : t("roll");
}
function rollSeasonClub(excludeClubName){
  const seasons = draftSeasons.length ? draftSeasons : Object.keys(SEASONS);
  for(let tries = 0; tries < 120; tries++){
    const s = rnd(seasons);
    const pool = SEASONS[s].filter(c =>
      (!draftClubs.length || draftClubs.includes(c.n)) &&
      eligiblePlayers(s, c).length > 0 &&
      (tries >= 60 || c.n !== excludeClubName));
    if(pool.length) return { s, club: rnd(pool) };
  }
  return null;
}
function spinTo(excludeClubName){
  const tc = rollSeasonClub(excludeClubName);
  if(!tc){
    clearInterval(spinTimer);
    const sn = $("spinname");
    sn.className = "spinname"; sn.textContent = "—";
    $("spinshirt").innerHTML = "";
    $("ovneed").textContent = t("filter_empty");
    $("choices").innerHTML = "";
    $("rerollbtn").classList.remove("show");
    return;
  }
  currentClub = tc.club;
  currentSeason = tc.s;
  $("choices").innerHTML = "";
  $("rerollbtn").classList.remove("show");
  const sn = $("spinname");
  sn.textContent = "\u00A0";
  sn.className = "spinname spinning";
  let ticks = 0;
  clearInterval(spinTimer);
  spinTimer = setInterval(() => {
    ticks++;
    if(ticks < 16){
      const rs = rnd(Object.keys(SEASONS));
      const c = rnd(SEASONS[rs]);
      sn.textContent = c.n;
      $("ovneed").textContent = rs;
      $("spinshirt").innerHTML = shirtSVG(c.a, 44);
      sfx.tick(ticks);
    } else {
      clearInterval(spinTimer);
      sn.textContent = tc.club.n;
      $("ovneed").textContent = t("season_label", tc.s);
      $("spinshirt").innerHTML = shirtSVG(tc.club.a, 52);
      sn.className = "spinname landed";
      sfx.land();
      showSquad(tc.s, tc.club);
      updateRerollBtn();
    }
  }, 70);
}
function roll(){
  audio();
  if(phase === "setup") startDraft();
  if(phase !== "draft") return;
  if(sandbox){ openSandbox(); return; }
  $("rollbtn").disabled = true;
  $("ovstep").textContent = t("round_of", pickedCount+1);
  $("ovneed").textContent = "";
  $("overlay").classList.add("show");
  spinTo(null);
}
function openSandbox(){
  $("overlay").classList.add("show");
  $("ovstep").textContent = t("round_of", pickedCount + 1);
  $("spinshirt").innerHTML = "";
  $("spinname").textContent = draftModeLabel("Sandbox");
  $("spinname").className = "spinname";
  $("ovneed").textContent = t("sandbox_note");
  $("rerollbtn").classList.remove("show");
  $("choices").innerHTML = "<input class='sandsearch' id='sandsearch' placeholder='" + esc(t("sandbox_search")) + "' autocomplete='off'><div class='sandresults' id='sandresults'></div>";
  $("sandsearch").oninput = e => renderSandbox(e.target.value);
  renderSandbox("");
  $("sandsearch").focus();
}
function renderSandbox(q){
  const qn = q.trim().toLowerCase();
  const res = [];
  outer:
  for(const s of Object.keys(SEASONS)){
    for(const club of SEASONS[s]){
      for(let i = 0; i < club.p.length; i++){
        const pl = club.p[i];
        if(isJeugd(pl) || pickedNames.has(normName(pl[0]))) continue;
        if(!openSlotsFor(pl[1]).length) continue;
        if(qn && !pl[0].toLowerCase().includes(qn)) continue;
        res.push({ s, club, i, pl });
        if(res.length > 600) break outer;
      }
    }
  }
  res.sort((a, b) => b.pl[2] - a.pl[2]);
  const box = $("sandresults");
  const top = res.slice(0, 80);
  if(!top.length){ box.innerHTML = "<p class='eyebrow' style='margin-top:12px'>" + t("filter_empty") + "</p>"; return; }
  box.innerHTML = "";
  top.forEach(o => {
    const b = document.createElement("button");
    b.className = "pchoice";
    b.innerHTML = "<span class='pp'>" + o.pl[1] + "</span><span class='nm'>" + esc(o.pl[0]) + "</span>"
      + "<span class='sandmeta'>" + clubDot(o.club.a) + clubTag(o.club.a, o.s) + "</span>"
      + "<span class='rt'>" + o.pl[2] + "</span>";
    b.onclick = () => choosePlayer(o.s, o.club, o.i);
    box.appendChild(b);
  });
}
function updateRerollBtn(){
  const b = $("rerollbtn");
  b.classList.add("show");
  b.disabled = rerolls <= 0;
  $("rerollcount").textContent = "(" + rerolls + ")";
}
function reroll(){
  if(phase !== "draft" || rerolls <= 0) return;
  rerolls--;
  spinTo(currentClub ? currentClub.n : null);
}
function showSquad(s, club){
  const box = $("choices");
  box.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "squadcols";
  const col0 = document.createElement("div"); col0.className = "sgcol";
  const col1 = document.createElement("div"); col1.className = "sgcol";
  wrap.appendChild(col0); wrap.appendChild(col1);
  // vaste plek per linie: keeper + verdediging links, middenveld + aanval rechts
  const colFor = { Keeper: col0, Verdediging: col0, Middenveld: col1, Aanval: col1 };
  GROUPS.forEach(([label, poss]) => {
    const members = club.p.map((pl,i) => ({pl,i})).filter(o => poss.includes(mainPos(o.pl[1])));
    if(!members.length) return;
    const anyOpen = members.some(o => openSlotsFor(o.pl[1]).length > 0 && !picked.has(s+"#"+club.n+"#"+o.i) && !pickedNames.has(normName(o.pl[0])));
    const g = document.createElement("div");
    g.className = "sg";
    g.innerHTML = "<h3>" + grpLabel(label) + (anyOpen ? "" : " <span class='full'>\u00B7 " + t("closed") + "</span>") + "</h3>";
    members.forEach(o => {
      const used = picked.has(s+"#"+club.n+"#"+o.i) || pickedNames.has(normName(o.pl[0]));
      const fits = openSlotsFor(o.pl[1]).length > 0;
      const b = document.createElement("button");
      b.className = "pchoice" + (used ? " used" : "");
      b.disabled = used || !fits;
      b.innerHTML = "<span class='pp'>" + o.pl[1] + "</span><span class='nm'>" + esc(o.pl[0]) + "</span>"
        + (used ? "<span class='usedtag'>" + t("already") + "</span>" : "")
        + "<span class='rt'>" + o.pl[2] + "</span>";
      if(!b.disabled) b.onclick = () => choosePlayer(s, club, o.i);
      g.appendChild(b);
    });
    (colFor[label] || col0).appendChild(g);
  });
  box.appendChild(wrap);
}
function choosePlayer(s, club, i){
  const pl = club.p[i];
  const opts = openSlotsFor(pl[1]);
  if(!opts.length) return;
  pendingPick = { s, club, idx: i, pl };
  $("overlay").classList.remove("show");
  $("pbplayer").innerHTML = esc(pl[0]) + ' <span class="pb-meta">' + club.a + ' ' + s + ' · ' + posLabel(pl[1]) + '<span class="r"> · ' + pl[2] + '</span></span>';
  $("placebar").classList.add("show");
  $("pitch").classList.add("placing");
  opts.forEach(o => {
    const d = $("slot"+o.i);
    d.classList.add("open");
    d.onclick = () => placeAt(o.i);
  });
}
function clearPlacement(){
  document.querySelectorAll(".slot.open").forEach(d => { d.classList.remove("open"); d.onclick = null; });
  $("placebar").classList.remove("show");
  $("pitch").classList.remove("placing");
}
function placeAt(slotIdx){
  if(!pendingPick) return;
  const { s, club, idx, pl } = pendingPick;
  pendingPick = null;
  clearPlacement();
  picked.add(s+"#"+club.n+"#"+idx);
  pickedNames.add(normName(pl[0]));
  picks[slotIdx] = { pos: pl[1], name: pl[0], rating: pl[2], clubN: club.n, clubA: club.a, season: s };
  fillSlot(slotIdx, picks[slotIdx]);
  pickedCount++;
  sfx.place();
  nextRoll();
  if(sandbox && pickedCount < 11 && phase === "draft") openSandbox();
}
function backToSquad(){
  if(!pendingPick) return;
  pendingPick = null;
  clearPlacement();
  $("overlay").classList.add("show");
}
function finishDraft(){
  phase = "done";
  $("rollbtn").disabled = true;
  $("rollbtn").innerHTML = t("squad_complete");
  setPhaseLine("phase_ready");
  setHint("ready_hint", teamName);
}

/* ================= seizoenssimulatie (volledige competitie) ================= */
function styleMods(){
  if(stijl === "Aanvallend")  return { gf: 0.35, ga: 0.28 };
  if(stijl === "Verdedigend") return { gf: -0.24, ga: -0.34 };
  return { gf: 0, ga: 0 };
}
function poisson(lambda){
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while(p > L);
  return k - 1;
}
function expGoals(att, def, home){
  return Math.max(0.15, Math.min(4.2, 1.28 + (att - def) * 0.085 + (home ? 0.18 : -0.06)));
}
function playMatch(h, a, mods){
  let lh = expGoals(h.att, a.def, true);
  let la = expGoals(a.att, h.def, false);
  if(h.mine){ lh += mods.gf; la += mods.ga; }
  if(a.mine){ la += mods.gf; lh += mods.ga; }
  return [poisson(lh), poisson(la)];
}
/* ================= toernooi-teksten (los van I18N, voor de toernooimodus) ===== */
const TT = {
  nl: {
    world_cup:"WK", group:"Groep", th_group:"Groep", pens:"n.s.",
    r16:"Achtste", qf:"Kwartfinale", sf:"Halve finale", final:"Finale", world_champ:"Wereldkampioen", ko_path:"Knock-outfase",
    pens_full:"Strafschoppen", so_wins:"wint",
    st_round:"Ronde", st_won:"Winst", st_draw:"Gelijk", st_lost:"Verlies", st_gf:"Goals voor", st_ga:"Goals tegen",
    stg_champ:"Winnaar", stg_final:"Finale", stg_sf:"Halve finale", stg_qf:"Kwartfinale", stg_r16:"Achtste finale", stg_group:"Groepsfase",
    v_champ:tn=>"WERELDKAMPIOEN! "+tn+" heeft de beker eindelijk te pakken.",
    v_champ_unbeaten:tn=>"WERELDKAMPIOEN — en ongeslagen. "+tn+" is onsterfelijk.",
    v_runner:"Verloren finale. Zilver — alweer. Het 1–3-verhaal in het kort.",
    v_sf:"Halve finale. Zó dichtbij de finale, en toch naar huis.",
    v_qf:"Kwartfinale. Het toernooi zit erop.",
    v_r16:"Achtste finale. Vroeg uitgeschakeld.",
    v_group:"Groepsfase. Niet eens de knock-out gehaald.",
    sub:(g,n)=>"Groep "+g+" · "+n+" landen"
  },
  en: {
    world_cup:"WC", group:"Group", th_group:"Group", pens:"pens",
    r16:"Last 16", qf:"Quarter-final", sf:"Semi-final", final:"Final", world_champ:"World champion", ko_path:"Knockout stage",
    pens_full:"Penalty shootout", so_wins:"win",
    st_round:"Round", st_won:"Won", st_draw:"Drawn", st_lost:"Lost", st_gf:"Goals for", st_ga:"Goals against",
    stg_champ:"Winner", stg_final:"Final", stg_sf:"Semi-final", stg_qf:"Quarter-final", stg_r16:"Last 16", stg_group:"Group stage",
    v_champ:tn=>"WORLD CHAMPIONS! "+tn+" finally lift the trophy.",
    v_champ_unbeaten:tn=>"WORLD CHAMPIONS — and unbeaten. "+tn+" are immortal.",
    v_runner:"Lost final. Silver — again. The 1–3 story in a nutshell.",
    v_sf:"Semi-final. So close to the final, yet sent home.",
    v_qf:"Quarter-final. The tournament is over.",
    v_r16:"Last 16. Knocked out early.",
    v_group:"Group stage. Didn't even reach the knockouts.",
    sub:(g,n)=>"Group "+g+" · "+n+" nations"
  }
};
const tt = (k,...a) => { const v=(TT[LANG]||TT.nl)[k]; return typeof v==="function"?v(...a):v; };
/* echte vlaggen via flagcdn (accuraat, werken overal) */
function flagSVG(code){
  const iso = (typeof FLAG !== "undefined") && FLAG[code];
  if(!iso) return '<span class="flag flag-x" aria-hidden="true"></span>';
  return '<img class="flag" alt="" src="https://flagcdn.com/w40/'+iso+'.png" srcset="https://flagcdn.com/w80/'+iso+'.png 2x">';
}
const flagHTML = code => code ? flagSVG(code) : "";
const oppName = o => o ? (o.name || o.n || o.a || "") : "";   // alleen naam (platte tekst)
const natLabel = o => flagHTML(o && o.a) + esc(oppName(o));    // vlag + naam (HTML)
function natInfo(code){ const x = (typeof NATIONS !== "undefined") && NATIONS.find(n => n.a === code); return x ? { a:x.a, f:x.f, name:x.n } : { a:code, f:"", name:code }; }
function codeByName(nm){ const x = (typeof NATIONS !== "undefined") && NATIONS.find(n => n.n === nm); return x ? x.a : ""; }

/* ================= toernooisimulatie (groepsfase + knock-out) ================= */
const cmpTable = (x,y) => y.pts-x.pts || (y.gf-y.ga)-(x.gf-x.ga) || y.gf-x.gf || (Math.random()-0.5);
function blankRec(o){ o.w=0; o.d=0; o.l=0; o.gf=0; o.ga=0; o.pts=0; o.gp=0; return o; }
function logMatch(t,gf,ga){ t.gp++; t.gf+=gf; t.ga+=ga; if(gf>ga){t.w++; t.pts+=3;} else if(gf<ga){t.l++;} else {t.d++; t.pts++;} }
/* knock-out: een winst telt altijd als winst (ook na strafschoppen), nooit gelijk */
function logKO(t,gf,ga,won){ t.gp++; t.gf+=gf; t.ga+=ga; if(won){ t.w++; t.pts+=3; } else { t.l++; } }
function pickNations(n){
  return shuffle(NATIONS).slice(0,n).map(o => blankRec({ name:o.n, a:o.a, f:o.f, att:o.str, def:o.str, str:o.str, mine:false }));
}
/* volledige strafschoppenreeks: best-of-5 met sudden death; geeft de
   trapvolgorde terug (voor de animatie) plus de einduitslag. */
function simShootout(){
  const sc = () => Math.random() < 0.75;
  let h=0, a=0, hk=0, ak=0; const seq=[];
  const first = Math.random() < 0.5 ? "h" : "a";   // willekeurig wie begint, zoals echt
  const other = first === "h" ? "a" : "h";
  const left = k => Math.max(0, 5-k);
  const canEnd = () => {
    if(hk<=5 && ak<=5){ if(h > a+left(ak)) return true; if(a > h+left(hk)) return true; }
    if(hk===ak && hk>=5 && h!==a) return true;
    return false;
  };
  let guard=0;
  while(guard++ < 40){
    const t = (hk === ak) ? first : other;          // strikt afwisselen, beginnend bij 'first'
    const s = sc(); seq.push({ t, s });
    if(t === "h"){ if(s) h++; hk++; } else { if(s) a++; ak++; }
    if(canEnd()) break;
  }
  return { seq, h, a };
}
function knockoutMatch(h,a,mods,rig){
  let [gh,ga] = playMatch(h,a,mods);
  if(rig && h.mine && gh<=ga) gh = ga+1;
  if(rig && a.mine && ga<=gh) ga = gh+1;
  let pens=false, ph=0, pa=0, shoot=null;
  if(gh===ga){
    pens=true;
    let so = simShootout();
    if(rig && (h.mine || a.mine)){
      let tries=0;
      while(tries++ < 50 && ((h.mine && so.h<=so.a) || (a.mine && so.a<=so.h))) so = simShootout();
    }
    ph=so.h; pa=so.a; shoot=so.seq;
  }
  const hWins = pens ? ph>pa : gh>ga;
  return { gh,ga,pens,ph,pa,shoot, win:hWins?h:a };
}
function fixClass(x){
  if(x.mg > x.og) return "W";
  if(x.mg < x.og) return "V";
  return x.won === true ? "W" : (x.won === false ? "V" : "G");
}
function simulate(rig){
  phase = "season";
  if(rig) disarmRig();
  { const sp = $("shootout"); if(sp) sp.classList.remove("show"); }
  $("simbtn").classList.remove("show");
  phaseKey = "phase_season"; hintKey = "ready_hint"; hintArg = teamName;
  $("phaseline").textContent = t("phase_season") + (rig ? " · " + t("demo") : "");
  season = tt("world_cup");
  const r = ratings();
  const mods = styleMods();
  const me = blankRec({ name: teamName, a:"NED", f:"🇳🇱", att:r.att, def:r.def, mine:true });
  const field = shuffle([me, ...pickNations(31)]);
  const GL = "ABCDEFGH";
  const groups = [];
  for(let g=0; g<8; g++) groups.push(field.slice(g*4, g*4+4));

  const myMatches = [];
  let myGroup = null, myGroupLetter = "";
  const advancers = [];
  groups.forEach((grp, gi) => {
    for(let i=0;i<4;i++) for(let j=i+1;j<4;j++){
      const h=grp[i], a=grp[j];
      let [gh,ga] = playMatch(h,a,mods);
      if(rig && h.mine && gh<=ga) gh=ga+1;
      if(rig && a.mine && ga<=gh) ga=gh+1;
      logMatch(h,gh,ga); logMatch(a,ga,gh);
      if(h.mine) myMatches.push({ opp:a, round:tt("group")+" "+GL[gi], rkey:"group", mg:gh, og:ga });
      if(a.mine) myMatches.push({ opp:h, round:tt("group")+" "+GL[gi], rkey:"group", mg:ga, og:gh });
    }
    const std = grp.slice().sort(cmpTable);
    if(grp.indexOf(me) >= 0){
      myGroupLetter = GL[gi];
      // momentopname ná de groepsfase (de teamobjecten muteren nog in de knock-out)
      myGroup = std.map(tm => ({ name:tm.name, mine:!!tm.mine, a:tm.a, w:tm.w, d:tm.d, l:tm.l, gf:tm.gf, ga:tm.ga, pts:tm.pts }));
    }
    advancers.push([std[0], std[1]]);
  });

  const W = advancers.map(p=>p[0]), R = advancers.map(p=>p[1]);
  let round = [ W[0],R[1], W[2],R[3], W[4],R[5], W[6],R[7],
                W[1],R[0], W[3],R[2], W[5],R[4], W[7],R[6] ];
  const round16 = round.slice();
  const roundKeys = ["r16","qf","sf","final"];
  let stage = 0, myExit = -1;
  while(round.length > 1){
    const next = [];
    for(let k=0;k<round.length;k+=2){
      const h=round[k], a=round[k+1];
      const m = knockoutMatch(h,a,mods,rig);
      logKO(h, m.gh, m.ga, m.win === h); logKO(a, m.ga, m.gh, m.win === a);
      if(h.mine || a.mine){
        const opp = h.mine ? a : h, myIsH = !!h.mine;
        const shoot = m.shoot ? m.shoot.map(kk => ({ mine: (kk.t === "h") === myIsH, scored: kk.s })) : null;
        myMatches.push({ opp, round:tt(roundKeys[stage]), rkey:roundKeys[stage],
          mg: myIsH?m.gh:m.ga, og: myIsH?m.ga:m.gh,
          pens:m.pens, pmg:myIsH?m.ph:m.pa, pog:myIsH?m.pa:m.ph, won:m.win.mine, shoot });
        if(!m.win.mine) myExit = stage;
      }
      next.push(m.win);
    }
    round = next; stage++;
  }
  const champion = round[0];

  let result;
  if(round16.indexOf(me) < 0)  result = { stage:"group", placement:17 };
  else if(champion.mine)       result = { stage:"champ", placement:1 };
  else { const M=[["r16",16],["qf",8],["sf",3],["final",2]]; result = { stage:M[myExit][0], placement:M[myExit][1] }; }
  result.champion = champion;
  result.unbeaten = (me.l === 0);
  result.allWon = (me.d === 0 && me.l === 0);
  result.reachedKO = result.placement <= 16;
  result.groupWon = !!(myGroup && myGroup[0].mine);
  result.penLoss = myMatches.some(m => m.pens && m.won === false);
  result.penFinalWin = champion.mine && myMatches.some(m => m.rkey === "final" && m.pens && m.won);

  const data = { me, result, myGroup, myGroupLetter, myMatches, champion, rig };
  if(!rig){ lastTourney = data; lastMe = me; lastPos = result.placement; lastOrder = myMatches; lastTeams = myGroup; }

  $("season").classList.add("show");
  $("finale").classList.remove("show");
  $("seasonteam").textContent = teamName;
  $("seasonyear").textContent = "🏆";
  $("tableyear").textContent = tt("th_group") + " " + myGroupLetter;
  $("seasonsub").textContent = tt("sub", myGroupLetter, 32) + (rig ? t("demo_tag") : "");
  const grid = $("fixgrid");
  grid.innerHTML = "";
  $("season").scrollIntoView({ behavior: "smooth", block: "start" });

  let i = 0;
  clearInterval(revealTimer); clearTimeout(revealTimer);
  function revealNext(){
    if(i >= myMatches.length){ renderTournamentFinale(data, true); return; }
    const x = myMatches[i];
    const isKO = x.rkey && x.rkey !== "group";
    const div = document.createElement("div");
    div.className = "fix pending" + (isKO ? " ko" : "");
    div.innerHTML = '<div class="fr">'+x.round+'</div>'
      + '<div class="fo">'+natLabel(x.opp)+'</div>'
      + '<div class="sc"><span class="q">?</span><span class="dash">\u2013</span><span class="q">?</span></div>';
    grid.appendChild(div);
    requestAnimationFrame(() => div.classList.add("in"));
    div.scrollIntoView({ behavior:"smooth", block:"nearest" });
    sfx.tick(isKO ? 6 : 2);
    // spanning opbouwen, dan de uitslag onthullen (knock-out duurt langer)
    const suspense = isKO ? 1000 : 650;
    revealTimer = setTimeout(() => {
      div.classList.remove("pending");
      div.querySelector(".sc").innerHTML = x.mg + "\u2013" + x.og;
      if(x.pens && x.shoot && x.shoot.length){
        // gelijkspel \u2014 daarna de strafschoppenreeks heel langzaam afspelen
        sfx.tick(4);
        playShootout(x, () => {
          div.classList.add(fixClass(x), "revealed");
          div.querySelector(".sc").innerHTML = x.mg + "\u2013" + x.og + ' <small>('+x.pmg+"\u2013"+x.pog+" "+tt("pens")+')</small>';
          i++;
          revealTimer = setTimeout(revealNext, 700);
        });
        return;
      }
      div.classList.add(fixClass(x), "revealed");
      const won = x.mg > x.og || x.won === true;
      const draw = x.mg === x.og && x.won == null;
      if(won){ sfx.land(); if(isKO){ tone(660,0.12,"triangle",0.16,0); tone(880,0.18,"triangle",0.16,0.12); } }
      else if(draw){ sfx.tick(3); }
      else { tone(160,0.55,"sine",0.2,0); tone(120,0.5,"sine",0.16,0.06); }
      i++;
      revealTimer = setTimeout(revealNext, 560);
    }, suspense);
  }
  revealNext();
}
/* strafschoppenreeks: trap voor trap, heel langzaam, met spanning */
function ensureShootoutPanel(){
  let p = $("shootout");
  if(!p){ p = document.createElement("div"); p.id = "shootout"; p.className = "shootout"; document.body.appendChild(p); }
  return p;
}
function playShootout(m, done){
  const panel = ensureShootoutPanel();
  const oppNm = m.opp.name || m.opp.n || "";
  panel.innerHTML = '<div class="so-card">'
    + '<p class="eyebrow so-h">' + tt("pens_full") + '</p>'
    + '<div class="so-row" id="so-me"><span class="so-team">' + flagHTML("NED") + esc(teamName) + '</span><span class="so-marks"></span><span class="so-tally">0</span></div>'
    + '<div class="so-row" id="so-op"><span class="so-team">' + natLabel(m.opp) + '</span><span class="so-marks"></span><span class="so-tally">0</span></div>'
    + '<p class="so-result" id="so-res">&nbsp;</p>'
    + '</div>';
  panel.classList.add("show");
  let my = 0, op = 0, idx = 0;
  function step(){
    if(idx >= m.shoot.length){ finish(); return; }
    const k = m.shoot[idx];
    const row = k.mine ? $("so-me") : $("so-op");
    const marks = row.querySelector(".so-marks");
    const mark = document.createElement("span");
    mark.className = "so-mark pending"; mark.textContent = "•";
    marks.appendChild(mark);
    row.classList.add("kicking");
    sfx.tick(3);
    revealTimer = setTimeout(() => {
      row.classList.remove("kicking");
      mark.classList.remove("pending");
      mark.classList.add(k.scored ? "goal" : "miss");
      mark.textContent = k.scored ? "⚽" : "✕";
      if(k.scored){
        if(k.mine){ my++; $("so-me").querySelector(".so-tally").textContent = my; }
        else { op++; $("so-op").querySelector(".so-tally").textContent = op; }
        sfx.land();
      } else { tone(150, 0.45, "sine", 0.18, 0); }
      idx++;
      revealTimer = setTimeout(step, 640);
    }, 820);
  }
  function finish(){
    const won = my > op;
    const res = $("so-res");
    res.textContent = (won ? teamName : oppNm) + " " + tt("so_wins") + " " + my + "–" + op;
    res.className = "so-result " + (won ? "W" : "V");
    if(won) sfx.fanfare(); else tone(140, 0.7, "sine", 0.2, 0);
    revealTimer = setTimeout(() => { panel.classList.remove("show"); done(); }, 2000);
  }
  step();
}
function stageLabel(stage){ return tt("stg_"+stage); }
function tourneyVerdict(result){
  if(result.stage === "champ") return result.unbeaten ? tt("v_champ_unbeaten", teamName) : tt("v_champ", teamName);
  return tt(result.stage === "final" ? "v_runner" : "v_"+result.stage);
}
function renderTournamentFinale(data, animate){
  const { me, result, myGroup, myGroupLetter, champion, rig } = data;
  phase = "done";
  setPhaseLine("phase_done");
  $("seasonsub").textContent = tt("world_champ") + ": " + (champion.mine ? teamName : champion.name);
  const stat = (lbl,val,acc) => '<div class="stat'+(acc?" accent":"")+'"><div class="l">'+lbl+'</div><div class="v">'+val+'</div></div>';
  $("statgrid").innerHTML =
      stat(tt("st_round"), stageLabel(result.stage), true)
    + stat(tt("st_won"), me.w) + stat(tt("st_draw"), me.d) + stat(tt("st_lost"), me.l)
    + stat(tt("st_gf"), me.gf) + stat(tt("st_ga"), me.ga);

  const tbl = $("standings");
  tbl.innerHTML = "<tr><th class='l' colspan='2'>"+tt("th_group")+" "+myGroupLetter+"</th><th>"+t("th_w")+"</th><th>"+t("th_d")+"</th><th>"+t("th_l")+"</th><th>"+t("th_gd")+"</th><th>"+t("th_pts")+"</th></tr>";
  myGroup.forEach((tm, idx) => {
    const tr = document.createElement("tr");
    tr.className = (tm.mine ? "mine " : "") + (idx < 2 ? "cl" : "") + (animate ? "" : " in");
    const ds = tm.gf - tm.ga;
    tr.innerHTML = "<td class='rank'>"+(idx+1)+"</td><td class='l'>"+flagHTML(tm.mine?"NED":tm.a)+esc(tm.mine?teamName:tm.name)+"</td>"
      + "<td>"+tm.w+"</td><td>"+tm.d+"</td><td>"+tm.l+"</td>"
      + "<td>"+(ds>0?"+":"")+ds+"</td><td><strong>"+tm.pts+"</strong></td>";
    tbl.appendChild(tr);
  });
  if(animate){
    let ri=0; const trs=tbl.querySelectorAll("tr");
    clearInterval(tableTimer);
    tableTimer = setInterval(()=>{ if(ri>=trs.length){ clearInterval(tableTimer); return; } trs[ri].classList.add("in"); ri++; }, 80);
  }
  renderKoPath(data);

  const champ = (result.stage === "champ");
  let msg = tourneyVerdict(result);
  if(rig) msg += t("demo_note");
  $("recordtxt").textContent = me.w + "\u2013" + me.d + "\u2013" + me.l;
  $("verdicttxt").textContent = msg;
  $("verdict").classList.toggle("perfect", champ);
  $("finale").classList.add("show");

  $("sharecard").style.display = rig ? "none" : "";
  if(!rig && animate){
    if(sandbox){
      $("verdicttxt").textContent += t("sandbox_demo");
    } else {
      const nieuweBadges = updateRecords(me, result);
      pushHistory(me, result.placement);
      if(nieuweBadges.length) $("verdicttxt").textContent += t("new_badge") + nieuweBadges.join(" \u00B7 ");
    }
    drawShareCard();
  }
  if(animate && champ){
    sfx.fanfare();
    confetti(["#F5C518","#FFE584","#FFFFFF","#EE7203"], 240);
  }
}
function renderKoPath(data){
  const el = $("kopath"); if(!el) return;
  const ko = (data.myMatches || []).filter(m => m.rkey && m.rkey !== "group");
  if(!ko.length){ el.innerHTML = ""; return; }
  el.innerHTML = '<p class="eyebrow kopath-h">' + tt("ko_path") + '</p>' + ko.map(m => {
    const res = m.won ? "W" : "V";
    const pens = m.pens ? ' <span class="pens">(' + m.pmg + "–" + m.pog + " " + tt("pens") + ')</span>' : "";
    return '<div class="korow ' + res + '"><span class="kr">' + m.round + '</span>'
      + '<span class="ko">' + natLabel(m.opp) + '</span>'
      + '<span class="ks">' + m.mg + "–" + m.og + pens + '</span></div>';
  }).join("");
}
function verdictMessage(me, myPos){
  if(isPerfect(me))      return t("v_perfect");
  if(myPos === 1)      return t("v_champion", teamName);
  if(myPos <= 3)       return t("v_cl", myPos);
  if(myPos <= 7)       return t("v_eur", myPos);
  if(myPos <= 12)      return t("v_mid", myPos);
  if(myPos <= 15)      return t("v_low", myPos);
  return t("v_releg", myPos);
}
function relocalizeFinale(){
  if(!lastTourney || !$("finale").classList.contains("show")) return;
  renderTournamentFinale(lastTourney, false);
}
function showFinale(teams, me, myPos, rig){
  phase = "done";
  setPhaseLine("phase_done");
  const stat = (lbl, val, accent) => '<div class="stat'+(accent ? " accent" : "")+'"><div class="l">'+lbl+'</div><div class="v">'+val+'</div></div>';
  const saldo = me.gf - me.ga;
  $("statgrid").innerHTML = stat(t("st_pos"), ord(myPos), true) + stat(t("st_won"), me.w) + stat(t("st_draw"), me.d)
    + stat(t("st_lost"), me.l) + stat(t("st_gd"), (saldo > 0 ? "+" : "") + saldo) + stat(t("st_pts"), me.pts, true);

  const tbl = $("standings");
  tbl.innerHTML = "<tr><th class='l' colspan='2'>" + t("th_club") + "</th><th>" + t("th_w") + "</th><th>" + t("th_d") + "</th><th>" + t("th_l") + "</th><th>" + t("th_gd") + "</th><th>" + t("th_pts") + "</th></tr>";
  teams.forEach((t, idx) => {
    const tr = document.createElement("tr");
    tr.className = (t.mine ? "mine " : "") + (idx < 3 ? "cl" : (idx >= 15 ? "deg" : ""));
    const ds = t.gf - t.ga;
    tr.innerHTML = "<td class='rank'>" + (idx+1) + "</td><td class='l'>" + esc(t.name) + "</td>"
      + "<td>" + t.w + "</td><td>" + t.d + "</td><td>" + t.l + "</td>"
      + "<td>" + (ds > 0 ? "+" : "") + ds + "</td><td><strong>" + t.pts + "</strong></td>";
    tbl.appendChild(tr);
  });
  let ri = 0;
  const trs = tbl.querySelectorAll("tr");
  clearInterval(tableTimer);
  tableTimer = setInterval(() => {
    if(ri >= trs.length){ clearInterval(tableTimer); return; }
    trs[ri].classList.add("in");
    ri++;
  }, 60);

  const perfect = (isPerfect(me));
  let msg = verdictMessage(me, myPos);
  if(rig) msg += t("demo_note");

  $("recordtxt").textContent = me.w + "\u2013" + me.d + "\u2013" + me.l;
  $("verdicttxt").textContent = msg;
  $("verdict").classList.toggle("perfect", perfect);
  $("finale").classList.add("show");

  $("sharecard").style.display = rig ? "none" : "";
  if(!rig){
    lastMe = me; lastPos = myPos;
    if(sandbox){
      $("verdicttxt").textContent += t("sandbox_demo");
    } else {
      const nieuweBadges = updateRecords(me, myPos);
      pushHistory(me, myPos);
      if(nieuweBadges.length) $("verdicttxt").textContent += t("new_badge") + nieuweBadges.join(" · ");
    }
    drawShareCard();
  }
  if(perfect){
    sfx.perfect();
    confetti(["#F5C518","#FFE584","#FFFFFF","#E40428"], 280);
  } else if(myPos === 1){
    sfx.fanfare();
    confetti(["#E40428","#FFFFFF","#F5C518"], 160);
  }
}

/* ================= geluid (WebAudio, geen bestanden) ================= */
let AC = null;
let muted = false;
try { muted = localStorage.getItem(SK+"muted") === "1"; } catch(e){}
function audio(){
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if(!Ctx) return null;
  if(!AC) AC = new Ctx();
  if(AC.state === "suspended") AC.resume();
  return AC;
}
function tone(freq, dur, type, vol, delay){
  if(muted) return;
  const a = audio(); if(!a) return;
  const t = a.currentTime + (delay || 0);
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g); g.connect(a.destination);
  o.start(t); o.stop(t + dur + .03);
}
const sfx = {
  tick: n => tone(n % 2 ? 740 : 620, .045, "square", .035),
  land(){ tone(220, .22, "triangle", .12); tone(440, .3, "triangle", .09, .06); },
  place(){ tone(523, .1, "sine", .12); tone(784, .16, "sine", .1, .06); },
  fanfare(){ [523, 659, 784, 1047].forEach((f, i) => tone(f, .3, "triangle", .11, i * .14)); },
  perfect(){
    [392, 523, 659, 784, 1047, 1319].forEach((f, i) => {
      tone(f, .34, "triangle", .12, i * .12);
      tone(f * 2, .3, "sine", .05, i * .12);
    });
  }
};
function setMuteIcon(){
  $("mutebtn").textContent = muted ? "\u{1F507}" : "\u{1F50A}";
  $("mutebtn").title = muted ? t("sound_on") : t("sound_off");
}

/* ================= confetti ================= */
function confetti(colors, count){
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = document.createElement("canvas");
  cv.className = "confetti";
  document.body.appendChild(cv);
  cv.width = innerWidth; cv.height = innerHeight;
  const ctx = cv.getContext("2d");
  const P = [];
  for(let i = 0; i < count; i++){
    P.push({
      x: Math.random() * cv.width,
      y: -20 - Math.random() * cv.height * .6,
      vx: -1.2 + Math.random() * 2.4,
      vy: 2 + Math.random() * 3.2,
      w: 5 + Math.random() * 6,
      h: 8 + Math.random() * 9,
      rot: Math.random() * Math.PI,
      vr: -.12 + Math.random() * .24,
      c: rnd(colors)
    });
  }
  function step(){
    ctx.clearRect(0, 0, cv.width, cv.height);
    let alive = false;
    P.forEach(p => {
      p.x += p.vx + Math.sin(p.y * .02);
      p.y += p.vy;
      p.rot += p.vr;
      if(p.y < cv.height + 30) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if(alive) requestAnimationFrame(step);
    else cv.remove();
  }
  requestAnimationFrame(step);
}

/* ================= records (localStorage) ================= */
const RKEY = SK+"records";
const ACHIEVEMENTS = ["wereldkampioen","alles_gewonnen","penaltyheld","ongeslagen","zilver","penaltydrama","groepswinst","kasteel","doelfeest","totaalvoetbal","klasse88","jongegarde","tijdreiziger","ineenkeer"];
let lastOrder = null, lastMe = null, lastPos = 0, lastTeams = null, lastTourney = null;
function loadRecords(){
  try { return JSON.parse(localStorage.getItem(RKEY)); } catch(e){ return null; }
}
function updateRecords(me, result){
  const champ = result.stage === "champ";
  const r = loadRecords() || { seasons:0, titles:0, perfects:0, bestPts:-1, bestRec:"", bestTeam:"", bestSeason:"", bestPos:99 };
  r.seasons++;
  if(champ) r.titles++;
  if(champ && result.unbeaten) r.perfects++;
  if(me.pts > r.bestPts){
    r.bestPts = me.pts;
    r.bestRec = me.w + "–" + me.d + "–" + me.l;
    r.bestTeam = teamName;
    r.bestSeason = stageLabel(result.stage);
  }
  if(result.placement < r.bestPos) r.bestPos = result.placement;

  // badges
  if(!r.ach) r.ach = {};
  const nieuw = [];
  const grant = id => {
    if(r.ach[id]) return;
    r.ach[id] = true;
    nieuw.push(achName(id));
  };
  const xi = picks.filter(Boolean);
  const perClub = {};
  xi.forEach(p => { perClub[p.clubN] = (perClub[p.clubN] || 0) + 1; });
  if(champ) grant("wereldkampioen");
  if(champ && result.allWon) grant("alles_gewonnen");
  if(result.penFinalWin) grant("penaltyheld");
  if(champ && result.unbeaten) grant("ongeslagen");
  if(result.stage === "final") grant("zilver");
  if(result.penLoss && !champ) grant("penaltydrama");
  if(result.groupWon) grant("groepswinst");
  if(result.reachedKO && me.ga <= 1) grant("kasteel");
  if(me.gf >= 12) grant("doelfeest");
  if(((perClub["WK 1974"] || 0) + (perClub["WK 1978"] || 0)) >= 3) grant("totaalvoetbal");
  if((perClub["EK 1988"] || 0) >= 4) grant("klasse88");
  if((perClub["WK 2026"] || 0) >= 4) grant("jongegarde");
  if(new Set(xi.map(p => p.clubN)).size === 11) grant("tijdreiziger");
  if(rerolls === MAX_REROLLS) grant("ineenkeer");

  try { localStorage.setItem(RKEY, JSON.stringify(r)); } catch(e){}
  renderRecords();
  return nieuw;
}
function renderRecords(){
  const r = loadRecords();
  const panel = $("recordspanel");
  if(!r || !r.seasons){ panel.style.display = "none"; return; }
  panel.style.display = "block";
  const row = (l, v, gold) => '<div class="recrow'+(gold ? " gold" : "")+'"><span>'+l+'</span><span class="v">'+v+'</span></div>';
  $("recrows").innerHTML =
      row(t("rec_seasons"), r.seasons)
    + row(t("rec_titles"), r.titles)
    + row(t("rec_perfect"), r.perfects, r.perfects > 0)
    + (r.bestRec ? row(t("rec_best"), r.bestRec + " (" + r.bestSeason + ")") : "")
    + (r.bestPos < 99 ? row(t("rec_finish"), ord(r.bestPos)) : "");
  const ach = r.ach || {};
  $("achgrid").innerHTML = ACHIEVEMENTS.map(id =>
    "<span class='badge" + (ach[id] ? " earned" : "") + "' title=\"" + achDesc(id) + "\">" + achName(id) + "</span>"
  ).join("");
}

/* ================= teamgeschiedenis (localStorage) ================= */
const HKEY = SK+"history";
function loadHistory(){
  try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch(e){ return []; }
}
function pushHistory(me, myPos){
  const h = loadHistory();
  h.unshift({
    team: teamName, season, formation, stijl,
    pos: myPos, rec: me.w + "–" + me.d + "–" + me.l, pts: me.pts,
    rating: Math.round(ratings().tot * 10) / 10,
    xi: picks.map((p, i) => ({ slot: curForm()[i][0], name: p.name, clubA: p.clubA, season: p.season, rating: p.rating }))
  });
  if(h.length > 10) h.length = 10;
  try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch(e){}
}
function renderHistory(){
  const h = loadHistory();
  const grid = $("histgrid");
  grid.innerHTML = h.length ? "" : "<p class='eyebrow'>" + t("no_history") + "</p>";
  h.forEach(tm => {
    const card = document.createElement("div");
    card.className = "dbclub";
    card.innerHTML = "<div class='dbclubhead'><div class='dbclubinfo'><div class='dbname'>" + esc(tm.team) + " · " + tm.season + "</div>"
      + "<div class='dbmeta'>" + t("hist_meta", tm) + "</div></div></div>"
      + tm.xi.map(p => "<div class='dbrow'><span class='p'>" + p.slot + "</span><span class='n'>" + esc(p.name) + "</span><span class='c'>" + clubTag(p.clubA, p.season) + "</span><span class='r'>" + p.rating + "</span></div>").join("");
    grid.appendChild(card);
  });
}

/* ================= seizoen delen ================= */
function shareSeason(){
  if(!lastMe || !lastOrder) return;
  const sq = lastOrder.map(x => x.mg > x.og ? "\u{1F7E9}" : (x.mg < x.og ? "\u{1F7E5}" : "\u{1F7E8}"));
  const rows = [];
  for(let i = 0; i < sq.length; i += 17) rows.push(sq.slice(i, i + 17).join(""));
  const txt = BRAND + " · " + teamName + " (" + season + ")\n"
    + t("share_line2", lastPos, lastMe) + "\n"
    + rows.join("\n");
  const done = () => {
    $("sharebtn").textContent = t("copied");
    setTimeout(() => { $("sharebtn").textContent = t("share"); }, 1600);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done));
  } else fallbackCopy(txt, done);
}
function fallbackCopy(txt, done){
  const ta = document.createElement("textarea");
  ta.value = txt;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch(e){}
  ta.remove();
}

/* ---- visuele seizoenskaart (canvas) ---- */
function drawShareCard(){
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(_drawShareCard);
  else _drawShareCard();
}
function clipText(ctx, text, maxW){
  let s = String(text);
  if(ctx.measureText(s).width <= maxW) return s;
  while(s.length > 1 && ctx.measureText(s + "…").width > maxW) s = s.slice(0, -1);
  return s + "…";
}
function _drawShareCard(){
  const cv = $("sharecanvas");
  if(!cv || !lastMe || !lastOrder) return;
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height, me = lastMe, pos = lastPos;
  const NAVY = CFG.cardNavy || "#0A1430", NAVY2 = CFG.cardNavy2 || "#101D42", RED = CFG.cardAccent || "#E40428", MUT = CFG.cardMuted || "#93A0C4", WHITE = "#FFFFFF", PAD = 80;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = RED;  ctx.fillRect(0, 0, W, 26);
  ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
  // logo-tab
  ctx.font = "italic 600 60px Oswald, sans-serif";
  const lg = BRAND, lw = ctx.measureText(lg).width;
  ctx.fillStyle = RED; ctx.fillRect(PAD - 16, 92, lw + 40, 74);
  ctx.fillStyle = WHITE; ctx.fillText(lg, PAD, 148);
  ctx.font = "500 25px 'IBM Plex Mono', monospace"; ctx.fillStyle = MUT;
  ctx.fillText(t("card_sub"), PAD, 206);
  // teamnaam (schaalt mee)
  let size = 96; ctx.fillStyle = WHITE;
  const name = (teamName || "MIJN XI").toUpperCase();
  do { ctx.font = "600 " + size + "px Oswald, sans-serif"; size -= 4; } while(ctx.measureText(name).width > W - 2 * PAD && size > 40);
  ctx.fillText(name, PAD, 312);
  ctx.font = "500 28px 'IBM Plex Mono', monospace"; ctx.fillStyle = MUT;
  ctx.fillText(t("card_season") + " " + season + " · " + ord(pos).toUpperCase() + " " + t("card_place"), PAD, 360);
  // groot record
  ctx.font = "italic 600 170px Oswald, sans-serif"; ctx.fillStyle = WHITE;
  ctx.fillText(me.w + "–" + me.d + "–" + me.l, PAD - 4, 532);
  ctx.font = "600 40px Oswald, sans-serif"; ctx.fillStyle = RED;
  ctx.fillText(me.pts + " " + t("card_points"), PAD, 590);
  // resultatengrid
  const cols = 17, gap = 9, gx = PAD, gy = 636, gw = W - 2 * PAD;
  const cell = (gw - (cols - 1) * gap) / cols;
  lastOrder.forEach((x, idx) => {
    const r = Math.floor(idx / cols), c = idx % cols;
    ctx.fillStyle = x.mg > x.og ? "#27AE60" : (x.mg < x.og ? RED : "#7E8BB0");
    ctx.fillRect(gx + c * (cell + gap), gy + r * (cell + gap), cell, cell);
  });
  let y = gy + 2 * cell + gap + 44;
  ctx.font = "500 22px 'IBM Plex Mono', monospace"; ctx.fillStyle = MUT;
  ctx.fillText(t("card_legend"), PAD, y);
  // squad (XI)
  y += 52;
  ctx.font = "600 26px Oswald, sans-serif"; ctx.fillStyle = WHITE;
  ctx.fillText(t("card_squad"), PAD, y);
  ctx.strokeStyle = RED; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(PAD, y + 12); ctx.lineTo(W - PAD, y + 12); ctx.stroke();
  const F = curForm(), lineH = 50, colW = (W - 2 * PAD - 30) / 2, topY = y + 56;
  for(let i = 0; i < 11; i++){
    const pk = picks[i]; if(!pk) continue;
    const col = i < 6 ? 0 : 1, row = i < 6 ? i : i - 6;
    const x = PAD + col * (colW + 30), ly = topY + row * lineH;
    ctx.fillStyle = NAVY2; ctx.fillRect(x, ly - 32, colW, 42);
    ctx.fillStyle = MUT; ctx.font = "600 20px 'IBM Plex Mono', monospace";
    ctx.fillText((F[i] ? F[i][0] : pk.pos).padEnd(3), x + 10, ly);
    // rating (rechts, opvallend)
    const rt = String(pk.rating);
    ctx.textAlign = "right"; ctx.font = "700 23px 'IBM Plex Mono', monospace"; ctx.fillStyle = WHITE;
    ctx.fillText(rt, x + colW - 10, ly);
    const rtW = ctx.measureText(rt).width;
    // club (links van de rating)
    const club = clubTag(pk.clubA, pk.season);
    ctx.font = "500 18px 'IBM Plex Mono', monospace"; ctx.fillStyle = MUT;
    const clubX = x + colW - 10 - rtW - 14;
    ctx.fillText(club, clubX, ly);
    const clubW = ctx.measureText(club).width;
    // naam (links, geclipt)
    ctx.textAlign = "left"; ctx.fillStyle = WHITE; ctx.font = "600 24px Inter, sans-serif";
    const nameMax = (clubX - clubW) - (x + 62) - 12;
    ctx.fillText(clipText(ctx, pk.name, Math.max(40, nameMax)), x + 62, ly);
  }
  // footer
  ctx.textAlign = "left"; ctx.fillStyle = MUT; ctx.font = "500 22px 'IBM Plex Mono', monospace";
  ctx.fillText(BRAND + " · " + formation + " · " + styleLabel(stijl).toUpperCase() + (hardcore ? " · " + modeLabel("Hardcore").toUpperCase() : ""), PAD, H - 54);
}
function wrapText(ctx, text, x, y, maxW, lh){
  const words = String(text).split(" "); let line = "", yy = y;
  for(const w of words){
    if(ctx.measureText(line + w + " ").width > maxW && line){ ctx.fillText(line.trim(), x, yy); line = ""; yy += lh; if(yy > y + lh * 3) return; }
    line += w + " ";
  }
  ctx.fillText(line.trim(), x, yy);
}
function shareImage(){
  const cv = $("sharecanvas");
  cv.toBlob(blob => {
    if(!blob) return;
    const file = new File([blob], "34-0-0-" + season + ".png", { type: "image/png" });
    if(navigator.canShare && navigator.canShare({ files: [file] })){
      navigator.share({ files: [file], title: BRAND, text: teamName + " · " + season }).catch(() => {});
    } else savePng();
  }, "image/png");
}
function savePng(){
  const cv = $("sharecanvas");
  cv.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "34-0-0-" + (teamName || "team").replace(/[^a-z0-9]+/gi, "-") + "-" + season + ".png";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    const b = $("savepngbtn"); b.textContent = t("saved_png"); setTimeout(() => { b.textContent = t("save_png"); }, 1600);
  }, "image/png");
}

/* ---- deelbare link (XI in de URL) ---- */
function b64e(s){ return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function b64d(s){ s = s.replace(/-/g, "+").replace(/_/g, "/"); return decodeURIComponent(escape(atob(s))); }
function stagePlacement(stage){ return ({champ:1, final:2, sf:3, qf:8, r16:16, group:17})[stage] || 17; }
function teamCode(){
  if(!lastTourney) return "";
  const T = lastTourney, me = T.me;
  const data = {
    tn: teamName, f: formation, st: stijl, hc: hardcore ? 1 : 0,
    stg: T.result.stage, gl: T.myGroupLetter, ch: T.champion.mine ? null : T.champion.name,
    me: [me.w, me.d, me.l, me.gf, me.ga, me.pts],
    ord: T.myMatches.map(x => [x.opp.a, x.mg, x.og, x.round, x.pens ? 1 : 0, x.pmg || 0, x.pog || 0, x.won ? 1 : 0, x.rkey || "group"]),
    grp: T.myGroup.map(tm => [tm.mine ? null : tm.name, tm.w, tm.d, tm.l, tm.gf, tm.ga, tm.pts]),
    p: picks.map(pk => pk ? [pk.pos, pk.name, pk.rating, pk.clubN, pk.clubA, pk.season] : 0)
  };
  return b64e(JSON.stringify(data));
}
function shareLink(){
  const code = teamCode();
  if(!code) return;
  const url = location.origin + location.pathname + "#t=" + code;
  const done = () => { const b = $("linkbtn"); if(b){ b.textContent = t("copied"); setTimeout(() => { b.textContent = t("share_link"); }, 1600); } };
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => fallbackCopy(url, done));
  else fallbackCopy(url, done);
}
function loadSharedTeam(code){
  let d; try { d = JSON.parse(b64d(code)); } catch(e){ return false; }
  if(!d || !Array.isArray(d.p) || !Array.isArray(d.grp) || !d.me) return false;
  teamName = d.tn || t("teamname_ph"); $("teamname").value = teamName;
  if(FORMATIONS_BASE[d.f]) formation = d.f;
  if(STIJLEN.includes(d.st)) stijl = d.st;
  hardcore = !!d.hc;
  season = tt("world_cup");
  picks = d.p.map(a => a ? { pos: a[0], name: a[1], rating: a[2], clubN: a[3], clubA: a[4], season: a[5] } : null);
  pickedCount = picks.filter(Boolean).length;
  picked = new Set(); pickedNames = new Set();
  picks.forEach(pk => { if(pk) pickedNames.add(normName(pk.name)); });
  const me = { name: teamName, mine: true, a: "NED", w: d.me[0], d: d.me[1], l: d.me[2], gf: d.me[3], ga: d.me[4], pts: d.me[5] };
  const myGroup = d.grp.map(a => a[0] === null ? me : { name: a[0], mine: false, a: codeByName(a[0]), w: a[1], d: a[2], l: a[3], gf: a[4], ga: a[5], pts: a[6] });
  const myMatches = d.ord.map(a => ({ opp: natInfo(a[0]), mg: a[1], og: a[2], round: a[3], pens: !!a[4], pmg: a[5], pog: a[6], won: !!a[7], rkey: a[8] || "group" }));
  const champion = d.ch === null ? me : { name: d.ch, mine: false };
  const result = { stage: d.stg, placement: stagePlacement(d.stg), unbeaten: (me.l === 0), champion, groupWon: !!(myGroup[0] && myGroup[0].mine) };
  lastTourney = { me, result, myGroup, myGroupLetter: d.gl, myMatches, champion, rig: false };
  lastMe = me; lastPos = result.placement; lastOrder = myMatches; lastTeams = myGroup;
  refreshSetup();
  picks.forEach((pk, i) => { if(pk) fillSlot(i, pk); });
  drawBoxScore();
  showTeamStats();
  renderSharedSeason();
  return true;
}
function renderSharedSeason(){
  phase = "done";
  setLocked(true);
  $("resetbtn").style.display = "block";
  $("rollbtn").disabled = true; $("rollbtn").innerHTML = t("squad_complete");
  $("simbtn").classList.remove("show");
  setPhaseLine("phase_done");
  $("season").classList.add("show");
  $("seasonteam").textContent = teamName;
  $("seasonyear").textContent = "🏆";
  $("tableyear").textContent = tt("th_group") + " " + lastTourney.myGroupLetter;
  const grid = $("fixgrid"); grid.innerHTML = "";
  lastOrder.forEach((x) => {
    const div = document.createElement("div");
    div.className = "fix " + fixClass(x) + " in";
    const sc = x.mg + "–" + x.og + (x.pens ? ' <small>('+x.pmg+"–"+x.pog+" "+tt("pens")+')</small>' : "");
    div.innerHTML = '<div class="fr">'+x.round+'</div><div class="fo">'+natLabel(x.opp)+'</div><div class="sc">'+sc+'</div>';
    grid.appendChild(div);
  });
  $("finale").classList.add("show");
  renderTournamentFinale(lastTourney, false);
  $("sharecard").style.display = "";
  drawShareCard();
  $("season").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ================= reset & events ================= */
function resetAll(){
  clearInterval(spinTimer); clearInterval(revealTimer); clearInterval(tableTimer);
  phase = "setup";
  picks = Array(11).fill(null); pickedCount = 0; picked = new Set(); pickedNames = new Set();
  rerolls = MAX_REROLLS;
  pendingPick = null; clearPlacement();
  setLocked(false);
  $("overlay").classList.remove("show");
  $("season").classList.remove("show");
  $("finale").classList.remove("show");
  $("teamstats").classList.remove("show");
  $("simbtn").classList.remove("show");
  $("resetbtn").style.display = "none";
  disarmRig();
  $("rollbtn").disabled = false;
  refreshSetup();
  setPhaseUI();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$("rollbtn").onclick = roll;
$("rerollbtn").onclick = reroll;
$("pbback").onclick = backToSquad;
$("resetbtn").onclick = resetAll;
$("simbtn").onclick = () => { if(pickedCount === 11) simulate(rigArmed); };
if($("againbtn")) $("againbtn").onclick = resetAll;

/* geheime demo-trigger: 5x snel op het 34-0-0-logo klikken wapent een
   gegarandeerd perfect seizoen (telt niet mee voor records) */
const logoEl = document.querySelector(".logo");
let logoClicks = 0, logoTimer = null;
function disarmRig(){ rigArmed = false; logoEl.classList.remove("gold"); }
logoEl.onclick = () => {
  logoClicks++;
  clearTimeout(logoTimer);
  logoTimer = setTimeout(() => { logoClicks = 0; }, 1600);
  if(logoClicks >= 5){
    logoClicks = 0;
    rigArmed = !rigArmed;
    logoEl.classList.toggle("gold", rigArmed);
    if(rigArmed) tone(1047, .15, "triangle", .1);
  }
};
$("sharebtn").onclick = shareSeason;
$("shareimgbtn").onclick = shareImage;
$("savepngbtn").onclick = savePng;
$("linkbtn").onclick = shareLink;
$("sandcheck").onchange = () => { sandbox = $("sandcheck").checked; try { localStorage.setItem(SK+"sandbox", sandbox ? "1" : "0"); } catch(e){} };
$("overlay").onclick = e => { if(e.target === $("overlay") && sandbox && !pendingPick) $("overlay").classList.remove("show"); };
$("langbtn").onclick = () => {
  LANG = LANG === "nl" ? "en" : "nl";
  try { localStorage.setItem(SK+"lang", LANG); } catch(e){}
  applyLang();
};
$("mutebtn").onclick = () => {
  muted = !muted;
  try { localStorage.setItem(SK+"muted", muted ? "1" : "0"); } catch(e){}
  setMuteIcon();
  if(!muted) tone(660, .09, "sine", .1);
};

/* ================= databaseviewer ================= */
const MIN_SQUAD = 11; // genoeg echte spelers voor een basiself = compleet
const POSORDER = ["GK","RB","CB","LB","DM","CM","AM","LW","RW","ST"];
const isJeugd = pl => String(pl[0]).indexOf("Jeugdspeler") === 0;
function clubCardHTML(c, seasonLabel){
  const real = c.p.filter(pl => !isJeugd(pl));
  const ok = real.length >= MIN_SQUAD;
  const rows = real.slice()
    .sort((a, b) => POSORDER.indexOf(a[1]) - POSORDER.indexOf(b[1]) || b[2] - a[2])
    .map(pl => "<div class='dbrow'><span class='p'>" + pl[1] + "</span><span class='n'>" + esc(pl[0]) + "</span><span class='r'>" + pl[2] + "</span></div>")
    .join("");
  const html = "<div class='dbclub" + (ok ? " done" : "") + "'><div class='dbclubhead'>" + shirtSVG(c.a, 34)
    + "<div class='dbclubinfo'><div class='dbname'>" + esc(c.n) + (seasonLabel ? " <span class='dbcs'>" + seasonLabel + "</span>" : "") + "</div>"
    + "<div class='dbmeta'>" + real.length + " " + t("players") + " · "
    + (ok ? "<span class='ok'>" + t("complete") + "</span>" : "<span class='mis'>" + t("incomplete") + "</span>")
    + "</div></div></div>" + rows + "</div>";
  return { ok, n: real.length, html };
}
function renderDb(){
  const fc = $("dbclubsel").value;   // "" = alle clubs
  const fseason = $("dbseason").value; // "" = alle seizoenen
  const seasons = fseason ? [fseason] : Object.keys(SEASONS).slice().reverse();
  const showDivider = !fc && !fseason;
  const showSeasonInCard = fc && !fseason;
  let html = "", compleet = 0, totaal = 0, clubs = 0;
  seasons.forEach(s => {
    const inSeason = SEASONS[s].filter(c => !fc || c.n === fc);
    if(!inSeason.length) return;
    if(showDivider) html += "<div class='dbdiv'>" + s + "</div>";
    inSeason.forEach(c => {
      const r = clubCardHTML(c, showSeasonInCard ? s : "");
      if(r.ok) compleet++;
      totaal += r.n; clubs++;
      html += r.html;
    });
  });
  $("dbgrid").innerHTML = html;
  const label = (fc || t("all_clubs")) + " · " + (fseason || t("all_seasons"));
  $("dbstats").textContent = label + " · " + t("db_stats", compleet, clubs, totaal);
}
(function initDb(){
  const allClubs = [...new Set(Object.values(SEASONS).flatMap(arr => arr.map(c => c.n)))].sort();
  const sel = $("dbseason"), csel = $("dbclubsel");
  const opt = (v, txt) => { const o = document.createElement("option"); o.value = v; o.textContent = txt; return o; };
  sel.appendChild(opt("", t("all_seasons")));
  Object.keys(SEASONS).slice().reverse().forEach(s => sel.appendChild(opt(s, s)));
  csel.appendChild(opt("", t("all_clubs")));
  allClubs.forEach(n => csel.appendChild(opt(n, n)));
  const onFilter = () => { $("dbsearch").value = ""; renderDb(); };
  sel.onchange = onFilter;
  csel.onchange = onFilter;
})();
function renderDbSearch(q){
  const hits = [];
  Object.keys(SEASONS).forEach(s => SEASONS[s].forEach(c => c.p.forEach(pl => {
    if(!isJeugd(pl) && pl[0].toLowerCase().includes(q)) hits.push({ s, c, pl });
  })));
  hits.sort((a, b) => a.pl[0].localeCompare(b.pl[0]) || a.s.localeCompare(b.s));
  $("dbstats").textContent = hits.length + " " + (hits.length === 1 ? t("res1") : t("resN")) + " " + t("in_all");
  $("dbgrid").innerHTML = hits.length ? "<div class='dbclub dbsearchresults'>" + hits.slice(0, 250).map(h =>
    "<div class='dbrow'><span class='p'>" + h.pl[1] + "</span><span class='n'>" + esc(h.pl[0]) + "</span><span class='c'>" + h.c.a + "</span><span class='s'>" + h.s + "</span><span class='r'>" + h.pl[2] + "</span></div>"
  ).join("") + "</div>" : "";
}
function refreshDb(){
  const q = $("dbsearch").value.trim().toLowerCase();
  if(q.length >= 2) renderDbSearch(q);
  else renderDb();
}
$("dbsearch").oninput = refreshDb;
function closeDb(){ $("dbmodal").classList.remove("show"); }
$("dbbtn").onclick = () => { $("dbmodal").classList.add("show"); refreshDb(); };
$("dbclose").onclick = closeDb;
$("dbmodal").onclick = e => { if(e.target === $("dbmodal")) closeDb(); };
function closeHist(){ $("histmodal").classList.remove("show"); }
$("histbtn").onclick = () => { $("histmodal").classList.add("show"); renderHistory(); };
$("histclose").onclick = closeHist;
$("histmodal").onclick = e => { if(e.target === $("histmodal")) closeHist(); };
function closeHelp(){ $("helpmodal").classList.remove("show"); }
$("helpbtn").onclick = () => { $("helpbody").innerHTML = t("help_html"); $("helpmodal").classList.add("show"); };
$("helpclose").onclick = closeHelp;
$("helpmodal").onclick = e => { if(e.target === $("helpmodal")) closeHelp(); };
document.addEventListener("keydown", e => { if(e.key === "Escape"){ closeDb(); closeHist(); closeHelp(); } });

/* ================= draftfilter ================= */
$("seasonbtn").onclick = () => { if($("seasonbtn").disabled) return; $("seasonmenu").classList.toggle("open"); $("clubmenu").classList.remove("open"); };
$("clubbtn").onclick = () => { if($("clubbtn").disabled) return; $("clubmenu").classList.toggle("open"); $("seasonmenu").classList.remove("open"); };
document.addEventListener("click", e => { if(!e.target.closest(".msel")){ $("seasonmenu").classList.remove("open"); $("clubmenu").classList.remove("open"); } });
renderDraftFilter();

applyLang();
if(location.hash.indexOf("#t=") === 0){ try { loadSharedTeam(location.hash.slice(3)); } catch(e){} }
if("serviceWorker" in navigator && location.protocol !== "file:")
  navigator.serviceWorker.register("sw.js").catch(() => {});
