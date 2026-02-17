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

const rimNature: Perk = {
  id: "rim-nature",
  title: "Nature",
  cost: -1,
  content: (<p>The Rim is filled with countless beasts of all sorts, alike to those from many eras of Earth's history, and some which bear no clear resemblance to those in any known period of time. While they are a great danger to wayward travelers, they will not hunt you, and as long as you treat them with respect they will not fight you. You can intuit their ways and needs, communicate with them as much as they are able, and even induce them to help, on occasion.</p>)
}
const rimBinding: Perk = {
  id: "rim-binding",
  title: "Binding",
  cost: -1,
  types: ['Minion'],
  content: (<p>Created to serve, serfs are easily bent to the will of a Conduit. It takes only a few interactions to earn their loyalty. Not only does this last their entire lives, but it even passes on to their offspring. While you live, this bond can only be broken by another Conduit, and even then not within a few generations. A Conduit of the Rim may have 200 bound serfs, or 1000 with a Crown.</p>)
}
const rimDomestication: Perk = {
  id: "rim-domestication",
  title: "Domestication",
  cost: -1,
  prereqs: [rimBinding, rimNature],
  content: (<p>You share your connection with nature to your bound serfs. They are no longer hunted by wild beasts, and with time and generations, they can breed animals that are more amenable to cooperation with people. Beasts of burden can increase the abilities of the community, and animals that produce useful resources like edible eggs or milk, and textiles like fur or feathers are soon much prized.</p>)
}
const rimFire: Perk = {
  id: "rim-fire",
  title: "Fire",
  cost: -1,
  prereqs: [rimBinding],
  content: (<p>You have finally cured your serfs of their animalistic fear of fire. With fire, they can cook food, rendering a greater array of foods edible. This also unlocks the ability to use fire and heat in crafting, unlocking that paramount of materials: Metal. Your serfs can smelt and forge all sorts of new tools.</p>)
}
const rimPreaching: Perk = {
  id: "rim-preaching",
  title: "Preaching",
  cost: -1,
  prereqs: [rimBinding],
  content: (<p>Your serfs can spread your binding. Their passionate oration can convert wild serfs to your service. They cannot convert serfs of another Conduit, and attempting to do so may result in holy wars, depending on your teachings and how they interpret them. You can override another Conduit's binding personally, if necessary. Serfs converted without your personal intervention gain the benefits of your binding and become loyal to you without counting toward your Minion total.</p>)
}
const rimAbstract: Perk = {
  id: "rim-abstract",
  title: "Abstract",
  cost: -1,
  prereqs: [rimBinding],
  content: (<p>Your serfs can perceive of concepts beyond what can be directly described by simply referencing the world around them. They understand the concept of beauty, and will pursue it for its purely aesthetic value. Their aesthetic preferences follow after your own, and both their works and their bodies match yours. Their philosophy and mathematics gain the capacity to advance far farther as well.</p>)
}
const rimWriting: Perk = {
  id: "rim-writing",
  title: "Writing",
  cost: -2,
  prereqs: [rimBinding],
  content: (<p>One of the toughest blocks to remove from the serf mind is that against visual language, but once you do they take to reading and writing with gusto. The written word lets them pass your words or their own technological discoveries down through the generations without error, and they allow for messages to be sent over great distances. Your serfs also find an appreciation for reading and writing for recreational purposes.</p>)
}
const rimAgriculture: Perk = {
  id: "rim-agriculture",
  title: "Agriculture",
  cost: -1,
  prereqs: [rimBinding],
  content: (<p>Agriculture comes with the perception of time. Not just calendars, but even the recognition that planting seeds now leads to future prosperity. With agriculture, there are schedules. Not only that, but agriculture means your serfs can stay in one place, without the need to follow game or forage new lands. That means that they can build longer-lasting homes and buildings as well.</p>)
}
const rimSociety: Perk = {
  id: "rim-society",
  title: "Society",
  cost: -2,
  prereqs: [rimAbstract, rimAgriculture],
  content: (<p>Your serfs can progress beyond tribes and clans. You no longer need to micro-manage them. They can form schools, military orders, companies, and fully fledged governments. They have the power of bureaucracy. Individual serfs become highly specialized, supported by their fellows in proportion to their output via economics in some form. Buildings see more differentiation as well, with homes, shops, and offices designed to suit specific purposes.</p>)
}
const rimOverseerFortress: Perk = {
  id: "rim-overseer-fortress",
  title: "Overseer Fortress",
  cost: -1,
  types: ['Outpost'],
  content: (<p>Rim is divided into many distinct biomes, and near the center of each lies an ancient fortress, a self-repairing and self-maintaining control point. It automatically displays a map of the area it governs, identifying threats and resources, and can be networked to any remnant technology of this place that you find and activate, including other overseer fortresses. Each one has automated defenses which keep out serfs and wild animals, but which ignore Conduits.</p>)
}
const rimUthuli: Perk = {
  id: "rim-uthuli",
  title: "Uthuli",
  cost: -2,
  prereqs: [rimOverseerFortress],
  content: (<p>Songs of an ancient time fill your mind. Your lungs are filled with the methods used, perhaps, by the creators of the Rim to control its machines. As you sing, their land flows and forms at your will. You can shape the land to suit you, and you can call forth new land full of fertile resources. The nuance and specificity depends on your mastery of the song, but once you've mastered a song you can have your bound serfs sing along with you, bolstering your song and shaping the world on a scale proportionate to the numbers of your choir.</p>)
}
const rimAdaptation: Perk = {
  id: "rim-adaptation",
  title: "Adaptation",
  cost: -2,
  prereqs: [rimBinding, rimOverseerFortress],
  content: (<p>A Conduit can use the instruments of the ancients to alter the genome of a serf, aligning them to the biome governed by any specific fortress they control. These changes can be quite extensive, adding prehensile tails in a jungle or even gills in a sea. However, they always retain a humanoid bodyplan, the same approximate size, and pointed ears.</p>)
}
const rimMasks: Perk = {
  id: "rim-masks",
  title: "Masks",
  cost: -2,
  prereqs: [rimAdaptation],
  types: ['Infusion'],
  content: (<p>In a fortress, you can use a serf to make a mask, destroying the serf in the process. That mask contains the adaptations, infusions, and other modifications that the serf in question had, whether inherited or otherwise. Whoever wears the mask benefits from the same changes, their body temporarily changing. If the mask is removed, it is destroyed and their body reverts over a period of time depending on the degree of change. Serfs do not notice the masks, and cannot tell the difference between the mask's wearer and the serf from whom it was made.</p>)
}
const rimAssimilation: Perk = {
  id: "rim-assimilation",
  title: "Assimilation",
  cost: -1,
  prereqs: [rimMasks],
  types: ['Minion'],
  content: (<p>Your mastery of Masks allows you to craft new, generic serf masks that require no sacrifice to create. These masks, when placed on a person's face, gradually fuse with them and turn them into a serf entirely. Anyone who is more or less human can be converted, after which they are subject to any limitations on serfs that you have not lifted, and are subject to your binding. Even if they were originally unwilling, they cannot overcome their new nature. You can choose whether to make them female or leave them as male serfs, but their offspring will all be female.</p>)
}
const rimRebirthTanks: Perk = {
  id: "rim-rebirth-tanks",
  title: "Rebirth Tanks",
  cost: -3,
  prereqs: [rimOverseerFortress],
  types: ['Immortality'],
  content: (<p>In each fortress there is a room containing cylinders filled with blue liquid, large enough to hold a human with room to spare. These accept DNA samples, and will clone the body of the donor. The clone is mindless and inert but technically alive. When the donor dies, their mind will enter the new clone, and they will automatically be released. If the person is a Conduit with a connection to Rim, this works no matter what world they are on, otherwise it works anywhere on Rim. It fails if there is no fully formed clone ready. Each clone takes one Rim year to grow.</p>)
}
const rimMassGateway: Perk = {
  id: "rim-mass-gateway",
  title: "Mass Gateway",
  cost: -3,
  prereqs: [rimOverseerFortress],
  types: ['Gateway'],
  content: (<p>This huge device is a force of great change for the Conduits who wield it. It can transfer almost any amount of matter to any fortress you are connected to, including one on another world, if you create one using the Gateway Investiture perk. These gateways require time to charge, in proportion to the amount of matter being sent.</p>)
}
const worldRim = {
  id: "base-worlds-rim",
  title: "Rim",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>The Rim is a ring world, a boundless circle as wide as a planet, and stretching farther than you could walk in a thousand lifetimes. Space expands endlessly, the Rim growing ever-larger as new land is born of vulcanism and boundless natural resources are revealed. The purpose of the Rim is unknown, but the machines that maintain and control it yet remain, perhaps with hints to its origin within.</p>
    <p>Time, like space, flows like water here. Fifty years in Rim equate to only one elsewhere.</p>
    <p>Rim is populated by a race of elfin creatures who call themselves serfs. They are alike to humans in both mind and body, but lesser in both respects. They are short and slight, though they are agile and can have strength somewhat beyond their proportions, as their lifestyle is often more physical than that of modern humanity. Their minds are not inherently less able, for they are capable of language, tool use, and great emotional depth, but they have insurmountable blocks within their mind. These limits prevent them from ever rising above savagery, and likewise encourage them to venerate Conduits. Removing those blocks would be the errand of many of their generations.</p>
    <p>They are all female and reproduce parthenogenetically, in litters of several young. They live a few decades, though those who a Conduit interacts with directly may take on some of their timelessness. Their tribes vary physically according to their environment, each somewhat different in ethnic features.</p>
    <p>Effects that rely on the nature of other worlds happen at the timescale of that world, not at Rim's boosted timescale. This includes Conduit point gain.</p>
    </>
  ),
  conduitDescription: (<p>As you take more perks in Rim, your ears taper like those of the serfs and your aging slows, eventually approaching stasis. Your perspective broadens, and it becomes easy to take long views and see the whole picture, though focusing on minor details feels more and more tedious as they are further and further beneath you. Those influenced by the Rim are titled Tribune.</p>),
  perks: [
    rimNature, rimBinding, rimDomestication, rimFire, rimPreaching, rimAbstract, rimWriting, rimAgriculture,
    rimSociety, rimOverseerFortress, rimUthuli, rimAdaptation, rimMasks, rimAssimilation, rimRebirthTanks,
    rimMassGateway
  ],
  crown: {
    id: "rim-crown",
    title: "Crown: Consul",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in the Rim are called Consuls, and rule over the greatest empires of any Conduits, at least with regards to population.</p>
      <p><PerkListing perk={rimPreaching} /> can convert the serfs of other Conduits, provided they are not also Consuls, and your serfs can spread your influence through holy tracts or even memetic glyphs.</p>
      <p><PerkListing perk={rimAdaptation} /> may adapt to foreign worlds, not just the biomes of Rim. Likewise, you bring the machines of the ancients in your very bloodstream, and the songs of <PerkListing perk={rimUthuli} /> work even outside the range of your Overseer Fortresses, and even on other worlds.</p>
      <p><PerkListing perk={rimAssimilation} /> allows you to make an additional type of mask from a serf, one that retains an imprint of their originator without harming them in the making. These masks may be placed on statues, and they speak with the words and memories of the serf, lasting indefinitely and allowing you to retain their knowledge. If placed on a person, this mask allows that person to commune with the imprinted memories while they wear the serf's face, but is destroyed on removal like a normal Mask.</p>
      <p>Rim wildlife tamed with <PerkLink perk={rimDomestication} /> can be modified with <PerkListing perk={rimAdaptation} /> or any other perk that could apply to your bound serfs.</p>
      <p>Finally, you connect on a deeper level to the workings of the ancients. The relics and ruins you encounter make intuitive sense to you; you can use them easily, modify them with some study, and recreate them with significant effort. This includes Overseer Fortresses, though they may take years to construct.</p>
      </>
    )
  },
  dangers: {
    id: "rim-dangers",
    title: "Dangers",
    firstTitle: "Time",
    firstContent: (<p>One who is well invested in the Rim ages more slowly, but travelers unprepared may find themselves spending a lifetime and then returning to a world that scarcely missed them.</p>),
    secondTitle: "Feral Serfs",
    secondContent: (<p>Though serfs seem designed to serve Conduits, they are dangerous until tamed. They know the environment well, and are tempered by it, and they outnumber you.</p>),
    thirdTitle: "Megafauna",
    thirdContent: (<p>Rim is home to all manner of animals, some of which exist in the past of the world and others have never been seen in the fossil record. Not all are dangerous, but enough are.</p>)
  },
  poi: {
    id: "rim-poi",
    title: "Remnants",
    firstTitle: "Sky Lands",
    firstContent: (<p>Great shades drift overhead, the gravity inverted, or entirely chaotic. They block out the sun and simulate night, but they also exert gravity, causing tides, and there seem to be biomes upon their surface as well.</p>),
    secondTitle: "Day and Shadow",
    secondContent: (<p>The night and day typically cycle over the course of about 24 hours, but in some places the skylands get messed up somehow, instead causing nights or days that last for years at a time.</p>),
    thirdTitle: "Ruins",
    thirdContent: (<p>The ancients left behind all manner of machines and buildings. Some are incredibly potent, but most are notable mostly for the hints about the past that they contain.</p>)
  },
  breaching: {
    id: "rim-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Where the Rim brushes the boundaries between worlds, anachronistic animals, long thought extinct, start to appear. Small things at first, then bigger ones. Time seems to slip away, or drag on forever, and in extreme cases a serf may come through.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Establishing an outpost of Rim causes the Rim to form a new Overseer Fortress. Its domain extends substantially further than outposts of other worlds, allowing the Overseer Fortress to govern a larger area. It also brings over a small tribe of serfs, to serve and maintain the area. In the outpost, more time passes than in the world outside of it, though the effect is much more subtle than in Rim itself.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>Opening a Mass Gateway in another world connects it to a network, allowing you to teleport either to a specific gateway on the other side of a bridge, anywhere in the larger array of Mass Gateways connected to Overseer Fortresses.</p>)
  }
}

const yomiNecrophagy: Perk = {
  id: "yomi-necrophagy",
  title: "Necrophagy",
  cost: -2,
  types: ['Infusion'],
  content: (<p>Shades are frail, and there is no food to be had in Yomi. You feast, thus, upon the dead. As a result, your skin fades in color, becoming pale and grey. Your need for food fades, though your hunger doesn't, and you no longer need sleep. You do not tire of labor mentally either, and the oblivion of mindless work feels comfortable. Your blood, though, becomes slightly luminous and shades crave to consume it.</p>)
}
const yomiLiquor: Perk = {
  id: "yomi-liquor",
  title: "Liquor",
  cost: -3,
  prereqs: [yomiNecrophagy],
  types: ['Material'],
  content: (<p>When you wring a shade out, a small amount of liquid remains, some sort of ectoplasm. A bit of your own blood starts the fermentation process. When distilled, you create a potent liquor with a flavor profile depending on your emotional state as you supplied the blood. Drinking it invigorates you and causes your wounds to regenerate, but at the cost of small amounts of your memory, starting with the faintest and least valued. The stronger you distill it, the greater the effect, but the regeneration prevents drunkenness from becoming debilitating. Anyone who drinks it, when they die, is sucked into Yomi and becomes a shade.</p>)
}
const yomiMist: Perk = {
  id: "yomi-mist",
  title: "Mist",
  cost: -2,
  content: (<p>The chill mist of Yomi cleanses memory and personality. While it normally has little effect on a living person, you have breathed it in so much that you can breathe it out. Your breath always seems to steam as if it were below freezing out, and you can intentionally breathe so much out that it forms a cloud around you, cloaking yourself in forgetting. The mist shrouds your movements, and whoever inhales it will lose their immediate memories, forgetting hostility to you and, most likely, any transgression you have caused.</p>)
}
const yomiBonesOfMistAndBlood: Perk = {
  id: "yomi-bones-of-mist-and-blood",
  title: "Bones of Mist and Blood",
  cost: -2,
  prereqs: [yomiMist, yomiNecrophagy],
  types: ['Infusion'],
  content: (<p>You have steeped in the mist so long that it now suffuses your marrow, and its chill focuses you. Your reflexes improve and you move faster, in proportion to points spent in Yomi. Your precision and accuracy, too, benefit in proportion, as you control your bones directly. You produce more blood than usual, and can replenish your own blood by drinking the blood of others. As a side effect, you are also immune to anemia and most cancers.</p>)
}
const yomiCorpseCandleEye: Perk = {
  id: "yomi-corpse-candle-eye",
  title: "Corpse Candle Eye",
  cost: -1,
  prereqs: [yomiMist],
  types: ['Gateway'],
  content: (<p>The night is your partner. Mist is clear to you, transparent, but sheds a light that only you can see. Even in pitch blackness, you can exude your mist and see wherever it flows. Even if the mist is a substantial distance away, this remains true as it focuses the intensity of your vision. In the long nights of Yomi, where the mists only burn off in the distant morning, this means that you may be able to see over a very substantial area.</p>)
}
const yomiHospitality: Perk = {
  id: "yomi-hospitality",
  title: "Hospitality",
  cost: -1,
  prereqs: [yomiLiquor, yomiMist],
  content: (<p>During the long night, you mix mist and ash to create a clay, and throw it into the form of a pot. The liquor you pour into this takes on notes of spice, dark chocolate, and a hint of hogo, and bears a power of detente. Accepting a drink from it creates a pact of peace between both the giver and receiver, and neither can harm the other within the next three days or they will suffer thrice the injury and ten times the agony. Additionally, the aroma of the liquor alone will ease hostility and assuage chaos, instilling peace instead, and encouraging natural healing.</p>)
}
const yomiBreath: Perk = {
  id: "yomi-breath",
  title: "Breath",
  cost: -1,
  types: ['Minion'],
  content: (<p>Shades lack breath, like the dead things that they are. By breathing into their mouths, you can share some of yours. Your breath gives them enough focus to be useful to you, and to communicate. They are not inherently loyal to you, but they crave more of the life that you bear. Giving your breath like this means that you will remain slightly short of breath for a month or so. You can safely give your breath a dozen times before you have to stop and wait for it to return; if you give any more, you may suffocate.</p>)
}
const yomiDevilsFlesh: Perk = {
  id: "yomi-devils-flesh",
  title: "Devil's Flesh",
  cost: -2,
  prereqs: [yomiBreath, yomiNecrophagy],
  content: (<p>Shades barely have true bodies, and can't readily maintain physicality outside of Yomi. You can change that, however, by crafting them new bodies from the refined flesh of other shades. Once assembled, it simply takes a bit of your blood to give it life. The form of the body is up to you, but there is a natural form for every shade, which you will get a feel for as you make more bodies. The further you deviate from this natural form, the shorter the time before the body is destroyed by wear and tear - and the greater the agony that the shade will suffer as it happens.</p>)
}
const yomiOni: Perk = {
  id: "yomi-oni",
  title: "Oni",
  cost: -3,
  prereqs: [yomiDevilsFlesh, yomiLiquor],
  types: ['Immortality'],
  content: (<p>On your death, you become a shade and return to Yomi if you are somewhere else. You, however, retain your faculties sufficient to use your perks and consume shades. Once you drink some liquor, you form a new body. It resembles your own previous body, but it is larger, stronger, tougher, and more ogrish in proportion to the amount of harm you've suffered and caused since you last formed a new body. This can only take effect if you have a proper body, so if you die again while a shade, it won't work.</p>)
}
const yomiToil: Perk = {
  id: "yomi-toil",
  title: "Toil",
  cost: -1,
  prereqs: [yomiBreath],
  types: ['Outpost'],
  content: (<p>The shades who have tasted your breath become overseers to those who haven't. They direct the fruitless labors of the shades to serve you. They can sculpt entire palaces from obsidian, but few resources are to be had in Yomi, so they butcher other shades, making leather of their hides and tools of their bones. They lack the skill for any complex industry, but shades are excellent at manual labor.</p>)
}
const yomiSoulwell: Perk = {
  id: "yomi-soulwell",
  title: "Soulwell",
  cost: -2,
  prereqs: [yomiToil],
  content: (<p>Your shades build you a deep hole, and their remains swirl around the edges. Both the essence and the memories remain here, making a whirlpool of lost experiences. By submerging yourself in the well, you may experience lost memories, though they are fleeting. Small fragments of thought, of feeling, and of lives once lived bring to you the merest motes of the wisdom that death has severed. By meditating in the well, you can subvert the forgetting of Yomi, belay the wrath, and seek knowledge long lost.</p>)
}
const yomiSmithy: Perk = {
  id: "yomi-smithy",
  title: "Smithy",
  cost: -1,
  prereqs: [yomiToil],
  types: ['Material'],
  content: (<p>Many shades are beaten into the ash of the ground, consecrating a smithy wherein soulsteel can be forged. Soulsteel is made by folding shades over on themselves thousands of times and cold-forging them into a tremendously hard and sharp steel. It retains the chill of the grave, and any wound inflicted with this steel will not naturally heal, but neither will it fester. Those killed by it become shades. It is also reasonably useful as structural steel.</p>)
}
const yomiVengeance: Perk = {
  id: "yomi-vengeance",
  title: "Vengeance",
  cost: -1,
  prereqs: [yomiSmithy, yomiBonesOfMistAndBlood],
  content: (<p>Forge a weapon in the name of one who has wronged you. Your resentment becomes part of the steel, and it remembers. Every wound it inflicts is multiplied, chaotic duplicates of the force inflicted hitting the enemy from every angle. The number of blows is proportionate to points spent on Yomi, and also the strength of the grudge with which the weapon was forged. Forgiveness robs it of its power.</p>)
}
const yomiRedSunAura: Perk = {
  id: "yomi-red-sun-aura",
  title: "Red Sun Aura",
  cost: -2,
  types: ['Infusion'],
  content: (<p>The red sun has shone upon you so long that it now shines within you. Even in other worlds, your gaze bears the wrath of the red sun, and those you turn your anger upon wither and tire, in proportion to points spent in Yomi and to the antipathy that you feel towards them. In the most extreme case, even their flesh can be burnt away, leaving nothing but ash. Your own skin is lit red in the sun's light but you are immune to harm from it.</p>)
}
const yomiHeartOfSunAndSteel: Perk = {
  id: "yomi-heart-of-sun-and-steel",
  title: "Heart of Sun and Steel",
  cost: -1,
  prereqs: [yomiSmithy, yomiRedSunAura],
  content: (<p>Your heart burns like the red sun itself. When aroused in wrath, your combat ability heightens and your muscles grow more powerful. Hesitation and distraction flee before your decisive action, and all schemes are useless in the face of superior force. Furthermore, any soulsteel weapon you kill someone with becomes attuned to you, leaping to match your intent but turning in anyone else's hands. You also will not suffer from cardiac afflictions as long as your heart isn't physically destroyed or removed.</p>)
}
const worldYomi = {
  id: "base-worlds-yomi",
  title: "Yomi",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>The bleak fields of Yomi are strewn with ashes of untold ages, and far above them, a crimson sun burns with great heat but little light. It remains up for months, nearly unmoving, then slips below the horizon and leaves the world dark for months more. A chill mist drifts through the starless night, but the sky is mercilessly clear through the days. Obsidian spires and castles dot the landscape, and slow processions of shades flow through them, like rivers of shambling, disaffected ants. The ravens which circle overhead are far larger than they appear.</p>
    <p>Yomi is inhabited by shades, feckless beings resembling humans, but chaotic in nature. They are transparent and ever so slightly luminous, and most barely retain their minds, toiling endlessly towards some unrecognized aim. They are rarely effectual in doing so, as they are only somewhat directed and often distracted by some other equally useless task. The locals are convinced that they are dead souls being cleansed for reincarnation, though nobody seems to know the source of that information and there's no way to check.</p>
    <p>The lords of Yomi are the Oni, shades which have formed physical bodies, giving them an absolute advantage over the shades in pretty much every regard. If they ever had anything they truly cared about, however, most have long lost it. They spend their time variously in wrathful violence, drunken stupor, or other base physical glories. While they often enslave legions of shades to build them great estates and empires, they just as readily destroy each other's homes - and, nearly as readily, their own.</p>
    </>
  ),
  conduitDescription: (<p>As you spend time and gain perks in Yomi, the suffering of others begins to feel more distant to you, which usually implies a fading compassion, and potentially disdain. You also become more aware of the sins and flaws of others, and at 20 points spent, you gain an inherent sense of whether someone has transgressed against you or betrayed you. Conduits of Yomi are called Ronin.</p>),
  perks: [
    yomiNecrophagy, yomiLiquor, yomiMist, yomiBonesOfMistAndBlood, yomiCorpseCandleEye, yomiHospitality, yomiBreath,
    yomiDevilsFlesh, yomiOni, yomiToil, yomiSoulwell, yomiSmithy, yomiVengeance, yomiRedSunAura, yomiHeartOfSunAndSteel
  ],
  crown: {
    id: "yomi-crown",
    title: "Crown: Daimyo",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Yomi are the Daimyo, warlords that slaughter shades and the living alike with impunity. The Daimyo's skin transcends color, becoming a dark ashy black.</p>
      <p>A Daimyo's <PerkLink perk={yomiCorpseCandleEye} /> develops into an entirely new sense, forming misty eyes in new locations and allowing the Conduit to see even nowhere near their body.</p>
      <p>A Daimyo loses no memories even when drinking <PerkLink perk={yomiLiquor} />.</p>
      <p>The shades commanded by a Daimyo can remember more practical details of their work, and can be directed to do even relatively complicated tasks. A Daimyo can even instruct their <PerkLink perk={yomiToil} />ing shades to forge bodies of <PerkLink perk={yomiDevilsFlesh} />, and needs only contribute a drop of blood when it is complete. <PerkLink perk={yomiBonesOfMistAndBlood} /> allow them to provide it readily.</p>
      <p>When you form a new <PerkLink perk={yomiOni} /> body, it is still increasingly larger and stronger every time, but you can retain your beauty if you prefer.</p>
      <p>Daimyo may forge weapons of <PerkLink perk={yomiVengeance} /> not only against individuals, but against entire demographics. The duplicate attacks are spread among many nearby individuals.</p>
      </>
    )
  },
  dangers: {
    id: "yomi-dangers",
    title: "Dangers",
    firstTitle: "Day",
    firstContent: (<p>The Red Sun shines eternally on eternally weathering souls. Under its light, you find yourself drying, weathering, aging and becoming ashy. Under its light, you tire.</p>),
    secondTitle: "Night",
    secondContent: (<p>The nights are dark, and the mist which fills them prevents light from transmitting even when introduced. Worse, it seeps into you, bringing a wretched chill and eating away at your memories.</p>),
    thirdTitle: "Violence",
    thirdContent: (<p>Day or night, the oni lords march their ashen ashigaru, shades in obsidian armor, into pointless wars to harvest the corpses of their enemies. Anything in the way must hide, fight, or perish.</p>)
  },
  poi: {
    id: "yomi-poi",
    title: "Edifices",
    firstTitle: "The Walking Fortress",
    firstContent: (<p>A great tower strides on dozens of legs, each operated by hundreds of shades. It brings the high ground with it, allowing its oni master to always hold the advantage.</p>),
    secondTitle: "Wyrm Mount",
    secondContent: (<p>A long hill in the form of a great wyrm is actually home to an oni khagan most deranged. Within the belly of the obsidian wyrm, wyrms of flesh are manufactured, and they spill from its mouth to the plains below.</p>),
    thirdTitle: "The Lost Ark",
    thirdContent: (<p>An ancient boat, inexplicably of wood, lies wrecked and alone. Shades and oni alike avoid her remains.</p>)
  },
  breaching: {
    id: "yomi-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Near bridges to Yomi, people become irritable and lose willingness to overlook minor slights. Color seeps away from the landscape, and things seem to age more rapidly. At night, or in shaded places away from the sun, mist seeps out and erodes memories.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>A great comet streaks down from the sun. Though it strikes the ground, the calamity is still limited in size to the usual scale of an outpost, spreading ash across the landscape. The comet itself forms a mess of obsidian haunted by shades and emanating mist at night.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>Every gateway to Yomi beyond the reach of the sun, and thus is most likely underground. The passageway fills with mist, blocking sight to most, and shades toil at the gate, making it ever more labyrinthine if not restricted with an iron fist, obscuring the exact place where the transition between worlds exists.</p>)
  }
}

export const baseWorlds: readonly World[] = [
  worldEarth, worldBevin, worldPrison, worldRim, worldYomi
]