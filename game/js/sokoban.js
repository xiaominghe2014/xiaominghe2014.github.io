
const _ = -1; // no map
const f = 0;  // floor
const p = 1;  // player
const w = 1 << 1; // wall
const x = 1 << 2; // box
const o = 1 << 3; // target


const char_player = '@';
const char_player_goal = '+';
const char_box = '$';
const char_box_goal = '*';
const char_wall = '#';
const char_goal = '.';
const char_floor = '-';
const char_no = '_';

function XSB2Map(xsbArr) {
    let map = [];
    for (let str of xsbArr) {
        let arr = [];
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            if (c === char_player) {
                arr.push(p);
            }
            if (c === char_player_goal) {
                arr.push(p | o);
            }
            if (c === char_box) {
                arr.push(x);
            }
            if (c === char_box_goal) {
                arr.push(x | o);
            }
            if (c === char_wall) {
                arr.push(w);
            }
            if (c === char_goal) {
                arr.push(o);
            }
            if (c === char_floor || c == ' ') {
                arr.push(f);
            }
            if (c === char_no) {
                arr.push(_);
            }
        }
        if (arr.length > 0) {
            map.push(arr);
        }
    }
    return map;
}

function isNumber(val) {
    return /^[0-9]+$/.test(val);
}

function preHandler(lrud){
    //预处理
    let start = lrud.indexOf("(");
    if(start!=-1){
        let pre = lrud.substring(0,start);
        let m = pre.match(/\d+$/);
        if(m==null){
            return lrud;
        }
        let n = m[0];
        let repeat = parseInt(n);
        let end = lrud.indexOf(")");
        if(end==-1){
            return lrud;
        }
        let oldStr = lrud.substring(start-n.length,end+1);
        let newStr = lrud.substring(start+1,end).repeat(repeat);
        lrud = lrud.replace(oldStr,newStr);
        return preHandler(lrud);
    }
    return lrud;
}

function* nextMove(lrud) {
    lrud = lrud.toLowerCase();
    lrud = preHandler(lrud);
    let current = "";
    let moveCount = 1;
    let lStr = "0";
    for (let i = 0; i < lrud.length; i++) {
        let char = lrud.charAt(i);
        if (isNumber(char)) {
            lStr += char;
        } else {
            if (lStr.length > 1) {
                moveCount = parseInt(lStr);
            } else {
                moveCount = 1;
            }
            lStr = "0";

            if (char === 'l') {
                current = "left"
            }
            if (char === 'r') {
                current = "right"
            }
            if (char === 'u') {
                current = "up"
            }
            if (char === 'd') {
                current = "down"
            }
            for (let j = 0; j < moveCount; j++) {
                yield current;
            }
        }
    }
}



let mapStrArr = [
    // 入门
    {
        lrud: "r",
        map: [
            "#####",
            "#@$.#",
            "#####"
        ],
    },
    {
        lrud: "dlu3rdlullddruluruuldrddrruldluu",
        map: [
            "####__",
            "#-.#__",
            "#--###",
            "#*@--#",
            "#--$-#",
            "#--###",
            "####__"
        ],
    },
    {
        lrud: "rddlruulduullddr",
        map: [
            "######",
            "#----#",
            "#-#@-#",
            "#-$*-#",
            "#-.*-#",
            "#----#",
            "######"
        ],
    },
    {
        lrud: "ruu3luld4rddluru3ldd3luurrdrdl3urdd",
        map: [
            "__####___",
            "###--####",
            "#-----$-#",
            "#-#--#$-#",
            "#-.-.#@-#",
            "#########"
        ],
    },
    {
        lrud: "ul2(ld)ruurrdllrrddlurul",
        map: [
            "########",
            "#------#",
            "#-.**$@#",
            "#------#",
            "#####--#",
            "____####"
        ],
    },
    {
        lrud: "lulduu3rdlrrddlulldrd3lur",
        map: [
            "_#######",
            "_#-----#",
            "_#-.$.-#",
            "##-$@$-#",
            "#--.$.-#",
            "#------#",
            "########"
        ],
    },
    {
        lrud: "lluuruluu4r3dluruulldull3drrddlud3rul",
        map: [
            "#######",
            "#-----#",
            "#-.$.-#",
            "#-$.$-#",
            "#-.$.-#",
            "#-$.$-#",
            "#--@--#",
            "#######"
        ],
    },

    {
        lrud: "uululldrdrluurdrddrddllurdrulurluulldrurddrddllurd3ruul",
        map: [
            "#####____",
            "#---##___",
            "#-$--#___",
            "##-$-####",
            "_###@.--#",
            "__#--.#-#",
            "__#-----#",
            "__#######"
        ],
    },

    {
        lrud: "d11luurdld10r6lulldlluurdldrrurrdrru4ldlluurdrdrru4ldrru4rdrru6lrrdrru4ldrr4luurdldrru6rdrru8ldlluurd3rdlu3rdllu4rd3lu7rd",
        map: [
            "####___________",
            "#--############",
            "#-$-$-$-$-$-@-#",
            "#-.....-------#",
            "###############"
        ],
    },
    {
        lrud: "ruldll4u3rdlull4drr3uruldlr3dll3uddrdr",
        map: [
            "######",
            "#...-#",
            "#--$-#",
            "#-#$##",
            "#--$-#",
            "#--@-#",
            "######"
        ],
    },
    {
        lrud: "dlluururdrulldlddrrudlluururrdlddl2(luu)ru3r",
        map: [
            "_######",
            "##----#",
            "#--##-#",
            "#-#-$-#",
            "#--*-.#",
            "##-#@##",
            "_#---#_",
            "_#####_"
        ],
    },
    {
        lrud: "dlludluluurdrddl",
        map: [
            "####___",
            "#--####",
            "#-.-.-#",
            "#-$$#@#",
            "##----#",
            "_#####_",
        ],
    },
    {
        lrud: "urrll3d3(ru)",
        map:
            [
                "######",
                "#-#-.#",
                "#-$-.#",
                "#@-$.#",
                "#-$$.#",
                "#--###",
                "####__",
            ],
    },
    {
        lrud: "ulu3lddrulururrdlrdllddrruruluull3dldr3uldduu3rdluldd",
        map:
            [
                "__####_",
                "##---#_",
                "#----##",
                "#-$-$-#",
                "#--#$@#",
                "#...-##",
                "######_",
            ],
    },
    {
        lrud: "rr4drddllurdrulu3rdruu",
        map:
            [
                "#####____",
                "#@--#____",
                "#-$$#_###",
                "#-$-#_#.#",
                "###-###.#",
                "_##----.#",
                "_#---#--#",
                "_#---####",
                "_#####___",
            ],
    },
    {
        lrud: "3r",
        map:
            [
                "_#######__",
                "_#-----###",
                "##$###---#",
                "#-@-$--$-#",
                "#-..#-$-##",
                "##..#---#_",
                "_########_",
            ],
    },
    {
        lrud: "r",
        map:
            [
                "__####",
                "_##@.#",
                "_#.$$#",
                "##-$-#",
                "#-.#-#",
                "#----#",
                "#--###",
                "#--#__",
                "####__",
            ],
    },
    {
        lrud: "r",
        map:
            [
                "_####_",
                "##--#_",
                "#@$-#_",
                "##$-##",
                "##-$-#",
                "#.$--#",
                "#..*.#",
                "######",
            ],
    },
    {
        lrud: "luurruuddllddrr3u3drruld3l3u3rd3lddrruuruldluuddrddruu",
        map:
            [
                "__####__",
                "__#..#__",
                "_##-.##_",
                "_#--$.#_",
                "##-$--##",
                "#--#$$-#",
                "#--@---#",
                "########",
            ],
    },

    {
        lrud: "drurdrdrrull3rurrdluldrdllullulld4rurdl5d3rulldl4u3drruldlulldd3lurrdr4u3dllurdrudrrdrurull",
        map:
            [
                "###########",
                "#@---#----#",
                "#-$-.$.-$-#",
                "##-.-.-.-##",
                "_###.#.###_",
                "##-$-.-$-##",
                "#-$--$--$-#",
                "#----#----#",
                "###########",
            ],
    },

    {
        lrud: "",
        map:
            [
                "_######_",
                "##----##",
                "#-$-$$-#",
                "#......#",
                "#-$$-$-#",
                "###-@###",
                "__####__",
            ],
    },

    {
        lrud: "",
        map:
            [
                "########",
                "#.-*---#",
                "#-#-$#.#",
                "#---$-.#",
                "####$--#",
                "#@---#-#",
                "#.$----#",
                "########",
            ],
    },

    {
        lrud: "",
        map:
            [
                "__#####_",
                "###---#_",
                "#.@$--#_",
                "###-$.#_",
                "#.##$-#_",
                "#-#-.-##",
                "#$-*$$.#",
                "#---.--#",
                "########",
            ],
    },

    {
        lrud: "",
        map:
            [
                "_######_",
                "_#--.@##",
                "_#---$.#",
                "_###*#-#",
                "##-----#",
                "#--$--##",
                "#---###_",
                "#####___",
            ],
    },

    {
        lrud: "",
        map:
            [
                "#######__",
                "#-----#__",
                "#-$$$##__",
                "#--#..###",
                "##--..$-#",
                "_#-@----#",
                "_########",
            ],
    },

    {
        lrud: "",
        map:
            [
                "____####",
                "#####-.#",
                "#-.*@$-#",
                "#--$$$-#",
                "#--#---#",
                "#.-.-###",
                "######__"
            ],
    },
    {
        lrud: "rruruldd4lulururrdduull3drr3urr4drdldll3ulldldrdrl3urrddlruull3u4r3dllddrluurr3u4l4dldrdrr3ulr3dll3u4r3ulldduurr3dll3dll3urrddlr5ulldduurrdlu3r4drdldlr6ull5drluurluur",
        map: [
            "_#######_",
            "##-----##",
            "#-*-$-*-#",
            "#--#-#--#",
            "##.-@-.##",
            "#--#-#--#",
            "#-*-$-*-#",
            "##-----##",
            "_#######_",
        ],
    },
    {
        lrud: "ldrddlull3uruurrdru3lddl3d3ruuldruuruu3lddlddrluurdrrulrruuldrdl4drruur3ulrdlrddluu4dlluurluurdl3urdldd3ruul",
        map: [
            "_#######_",
            "##----###",
            "##-*-*--#",
            "#-*.$.*-#",
            "#--$@$--#",
            "#-*.$.*-#",
            "#--*-*-##",
            "###----##",
            "_#######_",
        ],
    },
    {
        lrud:"lurr3dllulluurrdrrddlldlu3ruulldurrddllrr5ull3d4ruulrdd4l3urrdrr2(ddll)3ullddrluurrdrrddllud2(rruu)lldurr2(ddll)ulluu3r3lddrrd2(rruu)llddu4lddrrudlluurr4dlur3ullddrluurrddurruurrddll3ullddr3lddrrudlddru",
        map:[
            "__#####__",
            "__#---###",
            "###-#-$-#",
            "#-$*-.#-#",
            "#-#-+---#",
            "#--*#.###",
            "##-$--#__",
            "_#--###__",
            "_####____",
        ]
    },
    {
        lrud:"dllddlddrurr3ullddldr3uruul4d3ullddrdruudl3dr3ulluurrurdr4dlr4u4lddr3druluururldlluurrurdrddurrddrddlu4l3udlluurrdrl4dluur4urdrdrrddrd4l3r3uluur4d3urrddldluudrruulluldrdlrdr3dl4udrruulluld5lddrdruudlluu4rllddl3dr4udlluurr",
        map:[
            "__#######__",
            "###--#--###",
            "#--$.@.$--#",
            "#-#-...-#-#",
            "#-$-#.#-$-#",
            "##--#.#--##",
            "_#-$-$-$-#_",
            "_#--###--#_",
            "_####_####_",
        ]
    },
    {
        lrud: "u3l3ululldll3d11rurd12lulld13rdrrlu7l3ulull3duull3d11rurrld7l3ullul3duull3d11rdru7l3ull3urdduull5duull3d13r8l3ullul3duull3d12rlur",
        map:
            [
                "____#####__________",
                "____#---#__________",
                "____#$--#__________",
                "__###--$##_________",
                "__#--$-$-#_________",
                "###-#-##-#___######",
                "#---#-##-#####--..#",
                "#-$--$----------..#",
                "#####-###-#@##--..#",
                "____#-----#########",
                "____######_________",
            ],
    },


    {
        lrud: "uluu3l5u3rurr4d4l4r4ulld3l4drd6lul3duu6ruu5rdd8ldlurulldluuruluu6r3d4rdrd8ldlurulldl3urul4d9ruru3ldl3udd5r4ulld9l5d12r5d4l4uru8lulddu11r5u10ldluruld6r3d3rururu10ldlu5d8rddrruluurrd10luld8r5drr9uru9l4r5d5l5u5d11rdlldl3uru3ldl3udd4r3u8l8rdr3dlddrru9ldluruldl3u3d11r4dldl3uluurrdlldluru6ldluruldluudd9r3dlrddl4uru7ldlurulldluudd12r3dluuru9ldlurulldlud9r4dr3uru8ldlurulld8r4dl3uru7l",
        map: [
            "#####_____#####_",
            "#...#######---#_",
            "#.-.--------$-#_",
            "#.-.####-###$-#_",
            "#...#--#-##-$-#_",
            "_#.-####----$-#_",
            "_#.---##--#-$-##",
            "_#.---------$--#",
            "_#.#--####-$$$-#",
            "_#.####__#-$-$-#",
            "_#.#_____#-$@$-#",
            "_###_____#-$$$-#",
            "_________#-----#",
            "_________#######",
        ]
    },
    {
        //xsokoban 29
        lrud:"d5lddrdrru5rdlu4ldllulld3rll5urdu4rdrrdrrurrdl4drddlulldllurrl3u6l6r3d3ldllu4rdr3uru6ldll3uruul4dldrrl4ulluulul4dlddrddlddrurrdrru4r4ldllu4rdrrurrdrrul3u6ldllur3ulluull3dlddrddld3r2(drrurr)dr3uru5l4r3d3ldllu4rdr3uru4l3r3d7ldllu8rdr3uru3lrr3d11l3uluur4dld11rdr3urullr3d11l8urr3drur3dldr5u5rdd4l4rurrdrrurrdl4drddlulldl3urul3d11l8urrddrr3d4u3rdurrdd4l4rurrdrrurrdl4drd3ldl3udd11l8u2(rrdd)u5rurrdrrur5drd3ldluu",
        map:[
            "#####_____________",
            "#   ##____________",
            "# $  #########____",
            "## # #       ######",
            "## #   $#$#@  #   #",
            "#  #      $ #   $ #",
            "#  ### ######### ##",
            "#  ## ..*..... # ##",
            "## ## *.*..*.* # ##",
            "# $########## ##$ #",
            "#  $   $  $    $  #",
            "#  #   #   #   #  #",
            "###################",
        ]
    },
];


