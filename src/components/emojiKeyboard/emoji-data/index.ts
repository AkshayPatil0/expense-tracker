import { ACTIVITIES_EMOJIS } from "./activities-emojis";
import { ANIMAL_AND_NATURE_EMOJIS } from "./animal-and-nature-emojis";
import { FLAGS_EMOJIS } from "./flags-emojis";
import { FOOD_AND_DRINKS_EMOJIS } from "./food-and-drink-emojis";
import { OBJECTS_EMOJIS } from "./objects-emojis";
import { PERSON_AND_BODY_EMOJIS } from "./people-and-body-emojis";
import { SMILEYS_AND_EMOTIONS_EMOJIS } from "./smileys-and-emotions-emojis";
import { SYMBOLS_EMOJIS } from "./symbols-emojis";
import { TRAVEL_AND_PLACES_EMOJIS } from "./travel-and-places-emojis";

export const EMOJIS = [];

export enum EMOJI_CATEGORIES_NAMES {
  "smiley" = "Smileys & Emotion",
  "people" = "People & Body",
  "animal" = "Animals & Nature",
  "food" = "Food & Drink",
  "travel" = "Travel & Places",
  "activities" = "Activities",
  "objects" = "Objects",
  "symbols" = "Symbols",
  "flags" = "Flags",
}

export const EMOJI_CATEGORIES: Array<
  [EMOJI_CATEGORIES_NAMES, string, [string, string][]]
> = [
  [EMOJI_CATEGORIES_NAMES.smiley, "face-smile", SMILEYS_AND_EMOTIONS_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.people, "hand", PERSON_AND_BODY_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.animal, "cat", ANIMAL_AND_NATURE_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.food, "burger", FOOD_AND_DRINKS_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.travel, "plane", TRAVEL_AND_PLACES_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.activities, "basketball", ACTIVITIES_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.objects, "lightbulb", OBJECTS_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.symbols, "hashtag", SYMBOLS_EMOJIS],
  [EMOJI_CATEGORIES_NAMES.flags, "flag", FLAGS_EMOJIS],
];
