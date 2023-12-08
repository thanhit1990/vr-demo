import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';
import { LineMaterial } from './src/LineMaterial.js';
import { LineGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/lines/LineGeometry.js';
import { Line2 } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/lines/Line2.js';

function drawLine(positions, colors) {
    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);
    var matLine = new LineMaterial({
        color: 0xffffff,
        linewidth: 0.002, // in pixels
        vertexColors: THREE.VertexColors,
        transparent: false,
        dashed: false,
        stencilWrite: true,
        stencilRef: 0,
        side: THREE.DoubleSide

    });

    var line = new Line2(geometry, matLine);
    line.scale.set(1, 1, 1);
    line.renderOrder = 1;
    return line;
}

var curveDataTop = [
    {
        "positions": [
            -4.103393862664365,
            -2.9364358131573702,
            5,
            -4.103393862664365,
            -2.9364358131573702,
            5,
            -4.103393862664365,
            -2.9364358131573702,
            5,
            -4.1033938626643645,
            -2.9364358131573702,
            5,
            -4.1033938626643645,
            -2.9364358131573702,
            5,
            -4.1033938626643645,
            -2.9364358131573702,
            5,
            -4.024365679327407,
            -2.839165262494136,
            5,
            -3.9453374959904504,
            -2.741894711830902,
            5,
            -3.8663093126534935,
            -2.644624161167668,
            5,
            -3.7872811293165363,
            -2.547353610504434,
            5,
            -3.7082529459795794,
            -2.4500830598412,
            5,
            -3.634780965001436,
            -2.3654459409584825,
            5,
            -3.561308984023293,
            -2.280808822075765,
            5,
            -3.48783700304515,
            -2.1961717031930474,
            5,
            -3.414365022067007,
            -2.11153458431033,
            5,
            -3.3408930410888638,
            -2.026897465427613,
            5,
            -3.272091390857005,
            -1.9532579358019149,
            5,
            -3.2032897406251464,
            -1.879618406176217,
            5,
            -3.1344880903932877,
            -1.805978876550519,
            5,
            -3.065686440161429,
            -1.732339346924821,
            5,
            -2.9968847899295703,
            -1.658699817299123,
            5,
            -2.9320189464310134,
            -1.5947359236691951,
            5,
            -2.8671531029324564,
            -1.5307720300392673,
            5,
            -2.802287259433899,
            -1.4668081364093397,
            5,
            -2.737421415935342,
            -1.4028442427794119,
            5,
            -2.672555572436785,
            -1.338880349149484,
            5,
            -2.672555572436785,
            -1.3388803491494836,
            5,
            -2.672555572436785,
            -1.3388803491494834,
            5,
            -2.672555572436785,
            -1.338880349149483,
            5,
            -2.672555572436785,
            -1.3388803491494827,
            5,
            -2.672555572436785,
            -1.3388803491494823,
            5,
            -2.6110092121986828,
            -1.283519809836206,
            5,
            -2.549462851960581,
            -1.2281592705229296,
            5,
            -2.4879164917224785,
            -1.1727987312096535,
            5,
            -2.4263701314843766,
            -1.1174381918963772,
            5,
            -2.3648237712462743,
            -1.0620776525831008,
            5,
            -2.3648237712462743,
            -1.0620776525831004,
            5,
            -2.3648237712462743,
            -1.0620776525831002,
            5,
            -2.364823771246274,
            -1.0620776525830997,
            5,
            -2.364823771246274,
            -1.0620776525830995,
            5,
            -2.364823771246274,
            -1.062077652583099,
            5,
            -2.306072593990817,
            -1.014446533114895,
            5,
            -2.2473214167353603,
            -0.966815413646691,
            5,
            -2.1885702394799034,
            -0.919184294178487,
            5,
            -2.129819062224447,
            -0.8715531747102829,
            5,
            -2.07106788496899,
            -0.823922055242079,
            5,
            -2.014660043022121,
            -0.783308029408402,
            5,
            -1.9582522010752528,
            -0.742694003574725,
            5,
            -1.9018443591283842,
            -0.7020799777410481,
            5,
            -1.8454365171815157,
            -0.6614659519073711,
            5,
            -1.7890286752346471,
            -0.6208519260736942,
            5,
            -1.7890286752346471,
            -0.6208519260736942,
            5,
            -1.7890286752346471,
            -0.6208519260736942,
            5,
            -1.789028675234647,
            -0.6208519260736942,
            4.999999999999999,
            -1.789028675234647,
            -0.6208519260736942,
            4.999999999999999,
            -1.789028675234647,
            -0.6208519260736942,
            4.999999999999999,
            -1.7345696188174144,
            -0.586675937050319,
            4.999999999999999,
            -1.680110562400182,
            -0.5524999480269436,
            5,
            -1.6256515059829495,
            -0.5183239590035683,
            5,
            -1.571192449565717,
            -0.48414796998019294,
            5.000000000000001,
            -1.5167333931484845,
            -0.4499719809568177,
            5.000000000000001,
            -1.5167333931484845,
            -0.4499719809568177,
            5.000000000000001,
            -1.5167333931484845,
            -0.4499719809568177,
            5.000000000000001,
            -1.5167333931484843,
            -0.4499719809568177,
            5,
            -1.5167333931484843,
            -0.4499719809568177,
            5,
            -1.5167333931484843,
            -0.4499719809568177,
            5,
            -1.4638736626282873,
            -0.42176680692164226,
            5,
            -1.4110139321080903,
            -0.39356163288646684,
            5,
            -1.3581542015878936,
            -0.3653564588512914,
            5,
            -1.3052944710676966,
            -0.337151284816116,
            5,
            -1.2524347405474996,
            -0.3089461107809406,
            5,
            -1.20086015663971,
            -0.28633921730331124,
            5,
            -1.1492855727319202,
            -0.2637323238256819,
            5,
            -1.0977109888241305,
            -0.24112543034805256,
            5,
            -1.0461364049163406,
            -0.21851853687042322,
            5,
            -0.9945618210085511,
            -0.19591164339279388,
            5,
            -0.9439854473863352,
            -0.1786132480915768,
            5,
            -0.8934090737641193,
            -0.1613148527903597,
            5,
            -0.8428327001419035,
            -0.14401645748914263,
            5,
            -0.7922563265196876,
            -0.12671806218792553,
            5,
            -0.7416799528974717,
            -0.10941966688670846,
            5,
            -0.7416799528974717,
            -0.10941966688670846,
            5,
            -0.7416799528974717,
            -0.10941966688670846,
            5,
            -0.7416799528974716,
            -0.10941966688670846,
            4.999999999999999,
            -0.7416799528974716,
            -0.10941966688670846,
            4.999999999999999,
            -0.7416799528974716,
            -0.10941966688670846,
            4.999999999999999,
            -0.6918353654616244,
            -0.09721291669239598,
            4.999999999999999,
            -0.6419907780257772,
            -0.0850061664980835,
            5,
            -0.59214619058993,
            -0.07279941630377103,
            5,
            -0.5423016031540828,
            -0.06059266610945854,
            5.000000000000001,
            -0.4924570157182356,
            -0.04838591591514607,
            5.000000000000001,
            -0.4924570157182356,
            -0.04838591591514572,
            5.000000000000001,
            -0.4924570157182356,
            -0.048385915915145364,
            5.000000000000001,
            -0.4924570157182355,
            -0.048385915915145,
            5,
            -0.4924570157182355,
            -0.04838591591514465,
            5,
            -0.4924570157182355,
            -0.048385915915144295,
            5,
            -0.4430924631795986,
            -0.04112081034521466,
            5,
            -0.39372791064096174,
            -0.03385570477528503,
            5,
            -0.3443633581023249,
            -0.026590599205355402,
            5,
            -0.29499880556368796,
            -0.01932549363542577,
            5,
            -0.24563425302505104,
            -0.012060388065496142,
            5,
            -0.19650740242004083,
            -0.009648310452396914,
            5,
            -0.14738055181503062,
            -0.007236232839297685,
            5,
            -0.09825370121002042,
            -0.004824155226198457,
            5,
            -0.04912685060501021,
            -0.002412077613099228,
            5,
            0,
            0,
            5,
            0.04912685060501021,
            -0.0024120776130992284,
            5,
            0.09825370121002042,
            -0.004824155226198457,
            5,
            0.14738055181503062,
            -0.007236232839297685,
            5,
            0.19650740242004083,
            -0.009648310452396914,
            5,
            0.24563425302505104,
            -0.012060388065496142,
            5,
            0.29499880556368796,
            -0.019325493635425774,
            5,
            0.3443633581023248,
            -0.026590599205355406,
            5,
            0.3937279106409617,
            -0.03385570477528503,
            5,
            0.4430924631795986,
            -0.04112081034521467,
            5,
            0.4924570157182355,
            -0.048385915915144295,
            5,
            0.4924570157182355,
            -0.04838591591514465,
            5,
            0.4924570157182355,
            -0.048385915915145,
            5,
            0.4924570157182356,
            -0.048385915915145364,
            5.000000000000001,
            0.4924570157182356,
            -0.04838591591514572,
            5.000000000000001,
            0.4924570157182356,
            -0.04838591591514607,
            5.000000000000001,
            0.5423016031540828,
            -0.06059266610945855,
            5.000000000000001,
            0.59214619058993,
            -0.07279941630377103,
            5,
            0.6419907780257772,
            -0.0850061664980835,
            5,
            0.6918353654616244,
            -0.09721291669239598,
            4.999999999999999,
            0.7416799528974716,
            -0.10941966688670846,
            4.999999999999999,
            0.7416799528974716,
            -0.10941966688670846,
            4.999999999999999,
            0.7416799528974716,
            -0.10941966688670846,
            4.999999999999999,
            0.7416799528974717,
            -0.10941966688670846,
            5,
            0.7416799528974717,
            -0.10941966688670846,
            5,
            0.7416799528974717,
            -0.10941966688670846,
            5,
            0.7922563265196876,
            -0.12671806218792553,
            5,
            0.8428327001419035,
            -0.14401645748914263,
            5,
            0.8934090737641193,
            -0.1613148527903597,
            5,
            0.9439854473863352,
            -0.1786132480915768,
            5,
            0.9945618210085511,
            -0.19591164339279388,
            5,
            1.0461364049163409,
            -0.21851853687042322,
            5,
            1.0977109888241305,
            -0.24112543034805256,
            5,
            1.1492855727319202,
            -0.2637323238256819,
            5,
            1.20086015663971,
            -0.28633921730331124,
            5,
            1.2524347405474996,
            -0.3089461107809406,
            5,
            1.3052944710676966,
            -0.337151284816116,
            5,
            1.3581542015878936,
            -0.3653564588512914,
            5,
            1.4110139321080903,
            -0.39356163288646684,
            5,
            1.4638736626282873,
            -0.42176680692164226,
            5,
            1.5167333931484843,
            -0.4499719809568177,
            5,
            1.5167333931484843,
            -0.4499719809568177,
            5,
            1.5167333931484843,
            -0.4499719809568177,
            5,
            1.5167333931484845,
            -0.4499719809568177,
            5.000000000000001,
            1.5167333931484845,
            -0.4499719809568177,
            5.000000000000001,
            1.5167333931484845,
            -0.4499719809568177,
            5.000000000000001,
            1.571192449565717,
            -0.484147969980193,
            5.000000000000001,
            1.6256515059829495,
            -0.5183239590035683,
            5,
            1.680110562400182,
            -0.5524999480269436,
            5,
            1.7345696188174144,
            -0.586675937050319,
            4.999999999999999,
            1.789028675234647,
            -0.6208519260736942,
            4.999999999999999,
            1.789028675234647,
            -0.6208519260736942,
            4.999999999999999,
            1.789028675234647,
            -0.6208519260736942,
            4.999999999999999,
            1.7890286752346471,
            -0.6208519260736942,
            5,
            1.7890286752346471,
            -0.6208519260736942,
            5,
            1.7890286752346471,
            -0.6208519260736942,
            5,
            1.8454365171815157,
            -0.6614659519073711,
            5,
            1.9018443591283842,
            -0.7020799777410481,
            5,
            1.9582522010752528,
            -0.742694003574725,
            5,
            2.014660043022121,
            -0.783308029408402,
            5,
            2.07106788496899,
            -0.823922055242079,
            5,
            2.129819062224447,
            -0.8715531747102829,
            5,
            2.1885702394799034,
            -0.919184294178487,
            5,
            2.2473214167353603,
            -0.966815413646691,
            5,
            2.306072593990817,
            -1.014446533114895,
            5,
            2.364823771246274,
            -1.062077652583099,
            5,
            2.364823771246274,
            -1.0620776525830995,
            5,
            2.364823771246274,
            -1.0620776525830997,
            5,
            2.3648237712462743,
            -1.0620776525831002,
            5,
            2.3648237712462743,
            -1.0620776525831004,
            5,
            2.3648237712462743,
            -1.0620776525831008,
            5,
            2.4263701314843766,
            -1.1174381918963774,
            5,
            2.4879164917224785,
            -1.1727987312096542,
            5,
            2.549462851960581,
            -1.2281592705229307,
            5,
            2.6110092121986828,
            -1.2835198098362075,
            5,
            2.672555572436785,
            -1.338880349149484,
            5,
            2.672555572436785,
            -1.3388803491494836,
            5,
            2.672555572436785,
            -1.3388803491494834,
            5,
            2.672555572436785,
            -1.338880349149483,
            5,
            2.672555572436785,
            -1.3388803491494827,
            5,
            2.672555572436785,
            -1.3388803491494823,
            5,
            2.737421415935342,
            -1.4028442427794103,
            5,
            2.802287259433899,
            -1.4668081364093386,
            5,
            2.8671531029324564,
            -1.5307720300392667,
            5,
            2.9320189464310134,
            -1.594735923669195,
            5,
            2.9968847899295703,
            -1.658699817299123,
            5,
            3.065686440161429,
            -1.732339346924821,
            5,
            3.1344880903932877,
            -1.805978876550519,
            5,
            3.2032897406251464,
            -1.879618406176217,
            5,
            3.272091390857005,
            -1.9532579358019149,
            5,
            3.3408930410888638,
            -2.026897465427613,
            5,
            3.414365022067007,
            -2.11153458431033,
            5,
            3.48783700304515,
            -2.1961717031930474,
            5,
            3.561308984023293,
            -2.280808822075765,
            5,
            3.634780965001436,
            -2.3654459409584825,
            5,
            3.7082529459795794,
            -2.4500830598412,
            5,
            3.7872811293165363,
            -2.547353610504434,
            5,
            3.8663093126534935,
            -2.644624161167668,
            5,
            3.9453374959904504,
            -2.741894711830902,
            5,
            4.024365679327407,
            -2.839165262494136,
            5,
            4.1033938626643645,
            -2.9364358131573702,
            5,
            4.1033938626643645,
            -2.9364358131573702,
            5,
            4.1033938626643645,
            -2.9364358131573702,
            5,
            4.103393862664365,
            -2.9364358131573702,
            5,
            4.103393862664365,
            -2.9364358131573702,
            5,
            4.103393862664365,
            -2.9364358131573702,
            5
        ],
        "colors": [
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999,
            1,
            0,
            0.5999999999999999
        ]
    }
]

export function createLines(originPoint) {
    // convert positions array to vector3 array
    var lines = [];
    for (var i = 0; i < curveDataTop[0].positions.length; i += 3) {
        var linePoints = [];
        var lineColors = [];
        linePoints.push(curveDataTop[0].positions[i]);
        linePoints.push(curveDataTop[0].positions[i + 1]);
        linePoints.push(curveDataTop[0].positions[i + 2]);
        linePoints.push(originPoint.x);
        linePoints.push(originPoint.y);
        linePoints.push(originPoint.z);

        lineColors.push(0.5);
        lineColors.push(0.5);
        lineColors.push(0.5);
        lineColors.push(0.5);
        lineColors.push(0.5);
        lineColors.push(0.5);
        
        var line = drawLine(linePoints, lineColors);
        lines.push(line);
    }    

    for (var i = 0; i < curveDataTop[0].positions.length; i += 3) {
        var linePoints = [];
        var lineColors = [];
        linePoints.push(curveDataTop[0].positions[i]);
        linePoints.push(curveDataTop[0].positions[i + 1]);
        linePoints.push(curveDataTop[0].positions[i + 2]);
        linePoints.push(curveDataTop[0].positions[i]);
        linePoints.push(-10);
        linePoints.push(curveDataTop[0].positions[i + 2]);

        lineColors.push(1);
        lineColors.push(0.5);
        lineColors.push(0);
        lineColors.push(1);
        lineColors.push(0.5);
        lineColors.push(0);
        
        var line = drawLine(linePoints, lineColors);
        lines.push(line);
    }    
    // draw line fro
    return lines;
}