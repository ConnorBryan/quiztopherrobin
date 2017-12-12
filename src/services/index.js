import axios from 'axios';
import scapegoat from 'scapegoat';

import config from '../config';

const unescape = string => scapegoat.unescape(string).replace("&#039;", "'");

export async function fetchQuestions() {
    try {
        const { data: { results } } = await (
            axios.get(config.QUESTION_URL)
        );

        return results.map(result => ({ ...result, question: unescape(result.question) }));
    } catch (e) {
        console.error(e);
        return [];
    }
}
