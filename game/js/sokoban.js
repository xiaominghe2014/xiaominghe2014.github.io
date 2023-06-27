
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
            if (c === char_floor) {
                arr.push(f);
            }
            if (c === char_no || c == ' ') {
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



function* nextMove(lrud) {
    lrud = lrud.toLowerCase();
    let current = "";
    let moveCount = 1;
    let lStr = "0";
    for (let i = 0; i < lrud.length; i++) {
        let char = lrud.charAt(i);
        if (isNumber(char)) {
            lStr += char;
        } else {
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
            if (lStr.length > 1) {
                moveCount = parseInt(lStr);
            } else {
                moveCount = 1;
            }
            lStr = "0";
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
        lrud: "ulldldruurrdllrrddlurul",
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
        lrud: "d11luurd",
        map: [
            "####___________",
            "#--############",
            "#-$-$-$-$-$-@-#",
            "#-.....-------#",
            "###############"
        ],
    },
    {
        lrud: "ruldll4u3rd",
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
        lrud: "dlluururdrulldlddrrudlluururrdlddlluuluuru3r",
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
        lrud: "urrll3drururu",
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
        lrud: "r",
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
        lrud: "",
        map:
            [
                "###########",
                "#@---#----#",
                "#-$-.$.-$-#",
                "#--.-.-.--#",
                "####.#.####",
                "#--$-.-$--#",
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

    //无人区
    // [
    //     "###########",
    //     "#----.----#",
    //     "#--$.$.$--#",
    //     "###.$.$.###",
    //     "__##.$.##__",
    //     "___#$.$#___",
    //     "___#-$-#___",
    //     "___#-@-#___",
    //     "___#####___",
    // ],
    // [
    //     "_________####_",
    //     "##########--#_",
    //     "#-----------#_",
    //     "#--********-#_",
    //     "_#-*------*-#_",
    //     "_#-*-####-*-#_",
    //     "_#-*-#__#-*-#_",
    //     "_#-*-#__#-*-#_",
    //     "_#-*-####-*-#_",
    //     "_#-*----#-*-#_",
    //     "_#-****.#-*-#_",
    //     "_#------#-*-#_",
    //     "_#--#####-*-#_",
    //     "_####__#--*-##",
    //     "_______#-**--#",
    //     "_______#---$@#",
    //     "_______###--#_",
    //     "_________####_",
    // ],
];


