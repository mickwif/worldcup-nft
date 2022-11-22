import GamesJson from '@/config/matches/games.json';
import GameDates from '@/config/matches/game_dates.json';

export const getGroupMatches = () => {
    const result = {};
    for (const key of Object.keys(GameDates)) {
        if (new Date(key).getTime() < new Date('2022-12-03').getTime()) {
            const matches = GameDates[key]
                .map((id) => {
                    const game = GamesJson[id];
                    return game;
                })
                .filter((item) => item.deadline * 1000 > Date.now());
            if (matches.length > 0) {
                result[key] = matches;
            }
        }
    }
    return result;
};
let GroupMatches = getGroupMatches();
export default GroupMatches;

export const getGroupByTeamId = (team: number) => {
    const Groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const index = Math.floor(team / 4);
    return Groups[index];
};
