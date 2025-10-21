import iconInfusion from './assets/icon_infusion.svg'
import iconMaterial from './assets/icon_material.svg'
import iconMinion from './assets/icon_minion.svg'
import iconOutpost from './assets/icon_outpost.svg'
import iconGateway from './assets/icon_gateway.svg'
import iconImmortality from './assets/icon_immortality.svg'
import './perkTypes.css'

export type PerkType = 'Infusion' | 'Material' | 'Minion' | 'Outpost' | 'Gateway' | 'Immortality';

const PERK_TYPE_TO_ICON = {
    Infusion: iconInfusion,
    Material: iconMaterial,
    Minion: iconMinion,
    Outpost: iconOutpost,
    Gateway: iconGateway,
    Immortality: iconImmortality
}

export function PerkTypeIdentifier ({perkType}: {perkType: PerkType}) {
    const classTypeName = `type-${perkType.toLowerCase()}`
    return (
        <span className={classTypeName}>
            <img src={PERK_TYPE_TO_ICON[perkType]} className="type-icon" alt={perkType} />
            {perkType}
        </span>
    );
}
