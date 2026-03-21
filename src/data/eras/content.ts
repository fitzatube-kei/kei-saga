import { Era, Period, GameEvent } from '@/types/game';
import { eras as baseEras } from './index';
import { gojoseon } from './gojoseon';
import { samgukEarly } from './samguk-early';
import { samgukLate } from './samguk-late';
import { unifiedSilla } from './unified-silla';
import { goryeoEarly } from './goryeo-early';
import { goryeoLate } from './goryeo-late';
import { joseonEarly } from './joseon-early';
import { joseonLate } from './joseon-late';
import { japaneseColonial } from './japanese-colonial';
import { modern } from './modern';

// Merge detailed era data into the base eras array
const eraContentMap: Record<string, Era> = {
  'gojoseon': gojoseon,
  'samguk-early': samgukEarly,
  'samguk-late': samgukLate,
  'unified-silla': unifiedSilla,
  'goryeo-early': goryeoEarly,
  'goryeo-late': goryeoLate,
  'joseon-early': joseonEarly,
  'joseon-late': joseonLate,
  'japanese-colonial': japaneseColonial,
  'modern': modern,
};

const erasWithContent: Era[] = baseEras.map((era) =>
  eraContentMap[era.id] ? eraContentMap[era.id] : era
);

export function getEras(): Era[] {
  return erasWithContent;
}

export function getEra(eraId: string): Era | undefined {
  return erasWithContent.find((era) => era.id === eraId);
}

export function getPeriod(eraId: string, periodId: string): Period | undefined {
  const era = getEra(eraId);
  if (!era) return undefined;
  return era.periods.find((period) => period.id === periodId);
}

export function getEvent(
  eraId: string,
  periodId: string,
  eventId: string
): GameEvent | undefined {
  const period = getPeriod(eraId, periodId);
  if (!period) return undefined;
  return period.events.find((event) => event.id === eventId);
}
