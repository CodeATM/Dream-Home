import type { NotificationItem } from "./types";
import { properties } from "./properties";

function p(slugPart: string) {
  return properties.find((x) => x.slug.includes(slugPart));
}

const drop = p("zilker");
const match = p("ballard");
const drop2 = p("lohi");

export const seedNotifications: NotificationItem[] = [
  {
    id: "n1",
    kind: "price-drop",
    title: "Price drop on a saved home",
    body: drop
      ? `${drop.address} dropped $15,000 to ${"$"}${Math.round(drop.price / 1000)}K.`
      : "A saved home dropped in price.",
    propertySlug: drop?.slug,
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    kind: "new-match",
    title: "3 new matches for your search",
    body: match
      ? `Including ${match.neighborhood} — new to market today and within budget.`
      : "New listings match your saved search.",
    propertySlug: match?.slug,
    time: "Yesterday",
    read: false,
  },
  {
    id: "n3",
    kind: "tour-reminder",
    title: "Tour reminder",
    body: "Your scheduled tour is coming up. Meet your agent at the front gate.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "n4",
    kind: "price-drop",
    title: "Price drop on a saved home",
    body: drop2
      ? `${drop2.address} reduced by $10,000 after 31 days on market.`
      : "A saved home reduced its price.",
    propertySlug: drop2?.slug,
    time: "4 days ago",
    read: true,
  },
];
