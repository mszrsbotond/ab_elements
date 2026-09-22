// Rebuilds the shipped assets in src/assets from the originals in assets-source.
// The source photos are 3000-7000px; every target below is the box the image actually
// occupies on screen, so nothing ships more pixels than it can show. The font is
// subset to the characters the site uses and repacked as woff2.
// Run with: npm run optimize:assets

import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'
import subsetFont from 'subset-font'

const SOURCE_DIR = 'assets-source'
const OUT_DIR = 'src/assets/img'

const FONT_SOURCE = join(SOURCE_DIR, 'BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf')
const FONT_OUT = 'src/assets/BricolageGrotesque-Variable.woff2'

// quality per role: backgrounds sit under dark overlays and hide artefacts, cards do not
const BACKGROUND_QUALITY = 72
const PHOTO_QUALITY = 80

// element images are picked by device pixel ratio, backgrounds by viewport width
const RETINA = [{ suffix: '', scale: 1 }, { suffix: '@2x', scale: 2 }]
// 1280 / 2560 / 3840 device pixels wide: phones, tablets and monitors, then wide monitors
const BREAKPOINTS = [{ suffix: '-sm', scale: 1 }, { suffix: '-lg', scale: 2 }, { suffix: '-xl', scale: 3 }]

// display box at 1x in CSS pixels; every target is rendered once per variant above
const TARGETS = {
    // full-bleed section backgrounds: -sm phones, -lg tablets and standard monitors, -xl wide monitors
    'hi-precision-cnc-milling-machine-with-cutting-sample-blue-silver-tone-micro-cutting-technique-precision-part.jpg':
        { name: 'hero-bg', box: [1280, 720], quality: BACKGROUND_QUALITY, variants: BREAKPOINTS },
    'milling-machine-drills-holes-metal-part-cnc-metalworking-with-coolant-liquid-industrial.jpg':
        { name: 'us-cards-bg', box: [1280, 720], quality: BACKGROUND_QUALITY, variants: BREAKPOINTS },

    // .service-img: ~310x280 inside a half-width card of the 1440px container
    'cnc-miling.jpg': { name: 'cnc-milling', box: [340, 300] },
    'cnc-turning.jpg': { name: 'cnc-turning', box: [340, 300] },
    'turning.jpg': { name: 'turning', box: [340, 300] },
    'edm.jpg': { name: 'edm', box: [340, 300] },
    'heat-treatment.jpg': { name: 'heat-treatment', box: [340, 300] },
    'welding.jpg': { name: 'welding', box: [340, 300] },

    // .industry-img: card is clamp(200px, 17vw, 340px) at aspect 343/500
    'agriculture.jpg': { name: 'agriculture', box: [340, 500] },
    'industrial.jpg': { name: 'industrial', box: [340, 500] },
    'device.jpg': { name: 'device', box: [340, 500] },
    'pharma.jpg': { name: 'pharma', box: [340, 500] },
    'car-factory.jpg': { name: 'car-factory', box: [340, 500] },
    'oil-rig.jpg': { name: 'oil-rig', box: [340, 500] },
    'robotics.jpg': { name: 'robotics', box: [340, 500] },

    // .about-img-main: min(66vh, 700px) tall at aspect 3/4
    'cargettingmanufactured.jpg': { name: 'about-main', box: [525, 700] },
    // .about-img-secondary: max 26rem square
    'cuttingmachine.jpg': { name: 'about-secondary', box: [416, 416] },
}

const kb = bytes => `${(bytes / 1024).toFixed(0)} kB`

// 'outside' keeps the aspect ratio while covering the box, which is what object-fit: cover needs
const render = (input, [w, h], scale, quality) =>
    sharp(input)
        .resize(w * scale, h * scale, { fit: 'outside', withoutEnlargement: true })
        .webp({ quality, effort: 6 })

// Latin-1 and Latin Extended-A cover Hungarian; the rest is the typographic punctuation in the copy
const charset = () => {
    const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join('')
    return range(0x20, 0xff) + range(0x100, 0x17f) + '\u2013\u2014\u2018\u2019\u201c\u201d\u2022\u2026\u20ac\u2122\u00b0\u00d7\u00f7'
}

async function buildFont(){
    const ttf = await readFile(FONT_SOURCE)
    const woff2 = await subsetFont(ttf, charset(), { targetFormat: 'woff2' })
    await writeFile(FONT_OUT, woff2)
    console.log(`\nfont${''.padEnd(30)} ${kb(ttf.length).padStart(9)}  ->  subset woff2 ${kb(woff2.length)}`)
}

async function main(){
    await rm(OUT_DIR, { recursive: true, force: true })
    await mkdir(OUT_DIR, { recursive: true })

    const present = await readdir(SOURCE_DIR)
    const unknown = present.filter(f => /\.(jpe?g|png)$/i.test(f) && !TARGETS[f])
    let before = 0
    let after = 0

    for (const [file, { name, box, quality = PHOTO_QUALITY, variants = RETINA }] of Object.entries(TARGETS)){
        const input = join(SOURCE_DIR, file)
        const original = (await stat(input)).size
        before += original

        const written = []
        for (const { suffix, scale } of variants){
            const out = join(OUT_DIR, `${name}${suffix}.webp`)
            const { size, width, height } = await render(input, box, scale, quality).toFile(out)
            after += size
            written.push(`${width}x${height} ${kb(size)}`)
        }
        console.log(`${basename(file, extname(file)).slice(0, 34).padEnd(34)} ${kb(original).padStart(9)}  ->  ${written.join('  |  ')}`)
    }

    console.log(`\ntotal ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(1)}% smaller)`)
    if (unknown.length) console.log(`\nnot referenced by the site, left untouched: ${unknown.join(', ')}`)

    await buildFont()
}

main()
