import { image } from '../images'


export const services = [
    {
        title: 'CNC marás',
        text: 'Az AB Elements precíziós CNC marási szolgáltatásokra specializálódott. Fémek és műanyagok széles körének megmunkálását végezzük, a prototípusoktól a nagy sorozatú gyártásig.',
        image: image('cnc-milling'),
    },
    {
        title: 'CNC esztergálás',
        text: 'Forgásszimmetrikus alkatrészek nagy pontosságú megmunkálását végezzük CNC vezérlésű esztergagépeinken, szűk tűréshatárok és kiváló felületminőség biztosítása mellett.',
        image: image('cnc-turning'),
    },
    {
        title: 'Hosszesztergálás',
        text: '2020 óta precíziós svájci esztergálási (automata eszterga) szolgáltatásokat nyújtunk, amelyek kifejezetten hosszú, karcsú alkatrészek nagy pontosságú, gazdaságos sorozatgyártására alkalmasak.',
        image: image('turning'),
    },
    {
        title: 'Szikraforgácsolás',
        text: 'Büszkén kínálunk elektromos szikraforgácsolási (EDM) szolgáltatásokat, amelyekkel rendkívül kemény anyagok és bonyolult geometriájú alkatrészek is nagy pontossággal megmunkálhatók.',
        image: image('edm'),
    },
    {
        title: 'Hőkezelés és Felületkezelés',
        text: 'Alkatrészeink élettartamának és teherbírásának növelése érdekében hőkezelési és felületkezelési eljárásokat is kínálunk, amelyekkel javítható a kopásállóság, a korrózióvédelem és a mechanikai tulajdonságok.',
        image: image('heat-treatment'),
    },
    {
        title: 'Hegesztés',
        text: 'Tapasztalt szakembereink különféle hegesztési technológiákkal (pl. TIG, MIG) készítenek precíziós kötéseket fémalkatrészeken, az egyedi darabszámtól a sorozatgyártásig.',
        image: image('welding'),
        // optional: shown in a dialog behind a "Gépeink" button on the card.
        // a use written as "Label: text" renders the label in bold
        details: {
            title: 'Hegesztő gépparkunk',
            machines: [
                {
                    name: 'Stahlwerk MIG/MAG',
                    image: image('welder-stahlwerk'),
                    summary: '200 A-es MIG/MAG és MMA hegesztőgép.',
                    uses: [
                        'Acélszerkezetek hegesztése: zártszelvények, csövek, keretek és tartószerkezetek.',
                        'Lemezhegesztés: vékonyabb és közepes vastagságú acéllemezek összehegesztése.',
                        'Javítási és karbantartási munkák: gépalkatrészek, konzolok, fémszerkezetek javítása.',
                        'MMA elektródás hegesztés: szerelési és kültéri munkák megfelelő elektródával.',
                        'Védőgáz nélküli hegesztés: önvédő porbeles huzallal, megfelelő polaritásbeállítással.',
                    ],
                },
                {
                    name: 'CEA Matrix AC/DC',
                    image: image('welder-cea'),
                    summary: 'Professzionális inverteres TIG AC/DC és MMA hegesztőgép pulzushegesztéssel és cold.TACK funkcióval.',
                    uses: [
                        'Alumínium alkatrészek és szerkezetek hegesztése.',
                        'Rozsdamentes acél termékek, burkolatok és tartályok gyártása.',
                        'Vékony lemezek és precíziós alkatrészek hegesztése.',
                        'Acélszerkezetek és gépalkatrészek javítása.',
                        'Pontozás és varratok készítése minimális hőbevitellel.',
                    ],
                },
            ],
        },
    },
]