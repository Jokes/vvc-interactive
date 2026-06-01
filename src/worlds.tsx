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

const desertFruitOfTheHeart: Perk = {
  id: "desert-fruit-of-the-heart",
  title: "Fruit of the Heart",
  cost: -2,
  types: ['Infusion'],
  content: (<p>Rare trees whose fruit resemble human hearts in appearance but taste of musky sexual fluids open your mind to the Pink Desert. You gain an enhanced intuition for the desires and insecurities of whoever you interact with. This effect is subtle, but it goes well with a secondary effect: Your bodily fluids become addictive. A dose or two are unlikely to do much, but much more than that and the imbiber will start having withdrawal symptoms after a few days without a taste.</p>)
}
const desertThrallherd: Perk = {
  id: "desert-thrallherd",
  title: "Thrallherd",
  cost: -1,
  prereqs: [desertFruitOfTheHeart],
  types: ['Minion'],
  content: (<p>Those addicted to your fluids have a more pervasive connection to you. You always know their approximate direction and distance, as you would with a bridge, and you have a general sense of how well they're feeling. They tend to feel extremely loyal to you. Though it is theoretically possible for them to betray you, they will crave your approval - or at least your body.</p>)
}
const desertRefinedFlesh: Perk = {
  id: "desert-refined-flesh",
  title: "Refined Flesh",
  cost: -2,
  types: ['Infusion'],
  content: (<p>Water in the Pink Desert is rarely simple water. Every oasis has its own character. Most are intoxicating, with flavors like the delectable treats of other worlds. While the bulk of their effects are usually temporary, they also have an enhancing effect on you, greatly increasing your endurance. Your muscles last longer without tiring, you last longer in sex, and you need less hydration. Additionally, you heal more quickly. Some waters resent being drunken of, but most take pleasure from it.</p>)
}
const desertFertility: Perk = {
  id: "desert-fertility",
  title: "Fertility",
  cost: -1,
  prereqs: [desertRefinedFlesh],
  content: (<p>Your body's fertility is under your control. You can impregnate and be impregnated in equal measure, and you can "hold back" and prevent impregnation. Your pregnancies are especially easy and uncomplicated, and quicker as well. Your children are always born healthy, never burdened with genetic time bombs that might afflict them or their own children with serious illness later in life, and they inherit your infusions. They are also more likely to be loyal to you.</p>)
}
const desertBloodline: Perk = {
  id: "desert-bloodline",
  title: "Bloodline",
  cost: -3,
  prereqs: [desertFertility],
  types: ['Immortality'],
  content: (<p>Your children are more willing to work together and put the family above themselves. You, on the other hand, can use them to reincarnate. If you die, you enter the body of your youngest descendant, including those in the womb. Their body doesn't change, except as a result of your infusions, which activate after birth. Their mind is subsumed by yours, and you regain your memories between the ages of two and six. If you have no living descendants, this method fails.</p>)
}
const desertOasis: Perk = {
  id: "desert-oasis",
  title: "Oasis",
  cost: -1,
  prereqs: [desertRefinedFlesh],
  types: ['Outpost', 'Gateway'],
  content: (<p>Water wells up beneath you from the sands. You are the erokami of this water, and if you leave it for too long, it dries up. However, you can feel whatever enters your water as if it were your own body, and in fact the water is effectively your bodily fluid. The flow rate scales on points spent in Pink Desert, from a weak household faucet all the way up to a raging river; to be precise, in a minute your Oasis produces as many gallons of water as the square of your points spent in the Pink Desert. </p>)
}
const desertGlass: Perk = {
  id: "desert-glass",
  title: "Glass",
  cost: -1,
  types: ['Material'],
  content: (<p>You have learned to exhale pink mist into the sands, shaping them by your will into items of glass. The glass is quite durable, light, and can be made as rigid or as flexible as you like. The glass can hold an edge, but doesn't have to. Items you make of glass are alike to your own body while you have physical contact with them. Whatever they touch, you feel as though it was you, and they are fairly sensitive erogenous zones.</p>)
}
const desertRestraint: Perk = {
  id: "desert-restraint",
  title: "Restraint",
  cost: -2,
  prereqs: [desertGlass],
  content: (<p>Glass formed fast enough can be handy in a fight. While it's not likely to make an especially useful structure afterwards, the speed of your shaping means you can form tentacles of sand which then solidify and bind an opponent or victim. While bound in this way, and while you touch the glass, you have control over their orgasms. When you don't touch the glass, they can't orgasm at all. The only escapes are to break your glass, which takes great strength especially if you make it thick, or to dodge the glass before being bound.</p>)
}
const desertArt: Perk = {
  id: "desert-art",
  title: "Art",
  cost: -1,
  prereqs: [desertGlass],
  content: (<p>You utilize the pink sands to make artistic implements, and when using those implements the art you make engages multiple senses. Songs that cause images, paintings that cause you to taste what is depicted in them, meals which remind the eater of a memory that you had, even if they never experienced it. All these sensations are illusory, but what beauty they contain!</p>)
}
const desertCitadel: Perk = {
  id: "desert-citadel",
  title: "Citadel",
  cost: -3,
  prereqs: [desertGlass, desertOasis],
  content: (<p>What could be simpler than mixing water and earth to make mud? But it is a subtler art to mix the water of your own oasis with the Pink Sand and breathe the result into bricks. Through long effort, you direct and stack these bricks into buildings and palaces, creating a mighty walled city. The site of shelter is of great appeal to the erokami, and many will join you, should you allow them. Within your walls, they will drift towards more domestic roles. Most likely become good citizens, less wild and rapine, more humanoid and productive.</p>)
}
const desertAlpha: Perk = {
  id: "desert-alpha",
  title: "Alpha",
  cost: -1,
  content: (<p>You have a bit of erokami in you, and you can play their game at the highest level. In other words, you can make any sexual encounter a competition - and except against especially powerful erokami, you will almost certainly win. You gain sexual potency with every time you dominate at sex, and you can subjugate those you best. You can also choose to refuse changes imposed by other erokami, though this may offend them. Finally, you overcome such limits as orientation - everyone is susceptible to your appeal, regardless of their other preferences.</p>)
}
const desertBinder: Perk = {
  id: "desert-binder",
  title: "Binder",
  cost: -2,
  prereqs: [desertAlpha, desertRestraint],
  content: (<p>When you defeat someone at sex while they are bound in your glass, you may refine the glass that binds them into a small jewel. The bound person goes free, but you keep the jewel, which represents their obligation to you. At any time you may destroy the jewel to summon the one bound by it and command them to perform a single service for you. They will vanish back to the place they were summoned from once their task is complete. These jewels slowly weaken over time, and will disintegrate on their own after a number of years equal to your points spent in the Pink Desert.</p>)
}
const desertItem: Perk = {
  id: "desert-item",
  title: "Item",
  cost: -2,
  prereqs: [desertBinder],
  content: (<p>You can insert a binding jewel into an item to empower the item and preserve the jewel. Each erokami has their own unique traits and focus, and an item with an erokami bound to it will share some of those powers, even when the erokami is not summoned. When they are, it gains a specific ability related to their nature. Jewels bound into items take twice as long to disintegrate, and can be removed without damage to the jewel.</p>)
}
const desertPossession: Perk = {
  id: "desert-possession",
  title: "Possession",
  cost: -2,
  prereqs: [desertBinder],
  content: (<p>You can insert binding jewels into people by anointing the jewel with their blood or other fluids. This summons the erokami into their body. The erokami controls the body, and its true owner has only the experience of a waking dream while controlled. The erokami can manifest aspects of their own bodies if needed. Jewels bound into people take half as long to disintegrate, and can only be removed by destroying the jewel.</p>)
}
const desertShadowbound: Perk = {
  id: "desert-shadowbound",
  title: "Shadowbound",
  cost: -1,
  prereqs: [desertPossession],
  content: (<p>You can insert a binding jewel into your own shadow. The erokami within is normally hidden, but can spring forth at your command. Unbound by the physical, its traits and abilities are able to become more esoteric. It is also controlled more directly by you, just as your shadow is controlled by your body. Furthermore, it is bound so closely to you that its time never runs out - it remains bound to you indefinitely. Only one can be bound in this way at a time; shadowbinding a new jewel destroys the old one.</p>)
}
const worldDesert = {
  id: "base-worlds-desert",
  title: "Pink Desert",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>The Pink Desert stretches infinitely in every direction, flat expanses of rose-colored sand dotted by the occasional settlement or oasis. The rivers that cross this land seem to come from nowhere and go nowhere, their waters emerging from the sands, flowing for miles or hundreds of miles, and then petering out. The cities are made of the sands themselves, which can be fired into an opaque glass of surprising structural integrity, and every city is a place where pink mists of prosperity cloak the intrigue and schemes of inhuman minds.</p>
    <p>There are people in this world, after a fashion. The erokami may appear almost any kind of way, but those most human in appearance are not necessarily most human in behavior. Every item aside from the sands themselves, no matter how inhuman, is an erokami, and every erokami conducts their social life primarily through sex. Nearly every tree or stone has some manner of protrusion or orifice, or both, and most also excrete some heady, intoxicating substance. Sex is a competitive affair for the erokami though, always with a top and a bottom, and sex that is about intimacy rather than power is no more common in the Pink Desert than on Earth.</p>
    </>
  ),
  conduitDescription: (<p>As you take more perks in the Pink Desert, your skin tone drifts toward pinker or purpler hues. Your body takes on some aspects of erokami you dally with, transforming ever so slightly each time. Those influenced by the Pink Desert are titled Vizier.</p>),
  perks: [
    desertFruitOfTheHeart, desertThrallherd, desertRefinedFlesh, desertFertility, desertBloodline, desertOasis,
    desertGlass, desertRestraint, desertArt, desertCitadel, desertAlpha, desertBinder, desertItem, desertPossession,
    desertShadowbound
  ],
  crown: {
    id: "desert-crown",
    title: "Crown: Sultan",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in the Pink Desert are called Sultans, ruling over oases and commanding entire treasuries of erokami.</p>
      <p><PerkLink perk={desertRefinedFlesh} /> also makes you more durable and stronger.</p>
      <p>Your <PerkLink perk={desertBinder} /> jewels are not expended on use, and there is no limit to the amount of time you can expect an erokami to work on a specific task. You can create jewels automatically for anyone in your bloodline, as well as any minion including those from other worlds.</p>
      <p>You can bind jewels together using <PerkLink perk={desertItem} />, combining the erokami in both jewels into a more powerful erokami that unifies their personalities and powers.</p>
      <p>The waters of your <PerkLink perk={desertOasis} /> can impregnate others. You can influence what traits your <PerkLink perk={desertBloodline} /> inherits, and shape them slightly.</p>
      <p>Items made of your <PerkLink perk={desertGlass} /> act like parts of your body even when you are not in contact with them, unless you will them to detach. If they are flexible, they can move and distort according to your will just as if they were your own appendages. You can also choose to give them to other people instead of or in addition to yourself, letting them feel the sensations of the item.</p>
      <p>If you store jewels in your <PerkLink perk={desertCitadel} />, the erokami bound to them will be drawn to the Citadel to live there.</p>
      </>
    )
  },
  dangers: {
    id: "desert-dangers",
    title: "Dangers",
    firstTitle: "Wild Gods",
    firstContent: (<p>The erokami, especially those outside the cities, are controlled by powerful lusts. Although they can suppress them, their desire always simmers beneath the surface and they have, at best, a tenuous grasp on consent.</p>),
    secondTitle: "Thirst",
    secondContent: (<p>The Pink Desert is completely dry between its oases, and its denizens will scheme to rob you of your bodily fluids. Though they don't desire to kill you directly, and would be surprised to learn how much water you need to survive, the most common death for an outsider in the Pink Desert is dehydration.</p>),
    thirdTitle: "Taxes",
    thirdContent: (<p>The citadel oases are the safest places, if you have some great wealth. But their masters only shelter those who pay tribute with gifts of sufficient beauty or eroticism.</p>)
  },
  poi: {
    id: "desert-poi",
    title: "Erokami",
    firstTitle: "Flora",
    firstContent: (<p>The most common of erokami are the plants. Rooted in place at an oasis, they drink water and pay in fealty. Their fruit is delectable, but some use it as bait.</p>),
    secondTitle: "Nomads",
    secondContent: (<p>The nomads resemble humans with horns growing from their heads. They travel between oases, traveling in caravans, trading, and sometimes rading. They are silent, but speak with each other in sign.</p>),
    thirdTitle: "Ambushers",
    thirdContent: (<p>Below the sand or far above them, many different classes of erokami wait for unwary travelers. Pits in the ground, writhing tentacles, or soaring dragons, they all wait for you to come near enough before pouncing.</p>)
  },
  breaching: {
    id: "desert-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Where the Pink Desert brushes the boundaries between worlds, pink sand finds its way through. People in these areas are both more lustful and more competitive, and dynamics of domination and submission become more common in their sexual interactions.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>The outpost of the Pink Sands is an oasis. The waters of the oasis drain through the bridge as the outpost is created, and erokami go with it, forming their community around it.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A lovely reflecting pool reflects the world in slightly pinker hues. Whoever jumps in will come out the other side in a matching pool in the Pink Desert.</p>)
  },
}

const aetherAscendance: Perk = {
  id: "aether-ascendance",
  title: "Ascendance",
  cost: -2,
  types: ['Infusion'],
  content: (
    <>
    <p>Divine radiance suffuses your being, sustaining you without need for food and drink. Unlike an aengel, however, you can still eat and drink if you choose, and sustenance of that form can benefit you when radiance is scarce. One unit of divine radiance per day will sustain you fully.</p>
    <p>Wings of radiant light sprout from your back. You can unfurl them or put them away at will, and they lift you with more force than wings of their size ought to, allowing you to fly even with a normal human weight.</p>
    </>
  )
}
const aetherCrusadersFire: Perk = {
  id: "aether-crusaders-fire",
  title: "Crusader's Fire",
  cost: -1,
  types: ['Infusion'],
  content: (<p>The radiance of the Almighty burns all sinners. You can direct it and call it forth to smite your enemies in the form of a golden flame. You can shoot it forth in a blast, or coat a weapon with it. Even the aengelim are burnt by the wrath of the divine as it leaves your hands, and purified into a pillar of salt. You can hold 1 unit of divine radiance safely within your body per point spent in the Aether.</p>)
}
const aetherOrichalcum: Perk = {
  id: "aether-orichalcum",
  title: "Orichalcum",
  cost: -2,
  types: ['Material'],
  content: (<p>Everything in the Aether is formed of the divine radiance of the Almighty, and shaped by the will of his servants. Your will, too, can shape radiance into physical form. Specifically, you form Orichalcum, a golden material that resists physical attempts to manipulate it but is easily shaped by your will. For every 1 unit of radiance, you can form as many measures of raw Orichalcum as you have points in the Aether; one measure can be formed into about a truckload of sturdy building material, or condensed and refined into armaments for about a dozen aengelic soldiers.</p>)
}
const aetherWrathfulEye: Perk = {
  id: "aether-wrathful-eye",
  title: "Wrathful Eye",
  cost: -1,
  prereqs: [aetherOrichalcum, aetherCrusadersFire],
  content: (<p>Within your divine geometries is a nexus, an eye. It can see the enemy, and when it does, a great ray of holy flames erupt forth. Its fire is alike to your own, burning away physical matter and solidifying living souls into pillars of salt. The eye can have any appearance, allowing you to hide eyes in unexpected places, and you may obstruct their vision if needed. Each wrathful eye needs 1 radiance per day to remain open, and spends more when it fires, but you can also make more powerful ones by increasing the radiance used, and they may remain dormant as needed.</p>)
}
const aetherThrone: Perk = {
  id: "aether-throne",
  title: "Throne",
  cost: -1,
  prereqs: [aetherOrichalcum],
  content: (<p>You can erect a great tower atop the clouds, fifty cubits per point in Aether, and formed of divine geometries. It establishes your domain over a substantial area, which in Aether allows it to draw in 5 units of radiance per day, as they crystallize among the clouds. At its peak is a shrine to you as Saint under the Almighty, and just below that is the throne room from which you can survey the domain. It can be expanded with additional rooms, and a few ishim appear to serve and maintain your throne.</p>)
}
const aetherFortress: Perk = {
  id: "aether-fortress",
  title: "Fortress",
  cost: -2,
  prereqs: [aetherThrone],
  types: ['Material', 'Minion'],
  content: (<p>Any tower can be enclosed in a great citadel, with high walls. It can incorporate any defenses you can construct, and it also shelters a small city. This city is populated by ishim, who appear perhaps from the souls of the righteous. They are entirely loyal and have no needs, and they can operate a cloud loom which spins clouds into a soft white material something like cloth or vellum, which aengelim wear as robes. A dozen ishim jointly count toward minion limits as one ordinary minion.</p>)
}
const aetherCathedral: Perk = {
  id: "aether-cathedral",
  title: "Cathedral",
  cost: -1,
  prereqs: [aetherThrone],
  content: (<p>The Divine Radiance of the Almighty falls upon those who praise him, so long as they observe the proper forms. You can construct a Cathedral in your Throne, where your minions can pray for radiance. Each five praying aengelim provide 1 unit of radiance per day; the denizens of other worlds tend to be less efficient, and ten of them would be needed to replace one aengel. The effect of prayer is highly beneficial to health, and anyone sick or injured can be lain atop the altar, allowing them to be restored by the prayers at the cost of some radiance.</p>)
}
const aetherGarden: Perk = {
  id: "aether-garden",
  title: "Garden",
  cost: -1,
  prereqs: [aetherThrone],
  content: (<p>By infusing wisps of cloud with radiance, you form a golden soil. An aengel's body, planted in such a garden, grows into a tree whose fruit grants a little of their skill and power with each bite. The golden garden can also grow any plant from any world, magical or mundane, without need for tending or watering; and there are many marvelous trees in the Aether whose fruit you could plant in your garden to share in their bounty.</p>)
}
const aetherIntercession: Perk = {
  id: "aether-intercession",
  title: "Intercession",
  cost: -1,
  prereqs: [aetherCathedral],
  content: (<p>In your Cathedral, your minions can pray to you, requesting that you bestow onto them the grace of the Almighty. While you are not the Almighty yourself and cannot grant any divine radiance in return, you can hear these prayers in the back of your mind. Your mind also expands to receive them, so they don't distract you. You have no direct power to grant these prayers, but can act on them independently if you choose, or include them in your own prayers to pass them on to the Almighty.</p>)
}
const aetherDoorwayOfSpheres: Perk = {
  id: "aether-doorway-of-spheres",
  title: "Doorway of Spheres",
  cost: -1,
  prereqs: [aetherThrone],
  types: ['Gateway'],
  content: (<p>Even in the Aether, space may be limited. Fortunately, the will of the Almighty is omnipresent and one place is like another. Within your towers and buildings in the orichalcum of the sacred geometries, you can establish a doorway leading to any other so built in your domain. However, it requires 1 radiance per day to remain in effect.</p>)
}
const aetherTowers: Perk = {
  id: "aether-towers",
  title: "Towers",
  cost: -1,
  prereqs: [aetherDoorwayOfSpheres],
  content: (<p>There is only one throne per domain, and its tower is the greatest, but you can build lesser watchposts to extend that domain. These towers rise half the height of your throne, and each has a doorway of spheres leading to your throne room. In total, it requires 2 units of radiance per day to maintain, but in the Aether its additional domain accrues about 4 units of radiance in that day. It can also transfer Radiance anywhere else in your domain, though it requires a Gateway to transfer across worlds.</p>)
}
const aetherAengelArch: Perk = {
  id: "aether-aengel-arch",
  title: "Aengel Arch",
  cost: -1,
  prereqs: [aetherThrone],
  types: ['Minion'],
  content: (<p>At the center of armories and prayer rooms stands a golden arch. This arch, when powered by 1 radiance per day, can elevate five ishim and sustain them. They are promoted to malachim, instantly becoming excellent soldiers with powerful wings and flaming swords. They can earn further promotions according to their accomplishments, growing in power. If any of the malachim fall, the arch can elevate additional ishim to replace them, but if the arch falls, the malachim must be bound to another arch within a day or they will revert to ishim. Malachim count normally toward minion limits.</p>)
}
const aetherOphanimForge: Perk = {
  id: "aether-ophanim-forge",
  title: "Ophanim Forge",
  cost: -3,
  prereqs: [aetherAengelArch, aetherWrathfulEye],
  content: (<p>In the forge, a highly ranked malach is made anew. They are severed from their arch, then sublimated by divine machinery and re-bound to physical form by rings of orichalcum. Rings within rings orbit pure fire. This is an Ophan, a machine of war. It is no longer a person in any real sense, but still has cognition. It also moves without inertia and sears legions with its own wrathful eye. It must be sustained by 1 unit of divine radiance per day, or it will burn out and perish.</p>)
}
const aetherArk: Perk = {
  id: "aether-ark",
  title: "Ark",
  cost: -2,
  prereqs: [aetherOphanimForge, aetherTowers],
  content: (<p>The greatest manifestation of the divine geometries is an entire tower, made mobile and powered by an Ophanim reforged once more. Other rooms and buildings can be built into it, making the ark a great edifice of war, both fortress and fleet. Such arks are often key to aengelic battle plans, for they allow transportation of untold firepower. To maintain the ark itself requires 2 units of divine radiance per day, and its facilities and weapons may incur additional costs.</p>)
}
const aetherReliquary: Perk = {
  id: "aether-reliquary",
  title: "Reliquary",
  cost: -2,
  prereqs: [aetherThrone],
  types: ['Immortality'],
  content: (<p>You build a hidden chamber at a particularly defensible point, covered in patterns based on and expanding from your tattoos. Should you perish, your spirit will return to this alternate home, and dwell within. You are imprisoned in solitude until your body reforms. The Reliquary takes 1 unit of divine radiance per day to remain active, and while you are in it it adds another 1 each day to the process of your rebirth. Your body is complete once 777 units of radiance are invested.</p>)
}
const aetherSeraph: Perk = {
  id: "aether-seraph",
  title: "Seraph",
  cost: -3,
  prereqs: [aetherAscendance, aetherReliquary],
  types: ['Infusion'],
  content: (<p>Your own body is also subject to reforging, but you remake it in a form that does not abandon the image of the divine. You die and form a new body, taller and stronger, with bones of orichalcum and wings of white cloud. Your mobility and accuracy greatly increase, in proportion to points spent in the Aether, and you have the right to enter the City of El, and to debate and vote with the Heavenly Choir. Though the Choir is officially for praising the Almighty, it is the most important den of politics in the Aether, and deals brokered here have great impact on the wars outside.</p>)
}
const worldAether = {
  id: "base-worlds-aether",
  title: "Aether",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>In the Aether, an infinite expanse of clouds dotted by towers of orichalcum surround El, the city and empty throne of the Almighty. Bloodshed is forbidden in El, so the aengelic choir plays politics as armies of aengelim battle through the fortresses in the surrounding clouds, giving their lives for the Divine Radiance of the Almighty. Radiance sustains not only aengelic existence but also the buildings and war machines they use to secure it, so the crystalized form that occasionally drifts through the clouds evokes a sudden furor, while the lesser thrones which channel the absent Almighty's divine nature into far more Radiance are the target of extensive campaigns.</p>
    <p>Anyone with a connection to Aether can pray to the Almighty to receive divine radiance. Two hours of prayer generate a single unit of radiance, enough to sustain a common aengel for a day.</p>
    <p>Aengelim are the most notable population of the Aether, and meet to debate in the halls of El one day just to plummet to their deaths from their strongholds outside of it the next. They are fanatically loyal to the Almighty despite his absence, and believe that he will return imminently, so each one of them wishes to be at the foot of his throne when he returns. They exist as manifestations of divine radiance, and bereft of the Almighty's direct benediction, they can rely only on crystals formed of mortal prayer or the emanations from the thrones to sustain them.</p>
    <p>There are many forms of aengel, from the humble ishim - lesser aengelim who delight in service, their wings and bodies inadequate to the stresses of battle - to the great Ophanim, so optimized for war that their bodies are no longer in the image of the Almighty. The middle ranks come in many forms, each tactically similar to the rest; though cherubim have animal heads and seraphim have more wings, these are most notable for the implications to their social caste, and since the disappearance of the Almighty, these differences have lost much of their practical importance.</p>
    </>
  ),
  conduitDescription: (<p>Those who take perks in Aether develop shining golden tattoos depicting their virtues and aspects of their lives. At 5 points spent, you get a small thin halo, which broadens into a full golden sun disk by 20 points spent. Your skin also becomes supernaturally clear and perfect. Those influenced by Aether are titled Saint.</p>),
  perks: [
    aetherAscendance, aetherCrusadersFire, aetherOrichalcum, aetherWrathfulEye, aetherThrone, aetherFortress,
    aetherCathedral, aetherGarden, aetherIntercession, aetherDoorwayOfSpheres, aetherTowers, aetherAengelArch,
    aetherOphanimForge, aetherArk, aetherReliquary, aetherSeraph
  ],
  crown: {
    id: "aether-crown",
    title: "Crown: Lightbringer",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in the Aether are called Lightbringers. Their aengelim are fanatically loyal to them, easily coming up with theology that justifies and endorses the Conduit's actions. If the Lightbringer weighs in, the aengelim will take these words as divine revelation.</p>
      <p>The buildings you build are taller and more efficient and can gather an additional radiance per day, and your <PerkLink perk={aetherTowers} /> are more efficient in other worlds, allowing them to pay their own upkeep.</p>
      <p>You can contain seven times as much divine radiance within yourself.</p>
      <p>Prayers made to a Lightbringer through <PerkLink perk={aetherIntercession} /> generate radiance just as they would if made to the Almighty directly.</p>
      <p>You can see through your minions' eyes, as well as through your <PerkLink perk={aetherWrathfulEye} />s, when you are seated on your <PerkLink perk={aetherThrone} />.</p>
      <p>When you make <PerkLink perk={aetherOrichalcum} />, you can refine it more precisely, allowing you to make panes of Orichalcum thin enough to see through and yet strong enough to weather damage just as well as solid brick. You also produce seven times as much of it.</p>
      <p>With <PerkLink perk={aetherAengelArch} /> and <PerkLink perk={aetherSeraph} />, you can elevate your malachim to seraphim, who can accompany you to El.</p>
      <p>The radiance consumption of your <PerkLink perk={aetherReliquary} /> can be increased, decreasing the time necessary for your new body to form. Furthermore, the deceased Lightbringer is not fully dead; you can engage in <PerkLink perk={aetherIntercession} /> and can issue proclamations, your voice booming forth from your tower.</p>
      </>
    )
  },
  dangers: {
    id: "aether-dangers",
    title: "Dangers",
    firstTitle: "Falling",
    firstContent: (<p>There is no ground in the Aether, and no railings. If you fall off of anything without having wings, you will fall forever until some aengel takes pity on you.</p>),
    secondTitle: "Heresy",
    secondContent: (<p>The aengelim are fanatical, and brook no disrespect of the Almighty. Though they loath heterodoxy, they are nonetheless schismatic in the Almighty's absence, and each will not hesitate to kill you over religious disagreements.</p>),
    thirdTitle: "The Almighty",
    thirdContent: (<p>Though gone, the choir does not consider that he could be dead. When he returns, what will he think of the things happening now? Will there be a reckoning? What if he never returns? Who, then, will sit the throne?</p>)
  },
  poi: {
    id: "aether-poi",
    title: "Trees",
    firstTitle: "Life",
    firstContent: (<p>The Tree of Life grows in the garden of the archangel Michael, a mighty warrior. Its fruit heals all injuries and diseases, including age.</p>),
    secondTitle: "Zoan",
    secondContent: (<p>The archangel Belial guards a tree which produces Zoan fruit, each with the form of an animal. He feeds this to his aengelim, elevating them into cherubim with animal forms and particularly unique abilities.</p>),
    thirdTitle: "Discord",
    thirdContent: (<p>The Apple of Discord, or of the Knowledge of Good and Evil, grows on a tree currently held by the archangel Maab. She shares them with enemies and allies alike, for these apples broaden the mind and allow a new perspective.</p>)
  },
  breaching: {
    id: "aether-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>The bridges of the Aether are surrounded by zealotry. Religious phenomena manifest, according to the most common local religions, and the people feel inclined to be less tolerant of different beliefs even outside of a religious context, coming to blows more regularly.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Towers in other worlds may not be able to gather divine radiance, but they provide structure for rooms and facilities to extend your domain over another world, and cathedrals in other worlds may be a great benefit to your minions there.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A golden orichalcum doorway shows another world, splendors through its threshold. Though it requires Radiance to stay open, it only requires 1 from the Aether side, and allows Radiance to flow through into the other world.</p>)
  }
}

const crucibleBondfire: Perk = {
  id: "crucible-bondfire",
  title: "Bondfire",
  cost: -1,
  types: ['Immortality'],
  content: (<p>Within your heart burns an ember of Azoth. You can use it to enkindle the Bondfires that dot the Crucible. You may rest at these fires for a time, warming yourself and remembering good times in the past. When you die, you can choose to re-emerge from the last Bondfire that you rested at. The experience drains something imperceptible from you each time, leaving you just a bit more tired and grey. You can always give up, but so long as you don't, you can never truly die. The fire of Azoth also prevents you from aging naturally. While in Crucible, this always takes precedence over other forms of Immortality.</p>)
}
const crucibleAzothEngine: Perk = {
  id: "crucible-azoth-engine",
  title: "Azoth Engine",
  cost: -1,
  prereqs: [crucibleBondfire],
  types: ['Infusion'],
  content: (<p>Your own ember of Azoth grows, and it joins to those of others. Whenever you kill someone, you can take their Azoth; when you die, all your collected Azoth is scattered around your body, where it will remain until someone picks it up. The greater amounts of Azoth do shield you from the negative effects of death, however, and you can also use them for Azoth sorceries. The simplest form of this is to cast your embers out as a flaming projectile, burning your enemies with them, but you may find more sophisticated methods among the experts and ancient writings of the world.</p>)
}
const crucibleConflagration: Perk = {
  id: "crucible-conflagration",
  title: "Conflagration",
  cost: -2,
  prereqs: [crucibleAzothEngine],
  content: (<p>You can ignite all your Azoth at once! All of your Azoth save for your own ember that safeguards your life bursts forth from your body, turning your surroundings into an inferno powered by your soul and will. You maintain control of the fire; you can direct it slightly and it does not burn you. Naturally, the area and intensity is dependent on the amount of Azoth that you have, but the duration increases with the amount of points spent in Crucible.</p>)
}
const crucibleForge: Perk = {
  id: "crucible-forge",
  title: "Forge",
  cost: -1,
  prereqs: [crucibleBondfire],
  types: ['Material'],
  content: (<p>By infusing your Azoth into tangible materials, you create a hybrid between solid matter and ephemeral flame. Items Forged in this way gain signficant durability, and with skill and sorcery you can add unique enhancements that make an item better at fulfilling its purpose. Each time you place a new enhancement, you must first burn enough Azoth to overcome what the item already holds, then infuse a new ember while it is malleable. This increasing cost is the only limit on stacking enhancements, and your efficiency at the burning increases with points spent in the Crucible.</p>)
}
const crucibleSelfReforging: Perk = {
  id: "crucible-self-reforging",
  title: "Self-Reforging",
  cost: -2,
  prereqs: [crucibleForge, crucibleAzothEngine],
  types: ['Infusion'],
  content: (<p>Good tools are essential, but with an internal forge you can invest it in yourself directly. The ways in which this happens are relatively minor and somewhat esoteric, investing directly into separate categories of enhancement that don't correspond directly to biology but instead build Azoth meridians. Boosting your vitality allows you to shrug off blows, your vigor keeps you from tiring. You can boost strength, dexterity, agility, endurance. The cost, in Azoth, increases each time, but the size of that increase becomes smaller the more points you spend in the Crucible.</p>)
}
const crucibleAthanor: Perk = {
  id: "crucible-athanor",
  title: "Athanor",
  cost: -3,
  prereqs: [crucibleSelfReforging],
  types: ['Infusion'],
  content: (<p>Stoking the Azoth within your body starts its flow through your meridians. Merely cycling it like this enhances your body in proportion to the amount of Azoth you have. Your body shrugs off blows, your muscles grow in strength, potentially growing to superhuman levels. The greatest power, though, is that you can ignite your Athanor, burning away Azoth to super-charge your enhancements. When you do so, you push everything even further beyond, your Athanor flames burning with smokin' sick style.</p>)
}
const crucibleFlask: Perk = {
  id: "crucible-flask",
  title: "Flask",
  cost: -2,
  prereqs: [crucibleForge],
  content: (<p>Among the most valuable of items made in Crucible are the elixirs made from the incessant rain, Azoth, and time. The flask itself is a substantial project, requiring specific materials from Crucible, and to properly boil the rainwater with Azoth as the Flask fills takes hours, though it need not be supervised the whole time. The result is a healing beverage that will instantly restore your body, curing injuries with no apparent side effects.</p>)
}
const crucibleHomunculus: Perk = {
  id: "crucible-homunculus",
  title: "Homunculus",
  cost: -2,
  prereqs: [crucibleSelfReforging, crucibleFlask],
  types: ['Minion'],
  content: (<p>Azoth fire burns with life and might, and you have learned the method of making mighty life with it. Fill a much larger flask, an urn, with water, fire, and blood. After a week per ember invested, the urn hatches into your Homunculus. The weakest of them have the strength of ten men, and the more embers invested, the stronger they are. They may also receive your Azoth to use for sorcery. A Homunculus needs no sustenance save for Azoth, which they burn slowly over time in order to sustain their existence.</p>)
}
const crucibleHunt: Perk = {
  id: "crucible-hunt",
  title: "Hunt",
  cost: -2,
  content: (<p>The greatest way to improve life in the Crucible is kill those who make it dangerous. As long as you know their name, tracks, scent, or some other identification, you can Hunt anything. You know their direction and distance at all times. While Hunting, you do not tire, but you must not stray and you must be sporting, pursuing your quarry directly with your own abilities. You may only Hunt one thing at a time, and if you abandon your Hunt or resort to unsporting trickery, you can never Hunt the same creature again.</p>)
}
const crucibleAlwaysAPath: Perk = {
  id: "crucible-always-a-path",
  title: "Always a Path",
  cost: -3,
  prereqs: [crucibleHunt, crucibleAzothEngine],
  content: (<p>Your goals are not limited to murder. The paths of Crucible are long and winding, and they frequently change when the light shines no longer upon them. But you hold within you the torch that shows the way. Your Azoth leads you toward your goal. If the goal is not immediately possible, it will instead lead to something which will allow you to make significant advances towards your goal, though the way to use this opportunity will not always be clear. It may lead you to great danger and hardship, but if you follow it to the end there will always be success eventually.</p>)
}
const crucibleRoundtableHold: Perk = {
  id: "crucible-roundtable-hold",
  title: "Roundtable Hold",
  cost: -2,
  prereqs: [crucibleAlwaysAPath],
  types: ['Gateway'],
  content: (<p>The central hold of the City is a special place, where heroes meet. It has but two doors, yet many doors open to it. In fact, any door in Crucible will open to the Roundtable Hold if you open them correctly, though that door will only return you to the place that you entered from. The other leads to the city. In the hold, you can rest safely, trade with other heroes, and feed the remains of the Others to the central Pyre. The Pyre warms you, and generates Azoth that can be freely shared among all who meet here.</p>)
}
const crucibleLodge: Perk = {
  id: "crucible-lodge",
  title: "Lodge",
  cost: -1,
  prereqs: [crucibleHunt,crucibleBondfire],
  types: ['Outpost'],
  content: (<p>Using the entire remains of a Great Other, you light a Hearthfire, a specialized Bondfire. After consuming the remains, it returns to a normal size but must be fed with bones infrequently, or it dims. Only you may reignite it, and it does not burn if you are dead. The room that it burns in is filled with light and warmth, and stays dry. Further, you may adorn it with trophies of anything you Hunt, and any kin of those deceased will shy away from the area, showing you respect and leaving you in peace.</p>)
}
const crucibleHeartAndSkin: Perk = {
  id: "crucible-heart-and-skin",
  title: "Heart and Skin",
  cost: -2,
  prereqs: [crucibleHunt],
  content: (<p>Those that you hunt grant you not only their remains but their form. By drinking a bit of their blood directly from their heart and making a cloak of their hide under the cyan light of the Moon, you gain their form. Putting on the cloak is easy, as it readily closes around you, forming a new body. You retain your mind, but the instincts and impulses of the creature you inhabit may plague you. To remove it, you must cut the skin back open in the front and peel it off.</p>)
}
const crucibleCursedHeart: Perk = {
  id: "crucible-cursed-heart",
  title: "Cursed Heart",
  cost: -1,
  prereqs: [crucibleHeartAndSkin, crucibleHomunculus],
  content: (<p>Build a fire from a creature's bones, burn the hide, and boil the heart in a cauldron of rainwater under the light of the Moon. When the water has boiled away, there will be a small, dark stone left in the pot. If fed to a Homunculus, the stone grants them a fraction of the creature's power and an echo of its form, and slows their rate of Azoth consumption to almost nothing. However, beware—if that Homunculus should ever become fully starved of Azoth, the Other whose heart they ate will burst forth in a terrible fury. Feeding multiple stones to a single Homunculus combines both the power and the danger.</p>)
}
const worldCrucible = {
  id: "base-worlds-crucible",
  title: "Crucible",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>Rain falls endlessly from a dark sky, washing over the dark stone of vast ruined castles. Save for those rare times the moon shows her face, the only illumination comes from fire. Whether natural combustion or the stranger fires of Azoth, casting light in magenta and lavender across the black stone without consuming any fuel, fire's light never reaches far as one would like.</p>
    <p>The ruins sprawl in an unintuitive jumble, without clear thoroughfares or unblocked roads. While many areas have an implicit purpose, it's hard to see how they ever would have fit together into a functioning society. They certainly don't now, though the locals have formed a "city" of sorts.</p>
    <p>People on Crucible, real people with hopes and aspirations, are rare. All people in this world have a spark of Azoth burning within their chest, allowing them to reawaken at a Bondfire after death. Each death dims their spark though, and eventually everyone here is worn out to the degree that they Fade. The Faded are a hazard, but a minor one. They still return to life after being killed, though only when the moon comes out. It is but a half life, a twisted existence without cognition or social ability, yet no death is permanent here. They wait still, or wander aimlessly, not caring for themselves. Any with the true life of Azoth will draw their ire, and they will attack.</p>
    <p>The true dangers in the Crucible are the Others. They are diverse and strange beings, monstrous and vast. Each was once a great and mighty being which has since Faded, or succumbed to the darkness of this world. Or perhaps they were always dark and powerful since the beginning of time. Some hints may be found in their leavings about the place, but most mysteries are long-forgotten, irrelevant. They are now simply great and terrible foes for you to overcome. Unlike the Faded, once destroyed they are gone forever, leaving behind remnants that can be forged into weapons, and only by their deaths can the world become a slightly brighter place, for however long it lasts.</p>
    </>
  ),
  conduitDescription: (<p>Time and points spent in the Crucible have no obvious effect, at least none that could not be attributed to experiencing the world's hardships. Conduits of the Crucible are called Torchbearers, and they tend to be maudlin and fatalistic, but determined. At 20 points, the only overt change occurs, as a magenta flame of Azoth alights in the center of their heart.</p>),
  perks: [
    crucibleBondfire, crucibleAzothEngine, crucibleConflagration, crucibleForge, crucibleSelfReforging,
    crucibleAthanor, crucibleFlask, crucibleHomunculus, crucibleAlwaysAPath, crucibleRoundtableHold, crucibleLodge,
    crucibleRoundtableHold, crucibleHeartAndSkin, crucibleCursedHeart
  ],
  crown: {
    id: "crucible-crown",
    title: "Crown: Phoenix",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in the Crucible are the Phoenix, themselves bonfires of Azoth. When a Phoenix dies, their Azoth erupts from their body, scorching enemies and consuming nearby loose items. When they are reborn at a <PerkLink perk={crucibleBondfire} />, they retain not only their own equipment but also whatever their Azoth gathered this way.</p>
      <p>A Phoenix's <PerkLink perk={crucibleAzothEngine} /> powers sorceries more efficiently. They can empower the sorcery with plenty of Azoth and then drink back in whatever Azoth wasn't consumed by actually burning something, making accuracy a pointless luxury.</p>
      <p>With <PerkLink perk={crucibleAthanor} /> active, Azoth fire trails in the wake of a Phoenix, burning the souls of the enemy as a Phoenix leaps between enemies or all over a great Other.</p>
      <p>The <PerkLink perk={crucibleHomunculus} /> of a Phoenix is nourished by the Phoenix's presence, basking in their light, and need not consume Azoth unless they are apart for more than a few days; the Phoenix's Lodge holds enough of their presence to be equally sustaining while the fire is lit.</p>
      <p>When a Phoenix illuminates the way to their goal using <PerkLink perk={crucibleAlwaysAPath} />, they choose who can see it, guiding their allies to a shared goal while hiding their movements from any rivals.</p>
      <p>A wise hunter does not war with their prey, and the instincts in their <PerkLink perk={crucibleHeartAndSkin} /> are a tool, not a hazard, allowing the Phoenix to use the form more readily.</p>
      </>
    )
  },
  dangers: {
    id: "crucible-dangers",
    title: "Dangers",
    firstTitle: "Others",
    firstContent: (<p>Competent warriors can soon deal with the Faded, at least in moderate numbers, but the Others are each unique and powerful, with bizarre or overwhelming methods of combat.</p>),
    secondTitle: "The Moon",
    secondContent: (<p>It can rarely be seen, but when the clouds part and the moon comes out, the defeated Faded reanimate, the Others grow in strength, and the wise take shelter. The moon's light twists and empowers the Others and drives the Faded to seek out new targets to kill.</p>),
    thirdTitle: "Despair",
    thirdContent: (<p>It may take a dozen or a thousand or a hundred deaths to make even a little progress. How much easier would it be to simply stop coming back?</p>)
  },
  poi: {
    id: "crucible-poi",
    title: "Orders",
    firstTitle: "Candlekeepers",
    firstContent: (<p>Beleaguered knights guard the city. They patrol and establish safe zones, trade sorcery and equipment for Azoth, and tend to the Bondfires.</p>),
    secondTitle: "Lunar Knights",
    secondContent: (<p>These knights feed on the wretched transformative power of the moon, becoming bestial but mighty every time Luna shows her face. Their grandmaster can call the moon forth at will.</p>),
    thirdTitle: "Blood Dragons",
    thirdContent: (<p>The reptilian mounts from which these knights take their name are no true dragons, for they lack wings, but they share the same sorcery as their riders, sending lances of precise, efficient, and potent Azoth from their eyes.</p>)
  },
  breaching: {
    id: "crucible-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Any that remain in shadow too long lose motivation and enthusiasm more than otherwise, though fires abate this. Those who despair near bridges Fade, and those who Fade with strong regrets may distort and grow more powerful - though also more wretched.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Lodges outside of Crucible have the only fires of Azoth in those worlds, but they do not bring the things that make Crucible dangerous save that the Moon, seen through a Lodge's windows, seems more sinister and the shadows cast by the Azoth flame seem longer and darker.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A large ornate door makes up every Gateway, and they quickly become soot-darkened and weathered no matter their material or maintenance. Every Gateway to the Crucible leads to the Roundtable Hold.</p>)
  }
}

const muAstralEye: Perk = {
  id: "mu-astral-eye",
  title: "Astral Eye",
  cost: -1,
  content: (
    <>
    <p>The light of stars high above shines throughout Mu, illuminating all, though dimly. By opening an eye that you don't have, you've discovered that it also shines on things that normal light does not, shattering illusions as well as revealing the invisible and insubstantial to your illuminated touch as though they were real objects.</p>
    <p>You can also shine this light from your third eye, allowing you to see things hidden on other lands with equal clarity.</p>
    </>
  )
}
const muReservoir: Perk = {
  id: "mu-reservoir",
  title: "Reservoir",
  cost: -1,
  types: ['Infusion', 'Material'],
  content: (<p>You can claim the raw colors that spiral through the seas above Mu, siphoning them into your own body. As the color runs through your body, you can feel it react to the emotions in others, showing you their auras and tugging slightly on your veins as you draw nearer. Likewise, you can use your colors to push and pull on the color of someone else's emotions, enflaming or dousing them in proportion to the color you have within you. While you can hold the color within yourself without devouring it, it becomes more and more visible, luminous beneath your skin.</p>)
}
const muIllusion: Perk = {
  id: "mu-illusion",
  title: "Illusion",
  cost: -1,
  prereqs: [muAstralEye, muReservoir],
  content: (<p>You can use the light of your third eye to spin your colors into things, changing the perceptions of all that your light shines upon and making them see as you see. How readily you can change things depends on the color you expend to do so, and your points spent in Mu. Whoever interacts with the illusions you create will find them utterly insubstantial and realize the truth behind it. But so long as the astral light shines only dimly on your creations, it will fool most who are not shown its insubstantiality.</p>)
}
const muGolem: Perk = {
  id: "mu-golem",
  title: "Golem",
  cost: -1,
  prereqs: [muReservoir],
  content: (<p>The temples and halls of Mu are filled with ancient statues, and you can empower statues of your own. Color is near to life, and by pumping a form of stone full of color, you create something animate. The stone can be worked in whatever shape your artifice devises, and the color keeps it animate until expended - typically over a month, though it bleeds out quickly if the golem is damaged. Every shade and tone of color matches an emotion, and this emotion characterizes the golem's behavior, though it respects your will to an extent.</p>)
}
const muSimulacrum: Perk = {
  id: "mu-simulacrum",
  title: "Simulacrum",
  cost: -2,
  prereqs: [muGolem],
  types: ['Minion','Gateway'],
  content: (<p>A specially made Golem with multiple colors built into it will eventually hatch. Simulacra are real people, for all that they are stone, with hopes and dreams. Their nature is determined by their creator, should he be skilled with colors, for those combinations paint the emotions that they will feel. Though they are of human intelligence, they are not of human morality.</p>)
}
const muIsland: Perk = {
  id: "mu-island",
  title: "Island",
  cost: -2,
  prereqs: [muGolem, muAstralEye],
  types: ['Outpost'],
  content: (<p>Sometimes spirals intersect, colors clashing and spitting out into stone. You can find these events and guide them, directing color to form landscapes that suit your aims, and rip them from the ocean floor into animate things drifting on the currents. Doing so requires both finding such a natural event, and spending a fair amount of time shepherding it, but any non-living material can be made in this way. The landscape you create subtly encourages the emotions associated with the colors you use.</p>)
}
const muSubaquatic: Perk = {
  id: "mu-subaquatic",
  title: "Subaquatic",
  cost: -1,
  types: ['Infusion'],
  content: (<p>As you adapt to the aquatic environment, you no longer need to bring air with you. You grow internal gills that allow you to breathe water easily. Your skin becomes smooth and slick, and you can display patterns on it, using them as language to communicate and perhaps hiding natural changes in your appearance. You move more easily in colored light, the water propelling you.</p>)
}
const muBodySculpt: Perk = {
  id: "mu-body-sculpt",
  title: "Body Sculpt",
  cost: -2,
  prereqs: [muSubaquatic],
  content: (<p>You can alter the forms of living creatures. It takes hours to make even something as simple as a tentacle, and not all beings can be changed equally. The simple structures of the beings of Mu and animals like them are changed easily, while animals composed of many more tissue types, as in other worlds, require incredible finesse. The more complex the creature and the greater the changes, the more time required and the greater chance that you make some lethal error. While you can use this power on yourself, great care would be advisable in doing so.</p>)
}
const muOnTheOrigin: Perk = {
  id: "mu-on-the-origin",
  title: "On the Origin",
  cost: -1,
  prereqs: [muBodySculpt],
  content: (<p>Taking the sculpting of bodies to the greatest level, you can design entirely new species, capable of fertile reproduction. You may use components from multiple creatures to do this, though you must fuse them very very carefully if you are to succeed. Success, though, results in an entirely new species which breeds true, and if well designed for the purpose it can be a new feature of any ecosystem - or, indeed, a new weapon in some great scheme.</p>)
}
const muTranscendentForm: Perk = {
  id: "mu-transcendent-form",
  title: "Transcendent Form",
  cost: -2,
  prereqs: [muOnTheOrigin, muAstralEye],
  content: (<p>By incorporating the light of the stars, you may forge bodies into something at once more and less than flesh. Like the light Astral, this material exists independent of physicality and may pass through solid objects, though doing so is uncomfortable. A being in an astral body can also allow other things to pass through it, though some willpower is required to keep such a form from being disrupted as would normally occur with full physicality. Like the stars from which it is made, such a creature does not age or die with the passage of time.</p>)
}
const muMindBlast: Perk = {
  id: "mu-mind-blast",
  title: "Mind Blast",
  cost: -1,
  content: (<p>You gain the ability to notice the minds of others and, with your own mind, to alter them. With a burst of will, you can damage the minds of your enemies, causing paralysis. For an initiate, this may be a temporary state of inability to act, but as you gain more perks in Mu it becomes more potent, permanently incapacitating or even killing your target if you go all out. On the other hand, the stronger the willpower of your target and the stronger their sense of self, the more difficult it is to break into their mind and have any effect at all.</p>)
}
const muMindSculpt: Perk = {
  id: "mu-mind-sculpt",
  title: "Mind Sculpt",
  cost: -2,
  prereqs: [muMindBlast, muReservoir],
  content: (<p>Destroying is easier than creating, but you can do both. You can make far subtler changes than a Mind Blast, deleting key memories or thoughts and sticking minute whorls of color in just the right places. You can change temperament and mental state with an ease and speed that a psychologist would envy, though you are not limited to healing. A skilled Conduit can even create such complex things as psychological needs, but regardless of skill, the finesse and concentration required take a long time, and attempting it is both noticeable and unpleasant for the subject.</p>)
}
const muTelepathy: Perk = {
  id: "mu-telepathy",
  title: "Telepathy",
  cost: -1,
  prereqs: [muMindBlast],
  content: (<p>You can touch a mind so gently that damage is all but non-existent, and all that mind feels is the brush of your thoughts. This can be used to communicate without words, and if you're sufficiently familiar with a particular mind, such as the minds of your minions, you can use this power regardless of physical distance.</p>)
}
const muNoosphere: Perk = {
  id: "mu-noosphere",
  title: "Noosphere",
  cost: -1,
  prereqs: [muTelepathy, muIllusion],
  content: (<p>The perimeter of your mind is unbound. The emotions and dreams of others constantly brush up against your own, giving you a constant perception of their mindset. In wakening, this is easy to block out, should you so desire, but you will find that all who you connect to in this way share dreams when you sleep concurrently.</p>)
}
const muThatWhichDreams: Perk = {
  id: "mu-that-which-dreams",
  title: "That Which Dreams",
  cost: -3,
  prereqs: [muNoosphere, muTranscendentForm],
  types: ['Immortality'],
  content: (<p>Should your physical form be destroyed, your mind always has a refuge to fly to. The connections you have to others anchor your mind, and you are thus drawn into the mind and body of one of the people you are open to through the Noosphere. Full control of their body would require dismantling the mind that previously inhabited it, but if you get along well enough with your host you may find that partial control can also be comfortable.</p>)
}
const muTulpa: Perk = {
  id: "mu-tulpa",
  title: "Tulpa",
  cost: -2,
  prereqs: [muNoosphere, muSimulacrum],
  types: ['Minion'],
  content: (<p>Rather than merely pushing color into something that exists in reality, you can push it into a thing of dreams, creating a being that exists purely within someone's mind. It has no ability to act outside the mind that holds it, but can travel along mental connections to reach minds other than the one in which it was originally created. Such a being may act as a welcome friend or as a devastating torment, depending on how well it gets along with its host.</p>)
}
const muDualityOfMind: Perk = {
  id: "mu-duality-of-mind",
  title: "Duality of Mind",
  cost: -1,
  prereqs: [muTulpa, muTranscendentForm],
  content: (<p>With careful sculpting, you can grant an astral body to a mental construct such as a Tulpa, allowing it to move independently through the physical world. In the reverse of an ordinary Transcendent Form, these astral tulpas are usually invisible and insubstantial and can only become visible or solid with effort. No matter how far an astral tulpa travels in the physical realm, they remain linked to their host's mind, and can return there instantly at will.</p>)
}
const worldMu = {
  id: "base-worlds-mu",
  title: "Mu",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>The silty plains of Mu lie beneath an endless astral sea. Without shore or sky, the waters stretch eternally up toward the unreachable stars, whose distant white light filters down through infinite water just strongly enough to make even the deepest trench dim and murky rather than utterly black. Far above the ocean floor, spirals of color drift and swirl, shining their own inconstant light down on the buried roads and ancient cities scattered across the plains. These colors are emotion made manifest, and the true subtleties of their numinous pigments cannot be grasped by the mundane eye.</p>
    <p>Though the cities of Mu are vast, their population is small. The natives call themselves dreamborn, and each prefers to maintain their own isolated garden in a neighbourhood far from their fellows, leaving the city to crumble in between. There they tend to plants and raise creatures as pets, often twisting them into wild and alien forms... and no few of them turn that discipline on themselves as well.</p>
    <p>The only ones who master the control of body and form to a degree greater than the dreamborn are the fearsome artisans who swim lazily among the ruins, bending the minds of all that pass by. Their tentacles weave and wend through flesh and stone, touching all within and leaving no wound but leaving changes nonetheless.</p>
    <p>The cities are also dotted by statues, not of the dreamborn but of far older things, their features long since worn away. Now and then, one will seem to shift.</p>
    </>
  ),
  conduitDescription: (<p>The more perks you take in Mu, the more your color changes with your emotions. By 5 points, it is clearly distinct from normal human reactions like blushing. At 20 points, your pupils change shape, taking on the w shape of a cuttlefish's eyes. Those influenced by Mu are titled Sunken.</p>),
  perks: [
    muAstralEye, muReservoir, muIllusion, muGolem, muSimulacrum, muIsland, muSubaquatic, muBodySculpt, muOnTheOrigin,
    muTranscendentForm, muMindBlast, muMindSculpt, muTelepathy, muNoosphere, muThatWhichDreams, muTulpa, muDualityOfMind
  ],
  crown: {
    id: "mu-crown",
    title: "Crown: Starseer",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Mu are called Starseer, and are artists of flesh and stone, of light and sea, crafting all manner of things living and unreal.</p>
      <p>Your <PerkLink perk={muAstralEye} /> is a true beacon, cutting through illusions and seeing through all deceit. Its gaze can also turn flesh to stone and back again, allowing you to keep detached parts of living creatures ready and waiting for use in <PerkLink perk={muBodySculpt} />ing.</p>
      <p>The <PerkLink perk={muGolem} />s of a Starseer can replenish themselves, feeding on the emotions of others and on the colors of their creation.</p>
      <p>Creations of <PerkLink perk={muSimulacrum} /> can be combined with each other or with biological creatures using <PerkLink perk={muBodySculpt} />, and can be made into true-breeding species with <PerkLink perk={muOnTheOrigin} />.</p>
      <p>You can cause the color in your <PerkLink perk={muReservoir} /> to clash like the great spirals above, and use it to create a living <PerkLink perk={muIsland} /> without needing to find a natural event.</p>
      <p>The <PerkLink perk={muTelepathy} /> of a Starseer crosses the boundary between worlds.</p>
      <p>You can passively <PerkLink perk={muMindSculpt} /> through the <PerkLink perk={muNoosphere} />, influencing the minds around you.</p>
      </>
    )
  },
  dangers: {
    id: "mu-dangers",
    title: "Dangers",
    firstTitle: "Underwater",
    firstContent: (<p>The ocean is difficult to breathe in, though at least you can take more air. The pressure doesn't crush you, despite the depth, but it tires you quickly, and dulls your movements.</p>),
    secondTitle: "Inconstance",
    secondContent: (<p>Mu seems languid, unchanging in its ancientness, but even the keenest third eye cannot trace every path of cause and effect. Entire cities may blink in and out of existence, and an ancient moray the size of a train may appear where one wasn't yesterday.</p>),
    thirdTitle: "Mindbreak",
    thirdContent: (<p>Dreamborn may be eager to enthrall you and use you as new livestock. Artisans may change you on a whim.</p>)
  },
  poi: {
    id: "mu-poi",
    title: "Cities",
    firstTitle: "The Forsaken",
    firstContent: (<p>The ancient dreamborn capital is completely abandoned in its center. Thousands of dreamborn congregate outside of it, sometimes sheltering in the peripheral buildings, but none will draw near the temple.</p>),
    secondTitle: "The Fallen",
    secondContent: (<p>An entire city, covered in a dome of clear crystal. It is filled with air, and inhabited only by moss.</p>),
    thirdTitle: "The Wavering",
    thirdContent: (<p>Drifting above the sea-floor, an entire city rests atop a great jellyfish-like colony of siphonophores. It cycles between being visible and invisible on a complex but consistent rhythm.</p>)
  },
  breaching: {
    id: "mu-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Small amounts of color leak through bridges to Mu, heightening emotions and making people less rational. Slimy creatures, amphibians and cephalopods seem to crop up more commonly, and often exhibit some form of mutation.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>The light of a single star shines through where an Outpost of Mu is built. They are typically made of cyclopean stone, and the taste of the sea is in the air.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A Simulacrum is stretched across two worlds, some colors drawn through a bridge and others remaining on Mu, yet the two are combined nonetheless, the material forming their body present on both sides. This Simulacrum is bound in place, unable to move from where its feet remain planted, but it can open a great yawning orifice within itself and consume a traveler, spitting them out on the other side.</p>)
  }
}

const kuiperVoidDweller: Perk = {
  id: "kuiper-void-dweller",
  title: "Void Dweller",
  cost: -1,
  types: ['Infusion'],
  content: (<p>The void of space is a harsh and unforgiving medium, but to a Conduit of Kuiper it is a comfortable home. As unyielding as stone, your body suffers no loss of heat or moisture to the vacuum around you, and all radiation you absorb is processed harmlessly into usable energy; the only food you need now is unfiltered starlight. You no longer need to breathe, and although without aerobic respiration your muscles tire quickly, they don't atrophy.</p>)
}
const kuiperGraviticAngel: Perk = {
  id: "kuiper-gravitic-angel",
  title: "Gravitic Angel",
  cost: -2,
  content: (<p>Space has no ground to walk on, no water to swim in, only the slow dance of distant masses. As a Spacer, you transcend that dance. You can apply acceleration to yourself or anything you're touching with a maximum number of Gs equal to points spent in this world. As a side benefit, the physics of vectors and trajectory become inherently apparent. Orbital dynamics and zero-G movement come as easily to you as throwing a ball at a target comes to most people.</p>)
}
const kuiperSpatialSense: Perk = {
  id: "kuiper-spatial-sense",
  title: "Spatial Sense",
  cost: -1,
  types: ['Infusion'],
  content: (<p>You feel the fabric of space-time around you, and you know what occupies it. The radius begins at a few meters but scales exponentially with points spent in Kuiper: three meters, then nine, then twenty-seven, all the way up to nearly a billion kilometers. In that area, you can detect both gravity and electromagnetism, allowing you to know the density of matter in the space and the flow of any light or electricity. With experience, you will have an almost perfectly accurate perception of what is there, as with sight, but unlike with sight you can always perceive all the way around you and know it all the way through inside and out.</p>)
}
const kuiperStonesThoughts: Perk = {
  id: "kuiper-stones-thoughts",
  title: "Stone's Thoughts",
  cost: -1,
  content: (<p>As easily as you can feel a ray of light and know its place in a pattern of colour, now you can feel an electrical impulse and know its place in a pattern of information. The complex biochemistry of an organic mind is far harder to read, but the clear, consistent structure of a computer or a sentient asteroid is an open book to you. And not only can you read, you can also write: within the range of your Spatial Sense you can introduce small, precise electromagnetic disturbances that let you communicate with mineral minds, or alter their thoughts.</p>)
}
const kuiperOrbit: Perk = {
  id: "kuiper-orbit",
  title: "Orbit",
  cost: -1,
  prereqs: [kuiperStonesThoughts],
  types: ['Minion'],
  content: (<p>Between slight alterations and clever diplomacy, the alien minds of the asteroids take a liking to you. You can edit their minds to respect or revere you. In any case, they also enjoy orbiting you, basking in the feeling of your senses touching them, and will follow you around if you allow them to. They'll defend you if needed, using their mental constructs and their solid stony bodies.</p>)
}
const kuiperInstrumentality: Perk = {
  id: "kuiper-instrumentality",
  title: "Instrumentality",
  cost: -2,
  prereqs: [kuiperStonesThoughts],
  content: (<p>Like the asteroids, you have learned the art of tracing shapes into the world and impressing them on the fabric of reality until it creases in just the right spots. Any shape that you can hold in your mind, you can make real. While they are initially fragile and weightless, with time you can learn to impart mass, durability, and other physical properties. Your creations, once fully assembled, are permanent and cannot be altered further, but are as susceptible to mundane destruction as any other object.</p>)
}
const kuiperIThinkTherefore: Perk = {
  id: "kuiper-i-think-therefore",
  title: "I Think Therefore",
  cost: -2,
  prereqs: [kuiperInstrumentality],
  types: ['Material'],
  content: (<p>By meditating on a thoughtform for an hour or more, you can store it in your memory with perfect, permanent clarity. These stored blueprints can be recreated in precise detail at will, or used as a memory aid to store and recall information. Further, with intense effort, a stored thoughtform can be brought forth into reality, creating a permanent construct similar to Instrumentality with one important difference: your externalized thoughtforms are still connected to your mind, letting you track their location relative to you and know what forces are acting on them at any moment. However, an externalized thoughtform becomes susceptible to ordinary wear and tear, and you no longer have a perfect memory of its original form, only perfect knowledge of its current condition.</p>)
}
const kuiperThoughtship: Perk = {
  id: "kuiper-thoughtship",
  title: "Thoughtship",
  cost: -3,
  prereqs: [kuiperInstrumentality, kuiperGraviticAngel],
  types: ['Outpost'],
  content: (<p>Your mentalist ability now rivals the grandest of asteroids. You can create thoughtforms of hundreds of cubic feet in volume, and assemble them into complex constructs, defining conceptual hierarchies and conditional interactions including independent use of your gravitic acceleration power. This allows you to construct a self-accelerating ship that maintains a comfortable artificial gravity for its passengers. You also keep your perfect memory of a thoughtform's design even when externalizing it, and with a little effort you can repair damage to externalized thoughtforms by reverting them to that initial design.</p>)
}
const kuiperGhostInAStone: Perk = {
  id: "kuiper-ghost-in-a-stone",
  title: "Ghost in a Stone",
  cost: -3,
  prereqs: [kuiperOrbit, kuiperThoughtship],
  types: ['Immortality'],
  content: (<p>Either at a whim or upon your death, you can dissolve your body and free your mind. As your thoughts roam the void, scattered and fragile, they will begin to change. It would be wise to find yourself a temporary home amid the thoughts of a passing asteroid, or inscribed into the circuits of a computer, to keep your mind steady while you work on constructing a replacement body out of complex thoughtforms. Those who stay too long outside the familiar shell of a single solid brain may be altered beyond recognition by the time they return.</p>)
}
const kuiperWormhole: Perk = {
  id: "kuiper-wormhole",
  title: "Wormhole",
  cost: -3,
  prereqs: [kuiperSpatialSense],
  types: ['Gateway'],
  content: (<p>The vastness of space is interminably great, and traversing it quickly becomes interminably tedious. Fortunately, you can harness the warping of space in Kuiper to skip most of that. When you meditate in a specific place, feeling it out with your Spatial Sense, you can set it as a waypoint. The number of waypoints you set is limited only by your ability to remember them all, and with a moment's thought and will, you can connect them. A wormhole the size of your hand opens between any two waypoints in the same world, and you can stretch it larger if needed. Your Spatial Sense extends seamlessly through wormholes.</p>)
}
const kuiperControlledWarp: Perk = {
  id: "kuiper-controlled-warp",
  title: "Controlled Warp",
  cost: -1,
  prereqs: [kuiperWormhole],
  content: (<p>You can open a special kind of Wormhole, one that leads nowhere and tracelessly swallows anything you put through it. Although it sucks objects gently towards it, it can't open any larger than a few inches in diameter, and can only swallow an object that fully passes through it. If you leave it open for long enough, it will reverse its effect and start emitting lumps of matter, usually one element at a time in a random order, until eventually it swaps back. These cycles are always perfectly regular, but their length is unique to each Warp.</p>)
}
const kuiperHammerOfGod: Perk = {
  id: "kuiper-hammer-of-god",
  title: "Hammer of God",
  cost: -2,
  prereqs: [kuiperWormhole, kuiperGraviticAngel],
  content: (<p>With a small flex of the structure of space around you, you can reach out to anything within the range of your Spatial Sense and accelerate it just as you would accelerate yourself. This applies just as easily through wormholes.</p>)
}
const kuiperDeflector: Perk = {
  id: "kuiper-deflector",
  title: "Deflector",
  cost: -3,
  prereqs: [kuiperHammerOfGod],
  content: (<p>By twisting space around your body into a coiling spherical shell, you shield yourself from impact. Projectiles spin harmlessly past you. Even melee blows have trouble reaching you, though a clever opponent with sufficient leverage can learn to compensate for the twist. However, this effect closes you off from the outside world, scrambling any power that you try to extend through it; to affect anything outside your shell, you must open up a hole, reach through a Wormhole, or take the Deflector down entirely.</p>)
}
const worldKuiper = {
  id: "base-worlds-kuiper",
  title: "Kuiper",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>Kuiper is mostly open space, vast and unending. There are stars in the distance, but though their light reaches you, they are unfathomably far away. Closer, though, are smaller things. Wisps of gas form great clouds, most static unless disturbed and luminous in the light of distant stars, though some roil with dark thunder. Small asteroids abound, and there are even some so large that they are forced into spherical shape by their own gravity. But in most of Kuiper, the gravity is so low that it cannot readily be perceived, and has no real effect.</p>
    <p>Every once in a while, space itself warps and tears, physical adjacency realigning and matter appearing or being obliterated.</p>
    <p>Kuiper is predominantly uninhabited. Biological life is large, slow-moving, and rare. Space whales languidly scoop space dust from nebulas with gaping mouths, gorging themselves on planktonic space things, while seemingly ordinary crabs graze on scant mats of photosynthetic bacteria that grow on asteroids or whales. In a few forgotten caves and crevices of asteroids long abandoned, larger things hibernate.</p>
    <p>The most notable lifeforms of Kuiper, though, are not biological. The drifting asteroids are laced with veins and circuitry of colorful minerals native to this world. Energy surging through these veins forms a mind. These minds are usually rudimentary but the largest and oldest asteroids have great intellect, totally alien yet totally profound. Asteroids at this scale have direct power over physics, accelerating themselves or creating constructs of force. They more often do so to illustrate obscure philosophical points than for any practical reason, but it is an impressive discipline nonetheless.</p>
    </>
  ),
  conduitDescription: (<p>The Conduits of Kuiper are called Spacers. Though they seem relatively ordinary at a glance, there tends to be a strange stillness about them; by 10 points spent, most Spacers move only rarely, in precise, controlled bursts. More concretely but less visibly, their bones are increasingly laced with a lustrous rainbow bismuth-like mineral. At 15 points spent, their shadow holds the vastness of space, and stars shine through it regardless of any intervening matter.</p>),
  perks: [
    kuiperVoidDweller, kuiperGraviticAngel, kuiperSpatialSense, kuiperStonesThoughts, kuiperOrbit, kuiperInstrumentality,
    kuiperIThinkTherefore, kuiperThoughtship, kuiperGhostInAStone, kuiperWormhole, kuiperControlledWarp,
    kuiperHammerOfGod, kuiperDeflector
  ],
  crown: {
    id: "kuiper-crown",
    title: "Crown: Celestial",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Kuiper are called Celestials. They preside over empty space as gods of physics within their local areas.</p>
      <p>Celestials spread the benefits of <PerkLink perk={kuiperVoidDweller} /> to everyone near them, within a distance that increases as you spend more points in Kuiper. Although this happens passively, it can also be revoked in an instant.</p>
      <p>Celestials with <PerkLink perk={kuiperIThinkTherefore} /> can store thoughtforms in the minds of their minions, and use those thoughtforms to anchor micro-<PerkLink perk={kuiperWormhole} />s that travel with the minion, allowing the Celestial to extend <PerkLink perk={kuiperSpatialSense} /> and other powers through them wherever they go. Micro-wormholes cannot transmit matter, only information.</p>
      <p>Celestials can expand their <PerkLink perk={kuiperControlledWarp} /> wormholes, and are personally immune to their pull, though their minions and constructs are not. They can also learn to influence what the warp will produce.</p>
      <p>Celestial <PerkLink perk={kuiperThoughtship} />s are things of great beauty and comfort, and their control over gravity constructs and <PerkLink perk={kuiperWormhole} />s is incredibly precise, allowing for the creation of otherwise impossible machines including those in perpetual motion. Further, you can layer gravitic effects to reach higher maximum accelerations, though the speed of light is not surpassable in this way.</p>
      <p>A Celestial can keep their <PerkLink perk={kuiperDeflector} /> up permanently with no conscious effort, meaning that if sleeping or otherwise unconscious they remain shielded. Even a Celestial can't keep it up while dead.</p>
      </>
    )
  },
  dangers: {
    id: "kuiper-dangers",
    title: "Dangers",
    firstTitle: "The Warp",
    firstContent: (<p>Space in Kuiper bends and breaks. Too near a warp, and it may consume you. If your body itself warps, it may rend you.</p>),
    secondTitle: "Physical Impact",
    secondContent: (<p>Asteroids whizz about at untold speeds, and some are too tiny to see at distance. Though rare, it is always possible that you will find yourself suddenly perforated.</p>),
    thirdTitle: "Techno-Organic Synthetic Organisms",
    thirdContent: (<p>Perhaps remnants of some ancient Conduit, or perhaps with a more mysterious origin, strange beings which include both biological and mechanical components. They are mostly dormant, but explode into violence if disturbed.</p>)
  },
  poi: {
    id: "kuiper-poi",
    title: "Thoughts",
    firstTitle: "Omni-tool",
    firstContent: (<p>Like a gauntlet, made of tools, it is designed for human hands. Each one has myriad functions suited to different purposes.</p>),
    secondTitle: "Freighter",
    secondContent: (<p>A vast ship, wrecked by some unknown calamity, drifts aimless and sundered. Investigating its holds reveals less cargo than one might think, and most of what there is has little value, but there are some exceptions. It may also contain remnants of whatever destroyed it.</p>),
    thirdTitle: "Forgotten Monument",
    thirdContent: (<p>A space station, or a floating island perhaps. It is dedicated to someone's departed love, with pictures and videos of her, and many of her favorite things throughout.</p>)
  },
  breaching: {
    id: "kuiper-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Most bridges to Kuiper appear in outer space. Those that appear in atmosphere are universally in wide open areas. They are marked by distortions of space, and occasionally the sudden appearance of small asteroids or space dust.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>An outpost of Kuiper is a vast and visually stunning construct of thought, all mechanics and physics slaved to the will of man. Within it, uncontrolled warp does not manifest.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>It is difficult to force a wormhole between worlds, but once it is accomplished, the wormhole is alike to any other, except that it is more stable. A large hole in reality leading into the airless void of Kuiper sits ominous and unchanging.</p>)
  }
}

const academyDetective: Perk = {
  id: "academy-detective",
  title: "Detective",
  cost: -1,
  content: (<p>Something doesn't seem quite right here. The Academy is full of little rumors and stories, and sometimes there's even bullying! As you resolve to get to the bottom of things, Lilies bring you their problems, which tend to be very low-stakes and fun, and even Gokigenyou itself, or perhaps some kind of fate, conspires to give you hints. You can mentally decide on a mystery that you are investigating, to focus this effect.</p>)
}
const academyInspect: Perk = {
  id: "academy-inspect",
  title: "Inspect",
  cost: -2,
  prereqs: [academyDetective],
  content: (<p>You can look through a magnifying glass or any other lens to activate a detective's vision. Most things look colorless and blurred, but things relevant to the mystery you've selected will appear clearly, and the most important will even seem limned in a glistening light. When you get the lens right up close to the thing, you can see a panel of text with a description. It is mostly based on things you know or could observe about the item, but sometimes it will reveal key details.</p>)
}
const academyWardrobe: Perk = {
  id: "academy-wardrobe",
  title: "Wardrobe",
  cost: -1,
  content: (<p>A change of clothes always freshens you up completely: your clothes freshly cleaned and in good repair, your hair freshly styled, your body as clean as if you just finished drying off from a shower. You can change outfits more or less instantly, as long as you're not being actively observed, including into disguises. Any disguise always fools Lilies. An outfit is accessible enough to put on if it's in an unlocked container in the same room.</p>)
}
const academyHenshin: Perk = {
  id: "academy-henshin",
  title: "Henshin",
  cost: -3,
  prereqs: [academyDetective, academyWardrobe],
  content: (<p>Bullies and other wrongdoers beware! You have phenomenal magical powers now! Specifically, you can do a magical transformation into your alter ego. While in your other form, your physical abilities are boosted. You can hit much harder, resist hard physical blows, and leap to great heights. The degree to which you are boosted depends on the amount that you are loved by whichever Lily who loves you most, but as long as she cares about you at least a little, the benefit is pretty substantial.</p>)
}
const academyPurificationBeam: Perk = {
  id: "academy-purification-beam",
  title: "Purification Beam",
  cost: -2,
  prereqs: [academyHenshin],
  content: (<p>You can shoot purification beams! These are magical blasts formed from your love and conviction. Your purification beams burn away corruption, and can harm monstrous beings in other worlds, but they are completely harmless to Lilies and the pure of heart on other worlds. Like Henshin, the power depends on how loved you are, but it also fluctuates based on your own emotional state.</p>)
}
const academyEmptyHeart: Perk = {
  id: "academy-empty-heart",
  title: "Empty Heart",
  cost: -1,
  types: ['Minion'],
  content: (<p>Everyone needs a special someone that cares about them. This Lily lacked that, until you came along. Without a partner, her empty heart would eventually fill with despair and she would fall to corruption. Instead, she is now completely devoted to you and willing to do anything for you - even die. Any injuries you receive are transferred to her unless you choose not to allow it. All she asks in exchange is a kiss, although she'll still love you even if you don't.</p>)
}
const academyWaifu: Perk = {
  id: "academy-waifu",
  title: "Waifu",
  cost: -3,
  prereqs: [academyEmptyHeart],
  types: ['Immortality'],
  content: (<p>Your companion's heart is no longer truly empty, but is filled with you. Your bond surpasses the limits of boundaries between worlds, and acts like a bridge that constantly connects you: you can jump to her and if you have Calling you can pull her to you. Your bond also surpasses the boundary between life and death and if either of you dies, the other can resurrect them by sacrificing a human, Lily, or other person. You can also take her injuries for her, just as she can take yours for you.</p>)
}
const academyHarem: Perk = {
  id: "academy-harem",
  title: "Harem",
  cost: -2,
  prereqs: [academyEmptyHeart],
  content: (<p>Ordinary Lilies only bond to one other, forming perfect pairs, but you're different. You are special. You can bond to as many as you want, provided that you are willing to expend the time and effort to make a genuine connection with them. Each additional one requires social interaction more or less daily until the connection stabilizes, for at least a month and one major shared life event. If you transfer an injury, it only transfers to one Lily, usually the closest.</p>)
}
const academyPrincess: Perk = {
  id: "academy-princess",
  title: "Princess",
  cost: -1,
  content: (<p>You can command the specters. They will gladly do simple tasks for you. Just the attention inherent in requesting the act is reward enough for them. Their abilities are limited, as they cannot talk or write, and don't really have any specific skills or abilities. However, they're certainly sufficient to run errands like fetching your coat, buying you a drink, or murdering someone who annoyed you.</p>)
}
const academyShadowMagic: Perk = {
  id: "academy-shadow-magic",
  title: "Shadow Magic",
  cost: -2,
  prereqs: [academyPrincess],
  types: ['Minion'],
  content: (<p>Specters are barely people, just shadows of the ideas of people without real substance. You can discorporate them further, if you like, and hide your spectral minions in your shadow. They are ecstatic to have this opportunity and will be fanatically loyal. They also can use their new discorporate form to hide in other shadows, or to go through solid items, but they can still be just as solid as before if needed. They also gain skills in shadow ninjutsu.</p>)
}
const academyYokai: Perk = {
  id: "academy-yokai",
  title: "Yokai",
  cost: -1,
  prereqs: [academyPrincess],
  content: (<p>Since they're barely human to begin with, it's easy to change a specter's physical form into something better suited to their purpose or their nature. It makes them much cuter, and better able to blend in. They still don't have eyes, but they can fake eye spots so it's not obvious. You can turn a specter into almost any animal, as long as it's not much bigger than a dog and not much smaller than a mouse. Their color will tend to be dim and drab.</p>)
}
const academyReign: Perk = {
  id: "academy-reign",
  title: "Reign",
  cost: -1,
  prereqs: [academyPrincess],
  types: ['Outpost', 'Gateway'],
  content: (<p>Not just the specters but the very world bends to your will. You can instruct the buildings to change, or the land around you. You never need to commute around the Academy because you can instruct hallways and paths to lead where you need to go. You can also have a private home or palace built just for you and your friends. You can also have parks, beaches, and other areas built, though the larger the space, the slower it is and the more strange secrets will find their way into the construction process.</p>)
}
const academyClub: Perk = {
  id: "academy-club",
  title: "Club",
  cost: -1,
  prereqs: [academyReign, academyDetective],
  content: (<p>You build a club dedicated to a fun hobby. The exact hobby is up to you, and it doesn't matter much. The main point of the club is that you and your constellation of assorted Lilies can spend time there, with specters dedicating the resources of the Academy to aid you in doing what you want. Your club becomes a center of its own social scene, and you'll receive visits from Lilies and stranger things.</p>)
}
const academyVoyeur: Perk = {
  id: "academy-voyeur",
  title: "Voyeur",
  cost: -2,
  prereqs: [academyHenshin, academyShadowMagic],
  content: (<p>Your shadow full of specters turns into a cloak. You transform into a ghostly form, and can pass unseen and incorporeal through walls. There's little you can do in this form besides watch, but perhaps that's all you do. You can change freely into your normal or Henshin forms from this one. You are much slower than normal, but can only be perceived through special means.</p>)
}
const academyGriefSeed: Perk = {
  id: "academy-grief-seed",
  title: "Grief Seed",
  cost: -2,
  prereqs: [academyShadowMagic, academyPurificationBeam],
  types: ['Material'],
  content: (<p>You have finally gained the ability to control the corruption that plagues the Gokigenyou Academy of Purity. You can draw it out and form a Grief Seed, a form of corruption so highly condensed that it crystallizes, rendering it safe to touch until it's activated by strong negative emotions. You can put Grief Seeds into Empty Hearts, which will cause them to transform into youma, dreadful monsters of powerful emotion, or you can just use them as a power source.</p>)
}
const worldAcademy = {
  id: "base-worlds-academy",
  title: "Academy",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>The Gokigenyou Academy of Purity is a smaller world, as it is both finite and measurable. It is a single planet, covered mostly in school and commercial buildings interspersed with courtyards, parks, and quite a few beaches and hot springs. It is a pleasant place with mild weather in every season, full of light and clean air. In the shadows, despair and corruption creep in, but that's rarely seen by those who don't go looking.</p>
    <p>It is inhabited by Lilies, who appear similar to young human females, but cuter. They live in dormitories or occasionally private homes, go to class, and work part time jobs in idyllic happiness. The largest and presumably oldest of them fill maternal roles, especially as teachers. Lilies do not seem to reproduce, but appear spontaneously like maggots in rotting meat. Nonetheless, they engage in social pair-bonding, though they rarely acknowledge these relationships explicitly.</p>
    <p>All Lilies appear female, but occasionally male figures with blank eyeless faces linger in the background. Lilies don't seem to notice them but if they're pointed out, the Lilies will acknowledge these specters and then quickly move on. Lilies seem unable to easily differentiate between Conduits of the Academy and other Lilies, but may become hostile if you make the difference apparent by behaving in ways a Lily never would.</p>
    </>
  ),
  conduitDescription: (<p>As you take more points in Gokigenyou Academy, your apparent age adjusts to fit the school and (if you weren't already) you become female at 5 points spent. Your hair and eyes become brightly colored, reflecting your personality. Those influenced by the Academy are called Yayas, unless they bond with an Empty Heart in which case they are called Yurikos.</p>),
  perks: [
    academyDetective, academyInspect, academyWardrobe, academyHenshin, academyPurificationBeam, academyEmptyHeart,
    academyWaifu, academyHarem, academyPrincess, academyShadowMagic, academyYokai, academyReign, academyClub,
    academyVoyeur, academyGriefSeed
  ],
  crown: {
    id: "academy-crown",
    title: "Crown: Professor",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in the Gokigenyou Academy of Purity are called Professors. They have unparalleled control over the lives of all Lilies, whether they exercise it subtly or overtly.</p>
      <p><PerkLink perk={academyDetective} /> and <PerkLink perk={academyInspect} /> don't need a lens for a Professor, other than the lens in your eye.</p>
      <p>For a Professor, <PerkLink perk={academyHenshin} />'s power level is boosted by all forms of adoration, and the sum of all Lilies who love you. The purest form of love still has the greatest effect.</p>
      <p>A Professor with a <PerkLink perk={academyPurificationBeam} /> can refocus it into an intense ray of directed gamma radiation, allowing it to be effective against just about anything. An <PerkLink perk={academyEmptyHeart} /> bound to you can be consumed to fuel a blast many times more potent. A <PerkLink perk={academyGriefSeed} /> can also be used to create a Corruption Beam, with inverted effects.</p>
      <p>If you are a <PerkLink perk={academyPrincess} />, Lilies respect your authority just as specters do, and you can use them in all the same ways. Even as <PerkLink perk={academyYokai} /> they retain their cuteness.</p>
      <p><PerkLink perk={academyReign} /> can also be used on other worlds, and you can describe your own aesthetic, overriding the limitations of the Academy's typical decor.</p>
      <p>In addition to heading a <PerkLink perk={academyClub} />, Professors can also teach classes, choosing the curriculum that many Lilies must learn. It won't occur to them to doubt what they are taught, but too harsh a challenge to their worldview might lead them to despair.</p>
      </>
    )
  },
  dangers: {
    id: "academy-dangers",
    title: "Dangers",
    firstTitle: "Corruption",
    firstContent: (<p>Negative feelings have physical weight in Gokigenyou Academy. When someone in this world succumbs to despair, it alters their physical form and impairs their judgment.</p>),
    secondTitle: "Youma",
    secondContent: (<p>Those who have succumbed entirely to corruption transform into powerful monsters. They are bestial and murderous, and can only be returned to their old forms by kicking their asses, and ideally then solving their problems.</p>),
    thirdTitle: "Discipline",
    thirdContent: (<p>Lilies who disrupt social order are taken to private locations and reprimanded, beaten, mutilated, or even killed. Lilies never resist discipline.</p>)
  },
  poi: {
    id: "academy-poi",
    title: "Mysteries",
    firstTitle: "Ghost Story",
    firstContent: (<p>They say there's a ghost in the unused supply closet after midnight! But ghosts aren't real, are they? And descriptions of this ghost say she's really pretty and looks sad.</p>),
    secondTitle: "Lonely Nights",
    secondContent: (<p>They say there's a senior student who can't get a date. No one wants to be with her... isn't that sad? But why do people sound so nervous when they talk about it?</p>),
    thirdTitle: "Kissing Tree",
    thirdContent: (<p>They say anyone who kisses under this one specific tree on the last day of summer will stay together forever. What's that up there in the branches?</p>)
  },
  breaching: {
    id: "academy-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Bridges to the Academy often appear in isolated areas, where young people might go for privacy. Corruption seeps through here, filling the hearts of the despairing, and sometimes specters are seen. But it also helps young love.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>An outpost of the Gokigenyou Academy of Purity is nearly always a school building, a dormitory, or a bathhouse. It seems nicer and brighter than the surrounding area, and is populated by Lilies, specters, and stranger things just as the Academy itself.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>Gateways to Gokigenyou come most typically in two forms. Some are torii gates, surrounded by shrines, which young lovers may pass through. Others are more shadowy, taking on the details of the bridge from which they formed.</p>)
  }
}

const rorchLogo: Perk = {
  id: "rorch-logo",
  title: "Logo",
  cost: -1,
  content: (<p>You develop a personal sigil, representing your property. You can display it on anything physical, to claim it. Things that you've claimed in this way are recognized as yours by residents of Rorch, and they might be willing to buy those things from you, for the right price. Your logo can't be applied to anything that has someone else's logo on it, unless you first acquire it from them. The natives of Rorch almost all bear either their own or their employer's logos.</p>)
}
const rorchSuits: Perk = {
  id: "rorch-suits",
  title: "Suits",
  cost: -1,
  prereqs: [rorchLogo],
  types: ['Minion'],
  content: (<p>Suits without an employer are always on the lookout for an opportunity. Now they see you as the opportunity they've been waiting for: an up-and-coming Suit, promoted above the rest and looking to expand your operation. They will ignore your unusual appearance, though you can enhance this effect by wearing a tie and blazer. The Suits you attract this way are physically weak and lack initiative, but once they accept your logo, they are slavishly devoted.</p>)
}
const rorchVoltaic: Perk = {
  id: "rorch-voltaic",
  title: "Voltaic",
  cost: -2,
  types: ['Infusion'],
  content: (<p>While fire is prohibited in the Rorch, electricity is widespread, flowing through rails and wires everywhere in the city, apparently inexhaustible. The lightning can enter you without harming you, allowing you to store it and redirect it back out as needed, whether as destructive lightning or to power devices. When fully charged, excess electricity spills out. It makes your hair stand up and arcs between your fingertips, should you let it, but you can retain control over it if you consciously exert that control.</p>)
}
const rorchTechnoHead: Perk = {
  id: "rorch-techno-head",
  title: "Techno-Head",
  cost: -2,
  prereqs: [rorchVoltaic],
  types: ['Infusion'],
  content: (<p>You can tune the Voltaic energy in your body to hear radio signals, just like the locals do. There are plenty of ordinary radio stations covering news, weather, and music, but most importantly, you can now access the Manage-Net. Everything with your logo generates signals on a unique personal frequency that only you can hear, letting you track their location and status and even send brief commands at a distance. In Rorch, maps and reports appear automatically in your mind; anywhere else, you'll need to connect to an external display in order to see them.</p>)
}
const rorchPromotion: Perk = {
  id: "rorch-promotion",
  title: "Promotion",
  cost: -1,
  prereqs: [rorchTechnoHead, rorchSuits],
  content: (<p>It turns out, Suits can level up. It takes Dubloons, and it would be rude for you to not do it in person, but once you do, your Suits have more initiative and intellectual fortitude, and are even a bit tougher. Promoted Suits get limited access to Manage-Net and can do things on your behalf, and have a little icon next to them on your Manage-Net interface. They can even apply your Logo on your behalf.</p>)
}
const rorchLocomotive: Perk = {
  id: "rorch-locomotive",
  title: "Locomotive",
  cost: -2,
  prereqs: [rorchLogo],
  content: (<p>All transport in Rorch is either by foot or by train. You've found yourself a train and gotten it running, speeding along the rails in ease and comfort. While locomotives are hard to come by, train cars are ubiquitious and your locomotive can pull great numbers of them. It is electric, and powered by the rail at no cost to you.</p>)
}
const rorchBuccaneer: Perk = {
  id: "rorch-buccaneer",
  title: "Buccaneer",
  cost: -1,
  prereqs: [rorchLocomotive],
  content: (<p>Your train can go off the rails, crossing the open seas. It can travel in any direction over the water, and you can direct it any which way. It doesn't sink, but leaves a cool wake. It also can't fly or go over land, but it can rejoin tracks anywhere. If you sail the backs of the seas, you will meet the Pirates, and they will recognize you as one of their own based on your trackless train.</p>)
}
const rorchParkour: Perk = {
  id: "rorch-parkour",
  title: "Parkour",
  cost: -1,
  content: (<p>Like the Runners, you can leap nimbly around buildings. With a bevy of minor mobility devices like skateboards, wingsuits, and grappling hooks, your speed exceeds some trains as you swing, zipline, grind, and flip through the city. What's more, you can do cool tricks, generating stone Bits. The longer and more impressive your combos, the more Bits spring from the ground once you finally land. If you land in the water, your combo and all Bits are lost.</p>)
}
const rorchDanceOff: Perk = {
  id: "rorch-dance-off",
  title: "Dance-off",
  cost: -1,
  content: (<p>Violence is risky, and in poor taste. Worse, it often attracts the Guard. Instead, Runners war and do shake-downs via dance battle. A challenger must wager something of similar value to the subject of the challenge; when the battle ends, the loser's logo will vanish from their item, replaced by the winner's. Victory is objective and automatic, and you have an excellent sense for what kind of moves will work best.</p>)
}
const rorchTurf: Perk = {
  id: "rorch-turf",
  title: "Turf",
  cost: -1,
  prereqs: [rorchLogo, rorchDanceOff],
  content: (<p>Claiming ownership of buildings is difficult, and usually requires winning a challenge against the previous owner. Now, though, you have a landlord's crucial ability: you can spend Bits to repair and modify your buildings. Housing is free, and the Guard will come after anyone who demands rent from a resident, but maintenance fees and payment to access amenities are both permitted. Give your buildings some nice recreational facilities, and watch the Bits roll in.</p>)
}
const rorchStation: Perk = {
  id: "rorch-station",
  title: "Station",
  cost: -2,
  prereqs: [rorchLocomotive, rorchTurf],
  types: ['Gateway', 'Outpost'],
  content: (<p>Constructing a Station takes time, care, and hundreds of Dubloons, but once built, it forms the heart of a whole new district. From it, you can send out railway tracks across the sea to link to other Stations, inviting traffic and travel. Buildings spring up, following any urban planning policy you set, and Suits and Runners trickle in from afar to gawk, shop, and eventually settle. Before you know it, your district will be as lively and bustling as any.</p>)
}
const rorchInsurance: Perk = {
  id: "rorch-insurance",
  title: "Insurance",
  cost: -3,
  prereqs: [rorchLocomotive],
  types: ['Immortality'],
  content: (<p>Using a special distress beacon that goes off automatically when you die, you can summon a squad of highly competent Docs to track you down, bring you and any nearby Minions of yours back to your Locomotive, and patch you all up to full health. They charge a hefty price in Dubloons for both medical attention and armed rescue services, and they refuse to answer the beacon while you have unpaid bills outstanding. In Rorch itself, the Docs show up in seconds; offworld with a Station, in minutes; without a Station, hours, if they make it at all.</p>)
}
const rorchStreetSense: Perk = {
  id: "rorch-street-sense",
  title: "Street Sense",
  cost: -1,
  prereqs: [rorchDanceOff, rorchParkour],
  content: (<p>The combos you land and challenges you win earn you respect among the Runners, but to truly be accepted as one of their own, you need this: the instinct for trade and trouble that lets Runners find the back-alley deals they're looking for and steer clear of the Guards who might stop them. Your Street Sense lets you find Night Sisters for hire or shop in the elusive Bazaar.</p>)
}
const rorchNightSisters: Perk = {
  id: "rorch-night-sisters",
  title: "Night Sisters",
  cost: -2,
  prereqs: [rorchSuits, rorchStreetSense],
  types: ['Infusion'],
  content: (<p>Your body transforms into a beautiful porcelain doll with sharp, slender fingers and deadly quiet joints, and you are inducted into the Night Sisters, an order of assassins whose secret ways may only be taught to their own kind. Even if your form changes, they will recognize you by your beauty, stealth, and grace.</p>)
}
const rorchBazaar: Perk = {
  id: "rorch-bazaar",
  title: "Bazaar",
  cost: -2,
  prereqs: [rorchStreetSense],
  content: (<p>The Bazaar is a network of hidden rooms, pop-up stalls, and curio shops perched in hard-to-reach places. It's hard to find without an invite, but it sells almost anything money can buy, including, somehow, lost items from other worlds. Now you have one of the most coveted opportunities in Rorch: your own shop in the Bazaar, tucked away in some secret corner and ready to open for business. The stockroom will always be full of strange, interesting things, and any lost item of yours that fits on a shelf will be guaranteed to turn up there within a month.</p>)
}
const rorchWorkshop: Perk = {
  id: "rorch-workshop",
  title: "Workshop",
  cost: -2,
  prereqs: [rorchBazaar, rorchPromotion],
  content: (<p>A specialized promotion for your Suits allows them to become Craftsmen, creating items for the shops and the Bazaar. They can use any materials you supply them, including those from other worlds. Although they can solve problems creatively, they lack creativity on a grander scale, and require you to direct them on what to create. They operate with precision and efficiency, making the most of whatever you give them according to your design.</p>)
}
const worldRorch = {
  id: "base-worlds-rorch",
  title: "Rorch",
  tagline: "adapted from Cruxador's Conduit Rework",
  description: (
    <>
    <p>From a vast but shallow sea, the venerable stone buildings of the mega-city of Rorch rise towards the sky. There is plenty of housing, plentiful fish can be readily speared in the canals, and all basic needs are met, yet money and commerce govern this land. The greatest of assets are traded for large Dubloons, appearing gold but impossible to duplicate, while common trinkets are traded for stone Bits. Canals wend between the buildings, as rails weave through and over them, stopping amidst monuments and their roof-top gardens, shading pedestrian bridges and statues.</p>
    <p>The people of Rorch are synthetic, animate beings of stone or metal, but it doesn't seem to limit them any. Some amble along the stately boulevards, fat and clad in suits, while others run and leap between buildings, swinging from bridges and pursuing each other. They bear no collective name, but have unique forms corresponding to their class. Suits, the most common, go to work every day. They serve greater interests in the hopes of advancing to greater interests themselves. Some lucky few control so much wealth that the rest follow their every whim. Runners spray graffiti and challenge each other to dance battles over turf, wherein they collect dues from local Suits and provide dubious services. The colossal Guard tend to bumble about harmlessly, collecting bribes from Runners, but they leap to deadly action when their members are threatened or when one of a few ironclad rules - like the prohibition on combustion - are broken. Night Sisters stalk the night, offering their services to all factions as assassins and infiltrators. And outside the city, on the open sea, the Pirates wait for opportunities to waylay poorly defended Trains that cross the waters.</p>
    </>
  ),
  conduitDescription: (<p>As you spend time and gain perks in Rorch, your joints become more mobile and your limbs more slender, yet they lose no strength. Clothing you wear subtly tailors itself to your body. Conduits of Rorch are called Associates.</p>),
  perks: [
    rorchLogo, rorchSuits, rorchVoltaic, rorchTechnoHead, rorchPromotion, rorchLocomotive, rorchBuccaneer, rorchParkour,
    rorchDanceOff, rorchTurf, rorchStation, rorchInsurance, rorchStreetSense, rorchNightSisters, rorchBazaar,
    rorchWorkshop
  ],
  crown: {
    id: "rorch-crown",
    title: "Crown: Investor",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Rorch are called Investors, not only flush with wealth but also controlling its flow at all levels of society, their Logos alone commanding respect.</p>
      <p>A <PerkLink perk={rorchVoltaic} /> Investor generates electricity within their bodies at a significant rate. Their lightning and thunder is enough to power a train single-handedly.</p>
      <p>Through Manage-Net, an Investor with <PerkLink perk={rorchTechnoHead} /> can access virtual markets where high-level Suits sell shares in their latest ventures. These transactions can be made automatically for an easy profit, though some Investors prefer to learn the skill of picking the best investments.</p>
      <p>An Investor's <PerkLink perk={rorchParkour} /> may rarely, with a particularly spectacular combo, create Dubloons as well as Bits.</p>
      <p>The <PerkLink perk={rorchPromotion} /> of a Suit, to a skilled Investor, also comes with a specialization, turning the most suitable Suits into goons, managers, hawkers, or any sort of specialized role.</p>
      <p>An Investor's <PerkLink perk={rorchWorkshop} /> takes from all places, and their workers can build things using the unique features of other worlds, even creating materials as long as the Investor has the perks to do so. The things from an Investor's Workshop are wonders in their own right. They even have the ability to manufacture quite large things, such as additional Locomotives.</p>
      </>
    )
  },
  dangers: {
    id: "rorch-dangers",
    title: "Dangers",
    firstTitle: "Night Sisters",
    firstContent: (<p>Make too many waves, and you'll find yourself sunk. While most are unwilling to turn to violence themselves, any who has the Dubloons, the connections, and enough hate for you can contact the Night Sisters, who have no such compunctions.</p>),
    secondTitle: "Tsunami",
    secondContent: (<p>Every now and then, a colossal wave sweeps an entire district away. The city doesn't care, it just regrows.</p>),
    thirdTitle: "Fish",
    thirdContent: (<p>Though the people of Rorch all seem artificial, there are plants and fish, and some of the fish are vast and dangerous. If you look edible enough, they'll leap up and have a taste.</p>)
  },
  poi: {
    id: "rorch-poi",
    title: "Districts",
    firstTitle: "The Industrial District",
    firstContent: (<p>Factories and warehouses are alive with sound at all times as Craftsmen ply their trade, making all manner of consumer goods to distribute all across Rorch.</p>),
    secondTitle: "The Parks District",
    secondContent: (<p>Every building here has a garden atop it, so many that they blend together into a forest of palms and banyans. It is raucous with birds and replete with fruit, fresh for the taking.</p>),
    thirdTitle: "Mega-Commerce Turbo District",
    thirdContent: (<p>The suits here have cleaner edges, and sharper angles. Everything is newer and louder, and everyone has been promoted. The chatter over the radio is incessant, commodities traded with unparalleled speed.</p>)
  },
  breaching: {
    id: "rorch-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Bridges to Rorch tend to form in densely populated areas, and the signs of their presence are unusually visible, though individually brief. An unscheduled train might pull up to a local station, or a shop that wasn't there yesterday might squeeze its way into a dark alley, only to vanish again the day after. Suits or Runners who appear with these visitations may wander the wrong side of the bridge for a few days before finding their way home on the next train.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>(see below)</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>Gateway and Outpost in one, Rorch's stations require both perks. Rorch's trains travel seamlessly to other worlds; they travel through rails primarily built in Rorch, but pull into stations built entirely on the other side of the bridge. It is among the most comfortable of ways to travel between worlds, though you occasionally meet strange strangers in the passage. While a new district doesn't grow up quite as automatically as in Rorch, Rorch's natives do get off at the stop expecting to see more city, and if it's not there they'll try to build it.</p>)
  }
}

const arborFieldwork: Perk = {
  id: "arbor-fieldwork",
  title: "Fieldwork",
  cost: -1,
  types: ['Infusion'],
  content: (<p>Understanding the whispers of leaves and the sturdiness of roots, you become more muscular and capable than your frame or size would convey. Your stamina also increases, and you gain an innate knowledge of solar cycles and the conditions for gardening.</p>)
}
const arborAtTheRoot: Perk = {
  id: "arbor-at-the-root",
  title: "At the Root",
  cost: -1,
  content: (<p>By temporarily uprooting any plant, you are able to travel to any plant of a similar taxa. You grow tired and lose energy based on the distance you travel. Uprooting or transplanting trees or plants never risks killing the plants involved.</p>)
}
const arborRootways: Perk = {
  id: "arbor-rootways",
  title: "Rootways",
  cost: -2,
  prereqs: [arborAtTheRoot],
  content: (<p>No longer are you limited to plants of a similar taxa. The further you travel, the further exhausted you become. At great distances, you may be rendered temporarily incapacitated. You can delay the onset of your exhaustion for up to three hours after you arrive, but cannot travel this way again during the delay.</p>)
}
const arborTheCertaintyOfDarkSoil: Perk = {
  id: "arbor-the-certainty-of-dark-soil",
  title: "The Certainty of Dark Soil",
  cost: -3,
  prereqs: [arborRootways],
  types: ['Gateway'],
  content: (<p>No longer are you fatigued through root-travel; the effects are lowered to roughly the level of mental and physical toil the user would suffer from a jump. (Those suffering 'Hard Jumps' find their travels still consuming some energy, time, and focus.)</p>)
}
const arborSolarPowered: Perk = {
  id: "arbor-solar-powered",
  title: "Solar Powered",
  cost: -2,
  types: ['Infusion'],
  content: (<p>All your life needs can be supplied via sunlight, or more accurately, starlight. The greater the variety and presence of the light around you, the more quickly your needs are fulfilled. Furthermore, your shape requires no upkeep. Aesthetically, you will gradually reach your desired form.</p>)
}
const arborAsBrightAsStarlight: Perk = {
  id: "arbor-as-bright-as-starlight",
  title: "As Bright As Starlight",
  cost: -3,
  prereqs: [arborSolarPowered],
  types: ['Infusion'],
  content: (<p>Heat, overwhelming humidity, and radiation no longer affect you negatively. Each increases your natural rate of healing dependent on the amount of each present.</p>)
}
const arborWordlessConversations: Perk = {
  id: "arbor-wordless-conversations",
  title: "Wordless Conversations",
  cost: -1,
  content: (<p>You are able to understand the thoughts and conversations of 'mindless' plants and trees. They whisper secrets that may be useful, but often contain simple reflections, as novice diarists might note; such as the colour of the sky, a bird sighting, or the taste of rich sunlight.</p>)
}
const arborRustlingLeaves: Perk = {
  id: "arbor-rustling-leaves",
  title: "Rustling Leaves",
  cost: -1,
  prereqs: [arborWordlessConversations],
  content: (<p>You are now capable of talking with any of the permanent residents of Arbor. Many have lived for countless lifetimes, and may have great wisdom to share. Their memories are deep, and all are in good spirits. But navigating through conversations, always held in relentless good cheer, takes patience - and can often unnerve the unready.</p>)
}
const arborLoudWords: Perk = {
  id: "arbor-loud-words",
  title: "Loud Words",
  cost: -2,
  prereqs: [arborRustlingLeaves],
  content: (<p>It is possible to incite the naturally joyous hearts of the residents, or their more natural peers, to anger. Leaves, fallen plant matter, twigs, or any other form of natural plant materiel can be coerced into violently exploding, sending fragments in every direction. This creates a sound proportionate to the materiel consumed; and may be used as an interjection, a weapon, or a tool to throw off others - the forests of Arbor being filled with ghostly sounds...</p>)
}
const arborSmotheringLoam: Perk = {
  id: "arbor-smothering-loam",
  title: "Smothering Loam",
  cost: -1,
  types: ['Material'],
  content: (<p>This rich, dark soil is coercive. When used as soil, it convinces plants to grow better and more fruitfully. When worked into other materials, they become subtly more resistant to change - positive, or negative. Clay or glass admixed from Smothering Loam gives off an unnatural and languorous feel.</p>)
}
const arborWinebark: Perk = {
  id: "arbor-winebark",
  title: "Winebark",
  cost: -2,
  prereqs: [arborSmotheringLoam, arborRustlingLeaves],
  types: ['Material'],
  content: (<p>Named for the deep red hue, the trees of Arbor donate it freely and joyously when asked. Winebark is flexible as skin, sturdy as iron, and only hardens into place after it is coaxed with promises and loving whispers. It can be harvested in great quantity, easily, but those not adapted to Arbor find it deeply disquieting.</p>)
}
const arborLaughingSentinel: Perk = {
  id: "arbor-laughing-sentinel",
  title: "Laughing Sentinel",
  cost: -1,
  types: ['Minion'],
  content: (<p>A single cultivated flower that adapts naturally to any world it's planted in, even those that do not support plant-life. Despite lacking any sensory organs, it is capable of recording and transmitting any information within roughly twenty metres to the Conduit. It is easily destroyed, fades naturally over twenty-four hours, and makes a haunting rustling laugh that draws hostile attention. Only one can be active at a time. Creating a Laughing Sentinel requires a seed and the soil to grow it; when a new Sentinel is created, the old one crumbles, its seed and soil returning immediately to its creator.</p>)
}
const arborForestOfLaughter: Perk = {
  id: "arbor-forest-of-laughter",
  title: "Forest of Laughter",
  cost: -1,
  prereqs: [arborLaughingSentinel],
  types: ['Minion'],
  content: (<p>The Conduit may possess up to three Sentinels, which last for three days, and may observe in a sixty-metre area. When a new Sentinel is created with three already in place, the oldest one is always refunded first.</p>)
}
const arborBonesBeneathRoots: Perk = {
  id: "arbor-bones-beneath-roots",
  title: "Bones Beneath Roots",
  cost: -4,
  types: ['Immortality', 'Outpost'],
  content: (<p>The forest of Arbor will form a new body for you out of mulch and forgotten bones. The process is gradual, but painless... In your dreamlike, meditative state, you will hear whispers beseeching you to set down roots, and become a permanent resident of Arbor.</p>)
}
const worldArbor = {
  id: "base-worlds-arbor",
  title: "Arbor",
  tagline: "adapted from amomentarypangregret's fanworld for Cruxador's Conduit Rework",
  description: (
    <>
    <p>
      Arbor is a world of ever-expanding autumnal foliage.<br />
      Even though the colours don't perfectly mirror any one world, all colours can be found within.<br />
      The sky, horizon, and stars all appear to be drawn in equally vibrant tones -<br />
      Literally drawn, as if by a childish hand, on faded white paper. 
    </p>
    <p>
      Given the rural idylls, it is only natural for many Conduits to find the world pleasing.<br />
      Wherever the visitor goes, Arbor is flush with plant-life.<br />
      Crisscrossing streams and deltas, caverns bearing brilliant lichens, majestic peaks.

    </p>
    <p>
      Over great seas of fallen leaves, actual seas of water and other fluids intersect - seemingly at random.<br />
      Methane and water, ammonia and cold lava, mulched apple wine and cherry-red blood oceans all exist.<br />
      None seems to harm the plantlife adapted to them.
    </p>
    <p>However... There is no apparent fauna anywhere on Arbor.</p>
    <p>
      Those who stay for some time realise that certain trees bear tones, hues, even thoughts.<br />
      Each of them faint, barely present, like the gradually fading beat of a dying heart.<br />
      And these thoughts and the colours of leaves often correspond to other realms and places -<br />
      Specifically, those that stayed within for any great length of time.
    </p>
    <p>
      No immediate danger presents itself on Arbor.<br />
      Rather - terrifying to some, and freeing to others - the environment itself is the danger.<br />
      Promising peace and security without any greater thoughts, at all.<br />
      Final and permanent rest, existing without harm, surrounded by friends and lovers -<br />
      In vibrant scenery.
    </p>
    </>
  ),
  conduitDescription: (
    <p>
      Those who spend time in Arbor appear to move more slowly, and with a lesser range of motion.<br />
      Primary movements are slow and laboured, grand motions like attacks appear telegraphed.<br />
      It is a purely visual, sensory effect, however, unless the visitor becomes a permanent part of Arbor.<br />
      Long-term residents of Arbor are known as Groundskeepers.
    </p>
  ),
  perks: [
    arborFieldwork, arborAtTheRoot, arborRootways, arborTheCertaintyOfDarkSoil, arborSolarPowered, 
    arborAsBrightAsStarlight, arborWordlessConversations, arborRustlingLeaves, arborLoudWords, arborSmotheringLoam,
    arborWinebark, arborLaughingSentinel, arborForestOfLaughter, arborBonesBeneathRoots
  ],
  crown: {
    id: "arbor-crown",
    title: "Crown: Phytarch",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Arbor are Phytarchs, who are expected to devote endless time pampering and looking after the inhabitants of Arbor - in return for greatly increased capabilities within the world.</p>
      <p>Phytarchs are capable of knowing the location of any given plant or former entity within Arbor, at any given time. So long as the entity exists, they can intuit the location and travel there instantly via <PerkLink perk={arborRootways} />. There is a slight time expenditure locating those increasingly far from the Phytarch.</p>
      <p>Due to their role as protectors of those who forsook their prior lives, all the plants of Arbor serve the Phytarch and can be commanded as they please. They obey joyously, with no greater expectation. They are far too happy to know fear of death.</p>
      <p>With <PerkLink perk={arborBonesBeneathRoots} />, the forest of Arbor assembles many bodies for a Phytarch, each one forming and then decaying at its own pace, so that there is always a new one ready to rise as soon as the Phytarch dies. Some Phytarchs may even choose to rise ahead of schedule, and operate multiple bodies at once.</p>
      <p><PerkLink perk={arborSmotheringLoam} /> now greedily entombs enemies of the Phytarch, and protects those whom they adore - capable of forming itself as crude armour over those commanded.</p>
      <p><PerkLink perk={arborWinebark} /> is flusher and more resilient, capable of serving as a replacement for other complex alloys, though it must be cultivated specifically for any given service.</p>
      <p>The quiet plants are less scatterbrained in their <PerkLink perk={arborWordlessConversations} />, and the former entities dispense their secrets freely through <PerkLink perk={arborRustlingLeaves} /> without conversations or tasks required.</p>
      <p>Both the physical ability and stamina of the Phytarch are far beyond their given appearance, and when travelling via <PerkLink perk={arborRootways} />, they may choose to make an entrance in an explosion of sharpened plant matter and bright petals - as well, potentially, as blinding or irradiating light. </p>
      </>
    )
  },
  dangers: {
    id: "arbor-dangers",
    title: "Dangers",
    firstTitle: "Starvation",
    firstContent: (<p>Though it may seem a land of plenty, without proper adaptation, none of the materials found in Arbor are safe for the consumption of most Conduits. Conduits may struggle, subsisting entirely off of trace nutrients in water, unless properly prepared.</p>),
    secondTitle: "Judgment",
    secondContent: (<p>Those who spend great amounts of time in Arbor without adapting to the terrain claim to have felt a great sense of lingering dread. Tasks that should be easy, weren't. Terrain that looked navigable crumbled beneath their feet. Similarly, those that show deference to and protect the residents of Arbor have an easier time traversing it.</p>),
    thirdTitle: "Whispers",
    thirdContent: (<p>Driving all those who hear them to sanity, luring the visitor into a promise of blissful existence, functionally devoid of all fears or worldly wont. Many who hear it cannot square the desires forming within them with who they are, and lash out at themselves or others. And the leaves and boughs of plants whisper, and what another wonderful performance it is.</p>)
  },
  poi: {
    id: "arbor-poi",
    title: "Landmarks",
    firstTitle: "The Highest Point",
    firstContent: (<p>The Highest Point is ever-changing. It is a pair of mountains, one slightly larger than the other. Although snow falls against the two, the snow is always warm to the touch. Should the visitor reach the top of whichever peak is highest, they will behold the crudely done series of lines that are the sun, radiant in whatever colour the sky is, today.</p>),
    secondTitle: "The Farthest Sea",
    secondContent: (<p>The Farthest Sea is a great ocean of water surrounded by other substances; so named for its distance from land. It is notable because each and every other sea it connects to is a different substance; from molten liquid slag glass to pressurised vegetable oils. As the laws of Arbor permit, none of these contaminate the other, creating for bizarre physical displays. It is also the only guaranteed source of fresh water within Arbor.</p>),
    thirdTitle: "The Marble Prison",
    thirdContent: (<p>The Prison of the First Phytarch is a large, unnatural marble structure that may be observed through broken dirt in some caverns. It appears and disappears, existing but never truly existing. Any who have treated Arbor well may see it, and ask the corpse of the first Phytarch for her whispers of knowledge. Her voice is near-inaudible, but she has seen much.</p>)
  },
  breaching: {
    id: "arbor-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (
      <p>
        Bridges to and from Arbor carry a hint of humid, nostalgic summer heat to them.<br />
        It clings to the skin, evokes sweat and the memory of a lover's kiss -<br />
        While also leaving the traveller confused and faintly ill-at-ease in their own skin.<br />
        Navigational mediums from compasses to electronics do not work near bridges to and from Arbor.
      </p>
    ),
    secondTitle: "Outposts",
    secondContent: (<p>Outposts do not carry the grave-whispers of plant life, but are an excellent source of Smothering Loam - and other, more conventional soils and substrates. Plantlife is more likely to hybridise or form new, unexpected flora; entirely outside of the bounds of what 'could' or 'should' be. Rooms touched by Outposts will always have a faint floral scent and an ambient starlight 'filter' over them, in the colour desired.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A barren tree in Arbor whose twining roots connect to an open pit in the other world, forming a passage just large enough for a person to squeeze through. Passing through in either direction will always see the traveller climb past those roots in a shower of fresh gravesoil, no matter how many times the same roots have been shaken. If the pit is filled in, the roots will dig it clear again.</p>)
  }
}

const brazenGlitteringGarden: Perk = {
  id: "brazen-glittering-garden",
  title: "Glittering Garden",
  cost: -1,
  types: ['Material'],
  content: (<p>You gain a knack for the cultivation of metal plants, particularly the shrubs and wildflowers. The soil they grow in is dry sand, but somehow, droplets of oily nectar well up inside each flower. It is foul-tasting and mildly toxic. Still, they're very pretty.</p>)
}
const brazenHiveFriend: Perk = {
  id: "brazen-hive-friend",
  title: "Hive-friend",
  cost: -2,
  prereqs: [brazenGlitteringGarden],
  types: ['Minion'],
  content: (<p>It is possible, with time and patience, to befriend a hive; you, however, can take a more direct approach. Nearly any hive you speak with will be eager to trade the companionship of adventurous sisters for your permission to harvest nectar from your Glittering Garden, whose flowers now shine brighter than ever. You also gain an intuitive understanding of the Hivesisters' language, though if your body is humanoid you speak it with a wingless two-armed accent that has your new friends buzzing their wings in laughter.</p>)
}
const brazenJeweledHoney: Perk = {
  id: "brazen-jeweled-honey",
  title: "Jeweled Honey",
  cost: -2,
  prereqs: [brazenHiveFriend],
  types: ['Material', 'Infusion'],
  content: (<p>Your Glittering Garden grows ever more vibrant, and your allied Hives are at last willing to trade you some of their most precious resource: the honey they make from the flowers' poisonous nectar. Despite its origins, the honey is rich, sweet, and nourishing. A few drops are the equivalent of a meal; a spoonful will keep you going all day. You also find, the more honey you eat, that your need for food and water decreases further. Your body becomes hardier, your senses sharper.</p>)
}
const brazenHiveMother: Perk = {
  id: "brazen-hive-mother",
  title: "Hive-mother",
  cost: -3,
  prereqs: [brazenJeweledHoney],
  types: ['Material', 'Outpost'],
  content: (<p>With your Hivesister friends and a small store of honey, you set out to build your own hive. They teach you how to harvest nectar from the flowers, mixed with their glittering pollen, and how to process it into honey and wax. They are surprised you can learn; they thought it impossible for soft folk. From bright, strong wax that hardens into brass, you build your new home together.</p>)
}
const brazenIronOrchard: Perk = {
  id: "brazen-iron-orchard",
  title: "Iron Orchard",
  cost: -2,
  types: ['Material'],
  content: (<p>It takes years to grow an iron oak in the coarse black sand of Brazen's forests, but for you, the saplings sprout a little faster. Their rust-red sap smells uncomfortably like blood, but more importantly, the metal of their trunks and leaves is both beautiful and useful. Just as the trees are willing to grow for you, the iron you harvest is willing to bend: you can forge it without fire, using only your hands and your heart.</p>)
}
const brazenCrystalFruit: Perk = {
  id: "brazen-crystal-fruit",
  title: "Crystal Fruit",
  cost: -2,
  prereqs: [brazenIronOrchard],
  types: ['Material', 'Infusion'],
  content: (<p>Having mastered the iron oaks, you can move on to cultivating rarer trees, and fruit-bearing shrubs in your Glittering Garden if you have one. Every fruit is a gemstone, some smooth, some glittering with tiny facets. Your teeth are too soft to eat them, but if you lap at them slowly like a hard candy, you find your bones getting tougher and your muscles stronger. Soon your glittering molars can crunch through rock with ease, and the gem-fruit taste sweeter and sweeter.</p>)
}
const brazenGearwork: Perk = {
  id: "brazen-gearwork",
  title: "Gearwork",
  cost: -1,
  prereqs: [brazenHiveMother],
  content: (<p>Crafting gears and springs from brass wax, you begin to build your first mechanisms. You have a supernatural intuition for clockwork design, and a supernatural ability to coax more efficiency from your wind-up toys than mundane brass could ever give you.</p>)
}
const brazenBrassArch: Perk = {
  id: "brazen-brass-arch",
  title: "Brass Arch",
  cost: -2,
  prereqs: [brazenGearwork, brazenCrystalFruit],
  types: ['Gateway'],
  content: (<p>A mechanism of enormous complexity concealed within a gem-studded arch of gleaming brass creates half a portal; the other half must be built in another location, and precisely identical down to harvesting all the gems from the same plants. These are important for expanding a hive, as the Hivesisters love to forage distant fields but hate to step outside even for a moment to transfer between buildings. Once constructed, they are self-repairing, though sufficient damage can still overcome them.</p>)
}
const brazenHiveSibling: Perk = {
  id: "brazen-hive-sibling",
  title: "Hive-sibling",
  cost: -2,
  prereqs: [brazenBrassArch],
  types: ['Immortality'],
  content: (<p>You can construct new bodies for yourself from brass wax and gem-fruit. Each body must have a ruby apple heart. Although it is possible to construct a humanoid body, the form that comes most naturally to your design intuition is a Hivesister's, with six slender limbs and four lacy wings. You can sustain as many bodies at a time as you have points spent in Brazen, and each one is physically independent but mentally linked to the rest, sharing thoughts and memories at will. If one body dies, its unshared memories are seamlessly integrated into the collective.</p>)
}
const brazenSandSifter: Perk = {
  id: "brazen-sand-sifter",
  title: "Sand Sifter",
  cost: -1,
  types: ['Material'],
  content: (<p>There are three types of sand in Brazen: the coarse black sand where the trees grow, the finer red sand where the flowers grow, and the dust-fine white sand where nothing grows at all. With careful study and your connection to the world, you have learned how to find the places where these sands are generated and harvest them directly from the source without disturbing Brazen's metallic ecology.</p>)
}
const brazenGlassmaker: Perk = {
  id: "brazen-glassmaker",
  title: "Glassmaker",
  cost: -1,
  prereqs: [brazenSandSifter],
  content: (<p>By squeezing a handful of sand just so, you can fuse it into a lump of glass. In the first few hours after its creation, it is soft enough to be shaped further without heat or cutting tools. Black sand makes opaque black glass; red sand makes cloudy red glass; white sand makes perfectly clear glass. Once it hardens, the glass is similar in most respects to mundane glass. If broken, however, rather than shattering, it crumbles apart into the sand it was made from.</p>)
}
const brazenMoonbottle: Perk = {
  id: "brazen-moonbottle",
  title: "Moonbottle",
  cost: -2,
  prereqs: [brazenGlassmaker],
  types: ['Material', 'Infusion'],
  content: (<p>Stretched and pulled like taffy over many repetitions, clear glass becomes as white as the sand that made it; red glass becomes a pale, creamy pink, and black glass becomes silver-grey. Craft a bottle from an even mix of the three. Hold it up for hours under the light of the crystal sun or silver moon, then stopper it quickly before the other one can rise. The bottled light must be drunk in darkness to have the proper effect: sunlight fills the body with the essence of growth and healing, so it recovers better and faster from injury, while moonlight imbues the mind with the essence of clarity and calm, so it recovers better and faster from emotional disturbance. Each effect overrides and replaces the other—but for you, they enhance and support each other instead, balanced in perfect harmony.</p>)
}
const brazenLenscrafter: Perk = {
  id: "brazen-lenscrafter",
  title: "Lenscrafter",
  cost: -1,
  prereqs: [brazenGlassmaker],
  content: (<p>Your touch is now refined enough to create smoothly curved lenses, and you have an intuition for how to design them for a desired magnification. Properly bound in metal frames, they can also have more esoteric effects. A lens of clear glass provides surpassingly clear vision; a lens of red glass provides insight into the truth of things; a lens of black glass provides vision only in pitch darkness. Mixing the sands may dilute or warp these effects.</p>)
}
const brazenGemGlass: Perk = {
  id: "brazen-gem-glass",
  title: "Gem-glass",
  cost: -1,
  prereqs: [brazenLenscrafter],
  content: (<p>By grinding gem-fruit to powder and mixing that powder with sand, you can create coloured glass. Each type of fruit has its own unique effect on a lens, though some are more useful than others; a lens coloured with emerald apples makes objects of interest spring into focus while those not relevant to the task at hand blur and fade, and a lens coloured with citrine lemons makes all colours appear more vivid. For best results, use white sand as the bulk of the glass; other colours can interfere with a gem's effects.</p>)
}
const brazenRainbowWings: Perk = {
  id: "brazen-rainbow-wings",
  title: "Rainbow Wings",
  cost: -1,
  prereqs: [brazenGemGlass, brazenHiveSibling],
  types: ['Infusion'],
  content: (<p>A Hivesister's wings are a lacy, delicate framework of brass with no solid membrane filling its cells. Now, when designing your new bodies, you can fill those cells with coloured glass. When using such a body, you can swap between the associated lens effects at will, without the colour filter that would result from holding a physical lens in front of your eyes. This applies to any body you construct with stained-glass-like wings framed in brass, regardless of other details of the body.</p>)
}
const brazenWingSister: Perk = {
  id: "brazen-wing-sister",
  title: "Wing-sister",
  cost: -1,
  prereqs: [brazenRainbowWings],
  content: (<p>With an exquisitely delicate touch, you can add glass panes to the wings of other Hivesisters, granting them the same benefits you get from Rainbow Wings. Having learned to do this, you are also able to repair their bodies in other respects, and perform surgery to extract wasp eggs when necessary. This also allows you to tinker with your existing bodies without reconstructing them from scratch.</p>)
}
const worldBrazen = {
  id: "base-worlds-brazen",
  title: "Brazen",
  tagline: "a Vinifera Variant original",
  description: (
    <>
    <p>Forests of iron trees and fields of copper wildflowers grow beneath a great brass dome, where a shining crystal sun ticks along its track from horizon to horizon and a moon of polished silver follows its course during the night. No matter how far you travel, the dome never seems any closer or farther; it's always far enough away to evoke the grandeur of an unbounded sky, and yet close enough to feel faintly oppressive in comparison. Glimmering pinholes, illuminated only at night, provide a light reminiscent of stars.</p>
    <p>The natives of Brazen are the Hivesisters, clockwork bees that range in size from smaller than a pea to larger than an elephant. The majority of them are approximately the size of a human child. Completely silent except for the ticking and clicking of their brass gears and carapaces, they communicate in a visual language of sign, gesture, and dance, or by writing.</p>
    </>
  ),
  conduitDescription: (<p>Those influenced by Brazen are called Lapidaries. Their eyes pick up a faceted look akin to cut gems, and their skin becomes unnaturally smooth, with a polished metallic shine.</p>),
  perks: [
    brazenGlitteringGarden, brazenHiveFriend, brazenJeweledHoney, brazenHiveMother, brazenIronOrchard,
    brazenCrystalFruit, brazenGearwork, brazenBrassArch, brazenHiveSibling, brazenSandSifter, brazenGlassmaker,
    brazenMoonbottle, brazenLenscrafter, brazenGemGlass, brazenRainbowWings, brazenWingSister
  ],
  crown: {
    id: "brazen-crown",
    title: "Crown: Horologist",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Brazen are called Horologists, masters of gearcraft and metalwork.</p>
      <p><PerkLink perk={brazenIronOrchard} />, <PerkLink perk={brazenCrystalFruit} />, and <PerkLink perk={brazenGlitteringGarden} /> can be grown together in mixed sand rather than requiring separate patches of sand for flowers/shrubs and trees, opening up new landscaping possibilities.</p>
      <p><PerkLink perk={brazenJeweledHoney} /> produced near a <PerkLink perk={brazenCrystalFruit} /> orchard (or a gem-fruit Garden patch) can be separated into specific flavours made from the nectar of specific gem-fruit flowers. Each flavour has both a unique taste and a unique subtle benefit.</p>
      <p>Any <PerkLink perk={brazenGearwork} /> can be made self-powering using <PerkLink perk={brazenCrystalFruit} /> as an energy source. The more complex it is, the more likely to take on a life of its own.</p>
      <p>The body construction techniques of <PerkLink perk={brazenHiveSibling} /> can be turned outward to create new Hivesisters, who (in addition to being Minions) count as the Horologist's biological daughters for any metaphysical purpose. Two Hivesisters made with gem-fruit hearts from the same tree will be connected to each other in the manner of Hive-siblings. A Hivesister's heart may be any gem-fruit that is not a ruby apple.</p>
      <p>Light collected with <PerkLink perk={brazenMoonbottle} /> can be poured into gem-fruit to create coloured light sources—or colourless, if you manage to grow a rare diamond peach or pear. <PerkLink perk={brazenGemGlass} /> can also hold light in this way, though glass without gem dust cannot. Light poured into <PerkLink perk={brazenRainbowWings} /> is controllable with mental focus.</p>
      </>
    )
  },
  dangers: {
    id: "brazen-dangers",
    title: "Dangers",
    firstTitle: "Starvation",
    firstContent: (<p>Besides the well-guarded honey of the brazen hives, very little here is edible in a traditional sense. No matter how pretty an amethyst grape or garnet cherry may be, it's not much to live on.</p>),
    secondTitle: "Conflict",
    secondContent: (<p>Neighbouring hives tend to exist in a state of uneasy truce, and when that truce is broken, it's best to get out of the way.</p>),
    thirdTitle: "Wasps",
    thirdContent: (<p>Terrible shining parasites, injecting their eggs into any Hivesister they can catch and dooming her to a painful death. Though a soft organic body will provide little protection or nourishment to these insects' young, they don't seem to know that.</p>)
  },
  poi: {
    id: "brazen-poi",
    title: "Mechanisms",
    firstTitle: "The Tree",
    firstContent: (<p>An old iron oak, its bark rusting at the edges. The seams are almost impossible to find. At the twist of a branch, it peels apart, revealing a narrow stair spiraling down into darkness. Who built it, and why? What secrets does it hide?</p>),
    secondTitle: "The Fountain",
    secondContent: (<p>Brazen's only source of water is a scattering of identical fountains shaped like brass flowers. They sprout from the sand at the approach of a thirsty traveler, pour water until the traveler steps away, then fold themselves up and vanish without a trace. Is it true that there is only one Fountain? How does it know where to bloom?</p>),
    thirdTitle: "The Sky",
    thirdContent: (<p>The track of the sun and moon tilts back and forth in mimicry of seasons. The pinhole stars shift position each night. A marvel of engineering, forever out of reach. Was it built? Did it grow? Has it always been there?</p>)
  },
  breaching: {
    id: "brazen-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>A bridge to Brazen never appears under an open sky, and the unfiltered light of a sun, moon, or star can destroy one. Tiny metallic weeds sometimes begin to grow in shadowy cracks nearby, though without the light of the crystal sun they quickly wither. In quiet moments, a distant, steady ticking can be heard.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>A brass hive built in a foreign world will begin to alter its surroundings, spreading the black sand of forests and the red sand of fields across the ground. Within its area of influence, metal plants are able to grow even without a crystal sun overhead.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A Brass Arch connecting two worlds is a splendid sight, but fragile. Under the light and weather of an alien sky, the far side may degrade faster than it can repair itself, and break within a few years. Keeping the Arch indoors solves this problem.</p>)
  }
}

const carnationAcquaintance: Perk = {
  id: "carnation-acquaintance",
  title: "Acquaintance",
  cost: -1,
  types: ['Infusion'],
  content: (<p>A visitor to Carnation who sits still in one place for too long will find that nerve fibers have crept silently under their skin, infiltrating their body and connecting them to the greater organism of Carnation. For some, that is where their story ends. You, as a Conduit, can survive or even bypass this process. Through union with the body of Carnation, you gain rapid healing and a nearly invulnerable immune system, your body tracelessly devouring any parasite or microbe that dares to enter uninvited. Your digestion is also streamlined, meaning you require very little food and produce no waste. There is no outwardly visible change, but Carnation now recognizes you as one of its own, and you no longer need fear its curious tendrils.</p>)
}
const carnationHardiness: Perk = {
  id: "carnation-hardiness",
  title: "Hardiness",
  cost: -2,
  prereqs: [carnationAcquaintance],
  types: ['Infusion'],
  content: (<p>The flesh of Carnation is infinitely adaptable, and now so are you. Every part of your body is capable of regrowing the rest, given time and nutrients. However, only your brain contains your personality and memories; a severed hand will regrow only a mindless copy of you, without consciousness or will. Still, it's useful if you make a habit of getting beheaded. Repeatedly regrowing your body parts will leave them looking more and more like the red-tinged flesh of Carnation over time, and may introduce other errors.</p>)
}
const carnationMemoryOfFlesh: Perk = {
  id: "carnation-memory-of-flesh",
  title: "Memory of Flesh",
  cost: -2,
  prereqs: [carnationAcquaintance],
  types: ['Immortality'],
  content: (<p>You are known, and remembered. If you ever go longer than a century without touching the flesh of Carnation, it will grow a new copy of you as you were the last time you touched it, and if there is no other copy of you alive at the time, this new you will take up your Conduit powers.</p>)
}
const carnationReshaping: Perk = {
  id: "carnation-reshaping",
  title: "Reshaping",
  cost: -2,
  prereqs: [carnationHardiness, carnationMemoryOfFlesh],
  types: ['Infusion'],
  content: (<p>You are able to store records within your cells of exactly what your body is meant to look like, and control its growth to conform to that image, or (with effort) steer your growth down some particular path. By regrowing your body parts deliberately, you can change how you look. This also lets you regrow parts of your brain if it is damaged, but you have much less practice at that sort of thing than Carnation does, and are accordingly more likely to get it wrong.</p>)
}
const carnationNerveTendrils: Perk = {
  id: "carnation-nerve-tendrils",
  title: "Nerve Tendrils",
  cost: -1,
  prereqs: [carnationAcquaintance],
  types: ['Infusion'],
  content: (<p>One of the hallmarks of Carnation, these tendrils are a multimodal sensory apparatus that can grow rapidly in any direction, to a maximum range of as many meters as you have points spent in Carnation. At this level, they cannot infiltrate other flesh, though they can connect to ambient tendrils in Carnation. They can see, hear, feel, smell, and taste from any part of their surface. Processing the extra sensory information can be intense, but you will eventually get used to it. A tendril that is no longer needed can be painlessly detached, where it will most likely decay or be reclaimed by Carnation. Tendrils cannot move on their own except by growing.</p>)
}
const carnationRefinedTendrils: Perk = {
  id: "carnation-refined-tendrils",
  title: "Refined Tendrils",
  cost: -1,
  prereqs: [carnationNerveTendrils],
  types: ['Infusion'],
  content: (<p>The senses of your nerve tendrils are considerably sharper, and they are capable of connecting to and infiltrating any flesh they touch; indeed, unless you put in the effort to stop them, they will do it automatically. When connected, you partially share the senses of whatever creature you infiltrate, and can learn many things about their biological structure in the parts reached by your tendrils. Additionally, your tendrils gain sustenance by sensing things, especially things that are new or unfamiliar.</p>)
}
const carnationTravelingTendrils: Perk = {
  id: "carnation-traveling-tendrils",
  title: "Traveling Tendrils",
  cost: -2,
  prereqs: [carnationHardiness, carnationRefinedTendrils],
  types: ['Minion'],
  content: (<p>Your Tendrils, when detached, become independently mobile, intertwined with muscle fibers. They may grow other organs to assist them in their journey, or subsist on the sustenance of sensation alone. Regardless, you are aware of their sensorium at all times as though they were still attached, and can communicate with them in silent mental impressions to receive reports or issue commands. Although they do not have full minds or personalities, they are based on the template of your mind and body, and the more they grow, the more like you they become.</p>)
}
const carnationTurningRed: Perk = {
  id: "carnation-turning-red",
  title: "Turning Red",
  cost: -1,
  prereqs: [carnationAcquaintance],
  types: ['Infusion'],
  content: (<p>Your blood is fully converted into the blood of Carnation. When flowing in large concentrations, it is thicker and darker in colour; as it thins out to navigate tiny capillaries, it brightens into a vivid crimson, bringing a slight flush to the skin. It is many times more efficient at transporting oxygen and nutrients than human blood; a single drop of Carnation blood has a capacity equivalent to the entire human circulatory system. It is also self-filtering, able to reprocess any waste or toxins into useful energy and biomass.</p>)
}
const carnationPorosity: Perk = {
  id: "carnation-porosity",
  title: "Porosity",
  cost: -2,
  prereqs: [carnationTurningRed],
  types: ['Infusion'],
  content: (<p>The efficiency of your blood increases even further. Your stomach is replaced with a blood sac, and instead of bile and stomach acid you now have only blood. By touching a morsel of food with any part of your body, you can extrude blood through your pores to consume it; the blood will retreat back into your body when its meal is complete. If you have Nerve Tendrils, you can taste your meal by mingling nerve fibers with the blood; otherwise, you will feel only a comforting satiation.</p>)
}
const carnationBonemarch: Perk = {
  id: "carnation-bonemarch",
  title: "Bonemarch",
  cost: -2,
  prereqs: [carnationAcquaintance],
  types: ['Infusion'],
  content: (<p>Your bones harden, becoming unbreakable by any mundane force. At will, you can quickly grow spikes of bone from any part of your skeleton, then retract them when they are no longer needed. You can also grow a shell of bone around the outer surfaces of your body to protect yourself, but this process takes half a minute to complete, and several minutes to undo afterward.</p>)
}
const carnationStableShell: Perk = {
  id: "carnation-stable-shell",
  title: "Stable Shell",
  cost: -2,
  prereqs: [carnationBonemarch],
  types: ['Infusion'],
  content: (<p>You can grow a segmented bone shell that allows for some limited movement while protecting the softer parts of your body from harm. If you have Reshaping, you can refine the design of your bone shell to facilitate considerable agility. You can still shed or retract this shell at will, but it will take a few minutes to fully detach from your body.</p>)
}
const carnationTentacleHair: Perk = {
  id: "carnation-tentacle-hair",
  title: "Tentacle Hair",
  cost: -1,
  prereqs: [carnationAcquaintance],
  types: ['Infusion'],
  content: (<p>Any hair growing on your body is removed, and sufficiently dense patches of hair are replaced by clusters of sleek blood vessels with cores of nerve fiber. By default this applies to the hair on the head, groin, and armpits of a human body; with Reshaping, you can alter the distribution of your Tentacle Hair however you like. Your Tentacle Hair can sense similarly to a Nerve Tendril but more dimly, and digest similarly to Porosity but more slowly, without directly extending blood or nerves through its surface. If you have those perks, your Tentacle Hair's efficiency increases to match. Tentacle Hair is fully prehensile, and each pencil-thick strand has similar lifting capacity to a human arm.</p>)
}
const carnationTrueConnection: Perk = {
  id: "carnation-true-connection",
  title: "True Connection",
  cost: -2,
  prereqs: [carnationReshaping, carnationRefinedTendrils, carnationTentacleHair],
  types: ['Infusion'],
  content: (<p>Tentacle Hair cannot normally infiltrate a body. Now it is your most powerful tool for doing so. Touch your Tentacle Hair to the surface of any living thing, and extend fine, threadlike nerve tendrils into their form. Your sense-sharing will be vastly superior to what Refined Tendrils can offer, and with enough patience you can even dimly sense their thoughts. As for their biological structure, it is an open book to you, and you can alter it as easily as you read it.</p>)
}
const carnationGreaterGrowth: Perk = {
  id: "carnation-greater-growth",
  title: "Greater Growth",
  cost: -2,
  prereqs: [carnationReshaping, carnationTravelingTendrils, carnationTurningRed, carnationBonemarch],
  types: ['Outpost', 'Minion'],
  content: (<p>You have gained a tiny fraction of Carnation's true power. With it, you can design and grow arbitrary structures of flesh, then detach them from your body, where they will continue to function independently. Each structure you create in this way counts as a Minion, whether or not you are also using it as an Outpost. They retain the same connection to you as a Traveling Tendril.</p>)
}
const carnationOrificeGate: Perk = {
  id: "carnation-orifice-gate",
  title: "Orifice Gate",
  cost: -2,
  prereqs: [carnationGreaterGrowth],
  types: ['Gateway'],
  content: (<p>You learn the secrets of Carnation's orifice gates, which can transport travelers rapidly from one place to another along mucus-lined suction tubes that cover greater distances than should be possible. You can include these tubes in your Greater Growths. The exact appearance of the orifice is up to you, but the tube must be stretchy and slick to close around a traveler and pull them to their destination.</p>)
}
const worldCarnation = {
  id: "base-worlds-carnation",
  title: "Carnation",
  tagline: "inspired by Qlippoth, an early Conduit fanworld",
  description: (
    <>
    <p>The world of Carnation is at once ecosystem and organism. Streaks and swirls of bioluminescence light its twisting, fleshy passages; open spaces are rare, and often enclosed by walls of bone. The air is often humid, and circulated through pores in the walls that make an eerie whistling sound as Carnation breathes.</p>
    <p>It has no native independent life; Carnation is Carnation, a unified whole.</p>
    </>
  ),
  conduitDescription: (<p>Those influenced by Carnation are called Incarnates. They tend to become calmer, more curious, and more inclined to seek out and enjoy new experiences. They are also much less bothered by the visceral impact of biology in all its forms, though whether that is an overt influence of the world or a psychological necessity of living in it is hard to say.</p>),
  perks: [
    carnationAcquaintance, carnationHardiness, carnationMemoryOfFlesh, carnationReshaping, carnationNerveTendrils,
    carnationRefinedTendrils, carnationTravelingTendrils, carnationTurningRed, carnationPorosity, carnationBonemarch,
    carnationStableShell, carnationTentacleHair, carnationTrueConnection, carnationGreaterGrowth, carnationOrificeGate
  ],
  crown: {
    id: "carnation-crown",
    title: "Crown: Bloodsinger",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those crowned in Carnation are called Bloodsingers, and they have a deep connection to the mind and body of the world.</p>
      <p>A Bloodsinger can ask Carnation to change its schedule for <PerkLink perk={carnationMemoryOfFlesh} />. The time between clones may not be shorter than a day or longer than a thousand years.</p>
      <p>A Bloodsinger's <PerkLink perk={carnationReshaping} /> has much finer control and can reshape body parts in place without needing to discard the old one. Brains are still tricky, but the skill is easier to learn.</p>
      <p><PerkLink perk={carnationTravelingTendrils} /> will take on the properties of <PerkLink perk={carnationTentacleHair} /> if you have both perks.</p>
      <p><PerkLink perk={carnationPorosity} /> grants telekinetic control over your own blood within a range of a hundred meters.</p>
      <p><PerkLink perk={carnationStableShell} /> grants telekinetic control over your own bones within a range of a hundred meters.</p>
      <p>The fine nerve filaments created by <PerkLink perk={carnationTrueConnection} /> can be used to maintain a <PerkLink perk={carnationTravelingTendrils} />-like mental link if you have both perks.</p>
      <p>You gain an indelible memory for biological patterns you encounter, whether they are created by your powers or explored by your senses.</p>
      </>
    )
  },
  dangers: {
    id: "carnation-dangers",
    title: "Dangers",
    firstTitle: "Digestion",
    firstContent: (<p>Those who remain in Carnation while foreign to its body risk being subsumed into the whole, analyzed for their biological structure and picked apart for their component nutrients. A Conduit with a connection to the world will most likely be able to gain Acquaintance before losing too much of themselves; a non-Conduit has no such protection.</p>),
    secondTitle: "Cancer",
    secondContent: (<p>Though rare, the cancers of Carnation are very hazardous. Some rampage mindlessly through the tunnels, devouring everything in their path until Carnation can capture and subsume them; others lie in wait, disguised as just another organ, patiently consuming all that they touch.</p>),
    thirdTitle: "Suffocation",
    thirdContent: (<p>Most of Carnation's tunnels are filled with ordinary air, refreshed and circulated by its respiratory system. In some places, however, the balance of gases is reversed, and an unwary traveler might find themselves unable to breathe. Particularly long orifice gates can also be a problem.</p>)
  },
  poi: {
    id: "carnation-poi",
    title: "Organs",
    firstTitle: "Brains",
    firstContent: (<p>Here and there, buried in the walls or covered by domes of skin, a pulsing mass of brain tissue rests at the center of a vast knot of nerve tendrils. The thoughts of Carnation are fragmented and hard to understand, even for those who can perceive them.</p>),
    secondTitle: "Lungs",
    secondContent: (<p>Twisting spirals of spongy tissue expand and contract, covered with bright red veins. They seem delicate at first glance, but turn out to be much tougher than they look.</p>),
    thirdTitle: "Hearts",
    thirdContent: (<p>Their steady drumbeat can be heard for miles. Up close, it's loud enough to be more felt than heard, a titanic thumping that resonates through the body. Each heart is the size of a cow, and veiled in a thin layer of skin so pale that the heart's vivid red shows through it almost unimpeded. They are most often seen alone, but sometimes a cluster of two or three can be found near a particularly large concentration of lungs.</p>)
  },
  breaching: {
    id: "carnation-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>At a bridge to Carnation, spilled blood lingers bright and fresh indefinitely. Senses sharpen, and vitality increases. The world feels more fresh and interesting.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>The design of an Outpost is up to its creator, but it is always a living organism at least the size of a small hut, rooted in place by firmly anchored tendrils. Often, but not always, an Outpost's master suppresses its instinctive assimilation of whatever it touches; a masterless Outpost is as eager to consume visitors as Carnation itself.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>An orifice gate will swallow anyone who steps through it, pulling them to its other side. They are fast enough that suffocation is usually not a concern.</p>)
  }
}

const asphodelSustenance: Perk = {
  id: "asphodel-sustenance",
  title: "Sustenance",
  cost: -1,
  types: ['Infusion'],
  content: (<p>The agathodaemons never compete over food and water. Your need for these fades, but not your appreciation, such that you can be satisfied by a few sips of water and a handful of seeds.</p>)
}
const asphodelMultifacetedSoul: Perk = {
  id: "asphodel-multifaceted-soul",
  title: "Multifaceted Soul",
  cost: -2,
  prereqs: [asphodelSustenance],
  types: ['Infusion'],
  content: (<p>You may take on aspects of an animal that accords with your current nature and state, taking on the wings of a swallow should you feel wanderlust, or the teeth of a beaver if you long for shelter.</p>)
}
const asphodelTransformation: Perk = {
  id: "asphodel-transformation",
  title: "Transformation",
  cost: -3,
  prereqs: [asphodelMultifacetedSoul],
  types: ['Infusion'],
  content: (<p>You may fully take on the form of an animal that feels appropriate for you. These forms are always in good health, and should you be injured, with some meditation you can take on a fully healed animal form. So long as your human form remains alive, you may also perform a similar meditation to return to it.</p>)
}
const asphodelWingedSoul: Perk = {
  id: "asphodel-winged-soul",
  title: "Winged Soul",
  cost: -4,
  prereqs: [asphodelTransformation],
  types: ['Immortality'],
  content: (<p>When you would receive fatal wounds, you instead take on the form of an animal smaller and more mobile than your prior shape. Should you repeatedly receive such wounds without meditating upon a larger form, your soul will eventually become fully unburdened and return to Asphodel, where a volunteer will help you gain the form of a baby animal and care for you during your recovery.</p>)
}
const asphodelHeartspeech: Perk = {
  id: "asphodel-heartspeech",
  title: "Heartspeech",
  cost: -1,
  content: (<p>You can always communicate your feelings, needs, and broad intentions, and can understand the same from others regardless of language barriers. Heartspeech is very difficult to use for working on complex plans.</p>)
}
const asphodelPlainspeech: Perk = {
  id: "asphodel-plainspeech",
  title: "Plainspeech",
  cost: -2,
  content: (<p>You can understand and be understood by speakers of any language.</p>)
}
const asphodelTruespeech: Perk = {
  id: "asphodel-truespeech",
  title: "Truespeech",
  cost: -2,
  content: (<p>When you speak honestly, the truth of your intentions and beliefs is clear to your listeners.</p>)
}
const asphodelSustainingEmbrace: Perk = {
  id: "asphodel-sustaining-embrace",
  title: "Sustaining Embrace",
  cost: -1,
  content: (<p>A person cannot die so long as you are holding them. Additionally, your touch causes pain to lessen.</p>)
}
const asphodelPsychopompsGrip: Perk = {
  id: "asphodel-psychopomps-grip",
  title: "Psychopomp's Grip",
  cost: -2,
  prereqs: [asphodelSustainingEmbrace],
  content: (<p>You can transport the souls of the dead between worlds, no matter how intangible they normally are, so long as you carry them.</p>)
}
const asphodelOrpheanMelody: Perk = {
  id: "asphodel-orphean-melody",
  title: "Orphean Melody",
  cost: -1,
  prereqs: [asphodelPsychopompsGrip],
  content: (<p>You may lead the souls of the dead between worlds with your music. This is disrupted if the performer looks back, but the dead may encounter obstacles in their travels, so it is best performed with a team. (Agathodaemons will readily help you bring souls to Asphodel.)</p>)
}
const asphodelGlade: Perk = {
  id: "asphodel-glade",
  title: "Glade",
  cost: -1,
  content: (<p>A plot of land in Asphodel has decided to be yours. It will arrange itself primarily according to your sense of beauty and comfort. If brought seeds of foreign plants, it may grow them, should you find these plants beautiful and comforting and should they not pose a danger to other souls.</p>)
}
const asphodelTender: Perk = {
  id: "asphodel-tender",
  title: "Tender",
  cost: -1,
  prereqs: [asphodelGlade],
  types: ['Outpost'],
  content: (<p>You have learned how to shape Glades besides your own, for purposes other than your comfort.</p>)
}
const asphodelPathOfFlowers: Perk = {
  id: "asphodel-path-of-flowers",
  title: "Path of Flowers",
  cost: -1,
  prereqs: [asphodelOrpheanMelody, asphodelGlade],
  types: ['Gateway'],
  content: (<p>Flowers spring up in your footsteps. These are typically quick to fade, but walking the same path several times can create a lasting trail. These trails can be followed even across the border of Asphodel.</p>)
}
const asphodelGentleTouch: Perk = {
  id: "asphodel-gentle-touch",
  title: "Gentle Touch",
  cost: -1,
  content: (<p>You may send a cooperating person into a deep and peaceful slumber with a simple touch.</p>)
}
const asphodelMercifulTouch: Perk = {
  id: "asphodel-merciful-touch",
  title: "Merciful Touch",
  cost: -1,
  prereqs: [asphodelGentleTouch],
  content: (<p>You may use attacks you make against another being capable of sleep to painlessly drive them towards a deep and peaceful slumber without risk of injury or death.</p>)
}
const asphodelAmnesticTouch: Perk = {
  id: "asphodel-amnestic-touch",
  title: "Amnestic Touch",
  cost: -1,
  prereqs: [asphodelGentleTouch],
  content: (<p>You can, with a touch, cause a person to lose memories they find painful.</p>)
}
const worldAsphodel = {
  id: "base-worlds-asphodel",
  title: "Asphodel",
  tagline: "by ilzolende, inspired by Pathfinder and Planescape",
  description: (
    <>
    <p>The lands of Asphodel stretch seemingly without bound, lit by a gentle sun each day and bright stars each night. The flora of Asphodel do not compete with each other, seemingly forming into gardens and manicured forests of their own accord. The weather in Asphodel is always clear, with the primary sources of water being rivers fed by mysterious springs and sourceless mist appearing on plants slightly before dawn.</p>
    <p>Agathodaemons are the most notable population of Asphodel, and take the forms of animals, occasionally with anthropomorphic characteristics. They show compassion towards all, but that compassion often takes the form of encouraging visitors to stay and recuperate, refusing to help visitors they deem insufficiently recovered find bridges. Some agathodaemons work alone or in teams towards strange projects, though they typically refuse assistance with these from anyone they deem insufficiently recovered.</p>
    </>
  ),
  conduitDescription: (<p>Those influenced by Asphodel are called the Blessed. As you spend time and gain perks in Asphodel, your frustrations and resentments become more distant to you, and you become more aware of the harms which others have experienced. Your body takes on aspects of an animal appropriate to your nature. At 20 points spent, you begin to lose memories, starting with traumatic events.</p>),
  perks: [
    asphodelSustenance, asphodelMultifacetedSoul, asphodelTransformation, asphodelWingedSoul, asphodelHeartspeech,
    asphodelPlainspeech, asphodelTruespeech, asphodelSustainingEmbrace, asphodelPsychopompsGrip,
    asphodelOrpheanMelody, asphodelGlade, asphodelTender, asphodelPathOfFlowers, asphodelGentleTouch,
    asphodelMercifulTouch, asphodelAmnesticTouch
  ],
  crown: {
    id: "asphodel-crown",
    title: "Crown: Tranquil",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Asphodel are called Tranquil, and their desires shape forests. A Tranquil in Asphodel appears supernaturally lucky, and will never be unable to find fulfillment there.</p>
      <p>Tranquil spread the benefits of <PerkLink perk={asphodelSustenance} /> and <PerkLink perk={asphodelHeartspeech} /> to all around them, can lessen pain around them, and can use <PerkLink perk={asphodelOrpheanMelody} /> to lead a broader range of spirits.</p>
      <p>Tranquil can take on humanoid forms, regardless of the status of their original body.</p>
      <p>A Tranquil with <PerkLink perk={asphodelTender} /> can subvert their bond with Asphodel to dig through its normally resistant soil, revealing a panoply of broken and rusted arms and tools whose metals have strange relations to pain.</p>
      </>
    )
  },
  dangers: {
    id: "asphodel-dangers",
    title: "Dangers",
    firstTitle: "Forgetfulness",
    firstContent: (<p>Asphodel is comforting. Why hold onto painful things like memories and grudges and concerns and your body?</p>),
    secondTitle: "Repossession Agents",
    secondContent: (<p>Asphodel hosts many souls which others claim as theirs. These others raid Asphodel to reclaim such souls, often along with interest.</p>),
    thirdTitle: "Unrepentant Souls",
    thirdContent: (<p>Some people are taking a while to heal and may attack you if you go near them.</p>)
  },
  poi: {
    id: "asphodel-poi",
    title: "Rivers",
    firstTitle: "Pyriphlegethon",
    firstContent: (<p>The sun sets in and rises from the Pyriphlegethon, infusing its waters with a constant light and warmth.</p>),
    secondTitle: "River of Dreams",
    secondContent: (<p>Water drawn from the River of Dreams conveys visions of the good when drunk. These visions are targeted to the one who drew the water, and others who drink from water you drew will see the same visions you do.</p>),
    thirdTitle: "Kerlaugar",
    thirdContent: (<p>The Kerlaugar foams with a soapy substance and can be easily used for bathing and laundry. Rumors exist of its usability for cleaning less material things.</p>)
  },
  breaching: {
    id: "asphodel-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Bridges to Asphodel often appear over closed landfills. Winds bring a sense of calm and the scents of strange flowers. Animals near bridges are less likely to feed and reproduce.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Outposts of Asphodel are glades, typically with perimeters of sturdy evergreens and thick carpets of tough grass. Agathodaemons wander freely, but those who wander to Outposts tend to be more watchful than others.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>Paths of flowers leading to Asphodel do not wilt when trampled, losing only color. They have a tendency to climb slopes or pass through tunnels.</p>)
  }
}

const tellurianCompass: Perk = {
  id: "tellurian-compass",
  title: "Compass",
  cost: -1,
  types: ['Infusion'],
  content: (<p>Tellurian has a complex array of magnetic fields, some of which change over time, so a simple compass is rarely useful as a navigational tool. However, you are well-attuned to these magnetic fields, and your sense of direction and distance becomes as distinct as your sense of balance. With a moment's focus, you can sense electrical activity within a few yards; with a few minutes of meditation, you can extend that sense outward for miles around. If you have a sample of a mineral, you can compare its unique signature to what you sense in your environment and detect large concentrations of it within range.</p>)
}
const tellurianAkashic: Perk = {
  id: "tellurian-akashic",
  title: "Akashic",
  cost: -1,
  prereqs: [tellurianCompass],
  types: ['Infusion'],
  content: (<p>You gain a deeper connection to and understanding of the Telluric energy fields. You may enter a deep focus and tap into the memory of the World Soul, allowing you to see past events; it's generally easy to see a few minutes into the past of your current location, but the farther away you look in both time and space, the harder and more turbulent the process becomes. Looking back a day or more can be as draining as running a marathon, and the memories can spin out of control and begin showing scattered fragments related more by free association than by proximity in time or space.</p>)
}
const tellurianLift: Perk = {
  id: "tellurian-lift",
  title: "Lift",
  cost: -1,
  types: ['Gateway'],
  content: (<p>You can levitate up or down at will, and walk on thin air as though it were a solid surface. Your maximum speed is 10 ft/s per point spent in Tellurian, and the maximum carrying capacity of your levitation and airwalking is 100lbs per point spent in Tellurian. You can spend three days enchanting a stone platform to grant it this levitation effect, but if not built within a <ShallowPerkLink pid="tellurian-foundation" ptitle="Foundation"/> tower, the platform will be unstable and difficult to control.</p>)
}
const tellurianFerromagnetism: Perk = {
  id: "tellurian-ferromagnetism",
  title: "Ferromagnetism",
  cost: -1,
  prereqs: [tellurianLift],
  content: (<p>You can use finely controlled magnetism to move ferromagnetic metals (iron, nickel, cobalt, and their alloys). Tendrils of faint blue energy extend from your body to grasp and manipulate the metal. Most sand in Tellurian is ferromagnetic. The range of your energy tendrils is 20 feet per point spent in Tellurian, and their total weight limit is 200lbs per point spent in Tellurian.</p>)
}
const tellurianBolt: Perk = {
  id: "tellurian-bolt",
  title: "Bolt",
  cost: -1,
  types: ['Infusion'],
  content: (<p>You can tap into ambient energy to deliver powerful electrical blasts, or harmlessly disperse eletrical blasts into ambient energy. A few seconds of energy gathering will yield a weak shock that may hurt but rarely harms; a quarter hour of energy gathering will yield a lightning bolt as strong as one drawn from the clouds. This power is intuitive to use, even while distracted, and you will instinctively use it to defend against any sudden electrical discharges you experience. You gather energy slightly faster with each point spent in Tellurian.</p>)
}
const tellurianFulgurite: Perk = {
  id: "tellurian-fulgurite",
  title: "Fulgurite",
  cost: -1,
  prereqs: [tellurianBolt],
  types: ['Material'],
  content: (<p>You can melt and refine the sparkling Tellurian sands with intense electrical currents, fusing them into Lightning Glass. Comparable to sandstone in durability, but with the transparency of fine clear glass, it is easy to melt and reshape with the careful application of more lightning. You can create around 1 cubic foot of Lightning Glass per minute for each point spent in Tellurian.</p>)
}
const tellurianFoundation: Perk = {
  id: "tellurian-foundation",
  title: "Foundation",
  cost: -2,
  prereqs: [tellurianFulgurite],
  types: ['Outpost'],
  content: (<p>With a week of intellectual and spiritual labor to adjust the flow of leylines, you may conjure a warded tower into existence. Its style and layout are yours to dictate, but it is always tall and sturdy. It is constructed primarily of stone, with some glass, iron, and cotton-like fabrics upholstering its simple furniture. The tower and its contents are extremely durable and well protected against damage and decay, and the tower naturally integrates well with other structures and powers, especially Outposts—though it insists on retaining its tall cylindrical shape. With each point spent in Tellurian, the tower's radius increases by ten feet and its height increases by a tenth of a mile.</p>)
}
const tellurianFirmament: Perk = {
  id: "tellurian-firmament",
  title: "Firmament",
  cost: -1,
  prereqs: [tellurianFoundation, tellurianLift],
  content: (<p>You can generate a Foundation tower floating in the air, anywhere that stays within your line of sight during construction. It will stand there as stably as though it rested on solid ground, and support ten times its own weight without budging.</p>)
}
const tellurianBottledLightning: Perk = {
  id: "tellurian-bottled-lightning",
  title: "Bottled Lightning",
  cost: -1,
  prereqs: [tellurianFulgurite],
  content: (<p>By manipulating and fine-tuning the composition of Lightning Glass, you can shape it into a container for Telluric energy. The crudest form of these containers is an unstable capacitor that works as little more than an explosive, but light sources are an easy upgrade from there, and with a little more work you can create batteries, heat sources, and even more complex devices. A light that shines like a candle for a day takes just a minute of work.</p>)
}
const tellurianCapturedSpirit: Perk = {
  id: "tellurian-captured-spirit",
  title: "Captured Spirit",
  cost: -2,
  prereqs: [tellurianBottledLightning, tellurianAkashic],
  content: (<p>You have mastered one of the most prized achievements of the Telluric Magics: the ability to record mental impressions in Lightning Glass. The simplest way to create Mind Glass is by impressing your thoughts and sensations into a held piece of Lightning Glass in real-time, but with study and practice you can create more complex works, such as skill imprints that facilitate learning or even an immersive dream-like scenario. Anyone can read a piece of Mind Glass at a touch.</p>)
}
const tellurianAcademia: Perk = {
  id: "tellurian-academia",
  title: "Academia",
  cost: -2,
  prereqs: [tellurianFoundation, tellurianAkashic],
  content: (<p>Your Foundation's base radius is doubled, and you can design its furniture with much finer control and more complex possible results. If you designate one or more rooms as libraries during construction, their shelves will fill with books on scientific subjects such as history, biology, and architecture. The tower has a connection to the World Soul that boosts learning within its walls, with one of two possible polarities: a Light tower makes it easier to learn something the more living people in the same tower have the knowledge, and a Dark tower makes it easier to learn something the more dead people died within any of your towers while having the knowledge. It takes a week-long ritual to realign a tower's polarity.</p>)
}
const tellurianBusyWorkshop: Perk = {
  id: "tellurian-busy-workshop",
  title: "Busy Workshop",
  cost: -1,
  types: ['Minion'],
  content: (<p>First mold a mixture of clay, blood, vegetable matter and ash into the shape of a creature the size of a toddler, then give it a crude spark of life, choosing a type as you do. Brownies can be taught simple crafting tasks, which they do with precision and diligence, never needing a break. Gremlins are gifted at destruction, disassembly, and sabotage.</p>)
}
const tellurianOverflowingParapet: Perk = {
  id: "tellurian-overflowing-parapet",
  title: "Overflowing Parapet",
  cost: -1,
  prereqs: [tellurianBusyWorkshop, tellurianFoundation],
  content: (<p>At the top of your tower, you carve runes into a set of four equidistant stones and anoint each carving with alchemically treated rainwater over a period of seven days. Each stone will mold itself into a gargoyle, animating when the treatment is complete. They are capable of movement and flight, despite being made of heavy stone, and can also spit a jet of water with enough force to knock down a grown man. Each tower where you create Gargoyles gains a water reservoir and internal plumbing system; the Gargoyles will keep the reservoir topped up if the rain doesn't.</p>)
}
const tellurianLodestoneFactory: Perk = {
  id: "tellurian-lodestone-factory",
  title: "Lodestone Factory",
  cost: -1,
  prereqs: [tellurianOverflowingParapet, tellurianFerromagnetism],
  types: ['Minion'],
  content: (<p>Advancing the craft of minion creation through metallurgy, you become capable of forging Constructs, entities composed of a stone body wrapped in a metal skin that uses a combination of magic and controlled magnetism for movement. Their strong, durable bodies are highly resistant to magic. The construction process is well-optimized for a humanoid form, but with significant effort you can create Constructs with other body layouts. Changing a Construct's chassis is nearly impossible without destroying it.</p>)
}
const tellurianTruesoulAltar: Perk = {
  id: "tellurian-truesoul-altar",
  title: "Truesoul Altar",
  cost: -3,
  prereqs: [tellurianAkashic, tellurianFoundation],
  types: ['Infusion', 'Immortality'],
  content: (<p>You have learned the terrible truth of the World Soul. Tellus, this world's creator, built it in an effort to gain ultimate knowledge. His success overwhelmed him; what remains of his mind still exists somewhere in the World Soul, as lost as a single tear in a storm-stirred ocean. Tellus is beyond saving, but armed with your knowledge of his mistakes, you can develop a means to ward your mind against the World Soul's uncaring currents. When you die and your mind joins with the World Soul, you remain intact, and over the next few days your mind assembles an elemental vessel from air, metallic sand, and energy. This new body, Genius Pura, needs no nourishment and can shift in seconds between a tangible humanoid form and an amorphous floating cloud. Even if your mind itself is damaged, these same protections allow it to heal so long as you have contact with the World Soul. If you die too far from Tellurian, your mind cannot reach the World Soul and this immortality fails.</p>)
}
const tellurianColorfulPavilion: Perk = {
  id: "tellurian-colorful-pavilion",
  title: "Colorful Pavilion",
  cost: -2,
  prereqs: [tellurianCapturedSpirit, tellurianOverflowingParapet],
  types: ['Minion'],
  content: (<p>With a month-long ritual, you can create a magical spring and garden within one of your <PerkLink perk={tellurianFoundation} /> towers. With a month of daily rituals inside that garden, you can transform a cooperative subject into a Naga; after the final ritual, they will shed their skin and emerge as a half-human half-serpent, with six arms above and a snake tail below. In this form they shed their skin once a year, emerging in full health with any missing limbs regrown and damage from aging erased. Their multitasking ability increases, but their fertility is greatly reduced; any offspring they have will hatch as humans, usually female.</p>)
}
const tellurianEmpyreanTemple: Perk = {
  id: "tellurian-empyrean-temple",
  title: "Empyrean Temple",
  cost: -3,
  prereqs: [tellurianLodestoneFactory, tellurianFirmament],
  types: ['Minion'],
  content: (<p>A Colossus is a massive humanoid construct that functions as a <PerkLink perk={tellurianFoundation} /> tower as well as a very large Minion. It must be at least a hundred feet tall, though you can build larger ones if your <PerkLink perk={tellurianFoundation} /> size limits permit. Its size allows it to power itself using Tellurian's energy currents. With a quick ritual performed inside the Colossus's head, you can join your mind to it and pilot its body directly as an extension of yourself.</p>)
}
const worldTellurian = {
  id: "base-worlds-tellurian",
  title: "Tellurian",
  tagline: "by FacelessDude",
  description: (
    <>
    <p>This is a world of deeper valleys and higher mountains, with impressive towers reaching up towards the sky, and even more impressive towers reaching down from it. Energy flows both in the ground and in the heavens, and where the two connect it can be tapped into for power and then molded into magic at the hand of scholars who dedicated their lives to refine the craft.</p>
    <p>Transcendence of The Mind is the goal of every thinking being in Tellurian; every soul that dies in the world becomes one with the soul of the world itself. Through constant mental refinement, one can achieve a state of unity with the world soul while maintaining a sense of self. To achieve that state, people are constantly seeking to learn and to know more.</p>
    <p>The world is a lone planet orbiting a sun-like star; it is much larger than Earth and continuously expanding, but at an extremely slow rate. There are two moons and no other planets, except perhaps somewhere among the impossibly distant constellations beyond.</p>
    </>
  ),
  conduitDescription: (<p>Those influenced by Tellurian are called the Aloft. They become more prone to analytical thinking and trying to understand the world systematically and logically. At 5 points they develop a bluish hue in their hair, skin, or eyes, which deepens with each point spent, sometimes passing through a green or purple stage around 10 points before settling into a bold shade of blue or indigo at 15.</p>),
  perks: [
    tellurianCompass, tellurianAkashic, tellurianLift, tellurianFerromagnetism, tellurianBolt, tellurianFulgurite,
    tellurianFoundation, tellurianFirmament, tellurianBottledLightning, tellurianCapturedSpirit, tellurianAcademia,
    tellurianBusyWorkshop, tellurianOverflowingParapet, tellurianLodestoneFactory, tellurianTruesoulAltar,
    tellurianColorfulPavilion, tellurianEmpyreanTemple
  ],
  crown: {
    id: "tellurian-crown",
    title: "Crown: Philosopher",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in Tellurian are called Philosophers.</p>
      <p>You can memorize any material sample you examine with <PerkLink perk={tellurianCompass} />, and track deposits of it without needing the sample to compare to.</p>
      <p>Using <PerkLink perk={tellurianAkashic} /> only begins to tire you when looking more than a few weeks into the past, and navigating the confusion of distant memories is more like walking a complex maze than swimming a stormy sea.</p>
      <p>Individuals in an <PerkLink perk={tellurianAcademia} /> tower still benefit from the tower's polarity by default, but you can set their polarity differently using a one-minute ritual.</p>
      <p>Platforms you create with <PerkLink perk={tellurianLift} /> remain stable outside your <PerkLink perk={tellurianFoundation} /> towers, and can move horizontally as well as vertically. They require a pilot to do anything more complex than move slowly back and forth along a preset path, but can easily be modified into pilotable vehicles.</p>
      <p><PerkLink perk={tellurianBusyWorkshop} /> can create a third, combined type called a Hauflin, which is twice as tall as a Brownie or Gremlin and has all the traits of both.</p>
      <p>By varying the ritual to create a Naga in your <PerkLink perk={tellurianColorfulPavilion} />, you can turn people into other animal-based forms, such as the avian Garuda or mammalian Rakshasa. These still have the same core benefits as the Naga, though their yearly rejuvenation may take a different form.</p>
      <p>By incorporating Lightning Glass into your Brownies, Gremlins, Hauflins, Gargoyles, Constructs, and Colossi, you can grant them electrical abilities through <PerkLink perk={tellurianBottledLightning} /> or integrated knowledge with <PerkLink perk={tellurianCapturedSpirit} />. With work, you can even make them into true thinking beings.</p>
      <p>You can shift into your Genius Pura forms and back as easily as you can shift between them. Your biological body will seem to be held in perfect stasis when not in use. If your biological body is destroyed, however, you will need to seek repairs elsewhere before you can use it again.</p>
      <p>You can create Constructs and Colossi in any shape, and if they have wings, they will be able to fly.</p>
      </>
    )
  },
  dangers: {
    id: "tellurian-dangers",
    title: "Dangers",
    firstTitle: "Not a drop to drink",
    firstContent: (<p>Tellurian is covered in deserts of metallic sand and tundras of metallic snow. These environments are harsh, and the only rain they see is poured out with catastrophic force by terrible storms. Outside the single small, controlled oasis of civilization, very little life can survive.</p>),
    secondTitle: "The Headless Titan",
    secondContent: (<p>A massive colossus of unknown origin that used to destroy everything in its path before someone figured out how to cut off its head. Now, it still stands over its fallen head, but only moves to swat incautious climbers trying to loot its insides for raw materials.</p>),
    thirdTitle: "Scientia est potentia",
    thirdContent: (<p>The people of Tellurian have little in the way of advanced technology, but they are smart, educated, and eager to learn. An incautious Conduit, spreading rumors of otherworldly knowledge, might find themselves being pressed for secrets with uncomfortable intensity.</p>)
  },
  poi: {
    id: "tellurian-poi",
    title: "Heights",
    firstTitle: "The Spine of the Multiverse",
    firstContent: (<p>A set of floating towers above a deep valley, guarded by a trio of flying colossi shaped like a bird, a dragon, and a bat. They are rumoured to be the former home of Tellus, the creator of the world, and full of his treasures.</p>),
    secondTitle: "The Cobalt Rose Coalition",
    secondContent: (<p>A group of allied settlements with a total population of twenty thousand or so, more than anywhere else in Tellurian. Anyone of any importance is expected to make an appearance there.</p>),
    thirdTitle: "The Deepest Pit",
    thirdContent: (<p>A chasm whose depths gleam with a faint orange light, barely visible through the haze of distance. Could this be the world's molten core? How many expeditions have ventured into it? Why is there no sign of any of them except the marks they made and supplies they abandoned along the way? And why are they all so eager to go there in the first place?</p>)
  },
  breaching: {
    id: "tellurian-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Near bridges to Tellurian, people become more naturally inclined to study and research, and more hesitant to act for purposes other than gathering information. Lightning storms also become more frequent. Rarely, a Brownie or Gremlin might cross, and venture forth leaving a trail of repairs or vandalism behind them.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Wherever a Foundation tower is established, leylines begin to form, spreading out to flow and connect with bridges and other places of power. This makes the influence of Tellurian easy to notice, but hard to trace to its source.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A Gateway to Tellurian always moves up; the top of an elevator shaft in one world links smoothly to the bottom of an identical shaft in the other, and vice versa. Although Lift is required to construct them, it's possible to remodel them with stairs, ramps, ropes, ladders, mechanical elevators, or even just an empty column. Travelers should note that when moving downward, the bottom of the shaft has no gate effect.</p>)
  }
}

const epiphorAstrolabe: Perk = {
  id: "epiphor-astrolabe",
  title: "Astrolabe",
  cost: -1,
  content: (
    <p>
      No matter what paths you chart, you will always have an intuitive sense of direction.<br />
      This is a true internal compass; if you close your eyes, or similarly orient yourself, you will understand your location according to local directions even if those directions should be alien to your understanding.
    </p>
  )
}
const epiphorOceanroads: Perk = {
  id: "epiphor-oceanroads",
  title: "Oceanroads",
  cost: -2,
  prereqs: [epiphorAstrolabe],
  types: ['Gateway'],
  content: (
    <p>
      The stars of Epiphor speed your journey across any waterlike body large enough to bear the weight of an ocean-going vessel.<br />
      You will depart in the blink of an eye and arrive just as quickly, passing only as much time in between as you wish. Your arrival is heralded by a wave tall enough to swamp a smaller vessel or upset a larger one.<br />
      Passengers without Astrolabe or a similar navigational aid may find this rapid transit disorienting.<br />
      Further, should you seek the gnashing gyre of a Gateway to or from Epiphor, you will find one, if it is there to be found.
    </p>
  )
}
const epiphorMoonlitSongs: Perk = {
  id: "epiphor-moonlit-songs",
  title: "Moonlit Songs",
  cost: -1,
  prereqs: [epiphorAstrolabe],
  content: (
    <p>
      When travelling under an open sky, in view of stars natural or artificial, you will hear their distant melodies.<br />
      The transcendent experience aids in healing to an unnatural degree, mentally as well as physically.<br />
      When you sing, you may echo the transcendent melancholy of the stars. Though the notes sound achingly lonely, for you they are an unwavering comfort against loneliness.
    </p>
  )
}
const epiphorSailorsSalvage: Perk = {
  id: "epiphor-sailors-salvage",
  title: "Sailors' Salvage",
  cost: -1,
  content: (
    <p>
      Though harsh and hostile to those who travel it lightly, Epiphor lovingly rewards those who call it a home.<br />
      Your luck in finding resources and materials is extraordinary within Epiphor, and still exceptional outside it.<br />
      Scraps and bones wash up just when you need them, and your wandering path stumbles across strangers you would do well to meet. Any resource that passes through your hands lasts a little longer and works a little better than it should, especially on projects that are meaningful to you.<br />
      But beware—this power belonged first to the Sirens, and they will take note of you once you start to use it.
    </p>
  )
}
const epiphorSunlitSongs: Perk = {
  id: "epiphor-sunlit-songs",
  title: "Sunlit Songs",
  cost: -1,
  content: (
    <>
    <p>
      You may have already glimpsed the Sirens, swimming in schools in the mezzo. Now you will meet one.<br />
      Their almost translucent, slippery skin will remind you of the sea, as will their mournful song, as will their vicious white teeth.<br />
      This Siren has noticed you, and watched you, and decided that you are their most treasured thing.
    </p>
    <p>
      Every day you spend in Epiphor, there is a chance you will awaken to gifts.<br />
      Perhaps old fragments of coral, or gemstone, or glass, or time-worn plastic. Perhaps a fresh kill, of a fish or a foe. Perhaps nothing but gentle whispers through external gills, and a promise in song that you are loved.
    </p>
    <p>Others under your protection will be protected by and from your Siren.</p>
    </>
  )
}
const epiphorSaltHymns: Perk = {
  id: "epiphor-salt-hymns",
  title: "Salt Hymns",
  cost: -1,
  prereqs: [epiphorSunlitSongs],
  content: (
    <>
    <p>
      You will attract the attention of five separate Sirens.<br />
      Each will treat you well, though not as dearly as if you only drew the eyes of one.<br />
      That is because they will constantly be competing with one another - violently, and sometimes fatally.<br />
      If the others suspect you care more for one, they will likely temporarily ally to slay them.
    </p>
    <p>
      Although the quality and frequency of gifts will increase, this may take a toll on the Conduit.<br />
      It is always possible to acquire the attention of more Sirens if you only have the eyes of one.<br />
      But to escape the danger of their rivalry, you must wait until the others are slain, or slay them yourself.<br />
      If you choose the latter, never again will other Sirens of Epiphor set their eyes or hearts on you - and the one who remains will be more distant, singing more solemn songs.
    </p>
    </>
  )
}
const epiphorLeviathan: Perk = {
  id: "epiphor-leviathan",
  title: "Leviathan",
  cost: -3,
  prereqs: [epiphorSunlitSongs],
  content: (
    <p>
      As you come to understand the Sirens of Epiphor, their cruelties and kindnesses, so too will Epiphor come to understand you. And the Sirens' great caretakers, from their deep-water home, will begin to take an interest.<br />
      Huge, ageless, without the need for food nor light, the whale-like Leviathans remember Epiphor as it was. They can teach the secrets of shaping liquid as if it were clay, to form weapons, art, or structures. This same discipline lets them carry the sea with them on the rare occasions when they travel to the surface.<br />
      Unstoppable in combat on Epiphor, they will protect you from any foe that follows you to their beloved ocean—though they will never leave Epiphor, and cannot aid you outside it.<br />
      Like the Sirens, Leviathans are generous with gifts, both of knowledge and of the lost technology they carry embedded in old wounds.
    </p>
  )
}
const epiphorCragBasalt: Perk = {
  id: "epiphor-crag-basalt",
  title: "Crag Basalt",
  cost: -1,
  types: ['Material'],
  content: (<p>The impossibly black stone of the crags, when planted in shallow seawater, sprouts slowly into strange jagged formations like tangles of teeth. You know how to harvest it safely and sustainably, where to place it so it grows best, and all the tricks of shaping it into useful or beautiful forms.</p>)
}
const epiphorShiveringForests: Perk = {
  id: "epiphor-shivering-forests",
  title: "Shivering Forests",
  cost: -1,
  types: ['Material'],
  content: (
    <p>Aquatic wood from the mezzo, flexible as bamboo, but strong as teak when properly dried.<br />
    It can only take root in salt water deep enough to hide all but a glimmer of natural light, and grows ever taller seeking the glow of the distant sky.<br />
    When cultivated, Shivering Kelp attracts bountiful fish and smaller ocean plants. A flourishing forest might even draw the notice of a curious school of Sirens.
</p>
  )
}
const epiphorVentways: Perk = {
  id: "epiphor-ventways",
  title: "Ventways",
  cost: -1,
  prereqs: [epiphorCragBasalt],
  types: ['Gateway'],
  content: (
    <p>
      With refined control of the deep basalt, you can grow and shape it into dark stone arches.<br />
      When fully submerged, these black edifices open to long tunnels, threateningly and swelteringly warm. Their heat holds no danger or discomfort for you, protected as you are by your power over the stone.<br />
      A traveler might spend hours passing through a ventway, witnessing memories of long-ago Epiphor, the continents and cityscapes that now lie drowned beneath the ocean—only to emerge from the far side of the arch, no more than an armspan from where they started.
    </p>
  )
}
const epiphorWeatheredVeins: Perk = {
  id: "epiphor-weathered-veins",
  title: "Weathered Veins",
  cost: -1,
  types: ['Infusion'],
  content: (
    <p>
      Time spent navigating Epiphor leaves you with a near-immunity to the negative effects of water.<br />
      Heat, cold, the need for breath, crushing pressure, rapid ascent, the sting of salt and the blur of murk—you are never harmed or hindered by any of them.<br />
      You gain these benefits only when submerged in water, but they linger for a few minutes after you leave it.
    </p>
  )
}
const epiphorDeepblooded: Perk = {
  id: "epiphor-deepblooded",
  title: "Deepblooded",
  cost: -3,
  prereqs: [epiphorLeviathan, epiphorWeatheredVeins],
  types: ['Infusion'],
  content: (
    <p>
      You have embraced Epiphor, and Epiphor has embraced you in turn. The waters of Epiphor are part of you, flowing in your veins if you have them, circulating by other paths if not. <br />
      Drawing this water out of your body, you can control its motion with finesse, and extend that control to other fluids it touches, so long as the chain of contact to your body remains unbroken. The scope, force, and precision of this ability increase with practice.
    </p>
  )
}
const epiphorAquaforming: Perk = {
  id: "epiphor-aquaforming",
  title: "Aquaforming",
  cost: -3,
  prereqs: [epiphorDeepblooded, epiphorVentways, epiphorShiveringForests],
  types: ['Outpost'],
  content: (
    <p>
      Your mastery of land and sea is profound, and you can shape stone and shed water to create seas where none existed before, or raise new islands above the water. Any such working will take time, months without help, weeks with the aid of Leviathans in Epiphor. Islands you build will be low and rocky, unable to grow far past where the tide can reach.<br />
      This power can break a wall or flood a city just as easily as it can raise an island or carve a sea, and destruction is always quicker and easier than creation.
    </p>
  )
}
const epiphorSongsOfYouAndI: Perk = {
  id: "epiphor-songs-of-you-and-i",
  title: "Songs of You and I",
  cost: -5,
  prereqs: [epiphorOceanroads, epiphorMoonlitSongs, epiphorSailorsSalvage],
  types: ['Immortality'],
  content: (
    <>
    <p>
      When you perish, in any time or place, it will be as if gentle hands have slid over your eyes.<br />
      You will experience a death like sleep, in which you remember a love that promised you it was cruel.<br />
      The realisation that it only ever loved you will be aching and wonderful, in equal measure.<br />
      Pain and loss do not exist here; but time will continue to pass.
    </p>
    <p>
      When you awaken, you will be on an unfamiliar beach, wearing the same clothes you died in. Your immediate possessions will be scattered nearby, as though they washed up alongside you; the closer you were to open water when you died, the more of your things will make it to your resting place.<br />
      Nothing will be lost, no memories, no abilities—<br />
      Only time.<br />
      Less than a day, if you died in the waters of Epiphor. Not too long, if you were near another body of water.<br />
      The farther inland you were, the longer your peaceful rest stretches, to years or centuries or even millennia, until only the eternal Leviathans remember you.
    </p>
    <p>This immortality may be given up at any time by returning, with purpose, to the sea.</p>
    </>
  )
}
const worldEpiphor = {
  id: "base-worlds-epiphor",
  title: "Epiphor",
  tagline: "by amomentarypangregret",
  description: (
    <>
    <p>
      There is no land between the rising and falling crests of seafoam.<br />
      What little exposes itself is, itself, a part of the sea -<br />
      Harsh-cut granules of sand, as much hardened water as it is landfall.
    </p>
    <p>Such is Epiphor, an oceanic world composed of near-endless tides.</p>
    <p>
      Once, there were landmasses that could have been large enough to serve as continents -<br />
      Now, there are only the faintest rise of what were once mountain summits.<br />
      Archipelago chains cast only their lone sandbars to the crested waves, revealing sands as the tides fall.<br />
      Glistening, worn-down mineral shards give the colourful grains an almost crystalline sheen...
    </p>
    <p>Blue, black, and white sands having entrapped the remnants of old stone in their isolates, like stars in a distant sky.</p>
    <p>
      When a Conduit seeks to understand Epiphor, some method of travel over the sealanes will be necessary;<br />
      And with that, caution, for Epiphor may be gentle one moment and vicious the next.<br />
      The tyranny of waves will beckon interlopers to the depths - where the greatest promise and danger of the world lurk.
    </p>
    <p>
      For, even if - with preparation - a comfortable life might be made of the surface sea and its resources...<br />
      On plentiful water, rich plant and fish life, and careful understanding of the currents -
    </p>
    <p>
      Below those selfsame tides are four distinct layers.<br />
      The pull of the surface, hiding old buildings from the Conduits who tried - and failed - to claim Epiphor.<br />
      The allure of the mezzo, where mighty forests of kelp have grown as strong as any terrestrial tree.<br />
      The underground mountains of the crags, inverted and tempting the Conduit further with the promise of treasure and death -<br />
      And the depths, where only flashes of brittle colour disturb the silence of the grave.
    </p>
    <p>
      Of those who visit, few Conduits yet call Epiphor home; even those adapted to the world of the sea.<br />
      Some lifeforms exist in the oceans, but are poorly documented. Known, in passing, are the Sirens - rarely-seen dwellers of the mezzo, who show themselves largely to beckon visitors further in -<br />
      Usually, in the hope that they will be ruined.
    </p>
    <p>
      Many of the lifeforms in the depths have peculiar traits adapted to their climes and corner of the sea.<br />
      Gigantism, bioelectricity, active camouflage, and other - stranger - traits are all to be expected.
    </p>
    <p>
      Few communicate, but that does not indicate a lack of intelligence or sentience; Epiphor is a world of hermits. Hermits who believe every other resident to be a danger -<br />
      And often act accordingly.
    </p>
    </>
  ),
  conduitDescription: (
    <p>
      Those who spend much of their time as Conduits of Epiphor are known as Navigators.<br />
      Over time, their skin is likely to show the kiss of the sun, the lash of salt, and the weathered shine of tense muscle.<br />
      Grits of tiny starsand will cling to hair, reflecting sunlight around them, and the faintest sound of waves can often be heard nearby -<br />
      Even if none who interact with the Navigator are anywhere near the sea.
    </p>
  ),
  perks: [
    epiphorAstrolabe, epiphorOceanroads, epiphorMoonlitSongs, epiphorSailorsSalvage, epiphorSunlitSongs, 
    epiphorSaltHymns, epiphorLeviathan, epiphorCragBasalt, epiphorShiveringForests, epiphorVentways,
    epiphorWeatheredVeins, epiphorDeepblooded, epiphorAquaforming, epiphorSongsOfYouAndI
  ],
  crown: {
    id: "epiphor-crown",
    title: "Crown: Songbound",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>
        Epiphor crowns those whom it loves with song.<br />
        It is a song of the sea; it echoes in howling wind, in hateful tempest, in gentle tides, and in the whisper of reeds. 
      </p>
      <p>
        Your <PerkLink perk={epiphorAstrolabe} /> can point you in any direction, even an abstract or metaphorical one. If your route contains danger, or may prove unwise, you will hear whispers of warning.<br />
        <PerkLink perk={epiphorOceanroads} /> you travel will be gentler to your friends, and more forceful to your enemies.
      </p>
      <p>
        A <PerkLink perk={epiphorVentways} /> built near a submerged ruin will allow you to delve into the site, to see memories of its past and collect lost treasures.<br />
        <PerkLink perk={epiphorMoonlitSongs} /> will tend to your wounds with loving skill. Under an open sky, small injuries will disappear in seconds; larger ones may spend a little time being sewn up by threads of sun-bleached green.
      </p>
      <p>
        Your <PerkLink perk={epiphorSailorsSalvage} /> can find miraculous treasures, so long as you are near the sea where they might wash up.<br />
        If you have caught the eyes of a Siren, or a few, their understanding of you will deepen. Their gifts will be more thoughtful, and so will their actions.
      </p>
      <p>You can grow <PerkLink perk={epiphorCragBasalt} /> or <PerkLink perk={epiphorShiveringForests} /> in a wider range of conditions, and even on land. Where you carve and plant them, pools of seawater will linger, providing comfort, rest, and a memory of Epiphor.</p>
      <p>
        Your <PerkLink perk={epiphorWeatheredVeins} /> will broaden their immunity. Weather and water will never trouble you, and you will adapt quickly to even the most alien of oceans.<br />
        The scale of your <PerkLink perk={epiphorDeepblooded} /> mastery of water becomes enormous, and even very strange fluids can be brought under its sway.
      </p>
      <p>Sirens living in your <PerkLink perk={epiphorAquaforming} /> areas will defend them, and their other residents, down to the last drop of pale blood. The stone and seas themselves may rise to the defense, if the need is great - and if you have spent your own blood in defense of Epiphor.</p>
      <p>
        The songs you share with Epiphor grant no visible material benefit.<br />
        Sometimes, a thing does not need to be seen, to be.
      </p>
      <p>Should you experience a true and final death as a Conduit, that may not be the end of your story.</p>
      </>
    )
  },
  dangers: {
    id: "epiphor-dangers",
    title: "Dangers",
    firstTitle: "Capriciousness",
    firstContent: (
      <p>
        The apparent moods of Epiphor, like all seas, change rapidly.<br />
        A gentle sunny day may become a wall of water, crushing all that offends it.<br />
        Everything not dear to Epiphor is forever at its mercy.
      </p>
    ),
    secondTitle: "Sirens",
    secondContent: (
      <p>
        When not recognised by the schools of Sirens, they will beckon to you their songs, and to death.<br />
        It will be not be subtle, and yet the temptation will be profound.<br />
        With nothing around but water, and harsh rocks, and white teeth, sweet songs will promise an end to long voyages.
      </p>
    ),
    thirdTitle: "Old Epiphor",
    thirdContent: (
      <p>
        On days the tides reach their lowest, Earth-like cities will rise from just beneath the depths.<br />
        Those adapted to Epiphor, or otherwise capable of deep-sea travel, may investigate them for power, knowledge, or adventure's own sake.<br />
        But the destruction of what Epiphor was is not entirely dead; only dormant.<br />
        Ancient machines still thrum with uncompleted doctrines; and the Songless, afflicted with horrendous immortality, hunt all those who dare to tread.
      </p>
    )
  },
  poi: {
    id: "epiphor-poi",
    title: "Depths",
    firstTitle: "Sunlight",
    firstContent: (
      <p>
        Although the waters of the surface may shine in almost any colour perceivable, they are most often a grey-blue, or a misty green.<br />
        Countless plants, and seas of wrecks from throughout all worlds tempt the unwary.<br />
        Only rocks and rare sandbars reach above the water as natural outcroppings;<br />
        And only the dead ruins of Old Epiphor, a superstructure built by Conduits, rusty and rickety platforms, stand as artificial remnants.
      </p>
    ),
    secondTitle: "Twilight",
    secondContent: (
      <>
      <p>
        The mezzo is where the bulk of all life on Epiphor thrives.<br />
        Forests of coral and kelp provide everything needed to flourish, for the sea is rich and generous.<br />
        Here, the Sirens kill and play and sing and dance.<br />
        It is a dangerous and beautiful place, but welcoming to those who know its secrets.
      </p>
      <p>
        Between the crags are the mysteries of Old Epiphor.<br />
        These great inverted mountains hide bounties of mineral wealth, structures and the remains of long-dead cities, preserved by salt water...<br />
        And the occasional metal tomb, a sealed environment like a drowned space-station.<br />
        Each possesses their own dangers - and their own temptations.
      </p>
      </>
    ),
    thirdTitle: "Midnight",
    thirdContent: (
      <p>
        Where the depths stop, the seafloor sand is solid nightblack, lit up only by the starry granules of devoured minerals.<br />
        Walking on the seafloor, the Conduit may stir sparks of starsand to light with every step - a temporary glimmer in the great blackness.<br />
        It is here the Leviathans rest, processing memories that span universes.<br />
        In their exhausted eternity, they love little more than warm conversation with those who are kind - and curious conversation with those who are not.
      </p>
    )
  },
  breaching: {
    id: "epiphor-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (
      <p>
        A sound like waves lapping against waves can be heard, in every direction, constantly.<br />
        It will sound furious and lethal to most, and as a gentle song to those who have listened carefully.<br />
        Should the bridge reach open water, this is where Sirens will find precious things for those they care for, taken from those who strayed too close to song -<br />
        And for whom the Sirens cared not.
      </p>
    ),
    secondTitle: "Outposts",
    secondContent: (
      <p>
        Like basalt has erupted from a breach, and then the geographic cataclysm has filled with water - that is the Outpost.<br />
        These pools are dangerous. Sirens will make off with anything that is not secured from the fluctuating tides -
And even the geography itself is hostile to interlopers, though seeming to curve as a welcome touch to those who are loved by Epiphor.<br />
When formed or controlled by the Songbound, Outposts will lose some of their wild nature. The tides will be gentler, and the Sirens may confront intruders openly to ask their business, armoured in bronze and coral.
      </p>
    ),
    thirdTitle: "Gateways",
    thirdContent: (
      <p>
        Formed from roaring whirlpools or basalt arches, these are safe only to those trusted by Epiphor.<br />
        The crashing of the waves warns away travelers who would break their bones in its unforgiving currents.<br />
        To those who hear the song beneath the fury, however - a Conduit, or a sailor whose heart holds room for the sea - the journey through these Gateways is safe and pleasant, though still a little wild.<br />
        One may even arrive accompanied by a few extra treasures, gifts of the generous sea.
      </p>
    )
  }
}

const threeRingsFamiliarSpirits: Perk = {
  id: "three-rings-familiar-spirits",
  title: "Familiar Spirits",
  cost: -1,
  types: ['Minion'],
  content: (<p>Even an apprentice theurge can summon lesser spirits and win contracts that bind them into paid employment for a mortal lifetime, but Conduits offer something that no normal theurge can offer, not even the Great Masters: the taste of otherworldly skies. In return for allowing them to join you on your journeys (which they can do easily by anchoring themselves to your selfhood, so that they are carried with you wherever and however you travel), these spirits will serve you indefinitely. They can exert no more force than a breath of air, but are useful as scouts, thanks to their ability to move quickly and silently, pass through most walls and barriers, be virtually undetectable to all who do not know their name, and to their numerous spiritual senses, including the ability to determine the name of nearly anything they observe.</p>)
}
const threeRingsTutelaryDeity: Perk = {
  id: "three-rings-tutelary-deity",
  title: "Tutelary Deity",
  cost: -2,
  prereqs: [threeRingsFamiliarSpirits],
  content: (<p>With a considerable further investment, you can attract the attention of more than just minor spirits. A Tutelary, one of the gods of knowledge who patronized the First Master's ascent and codification of the Three Arts, has found worth in binding themself to you in a similar manner. Though too divine to manifest bodily in the earthly world, they can advise you through a psychic link. The Tutelaries possess oceans of knowledge both deep and wide, and while their knowledge of other worlds may be limited, they can still provide useful advice even in worlds utterly unlike Three Rings, so long as you are connected to that world and have spent at least 5 points on its perks.</p>)
}
const threeRingsMacronaut: Perk = {
  id: "three-rings-macronaut",
  title: "Macronaut",
  cost: -2,
  types: ['Infusion'],
  content: (<p>A curious adaptability, of both body and mind, often finds its way into the eponymous macronauts, the sailors of the long seas that stretch between one Xeniteia and another. You too can possess this adaptability, allowing you to quickly adjust to even the strangest of environs you might encounter in the Xeniteies, or on other worlds. This perk reserves 1 point's worth of its power to adapt your body and mind to new environments; old adaptations will be discarded and new ones formed over the course of your first day in each place.</p>)
}
const threeRingsChrysopoet: Perk = {
  id: "three-rings-chrysopoet",
  title: "Chrysopoet",
  cost: -1,
  content: (<p>Any who study the Tablets can become an Alchemist, but few possess the dedication and opportunity to go beyond alchemy, and achieve the status of Chrysopoet, like the Great Masters who conjured the golden rings upon which the city is built did. You, as a Conduit of Three Rings, possess the privilege. This perk grants you superlative talent and skill with all forms and techniques of the Alchemic Art, comparable to a lifetime of study and experimentation; but even more, it grants you the ability to inspire the transubstantiation of stardust into materials through pure intent alone, rather than through the synthesis and transmutation of base elements.</p>)
}
const threeRingsEcdysiast: Perk = {
  id: "three-rings-ecdysiast",
  title: "Ecdysiast",
  cost: -1,
  prereqs: [threeRingsMacronaut, threeRingsChrysopoet],
  types: ['Infusion'],
  content: (<p>The adaptability of a macronaut is a kind of alchemy, the same kind practiced in the shapechanging parlors of the Outer Ring. You, with your mastery of alchemy, can analyze the essential make-up of a given adaptation and encode it as a sequence of concepts. With a pinch of stardust, you can manifest these concepts with the same ease as any other alchemic formula, changing from one form to another in a single moment. However, many such changes in quick succession can overtax the essential framework of your existence. It would be wise to not perform more ecdyses than the points you've spent in Three Rings without taking at least a day's rest to recover.</p>)
}
const threeRingsIronStar: Perk = {
  id: "three-rings-iron-star",
  title: "Iron Star",
  cost: -4,
  prereqs: [threeRingsChrysopoet],
  types: ['Material'],
  content: (<p>Conjured through Theurgy and harnessed through Alchemy, stardust is the economic lifeblood of the city of Three Rings. Collection nets in the Outer Ring unfurl to gather it when it falls from the sky, and seawater refineries all over the city churn day and night to extract it from the waters beneath. But even the stellar spirits who call down the dustshowers cannot create the stardust they summon: only a Star can do that. And you, as a Conduit, can create a Star. First you must build an enormous iron sphere, wrapped in a golden ribbon engraved with arcane sigils and enclosing a small dodecahedral hollow; then, with a spiritual labor akin to <ShallowPerkLink pid="base-bridge-building" ptitle="Bridge Building" />, you can ignite the Star's core into a sort of half-bridge that connects directly to the power of Creation underlying Three Rings. Once complete, the Star will produce just under a tonne of stardust each day, which is enough to meet fifty times the global energy needs of a modern Earth, or about a third of the industrial demands of the Outer Ring.</p>)
}
const threeRingsThaumaturge: Perk = {
  id: "three-rings-thaumaturge",
  title: "Thaumaturge",
  cost: -3,
  content: (<p>As a Chrysopoet directly grasps the power underlying alchemy, a Thaumaturge directly grasps the power underlying theurgy: the nature and perspective of a spirit. The world comes apart under your vision into streams of essence and layers of conceptualization and interpretation. This is a truly piercing sight, blocked only by the most powerful and arcane of barriers. What's more, you can reach along the same new dimensions that your vision spreads to, pushing and pulling and rearranging the concepts of the world around you to work miracles in much the same way the greatest of the stellar spirits do. However, this work is exhausting, both physically and spiritually; you can make only as many deep changes as you have points spent in Three Rings before needing to rest. You also have an unintrusive yet unerring sense for the calling of your name, and if the calling follows a ritual of your own design, you may freely manifest an ethereal avatar in answer.</p>)
}
const threeRingsMagicCircle: Perk = {
  id: "three-rings-magic-circle",
  title: "Magic Circle",
  cost: -2,
  prereqs: [threeRingsThaumaturge],
  types: ['Gateway'],
  content: (<p>The ritual summoning circles of theurgy are a specialized tool, able to call on a named spirit or Thaumaturge to manifest within. You can adapt them to much broader usage. By targeting your circle on the name, conceptual framework, and essential composition of any portable object or person, you can create a temporary portal and pull your target through; or, by constructing two magic circles each targeting the other's location by similar means, you can create a stable and lasting passage between them.</p>)
}
const threeRingsSleepless: Perk = {
  id: "three-rings-sleepless",
  title: "Sleepless",
  cost: -1,
  types: ['Infusion'],
  content: (<p>Those who spend a lifetime studying the Tablets atop Mount Axle often find, in their later years, the desire for sleep steadily fading from their mind, their need for rest satisfied just as well by study and meditation. You too can rest in this way, if you wish to. Each hour you spend in deep contemplation, whether on pure philosophy or on more practical matters, will count for a number of hours of sleep equal to the points you've spent in Three Rings.</p>)
}
const threeRingsMnemon: Perk = {
  id: "three-rings-mnemon",
  title: "Mnemon",
  cost: -2,
  content: (<p>The Great Masters of Alchemy are the Chrysopoets, the Great Masters of Theurgy are the Thaumaturges, and the Great Masters of Astrology are the Mnemones, whose minds have grown beyond the limits of mortal flesh. A Mnemon's memory is flawless, able to capture the entirety of their ongoing stream of consciousness without error or compromise, and endless in its capacity. Given the time to read it all, a Mnemon's mind could contain an entire library's worth of books, and not merely their text, but nuanced interpretations and deep connections between various texts, and between the texts and the rest of the Mnemon's experiences.</p>)
}
const threeRingsPlanetarium: Perk = {
  id: "three-rings-planetarium",
  title: "Planetarium",
  cost: -3,
  prereqs: [threeRingsMnemon],
  types: ['Outpost'],
  content: (<p>The laws of motion in the heavens are obscure. The Sun and Moon's tracks are well-worn, but the planets wander along stranger paths, and the dance of the so-called 'fixed' stars is subtler still. Though they may be convoluted, the laws governing these paths are certain and exact, and with dedication a Mnemon might learn them. Beyond their straightforward use in predicting the movements of the heavens, these laws also encode the essential nature of the world of Three Rings. By creating a grand, building-sized orrery that follows these laws, inscribing the names of the stars upon the machinery, and then saturating the atmosphere with gaseous stardust, one can bring the heavens themselves down to earth, in miniature. There can be no surer place to experiment and to learn, as every condition of the Planetarium's interior can be changed, allowing it to mimic the environment of any xeniteia, whether real or imagined.</p>)
}
const threeRingsThriceGreat: Perk = {
  id: "three-rings-thrice-great",
  title: "Thrice-Great",
  cost: -3,
  prereqs: [threeRingsTutelaryDeity, threeRingsIronStar, threeRingsMagicCircle, threeRingsPlanetarium],
  types: ['Infusion', 'Immortality'],
  content: (<p>For the First Master, becoming Thrice-Great was a journey of many lifetimes; as a Conduit, you can expedite that process. First, establish a Planetarium atop the peak of Mount Axle, between the faces of the Tablets. Within it, construct the empty shell of an Iron Star. Inscribe a Magic Circle within the Star's central chamber, and summon there your Tutelary Deity, whose great night-dark body can be sustained for a short time by the Planetarium's stardust-saturated air. Then and only then, standing with your Tutelary Deity in the Iron Star's heart, you must ignite it. In the light of Creation, you and your Tutelary Deity are made as one, and your Iron Star ascends to heaven to join its brethren, engraving your essence into the very foundation of Three Rings. From your stellar throne, you may freely manifest in body or spirit anywhere in Three Rings, including its Outposts and Gateways in other worlds, and just as freely call back those manifestations. Even in the face of complete annihilation, you will return to your stellar throne as inevitably as the Sun returns to the horizon.</p>)
}
const worldThreeRings = {
  id: "base-worlds-three-rings",
  title: "Three Rings",
  tagline: "by Fib",
  description: (
    <>
    <p>A world covered by a great and wild ocean, know by many names. Scattered across its surface are innumerable floating islands, each one possessed of a strange and unique character, born from the chaotic mix of essences bubbling deep beneath the surface, in the chaos of the abyss. This vast ocean flows in a gentle, circular current, at the center of which lies the enormous Mount Axle, a mountain of solid emerald rising all the way up from the abyss. Carved into the three faces of the mountain's scintillating green apex are the Emerald Tablets, the instructions of the First Master left to guide all who chose to follow in their footsteps, to learn the Three Arts. In the generations that have passed since, many wanderers of the trackless sea have found their way to that great peak and become students of the Tablets, eventually marshalling all their powers to construct a three-ringed city of gold around Mount Axle, for which the world is named.</p>
    <p>The people of the city of Three Rings, broadly human in character though with a much greater diversity in shapes and sizes than on Earth, divide themselves based on which of the three arts they pursue, and thus also which of the three annular districts they live and work upon. The Alchemists of the Outer Ring are the most numerous, populating the city's manufactories, where they craft every manner of machine and medicine and marvelous materials of all kinds, spun from nothing more than fire, water, and stardust. The Theurges of the Middle Ring are smaller in number, but no less industrious, as they entreat the stellar spirits to descend the night sky and bargain with the spirits for their power and wisdom, and call down rains of stardust to fuel the city. The Astrologers of the Inner Ring gaze upon the vault of heaven sleeplessly, studying the motion of the Sun, Moon, and stars, and the nameless currents of the darkness between them, divining from their studies the names and natures of all things in the heavens and the earth, and through this knowledge, chart the course of the city. The cityfolk are not the only people of this world, however: there are also the xenoi, people of the far-flung Xeniteies, the floating islands caught by the circular current, whose bodies and minds are transformed by the essence rampant of their homeland.</p>
    </>
  ),
  conduitDescription: (<p>The Conduits of Three Rings are known as Smaragdines. After acquiring 5 points of perks from Three Rings, a natural urge to systematize and characterize the world around them begins to arise, along with the appearance of an emerald green sliver in their irises, which grows alongside their investment into Three Rings. By the time they've spent 20 points, their irises are pure and shining like polished emeralds.</p>),
  perks: [
    threeRingsFamiliarSpirits, threeRingsTutelaryDeity, threeRingsMacronaut, threeRingsChrysopoet, 
    threeRingsEcdysiast, threeRingsIronStar, threeRingsThaumaturge, threeRingsMagicCircle, threeRingsSleepless,
    threeRingsMnemon, threeRingsPlanetarium, threeRingsThriceGreat
  ],
  crown: {
    id: "three-rings-crown",
    title: "Crown: Visionary",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those crowned in Three Rings are, or will be, known as Visionaries. Their powers are relatively few in number, but great in significance.</p>
      <p>Their spiritual strength and stamina, as well as the endurance of their essential self, are amplified massively, allowing for tasks such as building a bridge or igniting an <PerkLink perk={threeRingsIronStar} /> to be completed in a fraction of the time they normally take, and for an <PerkLink perk={threeRingsEcdysiast} /> to change their form many more times before needing to rest.</p>
      <p>The Visionary's <PerkLink perk={threeRingsMagicCircle} />s no longer require the construction of a special ritual space. Any closed loop which they can view the entirety of at once suffices, such as a circular desire path worn into the grass, the frame of a doorway, or even something as simple as forming a circle with their hands or arms will work.</p>
      <p>If the Visionary is a <PerkLink perk={threeRingsMnemon} />, their mind expands further, becoming akin to a <PerkLink perk={threeRingsPlanetarium} /> unto itself, effortlessly able to trace the state of a well-described system forwards or backwards through simulation. If the Visionary is also <PerkLink perk={threeRingsSleepless} />, time spent simulating systems counts as time spent in contemplation for the purposes of satisfying the need for sleep.</p>
      <p>If the Visionary is <PerkLink perk={threeRingsThriceGreat} />, whenever they are seated on their stellar throne, not manifesting a body in Three Rings or any other world, they may instead view the worlds they are connected to from a god's perspective, gazing upon the entire world at once, not only its physical form but also its heavenly spirits above, and its essential foundation below. From this vantage point, the Visionary may enact world-spanning miracles and global-scale alchemic formulae, altering the very nature of an entire world, though even for a being of their elevated status such a thing is a monumental exertion, and can only be done sparingly, perhaps even only once within the time of a mortal's lifespan, or else risk dispersing themselves under the strain, and being forced to wait out the time until they can reform upon their stellar throne.</p>
      </>
    )
  },
  dangers: {
    id: "three-rings-dangers",
    title: "Dangers",
    firstTitle: "Abyssals",
    firstContent: (<p>While the cityfolk do their best to capture as much of the stardust they call down in showers as they can, it's only natural that they can't collect it all. In fact, a majority of the stardust in any given dustshower ends up beyond their grasp, the water it dissolves into quickly sinking beneath the reach of the refineries' intake pumps. Aqueous stardust is significantly denser than ordinary seawater, and thus it falls down, without stopping, until it finally enters the bubbling, roiling chaos-stuff of the Abyss, at the very foundation of Three Rings, where its latent power is unleashed to fuel the Abyss's eternal fire. However, stardust's capacity for transmutation and transformation is immense, beyond even the Abyss's ability to completely nullify. Sometimes, when just the right mix of stardust and marine snow falls down into the Abyss, instead of being consumed, it consumes the roil, it grows and evolves, it becomes something alive. A beast of dark water and living flame, a dragon in all but name, and one which naturally remembers, in the vaguest way, the world of light above, and which sometimes yearns to return. Even without malice, do not underestimate the ruin that ignorance can wreak.</p>),
    secondTitle: "Gnosticism",
    secondContent: (<p>The Mnemones of Three Rings, the great advisors and counselors of the city, are by their nature curious, and that curiosity naturally leads to a liberal attitude with regards to strangers, including Conduits. However, as liberal as they are wont to be, if you prove yourself sufficiently dangerous, whether to the people of the city or to the Mnemones' plans for them, they may seek to bind you within their machinations, carefully prodding you and using your reactions to develop a model of your mind, simulating you in their Planetariums until they have built themselves a manual for how to control you. While such a thing would, by the law, only ever be used to turn you away from the city and assure its safety, it may be difficult for some of the Mnemones to resist the urge to instead seek to turn you into an asset.</p>),
    thirdTitle: "Warlords",
    thirdContent: (<p>Huge ships of black steel traverse the long seas, crewed by those who were not satisfied by the great prosperity of the city, who desired more than mere contentment, who stride across the xeniteies with conquest in their hearts, rather than curiosity. Some possess some talent in one or more of the Three Arts, some lead great slave-armies, some collect enormous treasuries of strange artifacts and arcane sorceries plundered from the lands they've conquered, and many have some combination of all three, but only two things unify all such warlords: an insatiable hunger for more; and the ruthless will to use every means at their disposal to acquire it.</p>)
  },
  poi: {
    id: "three-rings-poi",
    title: "Xeniteies",
    firstTitle: "Spichoria",
    firstContent: (<p>The single largest land-mass in terms of area, and the furthest from Mount Axle, essentially a small continent unto itself, dominated by a mountain range, curved onto itself to form two parallel lines connected by a circular arc at one end. The mountains themselves continuously grow as the island's essential nature consumes water and upwellings of abyssal fire into more stone, extending the arms of the mountain range and steadily pushing Spichoria further from the center of the world. The essence of the land likewise dictates the formation of springs of fresh water and veins of living fire to run throughout the mass of the mountains, which forms an almost sort of circulatory system for the island, and which naturally wears away the softest rock to form distinctly habitable cave networks, which occasionally break out into the surface, allowing the locals to take up residence within as is their tradition. Those locals are themselves a small-statured people, who make their living growing food in gardens amidst the plentiful rivers and rocky soil that lines the inside of the mountain range's two arms, and who are remarkably peaceful. The same channels that carry the warm fire of the mountain's heart throughout the cave system are also supernaturally effective conductors of sound, allowing for rapid and easy communication across the entire island, and which has allowed for the complex and massive web of friendship, loyalty, and alliance that helps maintain the island's peace to form.</p>),
    secondTitle: "Deimonesia",
    secondContent: (<p>The second largest xeniteia, though still much smaller than Spichoria on account of not consistently growing in size over time. A benighted land, shrouded in thick, dark fog that renders the day little brighter than the night. The land, when it is not cast in this utter darkness, is lit only by the pristmatic flames which occasionally kindle in the deepest chasms and crevices of the island, where last flickers of abyssal flame rising up beneath meet the dark fog of the island and catch anew. These flames possess an animate nature, naturally taking animalic forms once kindled and crawling out from their salamandrine nests. Most eventually flicker and die, but a few are able to crawl high enough to reach the surface, where the island's sparse human population can be found, humans which can serve as capable hosts and symbionts for these prismatic salamanders. One so inhabited gains remarkable powers of regeneration, able to recover nigh-instantly from injuries that would kill a normal human just as quickly, at the expense of sharing one's mind with a temperamental and capricious fire-spirit. The longer an inhabited human goes without drawing on the regenerative warmth of their salamander, the stronger and hotter that salamander grows, eventually beginning to shed its prismatic firelight from their place within their host's chest. At this point, the mind of the human and salamander are likely well-aligned, if not outright unified, and the salamander may begin to spread lesser buds of its into other humans, binding them as subordinates to their primary host in return for granting them a lesser form of regeneration, which in turn characterizes the broadly feudal structure of society on this island. Notably, at the apex of this hierarchy is a Warlord foreign to the island, whose name has been erased through powerful magic and is known only as the Megakleos.</p>),
    thirdTitle: "The Rhagesai",
    thirdContent: (<p>Not a single xeniteia, but rather a type or species, numerous in total though still rare to encounter without extensive work to track them across the long seas. They are, in an essential sense, alive, even if they are mostly inorganic in nature. The specifics of their form varies, naturally as individuals of any living kind do, but can be broadly described as having three main parts: a sort of 'bowl' at the base, formed from a porous pink stone, studded with rudder-like protrusions of glass which allow the Rhageisai to steer themselves; a large quantity of similarly pink sand, which serve to host one or a handful of small oases, sporting freshwater, a few palm trees, and possibly a few small animals, which serve as the Rhageisai's primary source of long-term stimulation; and an enormous tree of pink glass at the center of the island which serves as the seat a Rhageisa's consciousness as well as the sail which propels them and allows them to fight the circular current. A Rhageisa controls all of the glass attached to their body, capable of moving and changing its shape at will, even altering its physical characteristics to, such as making it soft instead of hard, flexible instead of rigid, as well as converting loose sand into more glass or glass back into sand, and possesses a powerful kinetic and topological sense for their glass, allowing them to both feel and hear through it, an experience that they nigh-univerally find highly pleasurable. They must be careful not to drain their sand entirely, as the inner surface of their bowl also possesses this sense, but with a painful degree of sensitivity, and is unsuitable for hosting the lifeforms that inhabit their surface. Visiting humans are a rare treat, and when so visited, they will often beckon the visitor to their central tree and try to entice them to stay for as long as possible with whatever sensual pleasures the Rhageisa can offer them. If one participates in such an offering, and stays for a while afterwards, it isn't rare for the Rhageisa to sing of their of past, of an age long-passed when they were the body of a kind and gentle mother-goddess, who cared for and tended to all living things above and below the water, but they were torn apart by one of her children, who in their youth strove to reach beyond the sky, though whether it is history or legend may not be clear.</p>)
  },
  breaching: {
    id: "three-rings-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Near bridges to Three Rings, the scents of seaspray and chemical fumes can be smelled, and things tend to become encrusted with white salt and corroded as if they were exposed to the harsh, salty winds of the seashore.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>Planetariums in other worlds will still possess the character of Three Rings' skies, by default, but with careful attunement by an appropriately trained Mnemon, they be shifted to show the skies of the world they now exist in, allowing for the careful study of their skies and whatever spirits or stranger beings might exist there.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>If a Magic Circle is constructed around a bridge, its summoning can reach through the bridge, allowing for the creation of permanent portals, but also for the summoning of otherworldly beings and artifacts through them without opening any sort of long-term connection, which depending on the conditions of the other world, might be desirable.</p>)
  }
}

const vineyardFruitOfTheVine: Perk = {
  id: "vineyard-fruit-of-the-vine",
  title: "Fruit of the Vine",
  cost: -1,
  types: ['Infusion'],
  content: (<p>The grapes that grow on every island in the Vineyard are a healthy, nutritious snack, with a very particular effect: the more you eat them, the more your body shifts toward your ideal self-image. People who feel too short grow taller, or the reverse; cosmetic details like skin, hair, eyes, bone structure, muscle development, and fat distribution all rearrange themselves; injuries will tend to heal faster and more cleanly. After enough grapes, you can even end up with elf ears or fox tails. This perk lets you maintain the effects of a year's steady grape consumption no matter how far you get from your supply, actively and ongoingly even in the face of interference, and following your preferences even as your preferences shift over time.</p>)
}
const vineyardMakingChanges: Perk = {
  id: "vineyard-making-changes",
  title: "Making Changes",
  cost: -2,
  prereqs: [vineyardFruitOfTheVine],
  types: ['Infusion'],
  content: (<p>After a few years of steady grape consumption, the really big changes start coming in. Whole new functioning limbs, centaur bodies, mermaid tails, size-shifts on the order of several feet or even more, and of course rapid healing of even very severe injury and illness. This is also the level at which you no longer need to worry about aging past your prime even very slowly. Again, this perk will maintain you indefinitely at this level of preference-driven shapechanging, regardless of whether you eat any grapes.</p>)
}
const vineyardVineheart: Perk = {
  id: "vineyard-vineheart",
  title: "Vineheart",
  cost: -3,
  prereqs: [vineyardMakingChanges],
  types: ['Infusion', 'Immortality'],
  content: (<p>You become one with the essence of the Vine. Your body is a projection of your deepest self, shifting according to your whim, near-instantly reverting all unwanted change and uninvited harm. However, its reserves are limited. If you reconstruct your body from scratch twice in the same month, you will lose Vineheart's protection and drop down to the Making Changes level until you spend a full year eating several grapes every day.</p>)
}
const vineyardTrellis: Perk = {
  id: "vineyard-trellis",
  title: "Trellis",
  cost: -1,
  prereqs: [vineyardVineheart],
  content: (<p>Vineheart's buffer now holds as many full reconstructions as your points spent in the Vineyard. It still takes one year of steady grape consumption to restore it when emptied, but when the buffer is only partially depleted, refilling it takes no more than a week of ordinary life.</p>)
}
const vineyardSoulseeker: Perk = {
  id: "vineyard-soulseeker",
  title: "Soulseeker",
  cost: -2,
  prereqs: [vineyardFruitOfTheVine],
  content: (<p>The protection and support of grape consumption and related perks will now apply to the mind as well as the body, letting you grow at your own pace into your best self and protecting you against external mental injury or influence. This effect supports and accelerates the Vineyard's mental influence on you, but also supports and enhances the ways in which that influence conforms to your own preferences about who you are and who you want to be.</p>)
}
const vineyardClaywright: Perk = {
  id: "vineyard-claywright",
  title: "Claywright",
  cost: -1,
  types: ['Material'],
  content: (<p>Clay is abundant in the Vineyard, with banks of it by every stream and river, always smooth and easy to work. It takes a special touch, however, to harvest it the right way so that it will soon grow back, and to shape it into forms besides ordinary pottery. With this power, you can harvest several pounds of clay per day from a small bank indefinitely, or more from a large one; and you can transmute your clay into other mundane materials, such as metal or leather or wood, by working and firing it just so. Changing the clay's colour by working your will into it is the easiest such transmutation; more complex ones may be trickier to learn, though you can be assured of figuring them all out eventually.</p>)
}
const vineyardClaywake: Perk = {
  id: "vineyard-claywake",
  title: "Claywake",
  cost: -1,
  prereqs: [vineyardClaywright],
  content: (<p>You can now give life to your clay creations, creating living plants or animals out of specially worked clay.</p>)
}
const vineyardClayfolk: Perk = {
  id: "vineyard-clayfolk",
  title: "Clayfolk",
  cost: -2,
  prereqs: [vineyardClaywake],
  content: (<p>The People of the Vine reproduce by sculpting new people out of clay; they usually sculpt babies or children, but for some purposes might choose to make adults instead. Now you can do the same. Note that your creations are not in any way bound to obey you, though they will tend to come out with the vinelings' usual friendly disposition. Note also that the level of care and sophistication you put into sculpting your creations will affect the results; it's normal for one person to put about a year's work into making a baby or small child, and two or three years into making an adult, though collaboration can accelerate the process.</p>)
}
const vineyardSelfCreation: Perk = {
  id: "vineyard-self-creation",
  title: "Self-Creation",
  cost: -2,
  prereqs: [vineyardClayfolk],
  content: (<p>With significant skill and effort, it's possible to sculpt a person whose base personality is a perfect copy of the artist's: all the same personality traits and inclinations, all the same talents, all the same strengths and weaknesses. Like any Clayfolk, however, they will wake with no memories or skills beyond the basic forms of bodily movement appropriate to their apparent age.</p>)
}
const vineyardGlazecraft: Perk = {
  id: "vineyard-glazecraft",
  title: "Glazecraft",
  cost: -2,
  prereqs: [vineyardClaywright],
  types: ['Gateway'],
  content: (<p>Magical glazes allow nonliving clay creations to be imbued with permanent magic. The most common use of glazes, and one of the easiest to master, is artificial springstones that mimic the water sources found naturally on wild islands. Many more applications are possible. A glaze made with a few drops of Conduit blood, for example, can be used to craft linked pairs of portals.</p>)
}
const vineyardWingcraft: Perk = {
  id: "vineyard-wingcraft",
  title: "Wingcraft",
  cost: -1,
  prereqs: [vineyardClaywake, vineyardGlazecraft],
  content: (<p>A highly specialized but eternally popular discipline: the art of constructing a pair of mechanical wings that fold up into a discreet backpack harness and respond to the wearer as naturally as their own limbs. Living wood is an essential component, and the difficulty of integrating glazes with living material is most of the reason why this craft is so hard to learn. Wings like this are available to buy or borrow on any populated island, but unless you make friends with a top-tier artisan, you'll get far better results by crafting your own.</p>)
}
const vineyardStrangeClay: Perk = {
  id: "vineyard-strange-clay",
  title: "Strange Clay",
  cost: -3,
  prereqs: [vineyardGlazecraft],
  content: (<p>This power allows you to transmute clay into any material you're deeply familiar with or connected to, even esoteric ones from other worlds. If you have Clayfolk, this allows you to create people imbued with whatever otherworldly energies and materials you have access to through your other perks. If you have Claywake, you can now sculpt proper magic grapevines. Even with just Claywright, your creations are now self-maintaining in the Vineyard style, seamlessly repairing normal wear and tear and staying tidy through all but the worst messes.</p>)
}
const vineyardIslet: Perk = {
  id: "vineyard-islet",
  title: "Islet",
  cost: -2,
  content: (<p>Leashing a wild islet is a tricky and sometimes hazardous endeavour, but you have a gift for it. You know how to sense them on the wind, how to land on them safely, and how to construct and operate the fins and sails and docking ramps and mooring lines that turn an islet from a floating rock into a civilized home. Most islets have a small stream with a claybank, a few trees, and several wild grapevines; you can reliably find ones with enough room for a small but comfortable house next to all that.</p>)
}
const vineyardLandcraft: Perk = {
  id: "vineyard-landcraft",
  title: "Landcraft",
  cost: -2,
  prereqs: [vineyardIslet, vineyardClaywake, vineyardGlazecraft],
  types: ['Outpost'],
  content: (<p>You gain the skill and craft to expand your islet naturally and seamlessly with transmuted clay, or even sculpt a new islet from scratch.</p>)
}
const worldVineyard = {
  id: "base-worlds-vineyard",
  title: "Vineyard",
  tagline: "a Vinifera Variant original",
  description: (
    <>
    <p>Islands float in an endless sky, with ambient light cycling from bright gold to soft silver and back. Colourful birds roost in the abundant greenery.</p>
    <p>The People of the Vine are mostly humanoid most of the time, but beyond that, details vary. They tend to be friendly and welcoming, but may be cautious around outsiders.</p>
    </>
  ),
  conduitDescription: (<p>Those influenced by the Vineyard are called Skyfarers. There are no physical effects, and the mental effects always adapt to the psyche of the individual Conduit. With each point spent, a Skyfarer tends to become more resilient, more curious, more compassionate, and more sincere, but to what extent and in what balance may differ widely depending on personality.</p>),
  perks: [
    vineyardFruitOfTheVine, vineyardMakingChanges, vineyardVineheart, vineyardTrellis, vineyardSoulseeker,
    vineyardClaywright, vineyardClaywake, vineyardClayfolk, vineyardSelfCreation, vineyardGlazecraft, vineyardWingcraft,
    vineyardStrangeClay, vineyardIslet, vineyardLandcraft
  ],
  crown: {
    id: "vineyard-crown",
    title: "Crown: Entangled",
    isCrown: true,
    cost: -5,
    content: (
      <>
      <p>Those Crowned in the Vineyard are called the Entangled, because upon taking up their Crown, they join a hive mind consisting of all other Entangled, alongside a broad range of natives who all have the equivalent of the <PerkLink perk={vineyardVineheart} /> and <PerkLink perk={vineyardSoulseeker} /> powers. Individual identity is easy to maintain within the link, but resistance to the Vineyard's influence is not; even Immutable is not enough to shield the mind against direct contact with the thoughts and feelings of so many People of the Vine.</p>
      <p>Your <PerkLink perk={vineyardSelfCreation} /> copies can now include your memories and skills as well as your base personality, though they still do not share your Conduit powers.</p>
      <p>With <PerkLink perk={vineyardVineheart} />, you can split your body into multiple networked duplicates who do share your Conduit powers, increasing your attention and mental capacity appropriately. Developing these duplicates takes time, however: you will be ready for your first duplication after a year, your second after two more years, your third after four more, your fourth after eight more, and so on. This will not allow you to gain points any faster, but will multiply your production of all other physical, mental, and spiritual resources that are part of you, and will allow you to work in multiple worlds simultaneously (though your rate of point gain will be split among them, so if you're gaining points in two worlds you will gain each at half speed).</p>
      </>
    )
  },
  dangers: {
    id: "vineyard-dangers",
    title: "Dangers",
    firstTitle: "War",
    firstContent: (<p>Although the People of the Vine are generally a very friendly bunch, they can be fierce indeed if sufficiently provoked.</p>),
    secondTitle: "Rocs",
    secondContent: (<p>Outside of civilized areas, wild islands ride the skies, uninhabited except by unsettlingly large birds. To such a creature, you might look like a juicy meal to bring back to the nest.</p>),
    thirdTitle: "Wind",
    thirdContent: (<p>Near the inhabited parts of the sky, the air currents are usually predictable, if not always convenient... but if you stray too far from the safe zones mapped by the locals, you could get caught in a wild wind and tossed hundreds or thousands of miles out of your way.</p>)
  },
  poi: {
    id: "vineyard-poi",
    title: "Skymarks",
    firstTitle: "The Continent",
    firstContent: (<p>Where most people live who are into population density. Insofar as the Vineyard has a center of government, it's here.</p>),
    secondTitle: "The Archipelago",
    secondContent: (<p>A long string of islands, some moored together, some just steering into the same winds. Tiny islets just following along; massive mini-continents covered edge to edge in a sprawl of buildings; and, most commonly, single mid-sized islands with single mid-sized towns devoted to some specific craft, like trees or pottery or lifesculpting or clockwork. If there's a subject you want to study, there's an island where you're welcome to study it, alongside some of the Vineyard's top specialists.</p>),
    thirdTitle: "The Moon",
    thirdContent: (<p>"Chasing the moon" is an idiom for going off into the deep sky, perhaps never to return. There isn't a moon, nor a sun; the ambient light shines equally from all corners of the sky. But if that's true, where exactly did the expression come from?</p>)
  },
  breaching: {
    id: "vineyard-breaching",
    title: "The Breaching of Worlds",
    firstTitle: "Bridges",
    firstContent: (<p>Where the Vineyard touches other worlds, learning is easier and lying is more difficult. Plants grow faster and more healthily, and things stay clean and in good repair longer than you'd expect.</p>),
    secondTitle: "Outposts",
    secondContent: (<p>The Vineyard's outposts in other worlds are islets. They may need to be tethered in place to prevent them from drifting away on the wind. It's possible, though tricky, to coax one to settle on the surface of a body of water; getting them to integrate with another landmass is right out. If they do start to drift, the bridge they're built on will likely snap, leaving them unmoored and disconnected until a new one can be stably built.</p>),
    thirdTitle: "Gateways",
    thirdContent: (<p>A glazed portal built across a bridge. They may be simple and sturdy, or ornately engraved, depending on the whims of the artisan.</p>)
  }
}

export const baseWorlds: readonly World[] = [
  worldEarth, worldBevin, worldPrison, worldRim, worldYomi, worldDesert, worldAether, worldCrucible, worldMu, 
  worldKuiper, worldAcademy, worldRorch, worldArbor, worldBrazen, worldCarnation, worldAsphodel, worldTellurian,
  worldEpiphor, worldThreeRings, worldVineyard
]