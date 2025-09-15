import { EventItem, eventSlug } from './events';
import { readData } from './data';

async function readEvents(): Promise<EventItem[]> {
  return readData<EventItem[]>('events');
}

export async function allEvents(): Promise<EventItem[]> {
  return readEvents();
}

export async function getEventBySlug(slug: string): Promise<EventItem | undefined> {
  const events = await readEvents();
  return events.find(e => eventSlug(e) === slug.toLowerCase());
}
