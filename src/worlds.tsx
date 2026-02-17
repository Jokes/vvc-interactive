import { type ReactNode } from 'react'
import { PerkLink, ShallowPerkLink, PerkListing, type Perk } from './App'

interface Triptych {
  readonly id: string;
  readonly title: string;
  readonly firstTitle: string;
  readonly firstContent: ReactNode;
  readonly secondTitle: string;
  readonly secondContent: ReactNode;
  readonly thirdTitle: string;
  readonly thirdContent: ReactNode;
}

export interface World {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: ReactNode;
  readonly conduitDescription: ReactNode;
  readonly perks: readonly Perk[];
  readonly crown: Perk;
  readonly dangers: Triptych;
  readonly poi: Triptych;
  readonly breaching: Triptych;
}

function TriptychListing({ tri }: { tri: Triptych }) {
  return (
    <div id={tri.id}>
      <div className='tri-title'>{tri.title}</div>
      <div className='tri-content'>
        <dl>
          <dt>{tri.firstTitle}</dt>
          <dd>{tri.firstContent}</dd>
          <dt>{tri.secondTitle}</dt>
          <dd>{tri.secondContent}</dd>
          <dt>{tri.thirdTitle}</dt>
          <dd>{tri.thirdContent}</dd>
        </dl>
      </div>
    </div>
  )
}

function WorldStats({ w }: { w: World }) {
  const tc = w.perks.map((p) => p.cost).reduce((sum, current) => sum + current);
  const p1 = w.perks.map((p) => p.cost).reduce((acc, curr) => curr === -1 ? acc + 1 : acc, 0);
  const p2 = w.perks.map((p) => p.cost).reduce((acc, curr) => curr === -2 ? acc + 1 : acc, 0);
  const p3 = w.perks.map((p) => p.cost).reduce((acc, curr) => curr === -3 ? acc + 1 : acc, 0);
  const p4 = w.perks.map((p) => p.cost).reduce((acc, curr) => curr === -4 ? acc + 1 : acc, 0);
  const p5 = w.perks.map((p) => p.cost).reduce((acc, curr) => curr === -5 ? acc + 1 : acc, 0);
  return (
    <>
      <details className={tc === -25 ? 'world-stats-ok' : 'world-stats-redflag'}><summary>World Stats</summary>
        <ul>
          {tc === -25 ? <></> : <li>Total Costs: {tc} (should be -25)</li>}
          {p1 > 0 ? <li>1-point Perks: {p1}</li> : <></>}
          {p2 > 0 ? <li>2-point Perks: {p2}</li> : <></>}
          {p3 > 0 ? <li>3-point Perks: {p3}</li> : <></>}
          {p4 > 0 ? <li>4-point Perks: {p4}</li> : <></>}
          {p5 > 0 ? <li>5-point Perks: {p5}</li> : <></>}
        </ul>
      </details>
    </>
  )
}

export function WorldSection(world: World) {
  return {
    id: world.id,
    title: world.title,
    content: (
      <>
        <div className='world-tagline'>{world.tagline}</div>
        <div className='world-stats'><WorldStats w={world} /></div>
        <div className='world-description'>{world.description}</div>
        <div className='conduit-description'>{world.conduitDescription}</div>
        <div className='world-perks'>{world.perks.map((p) => <PerkListing key={p.id} perk={p} />)}</div>
        <div className='world-crown'><PerkListing perk={world.crown} /></div>
        <TriptychListing tri={world.dangers} />
        <TriptychListing tri={world.poi} />
        <TriptychListing tri={world.breaching} />
      </>
    )
  };
}



const earthInheritance: Perk = {
  id: "earth-inheritance",
  title: "Inheritance",
  cost: -2,
  content: (<p>Upon your true death, when all of your methods of immortality are destroyed or bypassed, the essence of your Conduit awakening still persists. It passes to your heir, either one you've specifically designated or someone who matches what your preferences and intentions would be. They are awakened much as you were. Furthermore, for every world that you had 25 points in, an additional heir awakens as a Least Conduit. Least Conduits may also take this ability, but it is rare for their heirs to be full Conduits.</p>)
}
const earthTongues: Perk = {
  id: "earth-tongues",
  title: "Tongues",
  cost: -1,
  content: (<p>Many Conduits find that their connection to other worlds includes a supernatural gift with languages. You can become conversational in a language in weeks or days, if immersed in the language, and after a year or two you will be indistinguishable from a native. You can even decode dead languages, though it remains a long and arduous process.</p>)
}
const earthShow: Perk = {
  id: "earth-show",
  title: "Show",
  cost: -1,
  prereqs: [earthTongues],
  content: (<p>Laying your hand on another person, you bestow on them a vision. The source is your mind, and they see your memories, your thoughts, or whatever you imagine. This appears to them just as it appears to you, removing most barriers to understanding. They may not agree, but they will certainly understand what you mean; your point of view will be clear to them. Most find it a quite personal and even spiritual experience.</p>)
}
const earthTeach: Perk = {
  id: "earth-teach",
  title: "Teach",
  cost: -2,
  prereqs: [earthShow, earthInheritance],
  content: (<p>Not only your thoughts but your experiences, your knowledge and your skills can be transmitted. This is a deeper level of knowledge, the kind that is ingrained and that is remembered. Passing on these skills likely still takes time, but far less than if they had to experience everything you experienced, and in the end, their ability can nearly match yours, should you choose to give them access to all of your relevant skills.</p>)
}
const earthAuthority: Perk = {
  id: "earth-authority",
  title: "Authority",
  cost: -2,
  prereqs: [earthTongues],
  content: (<p>You gain an instinctive charisma that lets you move smoothly among the elite. Your capable, confident bearing puts people at ease in conversation and inspires them to follow your lead. Your reputation is still affected by your words and actions, but most people will see you as trustworthy and admirable on a first impression, and many will find themselves deferring to you or offering favours and special treatment.</p>)
}
const earthSovereign: Perk = {
  id: "earth-sovereign",
  title: "Sovereign",
  cost: -1,
  types: ['Outpost'],
  prereqs: [earthAuthority],
  content: (<p>A regal aura surrounds you, enhancing your charisma and granting you an intuitive command of diplomacy and leadership. On Earths where you maintain a presence, those who would flourish under your rule will feel a call to join you; a tyrant may gain few followers this way, but a wise and just Sovereign will see immigrants flocking to their banner.</p>)
}
const earthIsolation: Perk = {
  id: "earth-isolation",
  title: "Isolation",
  cost: -2,
  prereqs: [earthSovereign],
  content: (<p>The entire world is your kingdom, the mortal governments simply the crops and livestock you allow to live. That's why you must fence this world off. With a great ritual that takes months, you attach yourself to the world so tightly that you can prevent all natural bridges from forming. It would be wise to either have <ShallowPerkLink pid='base-bridge-building' ptitle='Bridge Building' /> or a Gateway to allow yourself to leave, but if you don't, it is possible to undo this action.</p>)
}
const earthFacade: Perk = {
  id: "earth-facade",
  title: "Facade",
  cost: -1,
  content: (<p>Connections to other worlds may change you, but you are still human. Or at least, you can seem so. It takes a few minutes to assemble your facade of normal humanity, and other than a Conduit, nobody can see through it. Of course, the changes in your appearance that you are cloaking are tied to the function of your abilities as a Conduit. If you use the parts that are apparently changed, the illusion shatters.</p>)
}
const earthAnonymous: Perk = {
  id: "earth-anonymous",
  title: "Anonymous",
  cost: -1,
  prereqs: [earthFacade],
  content: (<p>Fame is inconvenient. It may be useful, but you can't get away from it. Thus, you can instead channel a bit of your alien nature to let the attention of others slide off you as water off a duck. Even among a crowd of fanatics, you can walk freely and do as you please. This power is not absolute, and if you do things that stand out people may still notice you, but if the things you do are not supernatural in nature they are much less likely to associate it with your identity as a Conduit.</p>)
}
const earthDisguise: Perk = {
  id: "earth-disguise",
  title: "Disguise",
  cost: -2,
  prereqs: [earthFacade],
  content: (<p>The facade of humanity is the appearance of a human, and with skill it can be shaped. You can sculpt your apparent appearance anywhere within the human limits, and can also decide to include specific aspects of your own appearance in case you want to keep some of the bits that show the influence of other worlds. You can even sculpt an appearance that resembles a specific other person, though learning to act as them still requires practice.</p>)
}
const earthNomad: Perk = {
  id: "earth-nomad",
  title: "Nomad",
  cost: -2,
  content: (<p>The key ability of a Conduit is to travel between worlds, an outgrowth of the ability to travel the Earth. Moving about the Infinite Earths with ease, you find your way between worlds becoming easier as well. With just a minute of mental preparations, you can jump to any world directly reachable from the one you're standing in. You can land anywhere near the far end of the closest bridge to that world, within a range of as many miles as your total points spent in both worlds.</p>)
}
const earthShipping: Perk = {
  id: "earth-shipping",
  title: "Shipping",
  cost: -2,
  prereqs: [earthNomad],
  content: (<p>You are no longer limited by what you can personally carry across a bridge; you can now cross a bridge with a vehicle, bringing along all its contents and passengers. The maximum size of the vehicle is two thousand cubic meters per point spent on Earth.</p>)
}
const earthCaravan: Perk = {
  id: "earth-caravan",
  title: "Caravan",
  cost: -1,
  prereqs: [earthShipping],
  content: (<p>An entire fleet travels with you. When you cross between worlds, you may bring as many vehicles as you have points spent in Earth, including your own. The size limit from Shipping is tripled, and each vehicle must be no farther than ten times its own length from yours (or width or height, if those dimensions are larger) if at rest; in motion, the distance limit is multiplied by the caravan's average speed in kilometers per hour. A vehicle's pilot may refuse to travel with you, if they react quickly as you begin to pull them through a bridge.</p>)
}
const earthTeleport: Perk = {
  id: "earth-teleport",
  title: "Teleport",
  cost: -2,
  prereqs: [earthNomad],
  types: ['Gateway'],
  content: (<p>Instead of jumping between worlds, you can jump within them. You essentially begin to jump, but then jump back, pushing against the boundaries between worlds; this takes about one second of focus. You can jump to a bridge as with <PerkLink perk={earthNomad} />, but land on the same side you're jumping from; your inner bridge to your Bevin counts. If you try to land farther from your target bridge than the number of miles equal to your points spent on both sides of that bridge, your precision suffers. If you're jumping directly into a dangerous situation, you feel a sense of dread allowing you to abort or redirect.</p>)
}
const earthOneSelf: Perk = {
  id: "earth-one-self",
  title: "One Self",
  cost: -3,
  prereqs: [earthDisguise, earthNomad],
  types: ['Immortality'],
  content: (<p>Not every world contains every person, but many worlds are so similar as to have equivalent people. You, as one of the few who crosses between worlds, can find your equivalent. And you can replace them. Should you die, your mind and abilities will automatically be shunted into some copy of yourself in a different Earth, one who never became a Conduit, and you will overwrite them entirely. In the infinite Earths, there will always be another you - though the most similar other you will become more and more different as time passes.</p>)
}
const worldEarth = {
  id: "base-worlds-earth",
  title: "Earth",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
      <p>The Earth is your origin, so you are already familiar with it. But it turns out there's not just the one Earth. There are many, perhaps infinite earths. It's just that yours had no Conduits until you became one, and therefore no bridges either. Now that you are a Conduit, new bridges are beginning to appear, and you can jump to other Earths, and meet other Conduits. While the ancient Conduits are long dead, there are a few of the new generation who ascended before you, in their Earths, and there will be yet more in time.</p>
      <p>The other Earths are all similar to the one you came from; humans are the same on every world. But every world is a little different. In most cases, there is just a slight difference in history, one key event went slightly different. Perhaps the US has a different prime minister, or perhaps France won the Six Years War. Maybe the Emperor of Mexico was overthrown, and maybe he wasn't. Or maybe the change was further back, and the entire industrial revolution unfolded differently, and the entire map is different. There are even worlds where the continents themselves are different. But in all of these worlds, people are basically people.</p>
      <p>The strangest worlds are none of these, but the ones where a powerful Conduit resides. Most or all Conduits, it seems, originate on an Earth, and some of them use their abilities to benefit ordeinary people or to conquer them, shaping society drastically.</p>
    </>
  ),
  conduitDescription: (<p>As the world of your origin, the Earth does not change you much, for you are already of Earth. However, you do begin to show the wisdom of age, with hair that greys and then whitens as you take more perks. Conduits of the infinite Earths are called Vagrants.</p>),
  perks: [
    earthInheritance, earthTongues, earthShow, earthTeach, earthAuthority, earthSovereign, earthIsolation,
    earthFacade, earthAnonymous, earthDisguise, earthNomad, earthShipping, earthCaravan, earthTeleport, earthOneSelf
  ],
  crown: {
    id: "earth-crown",
    title: "Crown: Elder",
    iscrown: true,
    cost: -5,
    content: (
      <>
        <p>Those Crowned in the infinite Earths are called Elders, power players in the politics that affect the lives of billions of Earthlings, and likely Conduits as well.</p>
        <p>An Elder does not need physical contact to <PerkLink perk={earthShow} /> their own thoughts, but can do it with only eye contact. Both <PerkLink perk={earthShow} /> and <PerkLink perk={earthTeach} /> can be used in reverse, allowing you to see the thoughts and gain the skills of someone else, provided they don't break contact.</p>
        <p>Not only can an Elder create a perfect <PerkLink perk={earthDisguise} /> of anyone they've seen, but you also have an intuitive sense, when doing so, of how to correctly act to imitate the person.</p>
        <p>The <PerkLink perk={earthSovereign} /> Elder can draw not just personal immigrants but entire countries joining at once, with a prosperous enough empire.</p>
        <p><PerkLink perk={earthIsolation} /> also allows you to destroy a bridge, nearly instantly.</p>
        <p><PerkLink perk={earthNomad} /> and <PerkLink perk={earthTeleport} /> can send you to any bridge you've ever walked.</p>
        <p>You know who the next candidate is for <PerkLink perk={earthOneSelf} />, and you can pass over them to the next one if you prefer.</p>
      </>
    )
  },
  dangers: {
    id: "earth-dangers",
    title: "Dangers",
    firstTitle: "Rule of Law",
    firstContent: (<>Earth has expectations, and for those who break the expectations, it has cops. The nail that stands up is hammered down.</>),
    secondTitle: "Strife",
    secondContent: (<>Earth has great nations with powerful militaries. They put their own interests first, but push them too far and they'll pull out all the stops. If they're destroyed, the resulting chaos will still be dangerous.</>),
    thirdTitle: "Quellers",
    thirdContent: (<>A semi-secret order of Conduit-killers hunt Warlocks, Least Conduits, and you too if they can. They are the masterpiece of an ancient Conduit called the Shogun, and they gain power by consuming their victims.</>)
  },
  poi: {
    id: "earth-poi",
    title: "Conduits",
    firstTitle: "Cyprian",
    firstContent: (<>A grandfatherly old sort, Cyprian runs a school for mortals, bringing them to other worlds so that they may learn its ways. He takes only a few hundred, dozens of whom die each year  and thousands more die for the opportunity.</>),
    secondTitle: "Rim Meister",
    secondContent: (<>Several earths have legions of serfs from the Rim doing whatever labor humans would rather not. These serfs seem innocuous, but they are all loyal to the Meister.</>),
    thirdTitle: "Pontifex",
    thirdContent: (<>Though long dead, this Conduit left behind dozens of immortal Least Conduit servants who crave a master. Each is connected to a different world, and one may choose you.</>)
  },
  breaching: {
    id: "earth-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (
      <>
        <p>Bridges to Earth have no effect on the landscape or people, but things from the other side slip through with substantial frequency. Things appear or disappear, never to be seen again.</p>
        <p>Because of the unique nature of the Infinite Earths, it is possible to form a bridge between two Earths, since each Earth is separate from the rest even as it is also part of the same unified essence. It is still not possible to form a bridge between two places on the same single Earth.</p>
      </>
    ),
    secondTitle: "Outposts",
    secondContent: (<>An Outpost of Earth is simply a community, a place where the Conduit has stabilized space a bit and shielded from the most hazardous effects of the other world they're in. It is populated by humans, who make their government and behave in the way that humans do.</>),
    thirdTitle: "Gateways",
    thirdContent: (<>Earth's Gateways are unassuming in their construction, but unique in their abilities. Each is a flat solid structure resembling a plinth, dais, or altar, and when a traveler stands on the platform, they are presented with a choice: pass through the Gateway directly to the other side of the bridge it's built on, or step 'sideways', to the near side of any other Gateway in the same world. This transit is silent and subtle, and will fail if the destination is hazardous or occupied.</>)
  }
}
const bevinFireAndWater: Perk = {
  id: "bevin-fire-and-water",
  title: "Fire and Water",
  cost: -1,
  content: (<p>The tap in your Bevin expands into a magnificent water garden, piping throughout many of the rooms, and filling baths or pools. Smokeless fires burn in a warm hearth. Every room is heated, every room can have clear clean water, or whatever beverages you will. Enjoying the heat of the fire, or a warm bath, brings great comfort, but they have other uses. Flowing water powers engines, and hot fires power industry. You can use both of these to any such end you so desire.</p>)
}
const bevinGardenOfEarth: Perk = {
  id: "bevin-garden-of-earth",
  title: "Garden of Earth",
  cost: -2,
  prereqs: [bevinFireAndWater],
  types: ['Material'],
  content: (<p>The stone wall of the Bevin can yield minerals of your choice, and it can produce a garden which grows any plant comfortably. The only limit is that you must first introduce some small amount of the mineral, and some seed or clipping of the plant. These resources are fueled by the Bevin itself, and they grow gradually for as long as you want. Rarer and more magical resources take longer to cultivate. You can also cultivate liquids this way; your garden will establish small fountains.</p>)
}
const bevinFishAndGame: Perk = {
  id: "bevin-fish-and-game",
  title: "Fish and Game",
  cost: -1,
  prereqs: [bevinGardenOfEarth],
  types: ['Material'],
  content: (<p>You can grow the plants of your garden to such an extent that it creates an entire indoor ecosystem. Even living animals can populate your Bevin, growing naturally as part of it, in large outdoor-themed rooms for the purpose. Though you must introduce one of a species to your Bevin, there will forever after be a viable population of them, unless you decide to remove them entirely. The range of possible resources you can cultivate also expands considerably.</p>)
}
const bevinLibrary: Perk = {
  id: "bevin-library",
  title: "Library",
  cost: -1,
  content: (<p>Halls of shelving run through your Bevin, stocked with books that somehow found their way there from musty galleries and museums, deserted manors, and libraries long-since burnt. Any writings on worlds you're connected to can find their way here, but they tend to be those of interest to you. You also find your reading speed and comprehension increased, and your writing takes on a calligraphic elegance, while your voice softens and begins to sound quieter, even when amplified.</p>)
}
const bevinCorrespondence: Perk = {
  id: "bevin-correspondence",
  title: "Correspondence",
  cost: -1,
  prereqs: [bevinLibrary],
  content: (<p>Books published from other Bevins appear on your Library shelves, and you can publish your own writings too, simply by setting them in a certain specific desk drawer in your new library halls. You can address books or letters to anyone whose name you know. If they are connected to or in a Bevin, whether they are the Conduit or otherwise, the letter will appear on a desk in that Bevin for them.</p>)
}
const bevinPenmanship: Perk = {
  id: "bevin-penmanship",
  title: "Penmanship",
  cost: -1,
  prereqs: [bevinLibrary],
  content: (<p>You develop a keen intuition for how best to express yourself in writing. Your vocabulary increases faster; any word you have read is one you know just how to use. As you get to know an audience, your intuition extends to understanding how to adjust your words to account for their perspective; the more audiences you feel out in this way, the faster you get to know each new one. Your handwriting also improves, gaining precision, speed, and grace, and your pen never slips or drips without your permission. The tips of your fingers pick up persistent ink stains.</p>)
}
const bevinGhostwriting: Perk = {
  id: "bevin-ghostwriting",
  title: "Ghostwriting",
  cost: -2,
  prereqs: [bevinPenmanship],
  content: (<p>A Conduit can interact with any narrative that they've assembled from the letters and writings that appear in their library. New facts and altered events ripple through entire bodies of work to alter their physical contents. A letter faked carefully enough will breed replies as though their correspondents are still alive. Inquiries into history can be couched, lives can be made to continue, or to appear to, and great works of art can be obtained from fictional confidants, appearing in the library as delivered from their authors.</p>)
}
const bevinMuse: Perk = {
  id: "bevin-muse",
  title: "Muse",
  cost: -2,
  prereqs: [bevinGhostwriting],
  types: ['Gateway'],
  content: (<p>As your own blood and sweat flows into your writing, you eventually create a masterful character, one with its own mind and agency. Your character, though made of your own designs, can communicate with you through whatever medium they exist in, and they have full knowledge of the work containing them. Though they may feel some gratitude to you for their creation, they are not directly under your control.</p>)
}
const bevinEntangledSystems: Perk = {
  id: "bevin-entangled-systems",
  title: "Entangled Systems",
  cost: -2,
  prereqs: [bevinLibrary],
  content: (<p>The desk in your library now has a drawer filled with plain silver hand mirrors, five for each point spent in Bevin. Plant one near a library or archive to view and copy nearby published writings at will, using the master mirror that fits in a slot at the back of your desk. Give one to a friend to allow easy trade of books and letters. In worlds with complex information networks, the mirrors will find a way to connect. The master mirror can recall or restore any lost or broken mirrors.</p>)
}
const bevinWindows: Perk = {
  id: "bevin-windows",
  title: "Windows",
  cost: -1,
  prereqs: [bevinEntangledSystems],
  content: (<p>Large square tiles appear in a slot by your desk, in matched pairs. They appear black and smooth as obsidian when not in use. You can put one of each pair anywhere in any world you are connected to, so long as it is firmly attached to a solid surface with the back side entirely fast. The other half, likewise, must be mounted firmly onto the wall of your Bevin. Once you've done so, the one affixed in the Bevin shows the view out through its partner. The windows are very durable, but if destroyed the connection is broken. They cannot be opened. You have one pair of windows per point spent in Bevin.</p>)
}
const bevinGuest: Perk = {
  id: "bevin-guest",
  title: "Guest",
  cost: -1,
  content: (<p>What is a home without guests? You can afford the status of guest to a number of individuals equal to points spent in Bevin. Your guests have the ability to enter and leave your Bevin freely, bringing a bridge with them the same way you do. While in your Bevin, they benefit from all your Bevin perks, though they cannot override you. You may revoke their guest status at will.</p>)
}
const bevinWard: Perk = {
  id: "bevin-ward",
  title: "Ward",
  cost: -2,
  prereqs: [bevinGuest],
  types: ['Minion'],
  content: (<p>You can recruit willing subjects to join your household, serving as wards. They become more naturally inclined to serve the needs of you and your guests, but retain their own wills and aims. They gain all the powers of a Guest, except for the ability to come and go as they please.</p>)
}
const bevinKeysToTheKingdom: Perk = {
  id: "bevin-keys-to-the-kingdom",
  title: "Keys to the Kingdom",
  cost: -1,
  content: (<p>Your Bevin is yours. All doors open before you, even those which do not exist. You can will new rooms into existence, requiring only a conception of what it will be like, and your Bevin's growth bows to your will. It can also rearrange existing rooms, gradually. This also allows you to consciously shift the aesthetic of the Bevin, the decoration and furnishing, and even the material of its internal walls.</p>)
}
const bevinSolitude: Perk = {
  id: "bevin-solitude",
  title: "Solitude",
  cost: -1,
  types: ['Infusion'],
  content: (<p>While in your Bevin, your body gradually recuperates and rejuvenates. Wrinkles soften and kinks in your bones loosen, your body becoming as comfortable and limber as in your prime. The impediments of age slough off, and so do the injuries or infirmities you may have acquired elsewhere. In your Bevin, age can neither slay nor hobble you, but outside of it you seem to weather and weary faster than ever.</p>)
}
const bevinRebirth: Perk = {
  id: "bevin-rebirth",
  title: "Rebirth",
  cost: -4,
  prereqs: [bevinSolitude],
  types: ['Immortality'],
  content: (<p>In the center of a room there is a stone egg, unadorned and unblemished, large enough to hold your body like a coffin. Laying a hand upon it, your whole life and all of your memories will pass through you. Should you die, the egg will open like a clamshell. You will be reborn, exactly as you were when last you touched the egg, intervening wounds and memories lost to you entirely. As soon as you leave the egg, it will close again, ready for your next Rebirth. Your Guests and Wards can also touch the egg and be reborn from it, but only with your permission; one who dies alongside you must wait for you to call them out of the egg.</p>)
}
const bevinOmniscience: Perk = {
  id: "bevin-omniscience",
  title: "Omniscience",
  cost: -2,
  prereqs: [bevinSolitude, bevinFireAndWater],
  content: (<p>Exhale. Inhale. As the air flows through your Bevin, you perceive it. Everything within it is known to you. You can feel how the air flows around every shape, everything right where you left it. Anything that is out of place is glaringly obvious without needing to look. It is your home, after all. Even the back of your hand is less familiar to you. Your knowledge of everything in your Bevin is inherent, instinctive, and every change blatant.</p>)
}
const worldBevin = {
  id: "base-worlds-bevin",
  title: "Bevin",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (<p>A Bevin is a synthetic world, unique to its owner. It is created, perhaps, by the Conduits of an ancient era. Its purpose seems clear, it is a safe-haven in which to rest. Each is unique in aesthetic, decorated to meet the tastes of its owners, but they start out small, a stone-hewn apartment with comfortable but minimal furnishing, a small source of water, and a pantry with plenty of bland but filling food, which always seems to replenish. The Bevin grows in both size and comfort the longer the Conduit uses it, expanding through the stone. At times, it may join to new caverns, taking over them and expanding the Conduit's aesthetic preferences into the new area. These areas are dead, and not active. While the Bevin may eventually begin to connect to other active Bevins, it does so only indirectly, through books, windows, and communications.</p>),
  conduitDescription: (<p>As you gain perks in your Bevin, your body and mind become more stable. You are less susceptible to extraneous emotions, and your metabolism works more effectively. It becomes more difficult for you to gain or lose weight, and also to gain or lose muscle. The greatest change, though, is to your Bevin; with each point spent, its growth becomes faster, more refined, and better attuned to your needs. A Bevin with no points spent might be able to offer only crude stone blocks as furniture, while a Bevin with 15 points spent might furnish a bedroom with a luxurious bed, a nightstand with a hairbrush, and a wardrobe full of clothing. Conduits of Bevin are called Hermits.</p>),
  perks: [
    bevinFireAndWater, bevinGardenOfEarth, bevinFishAndGame, bevinLibrary, bevinCorrespondence, bevinPenmanship,
    bevinGhostwriting, bevinMuse, bevinEntangledSystems, bevinWindows, bevinGuest, bevinWard, bevinKeysToTheKingdom,
    bevinSolitude, bevinRebirth, bevinOmniscience
  ],
  crown: {
    id: "bevin-crown",
    title: "Crown: Archimandrite",
    iscrown: true,
    cost: -5,
    content: (
      <>
        <p>Those Crowned in their Bevin are called Archimandrite, and enjoy a comfortable influence indirectly from their homes, through trade of gifts and ideas, as well as through their guests and agents.</p>
        <p><PerkLink perk={bevinGardenOfEarth} /> produces drastically more resources, and <PerkLink perk={bevinFishAndGame} /> makes far grander scale ecosystems.</p>
        <p><PerkLink perk={bevinCorrespondence} /> now allows you to send parcels, containing just about anything, and if you send a request for return mail, the recipient can put whatever they want into the parcel before it returns to you, allowing you to engage in commerce from the comfort of your home. If you send a depiction of a <PerkLink perk={bevinMuse} /> with your parcel, the Muse can use that depiction to communicate outside your Bevin.</p>
        <p>Air flows through your windows, allowing a nice breeze. This also allows your <PerkLink perk={bevinOmniscience} /> to flow through them, perceiving out to a substantial distance.</p>
        <p>Your <PerkLink perk={bevinGuest} />s and <PerkLink perk={bevinWard} />s tend to be more agreeable than they would outside your Bevin.</p>
        <p>Every ten years, if you don't use your <PerkLink perk={bevinRebirth} />, the egg instead cracks open to reveal a pearl. This pearl is the seed of a new Bevin. It can increase an existing Bevin's size substantially, but is of even greater value to someone without one: it grants a connection to Bevin, exactly the same as a connection granted by <ShallowPerkLink pid='base-induction-investiture' ptitle='Induction Investiture' />, but without the point cost or prerequisites.</p>
        <p>If you do use <PerkLink perk={bevinRebirth} />, you may bring your corpse back to the egg to recover your slain memories.</p>
      </>
    )
  },
  dangers: {
    id: "bevin-dangers",
    title: "Dangers",
    firstTitle: "Sloth",
    firstContent: (<>Why leave? Why do anything? Your every need is met. Why not simply remain idle?</>),
    secondTitle: "Ennui",
    secondContent: (<>Is there a purpose to existing? You need not strive; and why should you? You create, if you please, but what is the ultimate purpose?</>),
    thirdTitle: "Unification",
    thirdContent: (<>The Bevin is so comfortable, like no other world. It is in the nature of a Conduit to become more like their world, and it is in the nature of the Bevin to become more like the Conduit. Why, then, should the two be separate? Why shouldn't you remain forever? Why shouldn't you be a part of your Bevin? Why should anything ever change? Why shouldn't you be made of stone?</>)
  },
  poi: {
    id: "bevin-poi",
    title: "Caverns",
    firstTitle: "Runes",
    firstContent: (<>A crevasse opens up before you, its sides inscribed with what appears to be writing, yet no matter your abilities, you can attribute no meaning to it. It seems harmless.</>),
    secondTitle: "Dead Bevin",
    secondContent: (<>Apparently the remains of a Bevin much like your own, perhaps the Conduit experienced true death somehow.</>),
    thirdTitle: "Dungeon",
    thirdContent: (<>This seems the opposite of a Bevin, full of dangerous traps and inconvenient workspaces. As your Bevin connects, it neutralizes the dangers, overriding any remnants with your will.</>)
  },
  breaching: {
    id: "bevin-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (
      <>
        <p>The bridge to a Bevin is part of its Conduit, carried with them wherever they travel. When a Conduit enters their Bevin through this bridge, they leave one end of the bridge behind; while inside their Bevin, they may keep the other end with them, or leave it in the entry hall where they arrived. These temporary bridges are subtle, carrying only a faint sense of peace, comfort, and rest. With <ShallowPerkLink pid='base-living-bridge' ptitle='Living Bridge' />, both the Conduit and their temporary bridges also regularize nearby temperatures, increase the legibility of nearby texts, and gradually drain nearby mineral deposits to fuel the Bevin's growth.</p>
        <p>Other Conduits can only enter your Bevin with your permission, under ordinary circumstances. It would not be wise to rely on this as an impermeable defense.</p>
      </>
    ),
    secondTitle: "Outposts",
    secondContent: (<>Bevin has no outpost save for you. Your body is the outpost, as your soul is the bridge. You bring with you the peace and tranquility of your Bevin, and those around you may look to you as a possible source of shelter should they be in need.</>),
    thirdTitle: "Gateways",
    thirdContent: (
      <>
        <p>A book painted, as a Muse, but of a land. The paintings inside display your Bevin in great detail, and whoever stumbles across this book may fall into its very pages, finding themselves in your foyer or smoke room, and presumably awaiting an appointment with you.</p>
        <p>Of all known Gateways, these are the only ones that do not need to be built on an existing Bridge; they carry their own, as their Conduit does. Even a synergy with Muse cannot grant any other Gateway this power.</p>
      </>
    )
  }
}
const prisonEyeless: Perk = {
  id: "prison-eyeless",
  title: "Eyeless",
  cost: -1,
  types: ['Minion'],
  content: (<p>You have learned to pluck the sacs in which the Eyeless gestate. By feeding them your blood, you domesticate them and uplift them slightly. They are ill-formed things, but your blood grants them sapience and thus they can communicate by gesture and sign language. As you've hatched them, they are loyal to you and treat you as one of their own, however if you leave them alone too long they will find themselves purposeless and return to their trees.</p>)
}
const prisonBeauty: Perk = {
  id: "prison-beauty",
  title: "Beauty",
  cost: -1,
  prereqs: [prisonEyeless],
  content: (<p>When you pluck the Eyeless from the tree, you can shape them. Their bodies bend to your will, taking a humanoid form by default but allowing you to shape them until they are done hardening. Then, their bodies become more static. The definite forms allow greater dexterity and movements as careful as a human, without decreasing strength or durability. Your shaping allows them to have a precise role different from their brethren, but the deviation from a basically human form that you can achieve depends on your points spent in Prison.</p>)
}
const prisonConverts: Perk = {
  id: "prison-converts",
  title: "Converts",
  cost: -2,
  types: ['Minion'],
  prereqs: [prisonEyeless],
  content: (<p>In an hour-long ceremony held within the Prison, you coat someone with fresh sap drawn from an Eyeless tree. You can leave part of them bare if you choose, but must cover more than three-quarters of their body. They will fall into a deep sleep for a full day, and wake as a Converted Eyeless, silent and unfailingly loyal. Their body retains its shape and any powers not dependent on producing sound or speech. Over time, if not reminded of their identity, they will lose hold of it and fall into the blank obedience of a normal Eyeless.</p>)
}
const prisonBlackBlood: Perk = {
  id: "prison-black-blood",
  title: "Black Blood",
  cost: -2,
  types: ['Infusion'],
  content: (<p>Scoring the surface of the trees is difficult, but it yields a viscous sap, black but with a consistency like natural latex. You can't digest it, but drinking it allows it to enter your blood. It flows through your veins, darkening them, and it changes your skin as well. You become more durable, but more vulnerable to the sun regardless of your melanin levels. Your bones become more flexible, and you can see without eyes. You see equally in all directions, but when you focus on someone you can hear their surface thoughts and feel their feelings.</p>)
}
const prisonMentalLink: Perk = {
  id: "prison-mental-link",
  title: "Mental Link",
  cost: -1,
  prereqs: [prisonBlackBlood, prisonEyeless],
  types: ['Minion'],
  content: (<p>Each tree is the hub of a mental network connecting the Eyeless who hatch from it. You now connect to the trees whose sap you drink, and your mind becomes a greater hub, linking those networks together. As you spend points in the Prison, these connections deepen, allowing you to share emotions, senses, and memories as well as impersonal facts or commands. The gestation time of Eyeless on your trees is one year divided by your number of points spent in the Prison. Connected trees count as supervisor Minions over their linked Eyeless.</p>)
}
const prisonSanction: Perk = {
  id: "prison-sanction",
  title: "Sanction",
  cost: -1,
  content: (<p>Your castigating glare is enough to focus the will of the Prison on someone. Someone so sanctioned feels no effect, but they cannot leave the Prison using a bridge or most other methods. It remains possible to leave the Prison in two ways: Death, and another world's Gateway. There is no other way to leave during the duration of the Sanction. It lasts an amount of days depending on points spent in the Prison, but you may renew the time at will, as long as you know the one who has been Sanctioned and they are within the Prison.</p>)
}
const prisonSculptor: Perk = {
  id: "prison-sculptor",
  title: "Sculptor",
  cost: -1,
  prereqs: [prisonBlackBlood],
  types: ['Infusion', 'Outpost'],
  content: (<p>The veins in your body resonate with the veins in the marble. It responds to your touch like clay, shaped into any form you like with only some labor.  The Prison's marble can only be altered by this perk and its derivatives; it is otherwise impervious. You may also use this perk to open the cells in the Prison, though the consequences of doing so may be beyond your ability to address. Your bones also take on the properties of Prison's marble. The speed and dexterity with which you can manipulate marble scale with points spent in the Prison.</p>)
}
const prisonImprison: Perk = {
  id: "prison-imprison",
  title: "Imprison",
  cost: -2,
  prereqs: [prisonSculptor, prisonSanction],
  types: ['Material'],
  content: (<p>The marble of the prison leaps forth to fulfill its purpose. It forms a cell around your prisoner. A being trapped within the cell is contained as long as they cannot physically leave. The prisoner is held in stasis, not aging or changing, though they remain aware. There is nothing to experience inside the cell. You may choose to make a window, violating the barrier between the cell and the outer part of the prison, but this undoes the stasis. The prisoner is thus spared oblivion, but will eventually age and die.</p>)
}
const prisonGardener: Perk = {
  id: "prison-gardener",
  title: "Gardener",
  cost: -1,
  prereqs: [prisonSculptor],
  types: ['Material'],
  content: (<p>A drop of your spittle, blackened with the essence of the Prison, grows a tree. The tree you grow is connected to you and responds to your wishes. It grows resources for you in sacs like those that the Eyeless are born from. It can provide food, water, small items, and all manner of things. All of them are black and rubbery, and though they may be edible and filling if you like, they are flavorless. If you have <PerkLink perk={prisonMentalLink} />, trees you grow count among your connected trees.</p>)
}
const prisonFaceWithin: Perk = {
  id: "prison-face-within",
  title: "Face Within",
  cost: -3,
  prereqs: [prisonMentalLink, prisonConverts, prisonGardener],
  types: ['Immortality', 'Infusion'],
  content: (<p>The rubber of your Eyeless and their trees coats your body, though you control it as a part of your body. You can allow it to engulf you entirely and subsume your body. If you die or are destroyed in this form, any of the Eyeless trees that you are connected to can bear a new sac for you. It gestates and hatches like an ordinary Eyeless, then goes through the process of Conversion in reverse, gradually becoming you.</p>)
}
const prisonDuplicates: Perk = {
  id: "prison-duplicates",
  title: "Duplicates",
  cost: -1,
  prereqs: [prisonFaceWithin],
  content: (<p>Each tree you connect to with <PerkLink perk={prisonMentalLink} /> can sustain one special extra Eyeless, a Duplicate of you, created as though by Face Within. Your Duplicates inherit the form of your body and mind, including Infusions and world influences, but do not share any of your other powers. So long as you remain connected to them through <PerkLink perk={prisonMentalLink} />, you and your Duplicates share a single pool of consciousness and act with one will. If the link breaks, any separated Duplicates become independent copies of you. If your main body dies, your nearest other connected body will inherit your powers.</p>)
}
const prisonJurisdiction: Perk = {
  id: "prison-jurisdiction",
  title: "Jurisdiction",
  cost: -2,
  prereqs: [prisonSculptor],
  types: ['Gateway'],
  content: (<p>You can claim an area by creating great marble obelisks, 200m in height. They form the basis of your Jurisdiction, which applies anywhere within range of one of your obelisks; when activated, they will form boundary stones at the edge of their range, to clearly mark the border of the claimed area. In this area your word is law, so long as you engrave that word on each of the obelisks, impressing your intent into the stone. When someone breaks that law, they are aware that they are deemed Criminal. You are aware of their crime, and so are they. You know their exact location relative to the obelisks until they leave your Jurisdiction. You can choose whether to pardon them. An obelisk's range is 5km per point spent in the Prison, but does not extend between Prison levels.</p>)
}
const prisonContract: Perk = {
  id: "prison-contract",
  title: "Contract",
  cost: -2,
  prereqs: [prisonJurisdiction],
  content: (<p>Laws can be refined, and made personal. You engrave your words into a stone tablet that binds only those who sign it by placing a thumbprint that instantly blackens. If those so bound break the terms of the contract, they become Criminals just as those who violate the terms of your Jurisdiction. Unlike your Jurisdiction, you do not have sole dominion over these, but rather, whoever signs it can Pardon the other party if they are the ones wronged by the violation.</p>)
}
const prisonEnforcement: Perk = {
  id: "prison-enforcement",
  title: "Enforcement",
  cost: -1,
  prereqs: [prisonJurisdiction, prisonConverts],
  content: (<p>The Eyeless minions stalk your Jurisdiction, sniffing for lawbreakers. When someone actually breaks your laws, they know as you do where the Criminal is and will hunt them down. Even wild Eyeless will be stirred from their trees if the criminal draws near. If they catch their quarry, they will consume them, immersing the criminal in rubber and converting them into an Eyeless. The hunt will only end if the Eyeless succeed, if they are destroyed, or if you pardon their target.</p>)
}
const prisonBrand: Perk = {
  id: "prison-brand",
  title: "Brand",
  cost: -1,
  prereqs: [prisonJurisdiction],
  content: (<p>Any Criminal who breaks your laws is immediately branded. The Brand allows them to be recognized as a Criminal, for even those who don't know its meaning will perceive their crimes just as the Eyeless see thoughts. You know the location of branded criminals even when they are outside of your Jurisdiction, and when you lay your eyes upon them, you can activate the other function of the Brand. The criminal loses all sensory input, unable to see, hear, or even feel for as long as your glare remains upon them. The Brand disappears if the Criminal is pardoned.</p>)
}
const prisonIndenture: Perk = {
  id: "prison-indenture",
  title: "Indenture",
  cost: -2,
  prereqs: [prisonBrand, prisonContract, prisonConverts],
  types: ['Minion'],
  content: (<p>Contracts can now include conditional effects, such as pardoning. A Branded Criminal serves for a specific amount of time, during which they are engulfed in black rubber which keeps them in a semi-converted state. They receive commands instantly, and cannot violate the terms of the contract of indenture, as their very mind doesn't allow them to.</p>)
}
const prisonExecution: Perk = {
  id: "prison-execution",
  title: "Execution",
  cost: -1,
  prereqs: [prisonBrand],
  content: (<p>Some Criminals are so detestable that they are not even worth imprisoning. By spitting up their brand, you activate a function that runs counter to the Prison's primary purpose, a failsafe. Their body is wracked with pain, even if they are not otherwise capable of feeling it. If it is possible for them to die, then they will die.</p>)
}
const worldPrison = {
  id: "base-worlds-prison",
  title: "Prison",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
      <p>The Prison is an endless marble plain, twilit by purple clouds. Here and there, perfect geometric shapes sit, perfectly balanced and motionless. Many of them are simply decorations, or random chance, but others are cells, containing calamities long forgotten. From the black veins that crisscross the flat ground sprout black and twisted trees, their branches bowed by the weight of amniotic sacs wherein eyeless forms occasionally shift. The horizon is broken by great cylinders that reach above the clouds, each one containing a colossal staircase going both up and down to countless additional levels indistinguishable from this one. Each level is a marble slab 50km thick, with 50km of air between it and the next one.</p>
      <p>There are no people or societies in the Prison. It is a nearly empty expanse. The prisoners are all manner of creature, but they are bound in their cells, inert. The only natives are the Eyeless, beings that hang unborn on their trees. They are normally inert, and may shift positions but only hatch in response to outside stimuli, of which there is little in the Prison. Even when forced to hatch, they are silent things, moving rapidly but without sound. They have a sense like sight, despite lacking eyes, and are aware of their surroundings in all directions. Each tree supports a limited number of Eyeless at a time, but siblings from the same tree are mentally connected. They are strong and highly durable but incapable of precision and vulnerable to both fire and sunlight.</p>
      <p>All Conduits, being by nature unbound, have a slight natural resistance to the abilities of Prison. This allows them the option to die. Most methods of immortality will thus afford a clean escape.</p>
    </>
  ),
  conduitDescription: (<p>As you spend time and gain perks in the Prison, you become less inclined to speak, adopting the silence of the Prison. You also put more store in rules, becoming uncomfortable when you don't know local laws well, and gain disdain for those who ignore them. At 5 points spent, your sclera become black and you can see more clearly in moderate light. At 15 points, your bones gain additional joints. Conduits of the Prison are called Wardens.</p>),
  perks: [
    prisonEyeless, prisonBeauty, prisonConverts, prisonBlackBlood, prisonMentalLink, prisonSanction, prisonSculptor,
    prisonImprison, prisonGardener, prisonFaceWithin, prisonDuplicates, prisonJurisdiction, prisonContract,
    prisonEnforcement, prisonBrand, prisonIndenture, prisonExecution
  ],
  crown: {
    id: "prison-crown",
    title: "Crown: Lawgiver",
    isCrown: true,
    cost: -5,
    content: (
      <>
        <p>Those Crowned in the Prison are its Lawgivers, powerful forces of order who can bind and imprison any worldly threat. Any being bound to a single world cannot escape a Lawgiver even in death.</p>
        <p>Lawgivers with <PerkLink perk={prisonSculptor} /> can Sculpt their bones as marble, and use it as a source to generate greater amounts of marble. Ripping marble from your bones through your flesh hurts less than you might think. Lawgivers can also Sculpt marble at a distance, and Sculpt with increased precision.</p>
        <p>Trees grown by a Lawgiver with <PerkLink perk={prisonGardener} /> can give birth to animals, after a sort. Neither true Eyeless with minds, nor true animals, they nonetheless make a lovely decoration and may be handy for some tasks that Eyeless are not suitable for. Trees can support many of them at a time.</p>
        <p>A Lawgiver can hatch and shape <PerkLink perk={prisonEyeless} /> automatically, without needing to personally pluck them from trees and sculpt their forms. When a Lawgiver does take the time to pluck and shape an Eyeless personally, they can shape the Eyeless into a far wider variety of forms, including furniture and other inanimate objects. Such Eyeless are still fully functional Minions, though their anatomy may restrict their movements.</p>
        <p>When someone violates your law in your <PerkLink perk={prisonJurisdiction} />, you can immediately <PerkLink perk={prisonSanction} /> them. If they are in the Prison, you can <PerkLink perk={prisonImprison} /> them. Lawgivers can also override other Jurisdictions, Sculpting the obelisks to bear their own laws instead.</p>
        <p>When a Lawgiver <PerkLink perk={prisonSanction} />s a Least Conduit, Warlock, or anything else short of a full Conduit, their Immortality cannot bring them out of the Prison. Gateways created by the Lawgiver are closed to those that they <PerkLink perk={prisonSanction} />.</p>
        <p>A Lawgiver can place their <PerkLink perk={prisonFaceWithin} /> into any of their <PerkLink perk={prisonDuplicates} />, instead of growing one specifically for the purpose, and simply emerging from inside of its body when they die and taking it over.</p>
      </>
    )
  },
  dangers: {
    id: "prison-dangers",
    title: "Dangers",
    firstTitle: "Boredom",
    firstContent: (<p>The Prison is static. Nothing changes that you don't change. It can be comfortable, but the human mind was not designed for such things.</p>),
    secondTitle: "Imprisonment",
    secondContent: (<p>The Prison is an enemy of freedom. Marble will grow up around you if you remain still too long. If you sleep directly on the marble, you will wake with it around you.</p>),
    thirdTitle: "Eyeless",
    thirdContent: (<p>If you agitate the trees, they will whip their limbs about, thrashing you, and may even drop sacs, hatching the Eyeless themselves to harry you.</p>)
  },
  poi: {
    id: "prison-poi",
    title: "Cells",
    firstTitle: "Thousand-pointed Star",
    firstContent: (<p>Like a sphere coated in needles, each very long and thin. What manner of being could be imprisoned within?</p>),
    secondTitle: "Olympian Tower",
    secondContent: (<p>Hundreds of meters wide and thousands of meters high, this tower almost resembles the cylinders that hold stairs to the next level, but it is not. What manner of being could be imprisoned within?</p>),
    thirdTitle: "Non-orientable Toroid",
    thirdContent: (<p>This shape cannot exist, and yet it does. It is difficult to tell what is inside and what is out. What manner of being could be imprisoned within? And how?</p>)
  },
  breaching: {
    id: "prison-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Sounds are muted near bridges to the Prison, and people grow less talkative. In nearby spots that the sun doesn't shine, Eyeless trees may grow.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Outposts of the Prison are places where the Prison's marble exists in another world. It can be sculpted into lovely yet severe buildings, and gardens of Eyeless trees grow there. The Eyeless themselves stir only if disturbed.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>An Obelisk stands taller than the rest, black instead of white. Gateways to the Prison are unusual in that they are one way, and someone who breaks your laws within sight of it and within Jurisdiction is immediately sent to the Prison, vanishing from where they stood.</p>)
  }
}

export const baseWorlds: readonly World[] = [
  worldEarth, worldBevin, worldPrison
]