'use strict';

/*
 * Simple API tests
 */

/*
 * Could also check out the nock package to record / replay http interactions
 */

var preq = require('preq');
var assert = require('../../utils/assert.js');
var server = require('../../utils/server.js');
var baseURL = server.config.uri;

var testData = [
        {
            query: {
                q: 'E=mc^2'
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"upper E equals m c squared\">\n  <semantics>\n    <mrow>\n      <mi>E</mi>\n      <mo>=</mo>\n      <mi>m</mi>\n      <msup>\n        <mi>c</mi>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mn>2</mn>\n        </mrow>\n      </msup>\n    </mrow>\n    <annotation encoding=\"application/x-tex\">E=mc^{2}</annotation>\n  </semantics>\n</math>",
                    "speech": "upper E equals m c squared",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"9.025ex\" height=\"2.676ex\" style=\"vertical-align:-.338ex\" viewBox=\"0 -1006.6 3885.6 1152.1\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>upper E equals m c squared</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M492 213q-20 0-20 13 0 4 5 24t5 35q0 31-21 38t-97 7h-52q-1-2-35-138T243 52q0-4 11-4t80-2q94 0 124 2t60 13q49 16 81 56t71 131q10 22 13 24 7 2 15 2 20 0 20-13Q613 7 608 2q-3-2-286-2H133Q31 0 31 11q0 2 3 14 4 16 8 18t23 3q27 0 60 3 14 3 19 12 2 5 71 281t70 280q0 7-4 7-8 3-53 5h-31q-6 6-6 8t2 17q4 17 10 21h554q7-4 7-11 0-5-13-112t-14-110q-2-7-20-7h-12q-7 5-7 13l3 23q3 24 3 52 0 30-7 50t-19 31-35 16-47 7-64 2h-47q-88-1-93-3-4-2-6-9-1-3-31-123t-31-122q23-1 48-1h26q66 0 91 15t45 81q4 16 6 18t17 3h8q3 0 5-1t2-1 2-4 3-4l-33-132q-33-133-36-135-3-3-16-3z\"/><path stroke-width=\"10\" id=\"b\" d=\"M56 347q0 13 14 20h637q15-8 15-20 0-11-14-19l-318-1H72q-16 5-16 20zm0-194q0 15 16 20h636q14-10 14-20 0-13-15-20H70q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"c\" d=\"M21 287q1 6 3 16t12 38 20 47 32 37 44 17 43-7 30-18 16-22 8-19l2-7q0-2 1-2l11 11q60 64 141 64 17 0 31-2t26-7 19-10 15-12 10-13 8-13 4-12 3-9 2-7l8 10q63 75 149 75 54 0 87-27t34-79q0-51-38-158T704 50q1-14 5-19t15-5q28 0 52 30t39 82q3 11 6 13t16 2q20 0 20-8 0-1-4-15-8-29-22-57t-46-56-69-27q-47 0-68 27t-21 56q0 19 36 120t37 152q0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q433 26 428 16q-13-27-43-27-13 0-21 7T353 8t-3 10q0 11 34 143l36 146q3 15 3 38 0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q156 26 151 16q-13-27-43-27-13 0-21 6T76 7t-2 10q0 13 38 164 39 154 39 161 3 15 3 27 0 36-25 36-22 0-37-28t-23-61-12-36q-2-2-16-2H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"d\" d=\"M34 159q0 109 86 196t186 87q56 0 88-24t33-63q0-29-19-49t-48-21q-19 0-30 10t-11 30 11 34 22 21 14 6h1q0 2-6 6t-21 8-34 4q-30 0-57-14-21-9-43-31-44-44-64-124t-21-116q0-46 26-69 22-24 58-24h4q112 0 185 85 9 10 12 10 4 0 13-9t10-14-9-15-29-28-45-30-64-25-80-11q-75 0-121 48T34 159z\"/><path stroke-width=\"10\" id=\"e\" d=\"M109 429q-27 0-43 18t-16 44q0 71 53 123t132 52q91 0 152-56t62-145q0-43-20-82t-48-68-80-74q-36-31-100-92l-59-56 76-1q157 0 167 5 7 2 24 89v3h40v-3q-1-3-13-91T421 3V0H50v31q0 7 6 15t30 35q29 32 50 56 9 10 34 37t34 37 29 33 28 34 23 30 21 32 15 29 13 32 7 30 3 33q0 63-34 109t-97 46q-33 0-58-17t-35-33-10-19q0-1 5-1 18 0 37-14t19-46q0-25-16-42t-45-18z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\"/><use xlink:href=\"#b\" x=\"1046\"/><use xlink:href=\"#c\" x=\"2107\"/><g transform=\"translate(2990,0)\"><use xlink:href=\"#d\"/><use transform=\"scale(0.707)\" xlink:href=\"#e\" x=\"619\" y=\"583\"/></g></g></svg>",
                    "mathoidStyle": "vertical-align: -0.338ex; width:9.025ex; height:2.676ex;",
                    "success": true,
                    "log": "success",
                    "sanetex": "E=mc^{2}",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAUCAYAAAD1GtHpAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAA8lJREFUeNrtmFlsTFEcxmdq0FDUUjStktbEUkGppNEIgthL7VtI7SQlEeJB0ETGWmrfPShpeSCp7c2WEFQztSVErG0HjTLaKWrU8p3ku3JycmfmTrWpmPknv9w755yZufc7/+1esyloviwULAfxoBocB9flBQ2CGvm0Q2Ay+AysIA30BBfAz6CIxmw7KAHDwG0wE1hAI3BXLAgJauTTwhnKwu5T0CTQSVtg0fnSJlBl8A/Eui3/uYgpYI4iqpMeqiviYpAOGktzX4BbWhMmzX0IABFvkVAK1xmcBe88iXiQ7KaYpeA8WCCtaQ9sYBSoDKCwXk+P3MNq/cc85cRuPBaDXcqc2IF54AEoDxABhdPMBpkUULQ5Wd5EFO7aludl4JE0tw2slvKhM0AKy3D2hhkcGw/2eSss/SmkSSvhUi6cD1ZKn5/V042JlLKOkWDjhi4CsczfNqaaMEaN6O/yQQ4bZj1LolgRoACc5No89oVWyWnc8r3riTgINGHROMyxaJBLz8zj2JB6FLCQjW5T0JXXF8Mi2JoV9RIYwagS43PBdDBWEVIIvRH0AAncmBlgKX9HbNBN5Rqeyh/0ROzIYzNwA/xitY6kgGUGb1aEfmINRCpm/vFkmRQlnjc8lL1bF/AJXGTRi6TY/ShEARvmhWC/dP8i5w8GP7ghZnCN38ugd3o1i85zYgzP8yWXjeZF3fFDjGOgA/jqp4guH/NxFCSKTw3l9CCttzXz6KAA1cpjrlX6vIyRJzx6GruR01zjYs9s8lfEXhRMWDY4wvOdYAA4IVWrJB8h/YQXVtv2FrxgrjOxBauSiqJ2T6ckAXsz15XK/R0slXn0CrjKsanMh6KleV0TEVPpjU7mQM1a8I9KKHKilwRd1zZBKXp7pbmJjBgXXxxoNoURJiLpjDTencfnyn/M8ueCVBH78likNNJp0rl4o9HHQK7IYlULqeWcqFksQ7lQKTqiQDxWcneyFOKVjKQ1oBXfzuT8za6qN6g9VL/xsF7MjwEVwG7gFZKbyd4f3AauO4ECvFTGI6QXBZqNA+0YXXksJClSq+JiITEpFfsoWOWvJ4ZLlfmbzo9uZgUcCLYa+G2RE0fWUUinewjDOGkDNRvN6xZPWOeY67QCaeeGRNFLtX4xg1GZa1TEbPZOoo1pKPWATsVjm/P8I/uq+jTtLbND52mrQvGsHYyeluAe+A5WcG4SvdbOii+cpQ3XJKv9oDcRhVe91wlti4fiYf4HXjwIL38FDijjl+kU6lpRyZeAh2CDVM0d9Ly1jMQieqxNqeJe7Tf/Fem3Gfl9FQAAAABJRU5ErkJggg=="
                }
            }
        }, {
            query: {
                q: "\\reals",
                type: "tex"
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"double-struck upper R\">\n  <semantics>\n    <mrow class=\"MJX-TeXAtom-ORD\">\n      <mi mathvariant=\"double-struck\">R</mi>\n    </mrow>\n    <annotation encoding=\"application/x-tex\">\\mathbb {R}</annotation>\n  </semantics>\n</math>",
                    "speech": "double-struck upper R",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1.689ex\" height=\"2.176ex\" style=\"vertical-align:-.338ex\" viewBox=\"0 -791.3 727 936.9\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>double-struck upper R</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M17 665q0 7 11 18h193q194-2 218-6 22-4 42-10t35-13 28-15 22-16 18-16 13-15 10-14 7-13 4-11l3-6q5-18 5-51 0-50-13-78-35-71-140-93l-18-5q7-11 18-29t44-66 61-85 59-69 49-37q19-5 19-19 0-9-12-17H510q-7 7-106 160l-98 151h-38V183q2-116 3-124 3-17 20-21 4-1 28-3 25 0 34-7 9-11 0-25l-7-4H28Q16 5 16 16q0 19 39 19 41 3 46 17 5 8 5 289t-5 291q-6 13-46 16-38 0-38 17zM241 35q-3 7-4 10t-2 33-2 85 0 174v284l4 14 7 13H133q3-7 4-10t2-35 2-86 0-176q0-210-1-252t-6-52q-1-1-1-2h108zm216 461q0 44-8 74t-24 45-25 19-23 9q-3 0-38 5-39 0-58-13-10-7-11-25t-2-129V346h16q43 0 91 6 46 12 64 40t18 104zm35 41v-41l-4-69-10-38-9-18-5-10q0-1 1-1 4 0 32 10 96 30 96 125 0 97-116 135l-20 7 4-11q13-15 27-65 4-24 4-65zm-28-294q-53 74-54 74-6 0-9-2-17 0-31-3h-24L526 35h93l-13 15q-53 59-142 193z\"/></defs><use xlink:href=\"#a\" stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"/></svg>",
                    "mathoidStyle": "vertical-align: -0.338ex; width:1.689ex; height:2.176ex;",
                    "success": true,
                    "log": "success",
                    "sanetex": "\\mathbb {R} ",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAATZJREFUeNqV080rRFEYx/Ezc8lLWEljocZL3lNmIxkTZWFjJTtLGzOzGiuy8RdYWkhpSlgrwuwspOwsyZ4iycjbMN9Tv1vHGGac+nTvfe55zj3POecGjDEbaDPf2zPenOdbLODJ7eShHq0YwhkaMYBLVCCCHiyiA/v49JMvsIt5jCOGd0wpvo05XGmQPuwZjVyq3SCLY5wg7b8ImvLaK+qQwcd/kxtUZ9QNljPtYTRhBHHMFksOODvQjlPtRKe+WoMJxX8kf+mawx0qcY1aVGG0cJ9/q/kBS9r7ZTxivbDTXwt2hEOsIIVJjJVK9pz7uKZvD8wWdtxSg0UWLOfEbI1JrfAa7nHuD+DpSNqp9aMZ1Trb3ejFJgaRUKKNz9h/wCavokuLEkZIJ6pFf5Ot/QDTir3oy9k8F7s8jbXDpvAAAAAASUVORK5CYII="
                }
            }
        }, {
            query: {
                type: "asciimath",
                q: "x^2 or a_(m n) or a_{m n} or (x+1)/y or sqrtx"
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" alttext=\"x squared or a Subscript m n Baseline or a Subscript m n Baseline or StartFraction x plus 1 Over y EndFraction or StartRoot x EndRoot\">\n  <semantics>\n    <mstyle displaystyle=\"true\">\n      <msup>\n        <mi>x</mi>\n        <mn>2</mn>\n      </msup>\n      <mrow>\n        <mspace width=\"1ex\" />\n        <mtext>or</mtext>\n        <mspace width=\"1ex\" />\n      </mrow>\n      <msub>\n        <mi>a</mi>\n        <mrow>\n          <mi>m</mi>\n          <mi>n</mi>\n        </mrow>\n      </msub>\n      <mrow>\n        <mspace width=\"1ex\" />\n        <mtext>or</mtext>\n        <mspace width=\"1ex\" />\n      </mrow>\n      <msub>\n        <mi>a</mi>\n        <mrow>\n          <mi>m</mi>\n          <mi>n</mi>\n        </mrow>\n      </msub>\n      <mrow>\n        <mspace width=\"1ex\" />\n        <mtext>or</mtext>\n        <mspace width=\"1ex\" />\n      </mrow>\n      <mfrac>\n        <mrow>\n          <mi>x</mi>\n          <mo>+</mo>\n          <mn>1</mn>\n        </mrow>\n        <mi>y</mi>\n      </mfrac>\n      <mrow>\n        <mspace width=\"1ex\" />\n        <mtext>or</mtext>\n        <mspace width=\"1ex\" />\n      </mrow>\n      <msqrt>\n        <mi>x</mi>\n      </msqrt>\n    </mstyle>\n    <annotation encoding=\"text/x-asciimath\">x^2 or a_(m n) or a_{m n} or (x+1)/y or sqrtx</annotation>\n  </semantics>\n</math>",
                    "speech": "x squared or a Subscript m n Baseline or a Subscript m n Baseline or StartFraction x plus 1 Over y EndFraction or StartRoot x EndRoot",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"36.307ex\" height=\"5.676ex\" style=\"vertical-align:-2.338ex\" viewBox=\"0 -1437.2 15632.3 2443.8\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>x squared or a Subscript m n Baseline or a Subscript m n Baseline or StartFraction x plus 1 Over y EndFraction or StartRoot x EndRoot</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M52 289q7 42 54 97t116 56q35 0 64-18t43-45q42 63 101 63 37 0 64-22t28-59q0-29-14-47t-27-22-23-4q-19 0-31 11t-12 29q0 46 50 63-11 13-40 13-13 0-19-2-38-16-56-66-60-221-60-258 0-28 16-40t35-12q37 0 73 33t49 81q3 10 6 11t16 2h4q15 0 15-8 0-1-2-11-16-57-62-101T333-11q-70 0-106 63-41-62-94-62h-6q-49 0-70 26T35 71q0 32 19 52t45 20q43 0 43-42 0-20-12-35t-23-20-13-5l-3-1q0-1 6-4t16-7 19-3q36 0 62 45 9 16 23 68t28 108 16 66q5 27 5 39 0 28-15 40t-34 12q-40 0-75-32t-49-82q-2-9-5-10t-16-2H58q-6 6-6 11z\"/><path stroke-width=\"10\" id=\"b\" d=\"M109 429q-27 0-43 18t-16 44q0 71 53 123t132 52q91 0 152-56t62-145q0-43-20-82t-48-68-80-74q-36-31-100-92l-59-56 76-1q157 0 167 5 7 2 24 89v3h40v-3q-1-3-13-91T421 3V0H50v31q0 7 6 15t30 35q29 32 50 56 9 10 34 37t34 37 29 33 28 34 23 30 21 32 15 29 13 32 7 30 3 33q0 63-34 109t-97 46q-33 0-58-17t-35-33-10-19q0-1 5-1 18 0 37-14t19-46q0-25-16-42t-45-18z\"/><path stroke-width=\"10\" id=\"c\" d=\"M28 214q0 95 65 164t157 70q90 0 155-68t66-165q0-95-64-160T250-10q-97 0-159 67T28 214zM250 30q122 0 122 163v57q0 22-1 38t-7 38-16 36-31 28-49 20q-5 1-16 1-30 0-57-12-43-22-56-61t-13-92v-20q0-96 19-135 32-61 105-61z\"/><path stroke-width=\"10\" id=\"d\" d=\"M36 46h14q39 0 47 14v31q0 14 1 31t0 39 0 42v125l-1 23q-3 19-14 25t-45 9H20v23q0 23 2 23l10 1q10 1 28 2t36 2q16 1 35 2t29 3 11 1h3v-69q39 68 97 68h6q45 0 66-22t21-46q0-21-13-36t-38-15q-25 0-37 16t-13 34q0 9 2 16t5 12 3 5q-2 2-23-4-16-8-24-15-47-45-47-179v-53-27-26q0-12 1-20t0-15v-5q1-2 3-4t5-3 5-3 7-2 7-1 9-1 9 0 10-1 10 0h31V0h-9q-18 3-127 3Q37 3 28 0h-8v46h16z\"/><path stroke-width=\"10\" id=\"e\" d=\"M33 157q0 101 76 192t171 92q51 0 90-49 16 30 46 30 13 0 23-8t10-20q0-13-37-160T374 68q0-25 7-33t21-9q9 1 20 9 21 20 41 96 6 20 10 21 2 1 10 1h4q19 0 19-9 0-6-5-27t-20-54-32-50Q436 0 417-8q-8-2-24-2-34 0-57 15t-30 31l-6 15q-1 1-4-1l-4-4q-59-56-120-56-55 0-97 40T33 157zm318 171q0 6-5 22t-23 35-46 20q-35 0-67-31t-50-81q-29-79-41-164v-11q0-8-1-12 0-45 18-62t43-18q38 0 75 33t44 51q2 4 27 107t26 111z\"/><path stroke-width=\"10\" id=\"f\" d=\"M21 287q1 6 3 16t12 38 20 47 32 37 44 17 43-7 30-18 16-22 8-19l2-7q0-2 1-2l11 11q60 64 141 64 17 0 31-2t26-7 19-10 15-12 10-13 8-13 4-12 3-9 2-7l8 10q63 75 149 75 54 0 87-27t34-79q0-51-38-158T704 50q1-14 5-19t15-5q28 0 52 30t39 82q3 11 6 13t16 2q20 0 20-8 0-1-4-15-8-29-22-57t-46-56-69-27q-47 0-68 27t-21 56q0 19 36 120t37 152q0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q433 26 428 16q-13-27-43-27-13 0-21 7T353 8t-3 10q0 11 34 143l36 146q3 15 3 38 0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q156 26 151 16q-13-27-43-27-13 0-21 6T76 7t-2 10q0 13 38 164 39 154 39 161 3 15 3 27 0 36-25 36-22 0-37-28t-23-61-12-36q-2-2-16-2H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"g\" d=\"M21 287q1 6 3 16t12 38 20 47 33 37 46 17q36 0 60-18t30-34 6-21q0-2 1-2l11 11q61 64 139 64 54 0 87-27t34-79-38-157-38-127q0-26 17-26 6 0 9 1 29 5 52 38t35 80q2 8 20 8 20 0 20-8 0-1-4-15-8-29-22-57t-46-56-69-27q-47 0-68 27t-21 56q0 19 36 120t37 152q0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q156 26 151 16q-13-27-43-27-13 0-21 6T76 7t-2 10q0 13 38 163t40 163q1 5 1 23 0 39-24 39-38 0-63-100-6-20-6-21-2-6-19-6H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"h\" d=\"M56 237v13l14 20h299v150l1 150q10 13 19 13 13 0 20-15V270h298q15-8 15-20t-15-20H409V-68q-8-14-18-14h-4q-12 0-18 14v298H70q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"i\" d=\"M213 578l-13-5q-14-5-40-10t-58-7H83v46h19q47 2 87 15t56 24 28 22q2 3 12 3 9 0 17-6V361l1-300q7-7 12-9t24-4 62-2h26V0h-11q-21 3-159 3-136 0-157-3H88v46h64q16 0 25 1t16 3 8 2 6 5 6 4v517z\"/><path stroke-width=\"10\" id=\"j\" d=\"M21 287q0 14 15 48t48 71 74 36q41 0 66-23t26-64q-2-19-3-21 0-3-16-46t-33-97-16-86q0-43 14-60t42-18q23 0 43 11t31 23 27 33q0 1 5 20t14 59 19 74q38 150 42 157 13 27 43 27 13 0 21-7t11-12 2-9q0-13-49-210T391-23q-28-83-97-132t-138-50q-45 0-79 22t-34 66q0 22 7 37t19 22 20 10 17 3q44 0 44-42 0-20-12-35t-23-20-13-5l-3-1q2-5 19-12t34-7h8q17 0 26 2 33 9 61 38t43 62 23 56 8 30l-6-4q-6-4-19-11T270-6q-20-5-39-5-46 0-81 22t-46 71q-1 7-1 31 0 57 35 149t35 117v14q0 3-4 7t-11 4h-4q-23 0-42-19t-30-41-17-42-8-22q-2-2-16-2H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"k\" d=\"M95 178q-6 0-14 8t-9 14 31 30 66 50 38 29q2 2 5 2h1q6 0 14-17t54-117q19-43 31-69l85-185q1 0 104 213t206 429 107 221q6 14 20 14 7 0 12-6t7-12v-6L620 293 385-193q-4-7-19-7-9 0-12 3-2 2-98 212l-96 210-16-11q-15-12-31-24t-18-12z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\"/><use transform=\"scale(0.707)\" xlink:href=\"#b\" x=\"816\" y=\"583\"/><g transform=\"translate(1034,0) translate(430,0)\"><use xlink:href=\"#c\"/><use xlink:href=\"#d\" x=\"505\"/></g><g transform=\"translate(2797,0)\"><use xlink:href=\"#e\"/><g transform=\"translate(534,-150) scale(0.707)\"><use xlink:href=\"#f\"/><use xlink:href=\"#g\" x=\"883\"/></g></g><g transform=\"translate(4483,0) translate(430,0)\"><use xlink:href=\"#c\"/><use xlink:href=\"#d\" x=\"505\"/></g><g transform=\"translate(6246,0)\"><use xlink:href=\"#e\"/><g transform=\"translate(534,-150) scale(0.707)\"><use xlink:href=\"#f\"/><use xlink:href=\"#g\" x=\"883\"/></g></g><g transform=\"translate(7932,0) translate(430,0)\"><use xlink:href=\"#c\"/><use xlink:href=\"#d\" x=\"505\"/></g><g transform=\"translate(9695,0) translate(120,0)\"><path stroke=\"none\" d=\"M0 220h2518v60H0z\"/><g transform=\"translate(60,676)\"><use xlink:href=\"#a\"/><use xlink:href=\"#h\" x=\"843\"/><use xlink:href=\"#i\" x=\"1893\"/></g><use xlink:href=\"#j\" x=\"1008\" y=\"-686\"/></g><g transform=\"translate(12454,0) translate(430,0)\"><use xlink:href=\"#c\"/><use xlink:href=\"#d\" x=\"505\"/></g><g transform=\"translate(14217,0)\"><use xlink:href=\"#k\" y=\"-109\"/><path stroke=\"none\" d=\"M838 641h577v60H838z\"/><use xlink:href=\"#a\" x=\"838\"/></g></g></svg>",
                    "mathoidStyle": "vertical-align: -2.338ex; width:36.307ex; height:5.676ex;",
                    "log": "success",
                    "png": "data:image/png;base64,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"
                }
            }
        }, {
            query: {
                type: "mml",
                q: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"upper E equals m c squared\">\n  <mi>E</mi>\n  <mo>=</mo>\n  <mi>m</mi>\n  <msup>\n    <mi>c</mi>\n    <mrow class=\"MJX-TeXAtom-ORD\">\n      <mn>2</mn>\n    </mrow>\n  </msup>\n</math>"
            },
            response: {
                status: 200,
                body: {
                    "mathoidStyle": "vertical-align: -0.338ex; width:9.025ex; height:2.676ex;",
                    "log": "success",
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"upper E equals m c squared\">\n  <mi>E</mi>\n  <mo>=</mo>\n  <mi>m</mi>\n  <msup>\n    <mi>c</mi>\n    <mrow class=\"MJX-TeXAtom-ORD\">\n      <mn>2</mn>\n    </mrow>\n  </msup>\n</math>",
                    "speech": "upper E equals m c squared",
                    "success": true,
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"9.025ex\" height=\"2.676ex\" style=\"vertical-align:-.338ex\" viewBox=\"0 -1006.6 3885.6 1152.1\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>upper E equals m c squared</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M492 213q-20 0-20 13 0 4 5 24t5 35q0 31-21 38t-97 7h-52q-1-2-35-138T243 52q0-4 11-4t80-2q94 0 124 2t60 13q49 16 81 56t71 131q10 22 13 24 7 2 15 2 20 0 20-13Q613 7 608 2q-3-2-286-2H133Q31 0 31 11q0 2 3 14 4 16 8 18t23 3q27 0 60 3 14 3 19 12 2 5 71 281t70 280q0 7-4 7-8 3-53 5h-31q-6 6-6 8t2 17q4 17 10 21h554q7-4 7-11 0-5-13-112t-14-110q-2-7-20-7h-12q-7 5-7 13l3 23q3 24 3 52 0 30-7 50t-19 31-35 16-47 7-64 2h-47q-88-1-93-3-4-2-6-9-1-3-31-123t-31-122q23-1 48-1h26q66 0 91 15t45 81q4 16 6 18t17 3h8q3 0 5-1t2-1 2-4 3-4l-33-132q-33-133-36-135-3-3-16-3z\"/><path stroke-width=\"10\" id=\"b\" d=\"M56 347q0 13 14 20h637q15-8 15-20 0-11-14-19l-318-1H72q-16 5-16 20zm0-194q0 15 16 20h636q14-10 14-20 0-13-15-20H70q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"c\" d=\"M21 287q1 6 3 16t12 38 20 47 32 37 44 17 43-7 30-18 16-22 8-19l2-7q0-2 1-2l11 11q60 64 141 64 17 0 31-2t26-7 19-10 15-12 10-13 8-13 4-12 3-9 2-7l8 10q63 75 149 75 54 0 87-27t34-79q0-51-38-158T704 50q1-14 5-19t15-5q28 0 52 30t39 82q3 11 6 13t16 2q20 0 20-8 0-1-4-15-8-29-22-57t-46-56-69-27q-47 0-68 27t-21 56q0 19 36 120t37 152q0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q433 26 428 16q-13-27-43-27-13 0-21 7T353 8t-3 10q0 11 34 143l36 146q3 15 3 38 0 59-44 59h-5q-86 0-145-101l-7-12-33-134Q156 26 151 16q-13-27-43-27-13 0-21 6T76 7t-2 10q0 13 38 164 39 154 39 161 3 15 3 27 0 36-25 36-22 0-37-28t-23-61-12-36q-2-2-16-2H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"d\" d=\"M34 159q0 109 86 196t186 87q56 0 88-24t33-63q0-29-19-49t-48-21q-19 0-30 10t-11 30 11 34 22 21 14 6h1q0 2-6 6t-21 8-34 4q-30 0-57-14-21-9-43-31-44-44-64-124t-21-116q0-46 26-69 22-24 58-24h4q112 0 185 85 9 10 12 10 4 0 13-9t10-14-9-15-29-28-45-30-64-25-80-11q-75 0-121 48T34 159z\"/><path stroke-width=\"10\" id=\"e\" d=\"M109 429q-27 0-43 18t-16 44q0 71 53 123t132 52q91 0 152-56t62-145q0-43-20-82t-48-68-80-74q-36-31-100-92l-59-56 76-1q157 0 167 5 7 2 24 89v3h40v-3q-1-3-13-91T421 3V0H50v31q0 7 6 15t30 35q29 32 50 56 9 10 34 37t34 37 29 33 28 34 23 30 21 32 15 29 13 32 7 30 3 33q0 63-34 109t-97 46q-33 0-58-17t-35-33-10-19q0-1 5-1 18 0 37-14t19-46q0-25-16-42t-45-18z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\"/><use xlink:href=\"#b\" x=\"1046\"/><use xlink:href=\"#c\" x=\"2107\"/><g transform=\"translate(2990,0)\"><use xlink:href=\"#d\"/><use transform=\"scale(0.707)\" xlink:href=\"#e\" x=\"619\" y=\"583\"/></g></g></svg>",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAUCAYAAAD1GtHpAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAA8lJREFUeNrtmFlsTFEcxmdq0FDUUjStktbEUkGppNEIgthL7VtI7SQlEeJB0ETGWmrfPShpeSCp7c2WEFQztSVErG0HjTLaKWrU8p3ku3JycmfmTrWpmPknv9w755yZufc7/+1esyloviwULAfxoBocB9flBQ2CGvm0Q2Ay+AysIA30BBfAz6CIxmw7KAHDwG0wE1hAI3BXLAgJauTTwhnKwu5T0CTQSVtg0fnSJlBl8A/Eui3/uYgpYI4iqpMeqiviYpAOGktzX4BbWhMmzX0IABFvkVAK1xmcBe88iXiQ7KaYpeA8WCCtaQ9sYBSoDKCwXk+P3MNq/cc85cRuPBaDXcqc2IF54AEoDxABhdPMBpkUULQ5Wd5EFO7aludl4JE0tw2slvKhM0AKy3D2hhkcGw/2eSss/SmkSSvhUi6cD1ZKn5/V042JlLKOkWDjhi4CsczfNqaaMEaN6O/yQQ4bZj1LolgRoACc5No89oVWyWnc8r3riTgINGHROMyxaJBLz8zj2JB6FLCQjW5T0JXXF8Mi2JoV9RIYwagS43PBdDBWEVIIvRH0AAncmBlgKX9HbNBN5Rqeyh/0ROzIYzNwA/xitY6kgGUGb1aEfmINRCpm/vFkmRQlnjc8lL1bF/AJXGTRi6TY/ShEARvmhWC/dP8i5w8GP7ghZnCN38ugd3o1i85zYgzP8yWXjeZF3fFDjGOgA/jqp4guH/NxFCSKTw3l9CCttzXz6KAA1cpjrlX6vIyRJzx6GruR01zjYs9s8lfEXhRMWDY4wvOdYAA4IVWrJB8h/YQXVtv2FrxgrjOxBauSiqJ2T6ckAXsz15XK/R0slXn0CrjKsanMh6KleV0TEVPpjU7mQM1a8I9KKHKilwRd1zZBKXp7pbmJjBgXXxxoNoURJiLpjDTencfnyn/M8ueCVBH78likNNJp0rl4o9HHQK7IYlULqeWcqFksQ7lQKTqiQDxWcneyFOKVjKQ1oBXfzuT8za6qN6g9VL/xsF7MjwEVwG7gFZKbyd4f3AauO4ECvFTGI6QXBZqNA+0YXXksJClSq+JiITEpFfsoWOWvJ4ZLlfmbzo9uZgUcCLYa+G2RE0fWUUinewjDOGkDNRvN6xZPWOeY67QCaeeGRNFLtX4xg1GZa1TEbPZOoo1pKPWATsVjm/P8I/uq+jTtLbND52mrQvGsHYyeluAe+A5WcG4SvdbOii+cpQ3XJKv9oDcRhVe91wlti4fiYf4HXjwIL38FDijjl+kU6lpRyZeAh2CDVM0d9Ly1jMQieqxNqeJe7Tf/Fem3Gfl9FQAAAABJRU5ErkJggg=="
                }
            }
        },
        {
            query: {
                q: "\\overline{A}^T"
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"upper A overbar Superscript upper T\">\n  <semantics>\n    <msup>\n      <mrow class=\"MJX-TeXAtom-ORD\">\n        <mover>\n          <mi>A</mi>\n          <mo accent=\"false\">&#x00AF;<!-- ¯ --></mo>\n        </mover>\n      </mrow>\n      <mrow class=\"MJX-TeXAtom-ORD\">\n        <mi>T</mi>\n      </mrow>\n    </msup>\n    <annotation encoding=\"application/x-tex\">{\\overline {A}}^{T}</annotation>\n  </semantics>\n</math>",
                    "speech": "upper A overbar Superscript upper T",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"3.265ex\" height=\"3.509ex\" style=\"vertical-align:-.338ex\" viewBox=\"0 -1365.4 1405.8 1510.9\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>upper A overbar Superscript upper T</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M208 74q0-24 46-28 18 0 18-11 0-1-2-13-3-14-6-18t-13-4h-12q-10 0-34 1t-64 1Q70 2 50 0h-8q-7 7-7 11 2 27 13 35h14q70 3 102 50 6 6 181 305t178 303q7 12 24 12h25q6-9 6-10l28-323q28-323 30-326 5-11 65-11 25 0 25-10 0-2-3-14-3-15-5-18t-14-4h-14q-11 0-39 1t-73 1q-94 0-123-2h-12q-6 6-6 9t2 18q4 13 6 16l4 3h20q54 3 64 17l-12 150H283l-34-58q-41-69-41-81zm308 186q0 11-12 156t-14 146l-27-43q-16-27-63-107l-90-152 103-1q103 0 103 1z\"/><path stroke-width=\"10\" id=\"b\" d=\"M69 544v46h361v-46H69z\"/><path stroke-width=\"10\" id=\"c\" d=\"M40 437q-19 0-19 8 0 5 16 56t34 101l17 49q5 18 13 26h558q32 0 38-1t7-9q0-6-17-114t-19-109q0-7-19-7h-12q-3 0-6 5l-2 3q0 6 6 45t6 61q0 35-13 53t-55 25q-5 1-58 2-46 0-58-1t-18-8q-1-1-71-279T298 60q0-12 88-14 32 0 41-1t9-9q0-5-3-14-4-18-9-21l-2-1h-7q-5 0-52 1T228 2Q99 2 64 0H49q-6 6-6 9t2 18q4 13 10 19h39q80 0 95 9 1 1 2 1 5 3 10 20t40 157q17 68 28 111 70 275 70 281 0 5-29 5h-31q-67 0-88-6-45-10-70-41T67 467q-7-22-10-26t-14-4h-3z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\" x=\"24\"/><g transform=\"translate(0,548)\"><use transform=\"scale(0.707)\" xlink:href=\"#b\" x=\"-74\"/><use transform=\"translate(205.15280868766467,0) scale(0.9577042647969157,1) scale(0.707)\" xlink:href=\"#b\"/><use transform=\"scale(0.707)\" xlink:href=\"#b\" x=\"632\"/></g><use transform=\"scale(0.707)\" xlink:href=\"#c\" x=\"1137\" y=\"1130\"/></g></svg>",
                    "mathoidStyle": "vertical-align: -0.338ex; width:3.265ex; height:3.509ex;",
                    "success": true,
                    "log": "success",
                    "sanetex": "{\\overline {A}}^{T}",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAdpJREFUeNq9lksoRFEYx+eBJgZDYZSaMR4LC3kkyoKyURYWsrGRsrDRJAsLSxnKwnMlUyykPBZKNh5llrJAYfJayXJE0owY/qf+U6drHs04c7/6de8557vzn+873/nuNRrU2SpwxFnPAJtgUQxMikRtoBe8gXtwA9rBOzgHz6AFHMv/QoUtgxPQDayM/gucggn6NIKryAOqInaCC963gjzwAA4knxf5AaNBvYkIB8Et6GDkf8yUBuESYAdPsUQjezwFLFHW5jVjdxSfMBjVzInKDoFrQ4ISt3OPZPsE/Zq5GpClmQtqxmWgGNyBo0TCAwrT3ANcPEJn8RzNigSnwTBoApXMhCisKuCLFbEKKwUBIo7RN4OyqEqlqIcxFT+U7HHaAuMqhJNJtei9DSBb74jnJFGHXsJ9rNYAx/V6Cc8CL197ugl72HNnwAfnatMtLF7wQ2CXTT/EeUu6hTfAI1jg+FUP4TbQDNaBX/NSsKXzHHu57iY/IJdrmYw6qFrYw6h2NPNFoIt92CllQolwBT9dtllYsi3xmk8/v6o9trKgLsFKFP99XgvZUFI2s9QCRRGNsB8buaeHku8a6ATlzFQOv5X3/pPqSVDAluhjKqs1vnXSepjF5Uo14l/ROFUWi7u3iAAAAABJRU5ErkJggg=="
                }
            }
        },
        {
            query: {
                q: "\\sum_{i=0}^\\infty i^{-2} = 2",
                type: "inline-tex"
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" alttext=\"sigma-summation Underscript i equals 0 Overscript normal infinity Endscripts i Superscript negative 2 Baseline equals 2\">\n  <semantics>\n    <mrow>\n      <munderover>\n        <mo>&#x2211;<!-- ∑ --></mo>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mi>i</mi>\n          <mo>=</mo>\n          <mn>0</mn>\n        </mrow>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mi mathvariant=\"normal\">&#x221E;<!-- ∞ --></mi>\n        </mrow>\n      </munderover>\n      <msup>\n        <mi>i</mi>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mo>&#x2212;<!-- − --></mo>\n          <mn>2</mn>\n        </mrow>\n      </msup>\n      <mo>=</mo>\n      <mn>2</mn>\n    </mrow>\n    <annotation encoding=\"application/x-tex\">\\sum _{i=0}^{\\infty }i^{-2}=2</annotation>\n  </semantics>\n</math>",
                    "speech": "sigma-summation Underscript i equals 0 Overscript normal infinity Endscripts i Superscript negative 2 Baseline equals 2",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"13.216ex\" height=\"3.176ex\" style=\"vertical-align:-1.005ex\" viewBox=\"0 -934.9 5690.2 1367.4\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>sigma-summation Underscript i equals 0 Overscript normal infinity Endscripts i Superscript negative 2 Baseline equals 2</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M61 748q3 2 428 2h424l41-110q11-31 22-61t17-46 6-17h-20l-20 1q-23 62-73 104t-109 61q-53 18-122 23t-219 5H319q-136 0-136-1 3-3 165-225t163-225q6-9 2-15l-23-28q-24-28-70-82T330 27L149-187q0-1 213-1h74q48 0 70-1 173 0 272 27T936-43q10 16 23 49h40l-86-255-424-1q-424 0-427 2-6 2-6 9 0 5 62 78 68 80 127 150l183 217q0 1-186 256L57 717l-1 11q0 16 5 20z\"/><path stroke-width=\"10\" id=\"b\" d=\"M55 217q0 88 56 156t143 69q88 0 165-61 38-31 74-78l14-19 7 10q104 148 233 148 86 0 141-68t56-160q0-86-55-155T743-11q-86 0-163 61-38 31-74 78l-14 19-7-10Q381-11 252-11q-86 0-141 68T55 217zm852 0q0 68-38 124t-108 56q-21 0-41-5t-38-14-34-19-29-24-25-25-20-25-15-22-11-17l-5-8 31-40q31-40 48-60t42-44 50-33 51-10q62 0 102 49t40 117zm-815-3q0-69 39-125t108-56q118 0 217 160l-31 40q-61 79-91 104-49 43-101 43-62 0-101-49T92 214z\"/><path stroke-width=\"10\" id=\"c\" d=\"M184 600q0 24 19 42t44 19q18 0 30-12t13-30q0-23-20-42t-44-20q-15 0-28 10t-14 33zM21 287q0 8 9 31t24 51 44 51 60 22q39 0 65-23t27-62q0-17-14-56t-40-105-42-113q-5-22-5-32 0-25 17-25 9 0 19 3t23 14 27 35 25 59q3 12 5 14t17 2q20 0 20-10 0-8-9-31t-25-51-45-50-62-22q-32 0-59 21T74 74q0 17 5 32t43 114q38 101 44 121t7 39q0 24-17 24h-2q-30 0-55-33t-38-84q-1-1-2-3t-1-3-2-2-3-1-4 0-8 0H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"d\" d=\"M56 347q0 13 14 20h637q15-8 15-20 0-11-14-19l-318-1H72q-16 5-16 20zm0-194q0 15 16 20h636q14-10 14-20 0-13-15-20H70q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"e\" d=\"M96 585q56 81 153 81 48 0 96-26t78-92q37-83 37-228 0-155-43-237-20-42-55-67t-61-31-51-7q-26 0-52 6t-61 32-55 67q-43 82-43 237 0 174 57 265zm225 12q-30 32-71 32-42 0-72-32-25-26-33-72t-8-192q0-158 8-208t36-79q28-30 69-30 40 0 68 30 29 30 36 84t8 203q0 145-8 191t-33 73z\"/><path stroke-width=\"10\" id=\"f\" d=\"M84 237v13l14 20h581q15-8 15-20t-15-20H98q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"g\" d=\"M109 429q-27 0-43 18t-16 44q0 71 53 123t132 52q91 0 152-56t62-145q0-43-20-82t-48-68-80-74q-36-31-100-92l-59-56 76-1q157 0 167 5 7 2 24 89v3h40v-3q-1-3-13-91T421 3V0H50v31q0 7 6 15t30 35q29 32 50 56 9 10 34 37t34 37 29 33 28 34 23 30 21 32 15 29 13 32 7 30 3 33q0 63-34 109t-97 46q-33 0-58-17t-35-33-10-19q0-1 5-1 18 0 37-14t19-46q0-25-16-42t-45-18z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\"/><use transform=\"scale(0.707)\" xlink:href=\"#b\" x=\"1500\" y=\"688\"/><g transform=\"translate(1061,-296) scale(0.707)\"><use xlink:href=\"#c\"/><use xlink:href=\"#d\" x=\"350\"/><use xlink:href=\"#e\" x=\"1133\"/></g><g transform=\"translate(2485,0)\"><use xlink:href=\"#c\"/><g transform=\"translate(350,362) scale(0.707)\"><use xlink:href=\"#f\"/><use xlink:href=\"#g\" x=\"783\"/></g></g><use xlink:href=\"#d\" x=\"4124\"/><use xlink:href=\"#g\" x=\"5185\"/></g></svg>",
                    "mathoidStyle": "vertical-align: -1.005ex; width:13.216ex; height:3.176ex;",
                    "png": "data:image/png;base64,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",
                    "success": true,
                    "log": "success",
                    "sanetex": "\\sum _{i=0}^{\\infty }i^{-2}=2"
                }
            }
        }, {
            query: {
                q: "\\pagecolor{Gray}x^2" //T107578
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"x squared\">\n  <semantics>\n    <msup>\n      <mi>x</mi>\n      <mrow class=\"MJX-TeXAtom-ORD\">\n        <mn>2</mn>\n      </mrow>\n    </msup>\n    <annotation encoding=\"application/x-tex\">\\pagecolor {Gray}x^{2}</annotation>\n  </semantics>\n</math>",
                    "speech": "x squared",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2.402ex\" height=\"2.676ex\" style=\"vertical-align:-.338ex\" viewBox=\"0 -1006.6 1034.1 1152.1\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>x squared</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M52 289q7 42 54 97t116 56q35 0 64-18t43-45q42 63 101 63 37 0 64-22t28-59q0-29-14-47t-27-22-23-4q-19 0-31 11t-12 29q0 46 50 63-11 13-40 13-13 0-19-2-38-16-56-66-60-221-60-258 0-28 16-40t35-12q37 0 73 33t49 81q3 10 6 11t16 2h4q15 0 15-8 0-1-2-11-16-57-62-101T333-11q-70 0-106 63-41-62-94-62h-6q-49 0-70 26T35 71q0 32 19 52t45 20q43 0 43-42 0-20-12-35t-23-20-13-5l-3-1q0-1 6-4t16-7 19-3q36 0 62 45 9 16 23 68t28 108 16 66q5 27 5 39 0 28-15 40t-34 12q-40 0-75-32t-49-82q-2-9-5-10t-16-2H58q-6 6-6 11z\"/><path stroke-width=\"10\" id=\"b\" d=\"M109 429q-27 0-43 18t-16 44q0 71 53 123t132 52q91 0 152-56t62-145q0-43-20-82t-48-68-80-74q-36-31-100-92l-59-56 76-1q157 0 167 5 7 2 24 89v3h40v-3q-1-3-13-91T421 3V0H50v31q0 7 6 15t30 35q29 32 50 56 9 10 34 37t34 37 29 33 28 34 23 30 21 32 15 29 13 32 7 30 3 33q0 63-34 109t-97 46q-33 0-58-17t-35-33-10-19q0-1 5-1 18 0 37-14t19-46q0-25-16-42t-45-18z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\"/><use transform=\"scale(0.707)\" xlink:href=\"#b\" x=\"816\" y=\"583\"/></g></svg>",
                    "mathoidStyle": "vertical-align: -0.338ex; width:2.402ex; height:2.676ex;",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAYAAAD+vg1LAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAaBJREFUeNrd1U8oRFEUx/ExhAmlaJAopfzPRhZsLESSUhI1C1L+pCwkFElKaqJYkRWykX+lFBsLJRZsZCdmQcTOwoKSfG/9Xt0FNfPGhlufmvfenfPOO/fc9zyevzZiXP4vERMoRgjjeIs2cDIOkI5rVOET5XhyJsW6CDyMFhyjFVfoRDVWnEleF4EzkYAiHR8q0xx7UpyLwAPwY0jHQZXlJtrAZrRZv0u0Vt32BG+UXbWIWtTj/LcCz2vx+nCCud8InIE6bGEDy2j+qcZmAXqRjSPs6HwjGjCt1R9FP9IQQDvicfldYLOTlrQQptk7MIIL9eijalmjHRYSe5x9t/MmVa9TZbOuTJ6xpszMkyxgMJxaOTVu0vY0QT+QqvOmJCnq21v1bFjDKYV55AcF9Sg7MzaxpxtGNJzAfda5fGTpRsdue9Fr7f9ZVKBHHXKPF12fwlikGZsM9+FDEvJ07c6aU6benYkkY/MyKVCWq6jUtXcFNc1fqptH9AUp1KvvFbnYVXC/ejVZ79yAtbhhf5rM9uzCtqSrrj4tYlA3/sfjC5J2TliDFozKAAAAAElFTkSuQmCC",
                    "success": true,
                    "log": "success",
                    "sanetex": "\\pagecolor {Gray}x^{2}"
                }
            }
        }, {
            query: {
                q: "\\definecolor{myorange}{RGB}{255,165,100}\\color{myorange}e^{i \\pi}\\color{Black} = -1" //T107765
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" alttext=\"e Superscript i pi Baseline equals negative 1\">\n  <semantics>\n    <mstyle mathcolor=\"#ffa564\">\n      <msup>\n        <mi>e</mi>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mi>i</mi>\n          <mi>&#x03C0;<!-- π --></mi>\n        </mrow>\n      </msup>\n      <mstyle mathcolor=\"#221E1F\">\n        <mo>=</mo>\n        <mo>&#x2212;<!-- − --></mo>\n        <mn>1</mn>\n      </mstyle>\n    </mstyle>\n    <annotation encoding=\"application/x-tex\">\\definecolor {myorange}{rgb}{1,0.6470588235294118,0.39215686274509803}\\color {myorange}e^{i\\pi }\\color {Black}=-1</annotation>\n  </semantics>\n</math>",
                    "speech": "e Superscript i pi Baseline equals negative 1",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"8.951ex\" height=\"2.676ex\" style=\"vertical-align:-.338ex\" viewBox=\"0 -1006.6 3853.8 1152.1\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>e Superscript i pi Baseline equals negative 1</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M39 168q0 57 19 104t49 78 67 52 70 31 63 9h3q45 0 78-22t33-65q0-90-111-118-49-13-134-14-37 0-38-2 0-2-6-35t-7-58q0-47 21-74t63-28 93 19 92 66q9 10 12 10 4 0 13-9t10-14-9-16-30-27-46-31-63-25-76-10q-79 0-122 53T39 168zm334 185q-6 52-68 52-33 0-61-14t-45-34-29-41-16-36-5-19q0-1 20-1 113 0 158 24t46 69z\"/><path stroke-width=\"10\" id=\"b\" d=\"M184 600q0 24 19 42t44 19q18 0 30-12t13-30q0-23-20-42t-44-20q-15 0-28 10t-14 33zM21 287q0 8 9 31t24 51 44 51 60 22q39 0 65-23t27-62q0-17-14-56t-40-105-42-113q-5-22-5-32 0-25 17-25 9 0 19 3t23 14 27 35 25 59q3 12 5 14t17 2q20 0 20-10 0-8-9-31t-25-51-45-50-62-22q-32 0-59 21T74 74q0 17 5 32t43 114q38 101 44 121t7 39q0 24-17 24h-2q-30 0-55-33t-38-84q-1-1-2-3t-1-3-2-2-3-1-4 0-8 0H27q-6 6-6 9z\"/><path stroke-width=\"10\" id=\"c\" d=\"M132-11q-34 0-34 33v11l13 28q75 158 109 273l8 24h-32q-38 0-54-3t-39-19q-11-7-22-18t-19-21-9-12q-2-1-15-1-19 0-19 10 0 6 19 35t55 62 71 38q7 2 225 2 160 0 164-1 20-7 20-28 0-31-32-42-6-2-69-2h-64l-3-17q-12-72-12-119 0-52 9-93t19-64 10-28q0-17-14-32t-36-15q-11 0-18 3t-16 24-16 60q-1 9-1 44 0 49 9 105t18 92 10 40h-98l-1-4q0-3-19-79t-43-161-31-97q-11-28-43-28z\"/><path stroke-width=\"10\" id=\"d\" d=\"M56 347q0 13 14 20h637q15-8 15-20 0-11-14-19l-318-1H72q-16 5-16 20zm0-194q0 15 16 20h636q14-10 14-20 0-13-15-20H70q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"e\" d=\"M84 237v13l14 20h581q15-8 15-20t-15-20H98q-14 7-14 20z\"/><path stroke-width=\"10\" id=\"f\" d=\"M213 578l-13-5q-14-5-40-10t-58-7H83v46h19q47 2 87 15t56 24 28 22q2 3 12 3 9 0 17-6V361l1-300q7-7 12-9t24-4 62-2h26V0h-11q-21 3-159 3-136 0-157-3H88v46h64q16 0 25 1t16 3 8 2 6 5 6 4v517z\"/></defs><g fill=\"#ffa564\" stroke=\"#ffa564\" stroke-width=\"0\"><use xlink:href=\"#a\" transform=\"matrix(1 0 0 -1 0 0)\"/><use transform=\"matrix(1 0 0 -1 0 0) translate(471,412) scale(0.707)\" xlink:href=\"#b\"/><use transform=\"matrix(1 0 0 -1 0 0) translate(471,412) translate(247,0) scale(0.707)\" xlink:href=\"#c\"/><g fill=\"#221E1F\" stroke=\"#221E1F\"><use xlink:href=\"#d\" transform=\"matrix(1 0 0 -1 0 0) translate(1504,0)\"/><use xlink:href=\"#e\" transform=\"matrix(1 0 0 -1 0 0) translate(1504,0) translate(1060,0)\"/><use xlink:href=\"#f\" transform=\"matrix(1 0 0 -1 0 0) translate(1504,0) translate(1843,0)\"/></g></g></svg>",
                    "mathoidStyle": "vertical-align: -0.338ex; width:8.951ex; height:2.676ex;",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAYCAYAAACC2BGSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAA5hJREFUeNrtmFtIFGEUx8+ZnVUrCwqpWPfiJezyEEESSFTWQ5enKDTKrbQ0HwqKqPDBQkMqougCJeUmQbE++OJTvVQYPQQVhQoJkau7s2oZdCHMst3m9N91KqQId2nNy3zwXXf2m5nfd77/Od8QmclMYyFxrH+QxpK5FLKeRusFu6+dNBESKTH/I2S5BIA7wX+JiW8oqbHbruUoiVjIGtpv4otjO0e3clitIDXpGG+p7TfxxWiJ4i2toRDtJqEBCoVyMbRiSB9V6COtg3UmD18aRimt7K5fZUL8CYZzAPAuAGUATnp0LBwByMvQv01KVCPbkOeQ8GvU/cQyMFFA5dhsaWGr9R7r+h1fMHg4Tk2EDhJAEs1GbjfIhjHeTDo1wkUVkM2+jHq7nwJ0Gxd5KsY7uCyn83zUSJjSwkLZMCILjOlZ3N6Zi+oLMFkHmjZM1jE05ilFmLMXU5ej6+PV1eGoJeqiTxQLFKGPyE/Qav9XIc5i5EekSAs00hO9yc2yfEC1oeU3bgttlJkTAWCnph3sCgY2dGmB7cz8dsSaKN6yjShXgm8Suo/Z7bn560eaHlFCEuUQOm2GE9mMMg/Xlxn9EIrsSemdjfDlLEDZse/nE+l9cBDFsLhKUqzredsVP0XMmikXDuMRqWFDXDkJNv+Qt/+AzU9RvJ10caI0V6vU29MEGGvgZV/SlGn5vOnCB2koT8NYHxzHOd7hOZIQ8Xa4arEoebGLFbd3BgPu0QKV7XI1QxvzmeSGT9OKf7fEVz04fQAgc/8PgEMPqi8H50G8pD9h506Wy0LKLFj+59gEX978H7PjGX/ezroUwian4tF6aeDTdfHumYqntEVjQl1uUbr9aqKeqUPTnqPamoi5MxyuBizSwhHzEcUiojd1dmtV8WhihlH7iXUFjuMdpgyQrp+ldIfXCF3GXbKQDKJqGbF1K5KqhL954nMsLCnECryuPEY8WDmaL5rpdNYhzloqMYZbEPNWaFPJ367xBbVdo+edmT9hHVSyJp0atjIRh9PT4wXk1kR9O8Qx6KLOXM0iMX3QEOH3YyvEEbqP0k2hrydQH/jlsYMPADgrkY7F0MTCsSwLmQ5XDc5gUyLmrwupOA5WIRA/PjzEuV6SQsnqM1yBkwb7sbFSAdaBXxErylp21wcm4yeueU5noU5ch2aKkQ1ojAOFdPi0wKKfEKMgG8oXANg+wANA6SS7/Qwcyhcyk5nMNE7Sd0tkWGpKD0igAAAAAElFTkSuQmCC",
                    "success": true,
                    "log": "success",
                    "sanetex": "\\definecolor {myorange}{rgb}{1,0.6470588235294118,0.39215686274509803}\\color {myorange}e^{i\\pi }\\color {Black}=-1"
                }
            }
        }, {
            query: {
                q: "\\ce{H2O}",
                type: "chem"
            },
            response: {
                status: 200,
                body: {
                    "mml": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" alttext=\"upper H Subscript 2 Superscript Baseline upper O\">\n  <semantics>\n    <mrow class=\"MJX-TeXAtom-ORD\">\n      <msubsup>\n        <mtext>H</mtext>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mn>2</mn>\n        </mrow>\n        <mrow class=\"MJX-TeXAtom-ORD\">\n          <mspace width=\"0pt\" height=\"0pt\" depth=\".2em\" />\n        </mrow>\n      </msubsup>\n      <mtext>O</mtext>\n    </mrow>\n    <annotation encoding=\"application/x-tex\">{\\ce {H2O}}</annotation>\n  </semantics>\n</math>",
                    "speakText": "upper H Subscript 2 Superscript Baseline upper O",
                    "svg": "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"4.634ex\" height=\"2.843ex\" style=\"vertical-align:-1.005ex\" viewBox=\"0 -791.3 1995.1 1223.9\" xmlns=\"http://www.w3.org/2000/svg\"><title>Equation</title><desc>upper H Subscript 2 Superscript Baseline upper O</desc><defs><path stroke-width=\"10\" id=\"a\" d=\"M128 622q-7 7-11 9t-16 3-43 3H25v46h11q21-3 144-3 135 0 144 3h11v-46h-33q-40-1-51-3t-18-12l-1-122V378h285v244q-7 7-11 9t-16 3-43 3h-33v46h11q21-3 144-3 135 0 144 3h11v-46h-33q-40-1-51-3t-18-12V61q6-10 17-12t52-3h33V0h-11q-21 3-144 3-135 0-144-3h-11v46h33q42 1 51 3t19 12v271H232V197l1-136q6-10 17-12t52-3h33V0h-11q-21 3-144 3Q45 3 36 0H25v46h33q42 1 51 3t19 12v561z\"/><path stroke-width=\"10\" id=\"b\" d=\"M109 429q-27 0-43 18t-16 44q0 71 53 123t132 52q91 0 152-56t62-145q0-43-20-82t-48-68-80-74q-36-31-100-92l-59-56 76-1q157 0 167 5 7 2 24 89v3h40v-3q-1-3-13-91T421 3V0H50v31q0 7 6 15t30 35q29 32 50 56 9 10 34 37t34 37 29 33 28 34 23 30 21 32 15 29 13 32 7 30 3 33q0 63-34 109t-97 46q-33 0-58-17t-35-33-10-19q0-1 5-1 18 0 37-14t19-46q0-25-16-42t-45-18z\"/><path stroke-width=\"10\" id=\"c\" d=\"M56 340q0 83 30 154t78 116 106 70 118 25q133 0 233-104t101-260q0-81-29-150T617 75 510 4 388-22 267 3 160 74 85 189 56 340zm411 307q-41 18-79 18-28 0-57-11t-62-34-56-71-34-110q-5-28-5-85 0-210 103-293 50-41 108-41h6q83 0 146 79 66 89 66 255 0 57-5 85-21 153-131 208z\"/></defs><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><use xlink:href=\"#a\"/><use transform=\"scale(0.707)\" xlink:href=\"#b\" x=\"1067\" y=\"-444\"/><use xlink:href=\"#c\" x=\"1212\"/></g></svg>",
                    "mathoidStyle": "vertical-align: -1.005ex; width:4.634ex; height:2.843ex;",
                    "png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAaCAYAAADBuc72AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAopJREFUeNrtl1uITlEUx49LjFumkUwu86K+UWRQiqYot5HrA0qEMY0oaeTuhQclHkhTiojRKCkvUhrXxCSUIRHRjIgil0a5jGHwW9P/1Ol09jjmO775lFW/zv722efb/73O2mvt43n/iHXKAg0TYCD8gPPQ6BK6HVLwLXSvFxyEITADPoXu58A5ONoOcV2hGDbBWHgLXzXnNaiAj8EHusAw6AxDYT4UwhV4Bw36UxOVC0tgFDyEZ/AcHvyhyHGwAiqhDg7DKqiWuDIJrYE3QaG34SL0h+kSWKK+BgmxdjctxGwn7GuHSFvwWnnyOCyHO3rtzdJyCxZJ8En44MmTmbRJsBJew2rHmFqFU5687XWE0Ap51UKrqY1xe6EFpsDkTAsdDOPVrvvN2FeB+Czzd1/YLG4XRvTnpyl0JvRR+2WM8S80Z4FLaF/YHNHfPU2hPQLtlpgpzKy3S+h7GB3Rb14+kYbQZodol/UMPpfJGK0NtAtixrTZo0wLvQdP1U453qZvCwIevZ6kUJt0K1TBBlWxKPNDZ6JwFYVitS35n05KqIl8ovYlKIWb/iYI2SG4AYNUNqPGzINZyrNHlKpaU9FiJdURMEY7skk12f5opEprKrBSe4XDlT6mwVS4ICFWr8vhJ1wOiWhUasqXGDtnnNWGsQXPhfWK4f2wR+W19WaRJjK7q+syXTfCgMBv/74//oAWmxvwzmddixxvoEZetRK6Dh6rxvfTM1fl7VPw/W+eR9foZLQbtsQYP1snty86/NS3lVSTtFJ5flfM8WfiboQkrVoxXuI6qXe0WUo5pk+JHAktT3KCpDxapfPjHG2AQu3orPq4W6rdH67fO2Bbtnm0MqLvvvffsth+AUcpgjAhHTreAAAAAElFTkSuQmCC",
                    "success": true,
                    "log": "success",
                    "sanetex": "{\\ce {H2O}}",
                    "speech": "upper H Subscript 2 Superscript Baseline upper O"
                }
            }
        }
    ]
    ;


describe('Simple Mathoid API tests', function () {
    before(function (cb) {
        server.start();
        // Wait for MathJax startup, as that's somewhat async but has a sync
        // interface
        setTimeout(cb, 1000);
    });

    describe('Standard input / output pairs', function () {
        testData.forEach(function (data) {
            it(data.query.q, function () {
                this.timeout(30000);
                return preq.post({
                    uri: baseURL,
                    body: data.query
                }).then(function (res) {
                    assert.status(res, data.response.status);
                    Object.keys(data.response.body).forEach(function (key) {
                        if (key === 'png') {
                            assert.notDeepEqual(res.body.png, undefined);
                            assert.notDeepEqual(res.body.png.length, 0);
                        } else {
                            assert.deepEqual(res.body[key], data.response.body[key]);
                        }
                    });
                });
            });
        });
    });
    describe('annotation security', function () {
        it("annotation xml should be properly escaped", function () {
            this.timeout(4000);
            return preq.post({
                uri: baseURL,
                body: {
                    q: "\\mathrm{</annotation-xml><script>alert('test');</script>}",
                    nospeech: true
                }
            }).then(function (res) {
                assert.status(res, 200);
                assert.deepEqual(res.body.mml, "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">\n  <semantics>\n    <mrow class=\"MJX-TeXAtom-ORD\">\n      <mo>&lt;</mo>\n      <mrow class=\"MJX-TeXAtom-ORD\">\n        <mo>/</mo>\n      </mrow>\n      <mi mathvariant=\"normal\">a</mi>\n      <mi mathvariant=\"normal\">n</mi>\n      <mi mathvariant=\"normal\">n</mi>\n      <mi mathvariant=\"normal\">o</mi>\n      <mi mathvariant=\"normal\">t</mi>\n      <mi mathvariant=\"normal\">a</mi>\n      <mi mathvariant=\"normal\">t</mi>\n      <mi mathvariant=\"normal\">i</mi>\n      <mi mathvariant=\"normal\">o</mi>\n      <mi mathvariant=\"normal\">n</mi>\n      <mo>&#x2212;<!-- − --></mo>\n      <mi mathvariant=\"normal\">x</mi>\n      <mi mathvariant=\"normal\">m</mi>\n      <mi mathvariant=\"normal\">l</mi>\n      <mo>&gt;&lt;</mo>\n      <mi mathvariant=\"normal\">s</mi>\n      <mi mathvariant=\"normal\">c</mi>\n      <mi mathvariant=\"normal\">r</mi>\n      <mi mathvariant=\"normal\">i</mi>\n      <mi mathvariant=\"normal\">p</mi>\n      <mi mathvariant=\"normal\">t</mi>\n      <mo>&gt;</mo>\n      <mi mathvariant=\"normal\">a</mi>\n      <mi mathvariant=\"normal\">l</mi>\n      <mi mathvariant=\"normal\">e</mi>\n      <mi mathvariant=\"normal\">r</mi>\n      <mi mathvariant=\"normal\">t</mi>\n      <msup>\n        <mo stretchy=\"false\">(</mo>\n        <mo>&#x2032;</mo>\n      </msup>\n      <mi mathvariant=\"normal\">t</mi>\n      <mi mathvariant=\"normal\">e</mi>\n      <mi mathvariant=\"normal\">s</mi>\n      <msup>\n        <mi mathvariant=\"normal\">t</mi>\n        <mo>&#x2032;</mo>\n      </msup>\n      <mo stretchy=\"false\">)</mo>\n      <mo>;</mo>\n      <mo>&lt;</mo>\n      <mrow class=\"MJX-TeXAtom-ORD\">\n        <mo>/</mo>\n      </mrow>\n      <mi mathvariant=\"normal\">s</mi>\n      <mi mathvariant=\"normal\">c</mi>\n      <mi mathvariant=\"normal\">r</mi>\n      <mi mathvariant=\"normal\">i</mi>\n      <mi mathvariant=\"normal\">p</mi>\n      <mi mathvariant=\"normal\">t</mi>\n      <mo>&gt;</mo>\n    </mrow>\n    <annotation encoding=\"application/x-tex\">\\mathrm {&lt;/annotation-xml&gt;&lt;script&gt;alert('test');&lt;/script&gt;}</annotation>\n  </semantics>\n</math>");
                assert.deepEqual(res.body.sanetex, "\\mathrm {</annotation-xml><script>alert('test');</script>} ");
            });
        });
    });
    describe('query parameter', function () {
        it("missing q parameter should return 400", function () {
            return preq.post({
                uri: baseURL,
                body: {}
            }).then(function (res) {
                // if we are here, no error was thrown, not good
                throw new Error('Expected an error to be thrown, got status: ' + res.status);
            }, function (res) {
                assert.status(res, 400);
                assert.deepEqual(res.body.error, "q (query) post parameter is missing!");
            });
        });
        it("reject invalid tex input", function () {
            return preq.post({
                uri: baseURL,
                body: {q: "\\newcommand{\\commandname}{buh}"}
            }).then(function (res) {
                // if we are here, no error was thrown, not good
                throw new Error('Expected an error to be thrown, got status: ' + res.status);
            }, function (res) {
                assert.status(res, 400);
                assert.deepEqual(res.body.success, false);
                assert.deepEqual(res.body.error, "SyntaxError: \\Illegal TeX function");
                assert.deepEqual(res.body.detail.error.found, "\\newcommand");
                assert.deepEqual(res.body.detail.error.location.end.column, 12);
            });
        });
        it("reject use of \\ce commands without chemistry mode enabled", function () {
            return preq.post({
                uri: baseURL,
                body: {q: "\\ce{H2O}"}
            }).then(function (res) {
                // if we are here, no error was thrown, not good
                throw new Error('Expected an error to be thrown, got status: ' + res.status);
            }, function (res) {
                assert.status(res, 400);
                assert.deepEqual(res.body.success, false);
                assert.deepEqual(res.body.detail.error.found, "\\ce");
                assert.deepEqual(res.body.error, "SyntaxError: Attempting to use the $\\ce$ command outside of a chemistry environment.");
            });
        });
        it("reject invalid input type", function () {
            return preq.post({
                uri: baseURL,
                body: {q: "E=mc^2}", type: "invalid"}
            }).then(function (res) {
                // if we are here, no error was thrown, not good
                throw new Error('Expected an error to be thrown, got status: ' + res.status);
            }, function (res) {
                assert.status(res, 400);
                assert.deepEqual(res.body.success, false);
                assert.deepEqual(res.body.detail, "Input format \"invalid\" is not recognized!");
            });
        });
        it("display texvcinfo", function () {
            return preq.post({
                uri: baseURL + "texvcinfo",
                body: {q: "\\mathcal{S}"}
            }).then(function (res) {
                assert.status(res, 200);
                assert.ok(res.body.identifiers.indexOf("\\mathcal{S}") === 0);
            });
        });
        it("display graph", function () {
            return preq.post({
                uri: baseURL + "graph",
                body: {q: "\\frac{a}{b}"}
            }).then(function (res) {
                assert.status(res, 200);
                assert.notDeepEqual(res.body.name === 'root');
            });
        });
        it("get speech text", function () {
            return preq.post({
                uri: baseURL + "speech",
                body: {q: "E=mc^2"}
            }).then(function (res) {
                assert.status(res, 200);
                assert.deepEqual(res.body, "upper E equals m c squared");
            });
        });
        it("get svg dimensions in mathml headers", function () {
            return preq.post({
                uri: baseURL + "mml",
                body: {q: "E=mc^2"}
            }).then(function (res) {
                assert.status(res, 200);
                assert.deepEqual(res.headers['x-mathoid-style'], 'vertical-align: -0.338ex; width:9.025ex; height:2.676ex;');
            });
        });
    });

});

