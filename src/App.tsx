import { useState, Fragment, type JSX, type ReactNode } from 'react'
import { PerkTypeIdentifier } from './perkTypes'
import './App.css'

interface Section {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly children?: readonly Section[];
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

function App() {
  const [count, setCount] = useState(0)
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
          id: "conduit-types",
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
          id: "bridges",
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
          id: "worlds",
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
          id: "crowns",
          title: "Crowns",
          content: (
            <>
            <p>A Crown is a deep connection between a Conduit and one specific world, which unlocks powers not otherwise available. You may only have one Crown at a time, and under normal circumstances cannot give up a Crown to choose another. Scions receive theirs immediately, for free, from the first world they connect to. Pioneers must pay 5 points to get one, and only after spending 20 points on other perks in that world. (Points spent on a Crown do not count toward the total of points spent in a world.) Wanderers do not get Crowns.</p>
            <p>If a Conduit finds themselves Crowned in a world where they have not yet spent 20 points on perks, they may only spend points earned in that world on perks in that world until they reach 20 points spent there. Although the state of imbalance caused by insufficient investment in one's Crowned world is not harmful in itself, holding back points that could be spent to resolve it becomes increasingly uncomfortable over time, and the Crown's powers will be weaker until the full 20 points are spent.</p>
            </>
          ),
        },
        {
          id: "least-conduits",
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
          id: "perk-types",
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
              <dd>These are perks which provide the ability to create whatever infrastructure is associated with a world's Outposts. Each world is different, but an Outpost usually consists of a significant piece of territory or a useful structure. The perk by itself only creates the infrastructure, and can be used without the <span className="perk-mention">Outpost Building</span> base perk; but by combining a world's Outpost perk with the <span className="perk-mention">Outpost Building</span> base perk, a Conduit can create an Outpost at a bridge to that world.</dd>
              <dt><PerkTypeIdentifier perkType='Gateway' /></dt>
              <dd>
                <p>These are perks which provide the ability to create whatever mechanism is associated with a world's Gateways. Each world is different, but Gateway perks often provide some kind of fast travel ability even outside of their use in creating stable portals between worlds. The perk by itself only does as its description says, and can be used without the Gateway base perks; but by combining a world's Gateway perk with a <span className="perk-mention">Gateway Investiture</span>, a Conduit can create a Gateway at a bridge to that world.</p>
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
      content: (<>(...)</>),
    },
    {
      id: "drawbacks",
      title: "Drawbacks",
      content: (<>(...)</>),
    },
    {
      id: "earthless-supplement",
      title: "Earthless Supplement",
      content: (<>(...)</>),
    },{
      id: "worlds",
      title: "Worlds",
      content: (<>(...)</>),
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
