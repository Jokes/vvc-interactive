import { useState, Fragment, type JSX, type ReactNode } from 'react'
import { PerkTypeIdentifier, type PerkType } from './perkTypes'
import './App.css'

interface Section {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly children?: readonly Section[];
}

interface Perk {
  readonly id: string;
  readonly title: string;
  readonly types?: readonly PerkType[];
  readonly prereqs?: readonly Perk[];
  readonly repeatable?: boolean;
  readonly iscrown?: boolean;
  readonly cost: number;
  readonly content: ReactNode;
}

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

interface World {
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

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

function TableOfContents({ sections }: { sections: readonly Section[] }) {
  return (
    <ul>
      {sections.map(({ id, title, children }) => (
        <li key={id}>
          <a href={`#${id}`}>{title}</a>
          {!!children?.length && <TableOfContents sections={children} />}
        </li>
      ))}
    </ul>
  );
}

function Contents({ sections, level }: { sections: readonly Section[]; level: HeadingLevel;}) {
  const H: keyof JSX.IntrinsicElements = `h${level}`;
  return (
    <>
    {sections.map(({ id, title, content, children }) => (
      <Fragment key={id}>
        <H id={id}>{title}</H>
        {content}
        <Contents
          sections={children ?? []}
          level={Math.min(level + 1, 6) as HeadingLevel}
        />
      </Fragment>
    ))}
    </>
  );
}

function PerkLink({ perk }: { perk: Perk }) {
  return (
    <ShallowPerkLink pid={perk.id} ptitle={perk.title} />
  );
}
function ShallowPerkLink({ pid, ptitle }: { pid: string, ptitle: string }) {
  return (
    <a className="perk-mention" href={`#${pid}`}>{ptitle}</a>
  );
}

const COSTFORMAT = new Intl.NumberFormat(undefined, {signDisplay: "always"});

function CommaSeparatedList({items} : { items: ReactNode[] }) {
  if (items.length === 1) {
    return (items[0])
  }
  if (items.length === 2) {
    return (<>{items[0]} and {items[1]}</>)
  }
  return (
    items.map((item, i) =>
      <Fragment key={i}>
        {i > 0 && ","}{i===items.length-1 && " and"} {item}
      </Fragment>
    )
  );
}

function PerkListing({perk}: {perk: Perk}) {
  return (
    <div id={perk.id}>
      <div className='perkTitle'>
        <b>{perk.title}</b> | {COSTFORMAT.format(perk.cost)}
        {!!perk.prereqs?.length && <> | Requires <CommaSeparatedList items={perk.prereqs?.map((p) => <PerkLink perk={p} />)} /></>} 
        {!!perk.types?.length && <> |</>} {perk.types?.map((t) => <PerkTypeIdentifier key={t} perkType={t} />)}
        {perk.repeatable && <> | Repeatable</>}
      </div>
      <div className='perkContent'>
        {perk.content}
      </div>
    </div>
  );
}

function TriptychListing({tri}: {tri: Triptych}) {
  return (
    <div id={tri.id}>
      <div className='triTitle'>{tri.title}</div>
      <div className='triContent'>
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

function WorldSection(world: World) {
  return {
    id: world.id,
    title: world.title,
    content: (
      <>
      <div className='worldTagline'>{world.tagline}</div>
      <div className='worldDescription'>{world.description}</div>
      <div className='conduitDescription'>{world.conduitDescription}</div>
      <div className='worldPerks'>{world.perks.map((p) => <PerkListing key={p.id} perk={p} />)}</div>
      <div className='worldCrown'><PerkListing perk={world.crown} /></div>
      <TriptychListing tri={world.dangers} />
      <TriptychListing tri={world.poi} />
      <TriptychListing tri={world.breaching} />
      </>
    )
  };
}

function App() {
  const [count, setCount] = useState(0)
  const basePerkExtraWorld = {
    id: "base-extra-world",
    title: "Extra World",
    cost: -2,
    repeatable: true,
    content: (
      <>
      <p>This perk can be taken multiple times. For Pioneers and Scions, it costs 2 points the first time, and the cost increases by 1 for each subsequent world: 3 the second time, 4 the third time, and so on. For Wanderers, it always costs 2.</p>
      <p>Using this perk, you can connect to a new world; if the world is in your starting pool and you are spending your starting points on it during your initial build, you can connect to that world and take perks in it before ever traveling there, but once your initial build ends and you begin gaining points over time, further purchases of Extra World must be made while standing in the world you intend to connect to.</p>
      </>
    )
  };
  const basePerkScrying = {
    id: "base-scrying",
    title: "Scrying",
    cost: -1,
    content: (<p>You may look before you leap, projecting your will across a bridge to see what's on the other side. You can move your point of view, but not quickly. You can also scry on a Conduit in the world that the bridge connects to, if you know them. However, if they also have Scrying they will detect your attention and be able to look back at you. You can also use Scrying to gain points in a world, though at a massively reduced rate.</p>)
  };
  const basePerkCalling = {
    id: "base-calling",
    title: "Calling",
    cost: -1,
    prereqs: [basePerkScrying],
    content: (<p>While scrying, you can speak through the connection, and you may grasp someone or something on the other side, pulling them through the bridge (as long as they are at one) to join you. You may also shove things through the bridge. Having this perk allows you to be immune to its use by others.</p>)
  };
  const basePerkOutpostBuilding = {
    id: "base-outpost-building",
    title: "Outpost Building",
    cost: -2,
    content: (
    <>
    <p>The very essence of a world is within your grasp. At any bridge to a world where you have taken an Outpost perk, you can spend an hour's hard spiritual labor to pull some of the essence of that world through the bridge and establish an Outpost of the type described by that perk; depending on the details of the perk, you may also need to build some of the infrastructure manually. Once established, the Outpost expands to cover an area whose size scales based on points spent in that world, and it effectively spans both ends of the bridge to exist in both worlds at once. Points gained from time spent in an Outpost count as points gained in the host world, but can be spent in the world the Outpost was drawn from as well.</p>
    <p>If the bridge an Outpost was built on is destroyed, the Outpost will collapse, losing its connection to the other world and in some cases also physically disintegrating.</p>
    </>
    )
  };
  const basePerkBridgeFinding = {
    id: "base-bridge-finding",
    title: "Bridge Finding",
    cost: -1,
    content: (
    <>
    <p>You can detect all kinds of bridges, not just the ones leading to worlds you're connected to. In addition to the worlds you're connected to, you always know the location of the nearest bridge leading to a world you haven't connected to. You also detect bridges and Outposts within some distance of you, proportionate to your points spent in general perks.</p>
    <p>This perk is free for Wanderers.</p>
    </>
    )
  };
  const basePerkBridgeBuilding = {
    id: "base-bridge-building",
    title: "Bridge Building",
    cost: -2,
    content: (<p>When you are in a world you're connected to, you can spend about a week of hard spiritual labor building a bridge to any other world you're connected to. This work is most efficiently done in blocks of 12h a day for 8 days, but shorter blocks and longer breaks are both feasible. Your partial bridge will start to decay if you leave it untouched for a full year. With an additional hour of work, you can aim the far end of the bridge at any location you're familiar with in the other world; you must have visited the target location in the past year, and should be at least as familiar as you would be if you'd lived there for a week. Conduits with this perk can always build a bridge to the world they're Crowned in, no matter where they are.</p>)
  };
  const basePerkSoftContact = {
    id: "base-soft-contact",
    title: "Soft Contact",
    cost: -2,
    content: (<p>Normally, Conduits can sense each other's connections to their various worlds, letting them pick other Conduits out of a crowd with ease. This perk allows you to choose which of your connected worlds are visible to this sense and which are hidden. If you conceal all of them, Conduit senses alone will be unable to distinguish you from a non-Conduit - though your connections can also cause mundanely visible changes which this perk does nothing about.</p>)
  };
  const basePerkHiddenBridges = {
    id: "base-hidden-bridges",
    title: "Hidden Bridges",
    cost: -2,
    prereqs: [basePerkSoftContact, basePerkBridgeBuilding],
    content: (<p>With this perk, you can permanently conceal a bridge to both Conduit senses and mundane scrutiny. These bridges are no longer visible to a Conduit's senses, and so you must know where they are to use them. They also no longer have any effect on the landscape around them, as the connection doesn't leak through. This concealment can be undone by establishing an Outpost, but otherwise lasts until the bridge fades naturally.</p>)
  };
  const basePerkImmutable = {
    id: "base-immutable",
    title: "Immutable",
    cost: -2,
    repeatable: true,
    content: (<p>As a Conduit connects more deeply to a world, it changes them: mental changes that take effort and dedication to resist, and physical changes that can only be mitigated using other powers. When you take this perk, choose one world you're connected to. You gain full control over the changes caused by your investment in that world, and can suppress or permit them at will. You can take this perk once per world.</p>)
  };
  const basePerkGatewayBasis = {
    id: "base-gateway-basis",
    title: "Gateway Basis",
    cost: -2,
    content: (<p>While Conduits can traverse worlds readily, nobody else can, and even Conduits have limits. A gateway changes that. This perk allows you to establish individual Gateways using the repeatable <ShallowPerkLink pid="base-gateway-investiture" ptitle="Gateway Investiture" /> perk.</p>)
  };
  const basePerkGatewayInvestiture = {
    id: "base-gateway-investiture",
    title: "Gateway Investiture",
    cost: -1,
    prereqs: [basePerkGatewayBasis],
    repeatable: true,
    content: (
    <>
    <p>At any bridge to a world where you have taken a Gateway perk, you can construct a Gateway according to that perk's specifications, consecrate it with a drop of Conduit blood, and activate it using this perk. If you choose, while constructing the Gateway, you can also establish a "key": a specific condition that controls passage, such as "the Gateway only opens at certain times of day" or "only those carrying a certain item may pass". A Gateway may have only one key condition, and it must be concrete and simple: "only descendants of this individual may pass" works, but "only those loyal to this individual may pass" does not.</p>
    <p>This perk is free for Pioneers.</p>
    </>
    )
  };
  const basePerkWarlocksFealty = {
    id: "base-warlocks-fealty",
    title: "Warlock's Fealty",
    cost: -1,
    types: ['Minion'],
    repeatable: true,
    content: (
    <>
    <p>You grant some being a fraction of your power, allowing them to become a Warlock in your service. They become connected to one world that you are connected to, and you can grant them up to 5 points of perks you already have, or up to 10 points if you're a Scion. If you have Scrying, you can use it on them whenever you want, and you may revoke their boon with a thought. At any time, you can have as many Warlocks as the number of times you've bought this perk. Warlocks cannot gain or spend points independently, only through you.</p>
    <p>Conduits and Least Conduits cannot be Warlocks. If a Warlock becomes a Conduit or Least Conduit, the Warlock bond breaks.</p>
    </>
    )
  };
  const basePerkInductionBasis = {
    id: "base-induction-basis",
    title: "Induction Basis",
    cost: -4,
    content: (<p>This perk allows you to bestow a connection to one of your worlds on any suitable being using the repeatable <ShallowPerkLink pid="base-induction-investiture" ptitle="Induction Investiture" /> perk.</p>)
  };
  const basePerkInductionInvestiture = {
    id: "base-induction-investiture",
    title: "Induction Investiture",
    cost: -1,
    prereqs: [basePerkInductionBasis],
    repeatable: true,
    content: (<p>With a few minutes of spiritual labor focused on a nearby recipient, grant them a connection to any one of your worlds that they are not already connected to. A Conduit recipient gains nothing more, except that if they were already connected to that world, the points they paid for that connection are freed from their point gain total. A non-Conduit recipient will become a Least Conduit, and a Least Conduit recipient may become a full Conduit if this is their fifth connection. You have no further control of or connection to them once you make this investiture.</p>)
  };
  const basePerkSynergy = {
    id: "base-synergy",
    title: "Synergy",
    cost: -1,
    repeatable: true,
    content: (
    <>
    <p>The powers of different worlds are mostly separate, but a Conduit can overcome this to reach new heights. Choose any two perks you have, and create a perk that combines them. The specifics of the combination depend on the perks being combined, and it's up to you to find combinations that make sense, but as long as you're satisfied with the logic of your combinations you can definitely create powers this way that would not otherwise be possible. Perks created by Synergy can be used in further combinations.</p>
    <p>A Synergy between low-cost perks with few prerequisites tends to be a fairly straightforward synthesis of its parents, but the higher the total of points across a Synergy's ancestor perks, the more ambitiously it can build on them; likewise, the more different worlds represented in a Synergy's family tree, the more powerful it can become. Synergies between perks of a single world are invariably less powerful than Extensions built on those same perks.</p>
    </>
    )
  };
  const basePerkExtension = {
    id: "base-extension",
    title: "Extension",
    cost: -1,
    repeatable: true,
    content: (
    <>
    <p>By drawing on the unified essence of a world whose Crown you hold, you can create additional perks in that world. You must have taken all of its original perks (totaling 25 points spent) in order to do this. You may create any number of new perks, but each time you create one, you must spend a number of points equal to its cost - taking Extension three times to make a 3-point perk, and then twice to make a 2-point perk, for example. If you try to create a perk while you don't have enough points to pay for it, the process will fail without spending the points, and you can try again later. Perks you create this way can require other perks from the same world, including others you have created.</p>
    <p>Your Warlocks can purchase perks you create, but other Conduits cannot until granted access by a brief personal ritual. The ritual may be performed by anyone with the perk.</p>
    </>
    )
  }
  const basePerkGenesisSeed = {
    id: "base-genesis-seed",
    title: "Genesis Seed",
    cost: -2,
    prereqs: [basePerkExtraWorld],
    repeatable: true,
    content: (<p>Your time as a Conduit has imbued you with the stuff of many disparate worlds, each more unique than the last. And yet none of them are perfect. You may crystallize that dissatisfaction into a Genesis Seed, which holds the potential for the creation of a new world, and allows you to connect to that world once you create it. Each <ShallowPerkLink pid="base-genesis-investiture" ptitle="Genesis Investiture" /> requires its own separate Genesis Seed.</p>)
  }
  const basePerkGenesisInvestiture = {
    id: "base-genesis-investiture",
    title: "Genesis Investiture",
    cost: -98,
    prereqs: [basePerkGenesisSeed],
    repeatable: true,
    content: (
      <>
      <p>By investing an incredible amount of time and effort, you can create an entirely new world from scratch. Its nature is influenced by the perks you have taken in other worlds, but you have a substantial amount of freedom determining what form it takes. Once it's created, you have no more influence over it than any other Conduit.</p>
      <p>In the moment of creating a world, you may choose to take its Crown. This Crown replaces any previous Crown you may have had, and is the only way a Conduit may give up a Crown. It costs no points.</p>
      <p>For each world a Wanderer is connected to, they pay 5 fewer points to create one.</p>
      </>
    )
  }
  const basePerks = [
    basePerkExtraWorld, basePerkScrying, basePerkCalling, basePerkOutpostBuilding, basePerkBridgeFinding,
    basePerkBridgeBuilding, basePerkSoftContact, basePerkHiddenBridges, basePerkImmutable, basePerkGatewayBasis,
    basePerkGatewayInvestiture, basePerkWarlocksFealty, basePerkInductionBasis, basePerkInductionInvestiture,
    basePerkSynergy, basePerkExtension, basePerkGenesisSeed, basePerkGenesisInvestiture
  ];
  const drawbackHardJumps = {
    id: "drawback-hard-jumps",
    title: "Hard Jumps",
    cost: 2,
    content: (
      <p>Passing through a bridge is a struggle for you. You must spend several minutes of careful focus, mentally scrabbling through the extradimensional contact between worlds. You still appear to vanish instantly, but that instant comes after a period of apparent meditation or distress as you dedicate your whole attention to the attempt. If you lose focus, you will lose purchase and all progress on the jump.</p>
    )
  }
  const drawbackCorrosiveContact = {
    id: "drawback-corrosive-contact",
    title: "Corrosive Contact",
    cost: 2,
    content: (
      <p>When you pass through a bridge, you shove yourself forcefully, your essence blowing through and degrading the boundaries between the worlds. Different from an Outpost, this is not controlled, but instead it intensifies the effects of a bridge dramatically. The chaotic and unplanned effects of a foreign world often wreak havoc on everyone and everything near a bridge, though how exactly depends on the world.</p>
    )
  }
  const drawbackTethered = {
    id: "drawback-tethered",
    title: "Tethered",
    cost: 2,
    content: (
      <p>To be a Conduit is to be a sentient part of a world, and you may find that the worlds you connect to pull on your very soul. You are obligated to spend a substantial portion of your time in each world you're bound to. If you spend more time out of a world than in it, you really start to miss it, and if you get near enough to a bridge, you'll fall through automatically. How near is "near enough" increases the longer you're away, and you can end up going through a bridge beyond its normal range.</p>
    )
  }
  const drawbackAlien = {
    id: "drawback-alien",
    title: "Alien",
    cost: 2,
    content: (
      <p>You are stretched between worlds and no longer truly native to any of them. You do not truly feel comfortable in worlds that you're new to, and the natives don't feel comfortable with you either. They are far more hostile to you, and will be hostile. This applies only to worlds that you are new to, however. Once you've spent 5 points in a world, the effects of this drawback cease for that world only.</p>
    )
  }
  const drawbackDistant = {
    id: "drawback-distant",
    title: "Distant",
    cost: 2,
    content: (
      <p>Foreign worlds stifle and diminish you. It takes twice as long to build a bridge, Outpost, or Gateway in any world you're not connected to, and spending time in worlds you're not connected to is uncomfortable and draining; you become gradually more tired, sluggish, and irritable, to the point of being significantly clumsier in the use of your body and powers after a few days. A day's rest in a world you're connected to will fully restore you from this state.</p>
    )
  }
  const drawbackShortage = {
    id: "drawback-shortage",
    title: "Shortage",
    cost: 1,
    content: (<p>Your Material perks give half as much volume. Wanderers cannot take this drawback.</p>)
  }
  const drawbackCostOverrun = {
    id: "drawback-cost-overrun",
    title: "Cost Overrun",
    cost: 1,
    content: (<p>Your Outposts cover half as much area, and you cannot key your Gateways. Pioneers cannot take this drawback.</p>)
  }
  const drawbackDisorganization = {
    id: "drawback-disorganization",
    title: "Disorganization",
    cost: 1,
    content: (<p>Your Minion limits are halved. Scions cannot take this drawback.</p>)
  }
  const drawbackLivingBridge = {
    id: "drawback-living-bridge",
    title: "Living Bridge",
    cost: 1,
    repeatable: true,
    content: (<p>You may take this once per world you connect to, at any of three opportunities: (1) when you connect to that world for the first time, (2) the first time you enter the world, if you connected to it beforehand, or (3) when you spend your 20th point in the world. You will carry with you a tangible aura of that world, as though you were an open bridge to it. If you have <PerkLink perk={basePerkSoftContact} />, you may no longer conceal your connection to that world from Conduit senses, but the extra control granted by <PerkLink perk={basePerkSoftContact} /> allows you to mitigate your aura considerably, down to a minimum of one subtle physical effect.</p>)
  }
  const drawbacks = [
    drawbackHardJumps, drawbackCorrosiveContact, drawbackTethered, drawbackAlien, drawbackDistant, drawbackShortage,
    drawbackCostOverrun, drawbackDisorganization, drawbackLivingBridge
  ]
  const earthlessInheritance = {
    id: "earthless-inheritance",
    title: "Inheritance",
    cost: -2,
    content: (<p>Upon your true death, when all of your methods of immortality are destroyed or bypassed, the essence of your Conduit awakening still persists. It passes to your heir, either one you've specifically designated or someone who matches what your preferences and intentions would be. They are awakened much as you were. Furthermore, for every world that you had 25 points in, an additional heir awakens as a Least Conduit.</p>)
  }
  const earthlessTongues = {
    id: "earthless-tongues",
    title: "Tongues",
    cost: -1,
    content: (<p>Many Conduits find that their connection to other worlds includes a supernatural gift with languages. You can become conversational in a language in weeks or days, if immersed in the language, and after a year or two you will be indistinguishable from a native. You can even decode dead languages, though it remains a long and arduous process.</p>)
  }
  const earthlessNomad = {
    id: "earthless-nomad",
    title: "Nomad",
    cost: -2,
    content: (<p>The key ability of a Conduit is to travel between worlds. Through extensive practice, you have developed this ability. With just a minute of mental preparations, you can jump to any world directly reachable from the one you're standing in. You can land anywhere near the far end of the closest bridge to that world, within a range of as many miles as your total points spent in both worlds.</p>)
  }
  const earthlessShipping = {
    id: "earthless-shipping",
    title: "Shipping",
    cost: -2,
    prereqs: [earthlessNomad],
    content: (<p>You are no longer limited by what you can personally carry across a bridge; you can now cross a bridge with a vehicle, bringing along all its contents and passengers. The maximum size of the vehicle is three cubic meters per world you are connected to.</p>)
  }
  const earthlessTeleport = {
    id: "earthless-teleport",
    title: "Teleport",
    cost: -2,
    prereqs: [earthlessNomad],
    content: (<p>Instead of jumping between worlds, you can jump within them. You essentially begin to jump, but then jump back, pushing against the boundaries between worlds; this takes about one second of focus. You can jump to a bridge as with <PerkLink perk={earthlessNomad} />, but land on the same side you're jumping from; your inner bridge to your Bevin counts. If you try to land farther from your target bridge than the number of miles equal to your points spent on both sides of that bridge, your precision suffers. If you're jumping directly into a dangerous situation, you feel a sense of dread allowing you to abort or redirect.</p>)
  }
  const earthless = [
    earthlessInheritance, earthlessTongues, earthlessNomad, earthlessShipping, earthlessTeleport
  ]

  const earthInheritance = {
    id: "earth-inheritance",
    title: "Inheritance",
    cost: -2,
    content: (<p>Upon your true death, when all of your methods of immortality are destroyed or bypassed, the essence of your Conduit awakening still persists. It passes to your heir, either one you've specifically designated or someone who matches what your preferences and intentions would be. They are awakened much as you were. Furthermore, for every world that you had 25 points in, an additional heir awakens as a Least Conduit. Least Conduits may also take this ability, but it is rare for their heirs to be full Conduits.</p>)
  }
  const earthTongues = {
    id: "earth-tongues",
    title: "Tongues",
    cost: -1,
    content: (<p>Many Conduits find that their connection to other worlds includes a supernatural gift with languages. You can become conversational in a language in weeks or days, if immersed in the language, and after a year or two you will be indistinguishable from a native. You can even decode dead languages, though it remains a long and arduous process.</p>)
  }
  const earthShow = {
    id: "earth-show",
    title: "Show",
    cost: -1,
    prereqs: [earthTongues],
    content: (<p>Laying your hand on another person, you bestow on them a vision. The source is your mind, and they see your memories, your thoughts, or whatever you imagine. This appears to them just as it appears to you, removing most barriers to understanding. They may not agree, but they will certainly understand what you mean; your point of view will be clear to them. Most find it a quite personal and even spiritual experience.</p>)
  }
  const earthTeach = {
    id: "earth-teach",
    title: "Teach",
    cost: -2,
    prereqs: [earthShow, earthInheritance],
    content: (<p>Not only your thoughts but your experiences, your knowledge and your skills can be transmitted. This is a deeper level of knowledge, the kind that is ingrained and that is remembered. Passing on these skills likely still takes time, but far less than if they had to experience everything you experienced, and in the end, their ability can nearly match yours, should you choose to give them access to all of your relevant skills.</p>)
  }
  const earthAuthority = {
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
  const earthIsolation = {
    id: "earth-isolation",
    title: "Isolation",
    cost: -2,
    prereqs: [earthSovereign],
    content: (<p>The entire world is your kingdom, the mortal governments simply the crops and livestock you allow to live. That's why you must fence this world off. With a great ritual that takes months, you attach yourself to the world so tightly that you can prevent all natural bridges from forming. It would be wise to either have <PerkLink perk={basePerkBridgeBuilding} /> or a Gateway to allow yourself to leave, but if you don't, it is possible to undo this action.</p>)
  }
  const earthFacade = {
    id: "earth-facade",
    title: "Facade",
    cost: -1,
    content: (<p>Connections to other worlds may change you, but you are still human. Or at least, you can seem so. It takes a few minutes to assemble your facade of normal humanity, and other than a Conduit, nobody can see through it. Of course, the changes in your appearance that you are cloaking are tied to the function of your abilities as a Conduit. If you use the parts that are apparently changed, the illusion shatters.</p>)
  }
  const earthAnonymous = {
    id: "earth-anonymous",
    title: "Anonymous",
    cost: -1,
    prereqs: [earthFacade],
    content: (<p>Fame is inconvenient. It may be useful, but you can't get away from it. Thus, you can instead channel a bit of your alien nature to let the attention of others slide off you as water off a duck. Even among a crowd of fanatics, you can walk freely and do as you please. This power is not absolute, and if you do things that stand out people may still notice you, but if the things you do are not supernatural in nature they are much less likely to associate it with your identity as a Conduit.</p>)
  }
  const earthDisguise = {
    id: "earth-disguise",
    title: "Disguise",
    cost: -2,
    prereqs: [earthFacade],
    content: (<p>The facade of humanity is the appearance of a human, and with skill it can be shaped. You can sculpt your apparent appearance anywhere within the human limits, and can also decide to include specific aspects of your own appearance in case you want to keep some of the bits that show the influence of other worlds. You can even sculpt an appearance that resembles a specific other person, though learning to act as them still requires practice.</p>)
  }
  const earthNomad = {
    id: "earth-nomad",
    title: "Nomad",
    cost: -2,
    content: (<p>The key ability of a Conduit is to travel between worlds, an outgrowth of the ability to travel the Earth. Moving about the Infinite Earths with ease, you find your way between worlds becoming easier as well. With just a minute of mental preparations, you can jump to any world directly reachable from the one you're standing in. You can land anywhere near the far end of the closest bridge to that world, within a range of as many miles as your total points spent in both worlds.</p>)
  }
  const earthShipping = {
    id: "earth-shipping",
    title: "Shipping",
    cost: -2,
    prereqs: [earthNomad],
    content: (<p>You are no longer limited by what you can personally carry across a bridge; you can now cross a bridge with a vehicle, bringing along all its contents and passengers. The maximum size of the vehicle is two thousand cubic meters per point spent on Earth.</p>)
  }
  const earthCaravan = {
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
    cost: -2,
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
  const bevinFireAndWater = {
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
  const bevinLibrary = {
    id: "bevin-library",
    title: "Library",
    cost: -1,
    content: (<p>Halls of shelving run through your Bevin, stocked with books that somehow found their way there from musty galleries and museums, deserted manors, and libraries long-since burnt. Any writings on worlds you're connected to can find their way here, but they tend to be those of interest to you. You also find your reading speed and comprehension increased, and your writing takes on a calligraphic elegance, while your voice softens and begins to sound quieter, even when amplified.</p>)
  }
  const bevinCorrespondence = {
    id: "bevin-correspondence",
    title: "Correspondence",
    cost: -1,
    prereqs: [bevinLibrary],
    content: (<p>Books published from other Bevins appear on your Library shelves, and you can publish your own writings too, simply by setting them in a certain specific desk drawer in your new library halls. You can address books or letters to anyone whose name you know. If they are connected to or in a Bevin, whether they are the Conduit or otherwise, the letter will appear on a desk in that Bevin for them.</p>)
  }
  const bevinPenmanship = {
    id: "bevin-penmanship",
    title: "Penmanship",
    cost: -1,
    prereqs: [bevinLibrary],
    content: (<p>You develop a keen intuition for how best to express yourself in writing. Your vocabulary increases faster; any word you have read is one you know just how to use. As you get to know an audience, your intuition extends to understanding how to adjust your words to account for their perspective; the more audiences you feel out in this way, the faster you get to know each new one. Your handwriting also improves, gaining precision, speed, and grace, and your pen never slips or drips without your permission. The tips of your fingers pick up persistent ink stains.</p>)
  }
  const bevinGhostwriting = {
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
  const bevinEntangledSystems = {
    id: "bevin-entangled-systems",
    title: "Entangled Systems",
    cost: -2,
    prereqs: [bevinLibrary],
    content: (<p>The desk in your library now has a drawer filled with plain silver hand mirrors, five for each point spent in Bevin. Plant one near a library or archive to view and copy nearby published writings at will, using the master mirror that fits in a slot at the back of your desk. Give one to a friend to allow easy trade of books and letters. In worlds with complex information networks, the mirrors will find a way to connect. The master mirror can recall or restore any lost or broken mirrors.</p>)
  }
  const bevinWindows = {
    id: "bevin-windows",
    title: "Windows",
    cost: -1,
    prereqs: [bevinEntangledSystems],
    content: (<p>Large square tiles appear in a slot by your desk, in matched pairs. They appear black and smooth as obsidian when not in use. You can put one of each pair anywhere in any world you are connected to, so long as it is firmly attached to a solid surface with the back side entirely fast. The other half, likewise, must be mounted firmly onto the wall of your Bevin. Once you've done so, the one affixed in the Bevin shows the view out through its partner. The windows are very durable, but if destroyed the connection is broken. They cannot be opened. You have one pair of windows per point spent in Bevin.</p>)
  }
  const bevinGuest = {
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
  const bevinKeysToTheKingdom = {
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
  const bevinOmniscience = {
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
        <p>Every ten years, if you don't use your <PerkLink perk={bevinRebirth} />, the egg instead cracks open to reveal a pearl. This pearl is the seed of a new Bevin. It can increase an existing Bevin's size substantially, but is of even greater value to someone without one: it grants a connection to Bevin, exactly the same as a connection granted by <PerkLink perk={basePerkInductionInvestiture} />, but without the point cost or prerequisites.</p>
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
        <p>The bridge to a Bevin is part of its Conduit, carried with them wherever they travel. When a Conduit enters their Bevin through this bridge, they leave one end of the bridge behind; while inside their Bevin, they may keep the other end with them, or leave it in the entry hall where they arrived. These temporary bridges are subtle, carrying only a faint sense of peace, comfort, and rest. With <PerkLink perk={drawbackLivingBridge} />, both the Conduit and their temporary bridges also regularize nearby temperatures, increase the legibility of nearby texts, and gradually drain nearby mineral deposits to fuel the Bevin's growth.</p>
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
  const baseWorlds: readonly World[] = [
    worldEarth, worldBevin
  ]

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <>
        <p>It began with dreams. They hardly seemed notable at first, except perhaps to a psychologist, but you dreamed every night of a strange foreign world. Then, the bridges began to open. The effects were subtle at first, slight changes in a few areas that could have been attributed to normal causes. Then things started coming through. Some of those things were around you, but just when things got strangest, you awakened, taking on the mantle of a Conduit.</p>
        <p>You are now the living connection between the world of your birth and another world, one bound more indelibly to your soul. You are one of a new generation, the first in thousands of years, and you have the power, should you wish it, to change the fate of multiple worlds.</p>
        </>
      ),
      children: [
        {
          id: "intro-conduit-types",
          title: "Conduit Types",
          content: (
            <dl>
              <dt>Wanderer</dt>
              <dd>
                Wanderers are the most free of all Conduits, traveling easily between countless worlds. Wanderers can't spend more than 20 points on perks from any one world, and no Wanderer may ever wear a Crown. Wanderers receive twice as much volume from their Material perks.
              </dd>
              <dt>Pioneer</dt>
              <dd>
                The most common connection to other worlds is also the most versatile, able to attain a Crown only through great effort and accomplishment (spending 20 points in the world) yet still fully able to invest deeply in multiple worlds. A Pioneer may discover and reach new worlds, but each one takes additional effort, and they must overcome the dangers and hardships of the world. However, Pioneers are the best at building infrastructure, creating Gateways with ease, and their Outpost perks affect twice as much area.
              </dd>
              <dt>Scion</dt>
              <dd>
                A Scion is the heir of a single world, though they may travel to others. When they first receive the mantle of a Conduit and connect to an alien world, they receive that world's Crown in the same moment. They are also great leaders, whose Minions gain a 10% increase in general physical and mental functioning from being associated with a Scion, and in their Crowned world they can have an unlimited number of Minions. Furthermore, their biological children are always Least Scions. Scions are limited in their connection to foreign worlds, and can only spend a maximum of 20 points per world outside the world whose Crown they hold.
              </dd>
            </dl>
          ),
        },
        {
          id: "intro-bridges",
          title: "Bridges",
          content: (
            <>
            <p>The uncountable worlds spin through the endless void, touching each other unpredictably at points where the fabric of reality begins to wear through from sympathy and friction. Now, this has come to a head. Conduits have awakened and bridges have opened. A bridge creates effects on both sides that mirror the world it connects to, letting a bit of the substance and essence of that other place bleed through. The bridge itself is invisible to mundane eyes.</p>
            <p>A bridge can only be formed between two worlds, never between two places in the same world.</p>
            <p>Bridges to a world a Conduit is connected to are always clear to their senses, and if they focus on one of their connected worlds, they can point unerringly to the nearest bridge that leads there.</p>
            <p>Bridges always connect only to specific places or structures, and tend to destabilize if their environment moves or changes significantly. When a bridge fades, another one will often form nearby.</p>
            <p>Natural bridges form most easily between worlds connected by Conduits; when a Conduit first awakens, bridges will form connecting their Earth to their pool of starting worlds, and over time, bridges will begin to form directly between their connected worlds.</p>
            <p>While at a bridge, a Conduit can walk it, traversing the distance between the worlds with little thought or effort. They can take with them anything they are wearing, holding, or carrying. Although a Conduit can carry living things across a bridge, passengers carried this way may be harmed by direct exposure to planar energies.</p>
            </>
          ),
        },
        {
          id: "intro-worlds",
          title: "Worlds",
          content: (
            <>
            <p>A naturally awakened Conduit begins with access to three worlds: their world of origin, usually Earth; their initial world, which may be any other; and their Bevin, a gift from a Conduit of the distant past. You also begin with <b>25 starting points</b>. Each point represents a general degree to which Conduits align themselves with a world. Those first 25 come to you in a unique and personal way, perhaps in an instant or perhaps over a period of time, though seldom more than a month. Some Conduits might receive theirs in a dream, some from rapid learning or a fortuitous encounter, and others for no clear reason at all. You can choose your world of origin or Bevin to be your initial world, and if you wish to be their Scion, you must; if you do, take the Close to Home drawback.</p>
            <p>The maximum number of worlds that a Conduit can have available to spend their starting points on, including their world of origin, Bevin, and initial world, is twelve. This starting pool of worlds represents all the worlds with natural bridges to the Conduit's Earth formed during the Conduit's awakening. Other worlds must be discovered later, through exploration or the assistance of other Conduits.</p>
            <p>Subsequent points are gained over time spent in worlds. Most Conduits accrue approximately one per year spent in a world; they are an abstraction representing the Conduit's attunement to the world, and so can only be spent in the same world where they were gained, or on Base perks which exist outside of individual worlds.</p>
            <p>For each 25 points gained in this way, the cost of further points increases: the first 25 cost one year each, the next 25 cost two years, then four, then eight, and so on. Points being saved up or spent on perks contribute towards that total, but points permanently invested outside the Conduit (using an Investiture base perk) are freed up and no longer count towards the slowing of further point gain. Points gained by taking drawbacks don't count toward the total, but points spent to recoup drawbacks do.</p>
            <p>Time spent in a world that a Conduit is not connected to still becomes points, but those points are invested automatically toward connecting to that world. Once enough time is spent that the connection is fully paid for, the Conduit can choose not to connect, but will feel an increasing pressure toward that connection the longer they spend in the world afterward, and will gain no more points in that world until they allow the connection to form, as the energy that would have become points is consumed by the blocked connection.</p>
            </>
          ),
        },
        {
          id: "intro-crowns",
          title: "Crowns",
          content: (
            <>
            <p>A Crown is a deep connection between a Conduit and one specific world, which unlocks powers not otherwise available. You may only have one Crown at a time, and under normal circumstances cannot give up a Crown to choose another. Scions receive theirs immediately, for free, from the first world they connect to. Pioneers must pay 5 points to get one, and only after spending 20 points on other perks in that world. (Points spent on a Crown do not count toward the total of points spent in a world.) Wanderers do not get Crowns.</p>
            <p>If a Conduit finds themselves Crowned in a world where they have not yet spent 20 points on perks, they may only spend points earned in that world on perks in that world until they reach 20 points spent there. Although the state of imbalance caused by insufficient investment in one's Crowned world is not harmful in itself, holding back points that could be spent to resolve it becomes increasingly uncomfortable over time, and the Crown's powers will be weaker until the full 20 points are spent.</p>
            </>
          ),
        },
        {
          id: "intro-least-conduits",
          title: "Least Conduits",
          content: (
            <>
            <p>A Least Conduit is an intermediate step between a non-Conduit and a full Conduit. They have a limited number of connections to worlds, and cannot gain more except from outside sources, such as a Conduit using Induction Investiture. A non-Conduit receiving an Induction Investiture becomes a Least Conduit as they gain their first connection to a world.</p>
            <p>Each time a Least Conduit gains a connection to a world, they begin with three starting points in that world, and can then gain further points from time spent in that world, up to a per-world cap of 15. A Least Conduit can never spend points on base perks, only on perks in their connected worlds.</p>
            <p>A Scion's children are always Least Conduits for free, and have the same Crown as their parent; they gain the ability to spend points as they mature, usually around age ten. One with multiple Scion parents will choose between their Crowns at that time, defaulting to whichever is most personally resonant, and retaining a connection to every world whose Crown they could have chosen. Other Least Conduits cannot be Crowned.</p>
            <p>When a Least Conduit already connected to four worlds gains a connection to a fifth, they gain three starting points in that world as usual, but then become a full Conduit, awakening over the course of several days. The type of Conduit they become is determined as follows: if they inherited a Crown from a Scion parent, they must become a Scion. If any other Conduit has connected them to the world in which that Conduit is Crowned, they may choose to become a Scion and inherit that Crown, potentially displacing a Crown inherited from a Scion parent. If they do not inherit a Crown, they will become a Pioneer if one of the worlds they are connected to is their world of origin, and a Wanderer otherwise.</p>
            <p>Both the transformation from non-Conduit to Least Conduit and from Least Conduit to full Conduit tend to be unbinding in nature, freeing the nascent Least Conduit or Conduit from effects that constrain their mind and choices. Although it is possible to use Induction Investiture to connect a Minion to a world and thereby make them a Least Conduit, their Minion bond is likely to be disrupted, freeing them from enforced loyalty to their Conduit; and likewise, a Least Conduit under a Minion bond who becomes a full Conduit will almost certainly lose the Minion bond in the process. These bonds can be restored the same way any other Least Conduit or Conduit could be bonded as a Minion: difficult but possible, especially with their cooperation.</p>
            </>
          ),
        },
        {
          id: "intro-perk-types",
          title: "Perk Types",
          content: (
            <dl>
              <dt><PerkTypeIdentifier perkType='Infusion' /></dt>
              <dd>These are perks which have some tangible effect on the nature or processes of the body. Although the Infusions of different worlds are often not explicitly designed to be compatible, when combined in a single Conduit they always find some way to get along, informed by the Conduit's own nature as well as the natures of the worlds involved. Creating a Synergy between two Infusions is therefore never necessary just in order to synthesize them into a useful and interesting result, but can be very powerful when building on the base created by the existing synthesis.</dd>
              <dt><PerkTypeIdentifier perkType='Material' /></dt>
              <dd>These are perks which provide ongoing access to some tangible resource. It's usually necessary to visit the world in question to harvest the resource, but individual perks and worlds may vary, and many resources are harvestable at bridges or Outposts.</dd>
              <dt><PerkTypeIdentifier perkType='Minion' /></dt>
              <dd>
                <p>These are perks which provide companions or subordinates with the capacity for independent action. Minions are always loyal to the Conduit, though the exact form of that loyalty may vary from world to world and perk to perk.</p>
                <p>When a Conduit bonds to a Minion, the bond routes through the world whose perk granted that Minion. When gaining a Minion with a Synergy perk, the Conduit can choose which of the perk's parent worlds to route the bond through. Once a bond is set, it cannot be moved between worlds except by using applicable perks, for example Converts (but not Eyeless) to shift a Minion to the Prison, or Assimilation (but not Binding) to shift a Minion to the Rim. The Minions themselves can travel freely without affecting their bonds.</p>
                <p>In general, the maximum number of Minion bonds that a Conduit can sustain through a single world is 50, or 200 with a Crown; some perks allow organizing Minions into hierarchies, and in that case each supervisor Minion can sustain 50 or 200 subordinate Minions as appropriate. Specific Minion perks may have other effects on Minion caps. Warlock bonds are direct to the Conduit and do not count toward Minion caps.</p>
                <p>If a Conduit finds themselves with more Minion bonds in a world than they can sustain, they keep all their Minions, but can't gain more in that world until they have room.</p>
                <p>A Scion has no limit on Minion bonds in their Crowned world, and can form their Minions in any world into hierarchies even without a Minion hierarchy perk.</p>
              </dd>
              <dt><PerkTypeIdentifier perkType='Outpost' /></dt>
              <dd>These are perks which provide the ability to create whatever infrastructure is associated with a world's Outposts. Each world is different, but an Outpost usually consists of a significant piece of territory or a useful structure. The perk by itself only creates the infrastructure, and can be used without the <PerkLink perk={basePerkOutpostBuilding} /> base perk; but by combining a world's Outpost perk with the <PerkLink perk={basePerkOutpostBuilding} /> base perk, a Conduit can create an Outpost at a bridge to that world.</dd>
              <dt><PerkTypeIdentifier perkType='Gateway' /></dt>
              <dd>
                <p>These are perks which provide the ability to create whatever mechanism is associated with a world's Gateways. Each world is different, but Gateway perks often provide some kind of fast travel ability even outside of their use in creating stable portals between worlds. The perk by itself only does as its description says, and can be used without the Gateway base perks; but by combining a world's Gateway perk with a <PerkLink perk={basePerkGatewayInvestiture} />, a Conduit can create a Gateway at a bridge to that world.</p>
                <p>Although some Gateways may provide the appearance of something being partly in one world and partly in another, every Gateway is built on a bridge and anything that crosses a Gateway always passes fully through the bridge between leaving one world and entering another. The bridge translates between worlds, allowing travelers and cargo to safely cross between worlds where physics, magic, or the flow of time itself may differ.</p>
              </dd>
              <dt><PerkTypeIdentifier perkType='Immortality' /></dt>
              <dd>These are perks which provide some means of cheating death. You may have any number of these, but only one resurrection method will be active at a time. You may choose the order in which they apply. The first will take effect if possible, and only if it is not able to function will the next occur.</dd>
            </dl>
          ),
        },
      ],
    },
    {
      id: "base-perks",
      title: "Base Perks",
      content: (
        <>
          {basePerks.map((p) => <PerkListing key={p.id} perk={p} />)}
        </>
      ),
    },
    {
      id: "drawbacks",
      title: "Drawbacks",
      content: (<>
          {drawbacks.map((p) => <PerkListing key={p.id} perk={p} />)}
        </>),
    },
    {
      id: "earthless-supplement",
      title: "Earthless Supplement",
      content: (<>
          {earthless.map((p) => <PerkListing key={p.id} perk={p} />)}
        </>),
    },
    {
      id: "worlds",
      title: "Worlds",
      content: (<>(This would be a good place to list connected worlds, with initial world highlighted.)</>),
      children: [
        {
          id: "worldpack-base",
          title: "Base Worlds",
          content: (<>(...)</>),
          children: baseWorlds.map(WorldSection),
        }
      ]
    },
  ];

  return (
    <div id="app-container">
      <nav id="sidebar">
        <TableOfContents sections={sections} />
      </nav>
      <div id="main-panel">
        <h1 id="main-title">VVC Interactive</h1>
        <Contents sections={sections} level={2} />
        <div className="infobox">
          <button onClick={
            () => {
              setCount((count) => count + 1)
            }
          }>
            you have clicked this button {count} times
          </button>
          <p>bottom text</p>
        </div>
      </div>
    </div>
  )
}

export default App
