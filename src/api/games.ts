import { fusibleRequest } from '@/utils/fusibleRequest';

export function getGamesJson() {
    const url =
        process.env.NODE_ENV === 'development'
            ? '/data/games.json'
            : process.env.CHAIN_ENV === 'goerli'
            ? 'https://www-test.nfootball.io/data/games.json'
            : 'https://www.nfootball.io/data/games.json';
    return fusibleRequest({ url, method: 'GET' });
}

export function getGameDatesJson() {
    const url =
        process.env.NODE_ENV === 'development'
            ? '/data/game_dates.json'
            : process.env.CHAIN_ENV === 'goerli'
            ? 'https://www-test.nfootball.io/data/game_dates.json'
            : 'https://www.nfootball.io/data/game_dates.json';

    return fusibleRequest({ url, method: 'GET' });
}
