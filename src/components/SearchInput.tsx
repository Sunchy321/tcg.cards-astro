import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Check } from "lucide-react";

import { GAMES, type Game } from '@/shared';

type GameFilter = Game | 'omni';

type GameOption = {
  id: GameFilter;
  label: string;
}

const gameOptions = [
  { id: "omni", label: "Omnisearch" },
  { id: "magic", label: "MTG" },
  { id: "hearthstone", label: "Hearthstone" },
] satisfies GameOption[];

export function SearchInput() {
  const [selectedGame, setSelectedGame] = useState<GameFilter>("omni");

  return (
    <div className="w-[90%] md:w-[75%] bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
      <InputGroup className="h-auto rounded-xl border-0 shadow-none">
        <InputGroupAddon align="inline-start" className="border-r pr-0">
          <Select value={selectedGame} onValueChange={value => setSelectedGame(value as GameFilter)}>
            <SelectTrigger className="w-auto h-auto px-4 py-6 text-[150%] md:text-[150%] border-0 shadow-none">
              <SelectValue placeholder="Game">
                <div className="flex items-center gap-2 w-full">
                    <img
                      src={selectedGame === 'omni' ? '/favicon.svg' : `/${selectedGame}/logo.svg`}
                      alt="Logo"
                      className="w-6 h-6"
                    />
                  </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {gameOptions.map((game) => (
                <SelectItem key={game.id} value={game.id} className="text-base py-2">
                  <div className="flex items-center gap-2 w-full">
                    <img
                      src={game.id === 'omni' ? '/favicon.svg' : `/${game.id}/logo.svg`}
                      alt="Logo"
                      className="w-6 h-6"
                    />
                    <span className="flex-1">{game.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputGroupAddon>

        <InputGroupInput
          type="text"
          id="userInput"
          autoFocus
          placeholder="Enter card name..."
          className="px-6 py-6 text-[150%] md:text-[150%]"
        />
      </InputGroup>
    </div>
  );
}
