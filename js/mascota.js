/* Mascota Frikital (copia de la referencia turquesa). Colores por variables CSS. */
const MASC_INNER=`<defs><pattern id="ht" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="5.5" cy="5.5" r="2.4" fill="#d873bd" opacity=".75"/></pattern></defs>
<path class="m1" d="M20 805C80 760 175 800 220 860L195 905C125 885 60 885 20 850Z"/><path fill="url(#ht)" d="M20 805C80 760 175 800 220 860L195 905C125 885 60 885 20 850Z"/>
<path fill="#4a4a50" d="M225 760h85v95h-85zM425 650l120 8-25 170h-95z"/>
<path class="m1" d="M185 815h145v110H175z"/><path class="m1" d="M445 815h150l5 115H440z"/><ellipse cx="215" cy="950" rx="82" ry="30" fill="#fff"/><ellipse cx="560" cy="950" rx="88" ry="30" fill="#fff"/>
<rect x="322" y="375" width="64" height="50" fill="#4a4a50"/>
<path class="m1" d="M305 405L470 412 505 625 440 725 340 705 308 560Z"/><path fill="url(#ht)" d="M330 560L470 540 440 725 340 705Z"/>
<polygon fill="#fff" points="352,455 428,445 400,490 432,492 372,540 392,498 355,500"/><polygon fill="#fff" points="432,548 490,540 468,572 492,574 446,606 456,578 428,580"/>
<g class="coat"><polygon fill="#f7edf6" stroke="#f7edf6" stroke-width="10" stroke-linejoin="round" points="100,450 130,400 175,420 190,375 240,395 270,370 320,400 345,470 335,560 352,640 330,700 345,760 300,800 280,850 235,820 205,850 170,790 140,800 150,730 110,700 130,640 95,590 115,540 90,500"/>
<path fill="#ecc8e4" d="M140 700q110 40 200 10l-10 90-70 50-60-30-60 20-40-60z"/><path fill="url(#ht)" d="M110 560Q220 520 320 580L335 700Q200 700 130 650Z"/>
<polygon fill="#f7edf6" stroke="#f7edf6" stroke-width="10" stroke-linejoin="round" points="430,430 470,390 520,410 560,380 610,405 650,390 690,440 700,490 665,520 690,570 650,620 670,680 625,720 640,770 590,790 580,840 540,790 520,830 480,760 500,700 455,640 470,580 440,520"/>
<path fill="url(#ht)" d="M470 520Q580 470 690 520L660 640Q560 660 480 600Z"/></g>
<g class="brazo"><path fill="#4a4a50" d="M598 420l58 14 30 38-46 12z"/><rect class="m1" x="590" y="272" width="132" height="152" rx="46" transform="rotate(10 656 348)"/><polygon fill="#fff" points="660,312 640,360 664,358 650,398 694,342 668,344 682,312"/><circle cx="578" cy="312" r="16" fill="#fff"/></g>
<path class="m1" d="M70 115q8-55 72-60l62 42-18 150q-60 22-112-32zM568 122q75-22 95 42l12 90q-52 30-98-22z"/>
<path class="m1" d="M185 108Q290 -5 515 45q75 25 78 75l-30 30H215z"/><path fill="url(#ht)" d="M185 108Q290 -5 515 45q75 25 78 75l-30 30H215z"/>
<path d="M104 250Q120 372 300 394Q500 408 592 340" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round"/>
<path fill="#120d12" d="M135 150Q140 62 330 66Q570 60 597 172Q602 282 560 342Q440 402 280 388Q140 362 130 252Z"/>
<g class="gafas"><path d="M150 150Q250 140 385 175L378 272Q300 302 175 287Q148 250 150 150Z" fill="#2a1424" stroke="#B8349A" stroke-width="17" stroke-linejoin="round"/><path d="M415 190Q520 170 602 200L597 292Q500 318 420 292Z" fill="#2a1424" stroke="#B8349A" stroke-width="17" stroke-linejoin="round"/><path d="M386 205Q400 192 412 207" stroke="#B8349A" stroke-width="15" fill="none"/>
<path d="M168 258L285 168h32L200 262zM225 268L330 190h26L255 272zM425 270L520 195h30L455 282zM490 280L565 215h22l-70 66z" fill="#d9b3d3" opacity=".72"/></g>
<ellipse cx="365" cy="288" rx="22" ry="12" fill="#2a2025"/><path d="M320 304Q365 338 410 308" stroke="#b58a78" stroke-width="5" fill="none" stroke-linecap="round"/>
<path fill="#fff" d="M610 160l12 34 34 12-34 12-12 34-12-34-34-12 34-12zM48 262l9 22 22 9-22 9-9 22-9-22-22-9 22-9z"/>`;
const MASCOTA=`<svg viewBox="0 0 780 963" class="mascota">${MASC_INNER}</svg>`;
const mascota=()=>MASCOTA;
const CARA=`<svg viewBox="60 -10 600 600" class="cara">${MASC_INNER}</svg>`;
